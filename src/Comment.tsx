import { FC, useState } from 'react';
import moment from 'moment';

import { ChatBubbleOvalLeftIcon, HeartIcon } from '@heroicons/react/20/solid'

type CommentProps = {
  id: number;
  parent_id: number | null;
  display_name: string;
  text: string;
  created_at: string;
};


const Comment: FC<CommentProps> = ({ id, parent_id, display_name, text, created_at }) => {

  const [hugState, setHugState] = useState<boolean>(false);

  const button = "flex rounded  px-2 pl-0  text-xs font-semibold text-secondary -sm hover:text-neutral "
  const timestamp = moment(created_at).fromNow()

  const toggleHug = (index: number) => {
    setHugState(!hugState);
    // let newHugCount = num_hugs
    // hugState ? newHugCount -= 1 : newHugCount += 1

    // const requestOptions = {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ num_hugs: newHugCount })
    // };

    // fetch(`http://127.0.0.1:8000/posts/${index}`, requestOptions)
    //   .then(()=> requestData())
    //   .catch(error => console.error('Error hugging post', error));
  };



  return (
    <div className="comment mx-4" key={id}>
      <div className="comment-header flex">
        <p className="font-semibold text-sm  ">{display_name}</p>
        <p className="ml-3 text-secondary text-sm  self-center"> {timestamp}</p>
      </div>
      <p className="comment-text">{text}</p>
      <div id="comment-interact-buttons " className="flex w-3/4 ">
        <button
          className={button}
          // onClick={() => toggleHug(index)}
          // onClick={() => toggleHug()}
        >
          <HeartIcon
            className={`${hugState ? 'text-red-500' : 'text-current'} h-6 w-6`}
          />
          <p className="self-center px-1">
            Hugs
          </p>
        </button>
        <button
          className={button}
        // onClick={toggleCommentView}
        >

          <ChatBubbleOvalLeftIcon
            className="ml-0.5 h-5 w-5" />
          <p className="self-center px-1">
            {/* {Object.keys(comments).length} Comments */}
            Comments
          </p>
        </button>
      </div>
    </div>
  );
}

export default Comment;
