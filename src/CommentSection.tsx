import { React, FC } from 'react';
import Comment from './Comment.tsx';
import CommentInput from './CommentInput.tsx';


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
      <CommentInput

        />
      </div >


    </div >
  );
}

export default CommentSection;