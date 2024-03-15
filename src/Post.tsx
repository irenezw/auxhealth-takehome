import { React, FC, useEffect, useState } from 'react';
import moment from 'moment';
import './App.css'
import CommentSection from './CommentSection.tsx'
import { ChatBubbleOvalLeftIcon, HeartIcon, BookmarkIcon } from '@heroicons/react/20/solid'


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


  //TODO: this button could be used in a better way than this
  const button = "flex rounded  px-2 pl-0 py-3 text-xs font-semibold text-secondary -sm hover:text-neutral "
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
    Object.keys(comments).length > 0 ? setCommentView(!commentView) : null;
  }

  return (
    <div className="post card lg:card-side m-3">
      <div className="collapse bg-white">
        <input type="checkbox" name="post-accordian" />
        <div className="collapse-title text-xl font-medium">
          <h2 className="post-header card-title">
            {title}
          </h2>
        </div>
        <div className="collapse-content">
          <p className="pt-desc">{patient_description}</p>
        </div>
        <div className="post-footer card-actions flex justify-between mx-4">
          <div id="interact-buttons " className="flex w-3/4">
            <button
              className={button}
              onClick={() => toggleHug(index)}
            >
              <HeartIcon
                className={`${hugState ? 'text-red-500' : 'text-current'} h-6 w-6`}
              />
              <p className="self-center px-1">
                {numHugs} Hugs
              </p>
            </button>
            <button
              className={button}
              onClick={toggleCommentView}>
              <ChatBubbleOvalLeftIcon
                className="ml-0.5 h-5 w-5" />
              <p className="self-center px-1">
                {Object.keys(comments).length} Comments
              </p>
            </button>
            <button className={button}>
              <BookmarkIcon className="ml-0.5 h-5 w-5" />
              <p className="self-center px-1">
                Save
              </p>
            </button>
          </div>
          <div className="self-center text-secondary text-sm">
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