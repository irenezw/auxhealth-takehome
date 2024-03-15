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
        <input type="text" placeholder="Comment" className="input  input-sm	input-bordered input-secondary w-full max-w-xs m-3 ml-4 " />
      </div>

    </div>
  );
}

export default CommentSection;