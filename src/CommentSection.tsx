import { React, FC } from 'react';
import Comment from './Comment.tsx';
// import moment from 'moment';

// import { ChatBubbleOvalLeftIcon, HeartIcon, BookmarkIcon } from '@heroicons/react/20/solid'

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
        <div>
          <label htmlFor="name" className="ml-px block pl-4 text-sm font-medium leading-6 text-gray-900">
            Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Jane Smith"
            />
          </div>
        </div>
      </div>

    </div>
  );
}

export default CommentSection;