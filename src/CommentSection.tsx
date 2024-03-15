import { React, FC } from 'react';
import Comment from './Comment.tsx';


import { PaperAirplaneIcon } from '@heroicons/react/20/solid'

type CommentProps = {
  id: number;
  parent_id: number | null;
  display_name: string;
  text: string;
  created_at: string;
};

const CommentSection: FC<CommentProps> = ({ comments }) => {


  return (
    <div className="mx-6 pt-3 pb-2">
      <div className="border-b border-gray-300 mb-4 "></div>

      <div >
        {
          Object.values(comments).map(comment => (
            <Comment
              id={comment.id}
              parent_id={comment.parent_id}
              display_name={comment.display_name}
              text={comment.text}
              created_at={comment.created_at}
            />

          ))
        }
        <div className="flex py-2">
          <label htmlFor="comment" className="self-center block pl-3 py-2 text-l font-medium leading-6 text-gray-900">
            <div className="avatar placeholder ">
              <div className="self-center bg-neutral text-neutral-content rounded-full h-full p-1.5">
                <span className="text-l">Me</span>
              </div>
            </div>
          </label>
          <div className="flex pl-2 self-center w-full relative">
            <input
              type="text"
              name="comment"
              id="comment"
              className="block w-full bg-gray-200 rounded-full border-0 pl-4 pr-10 py-1.5 text-gray-900 sm:text-sm sm:leading-6 focus:ring-1 focus:ring-inset focus:ring-accent"
              placeholder="Write a comment..."
            />
            <PaperAirplaneIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500" />
          </div>

        </div>
      </div>

    </div>
  );
}

export default CommentSection;