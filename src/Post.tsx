import { FC, useEffect, useState } from 'react';
import moment from 'moment';
import './App.css'
import CommentSection from './CommentSection.tsx'
import PostTitle from './PostTitle.tsx';
import PostButtonGroup from './PostButtonGroup.tsx'

type PostProps = {
  index: number;
  post_url: string;
  title: string;
  created_at: string;
  num_hugs: number;
  patient_description: string;
  assessment: string;
  question: string;
  comments: Record<number, CommentPost>;
  isHuggedByUser: boolean;
};

export type CommentPost = {
  id: number;
  parent_id: number | null;
  display_name: string;
  text: string;
  created_at: string;
};

const Post: FC<PostProps> = ({
  index,
  title,
  created_at,
  num_hugs: initialNumHugs,
  patient_description,
  comments,
  isHuggedByUser,
}) => {
  const [hugState, setHugState] = useState<boolean>(false);
  const [numHugs, setNumHugs] = useState<number>(initialNumHugs);
  const [commentView, setCommentView] = useState<boolean>(false);

  const timestamp = moment(created_at).fromNow()

  useEffect(() => {
    setHugState(isHuggedByUser);
    setNumHugs(initialNumHugs);
  }, [isHuggedByUser, initialNumHugs]);

  /* TOGGLE HUG */
  const toggleHug = (index: number) => {
    const newHugState = !hugState;
    setHugState(newHugState);

    const newHugCount = newHugState ? numHugs + 1 : numHugs - 1;

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

  /* TOGGLE COMMENT VIEW (AND CHECKBOX OF ACCORDIAN)*/
  const toggleCommentView = () => {
    setCommentView(!commentView);
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
            num_hugs={numHugs}
            toggleCommentView={toggleCommentView}
            comments={comments}
            hugState={hugState}
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