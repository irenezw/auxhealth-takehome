import { React, FC, useEffect, useState } from 'react';
import moment from 'moment';
import './App.css'
import CommentSection from './CommentSection.tsx'
import PostTitle from './PostTitle.tsx';
import PostButtonGroup from './PostButtonGroup.tsx'

// import { ChatBubbleOvalLeftIcon, HeartIcon, BookmarkIcon } from '@heroicons/react/20/solid'


type PostProps = {
  index: number;
  post_url: string;
  title: string;
  created_at: string;
  num_hugs: number;
  patient_description: string;
  assessment: string;
  question: string;
  comments: Record<string, Comment>; // use Record when keys are not static
  requestData: () => void;

};

type Comment = {
  id: number;
  parent_id: number | null;
  display_name: string;
  text: string;
  created_at: string;
};

const Post: FC<PostProps> = ({
  index,
  // post_url,
  title,
  created_at,
  num_hugs: initialNumHugs,
  patient_description,
  // assessment,
  // question,
  comments,
  isHuggedByUser,
  // requestData
}) => {
  const [hugState, setHugState] = useState<boolean>(false);
  const [numHugs, setNumHugs] = useState<number>(initialNumHugs); // maintain the state locally
  const [commentView, setCommentView] = useState<boolean>(false);

  const timestamp = moment(created_at).fromNow()

  // Update useEffect to respond to changes in initialNumHugs if they come from outside
  useEffect(() => {
    setHugState(isHuggedByUser);
    setNumHugs(initialNumHugs); // Ensure local state is updated if prop changes
  }, [isHuggedByUser, initialNumHugs]);

  /* TOGGLE HUG */
  const toggleHug = (index: number) => {
    const newHugState = !hugState;
    setHugState(newHugState); // This updates the local state

    const newHugCount = newHugState ? numHugs + 1 : numHugs - 1; // Calculate based on the new state

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'mode': 'no-cors',
      },
      body: JSON.stringify({
        num_hugs: newHugCount,
      })
    };

    // PUT request to change hug count
    fetch(`http://127.0.0.1:8000/posts/${index}`, requestOptions)
      .then(response => {
        if (response.ok) {
          setNumHugs(newHugCount);
        } else {
          setHugState(!newHugState);
        }
      })
      .catch(error => {
        console.error('Error hugging post', error);
        setHugState(!newHugState);
      });
  };


  /* TOGGLE COMMENT VIEW */
  const toggleCommentView = () => {
    setCommentView(!commentView); // Toggle visibility of comments and checkbox status

  }

  return (
    <div className="post card lg:card-side m-3 shadow-md">
      <div className="collapse bg-white">
        <input
          type="checkbox"
          name="post-accordian"
          checked={commentView}
          className="w-full h-full" />
        <div className="collapse-title text-xl font-medium">
          <h2 className="post-header card-title">
            {/* {title} */}
            <PostTitle title={title}/>
          </h2>
        </div>
        <div className="collapse-content">
          <p className="pt-desc">{patient_description}</p>
        </div>
        <div className="post-footer align-middle card-actions flex justify-between mx-5">
          <PostButtonGroup
            toggleHug={toggleHug}
            numHugs={numHugs}
            toggleCommentView={toggleCommentView}
            comments={comments}
            hugState={hugState}
            numHugs={numHugs}
            index={index}
          />
          {/* Timestamp */}
          <div className="timestamp  text-secondary text-sm">
            {timestamp}
          </div>
        </div>
        <div className={`transition-height duration-500 overflow-hidden ${commentView ? 'max-h-full' : 'max-h-0'}`}>
          {commentView ? <CommentSection
            comments={comments} /> : null}
        </div>
      </div>
    </div>
  );
}

export default Post;