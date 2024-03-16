import { FC } from 'react';
import moment from 'moment';
import CommentButtonGroup from './CommentButtonGroup';

type CommentProps = {
  id: number;
  parent_id: number | null;
  display_name: string;
  text: string;
  created_at: string;
};


const Comment: FC<CommentProps> = ({ id, parent_id, display_name, text, created_at }) => {

  // const [hugState, setHugState] = useState<boolean>(false);

  const timestamp = moment(created_at).fromNow()

  // const toggleHug = (index: number) => {
  //   setHugState(!hugState);
  // };


  return (
    <div className={parent_id ? "subComment flex my-2 px-3 ml-12 mr-3 py-1" : "comment flex my-2 px-3 ml-1 mr-3 py-1" }key={id}>
      <div className="avatar placeholder h-full mr-3 mt-1">
        <div className="bg-neutral text-neutral-content rounded-full w-8">
          <span className="text-xs">{display_name[0]}</span>
        </div>
      </div>
      <div className="rounded-2xl bg-base-100 p-3">
        <div className="comment-header flex">
          <p className="font-semibold text-sm  ">{display_name}</p>
          <p className="ml-3 text-secondary text-xs self-center"> {timestamp}</p>
        </div>
        <p className="comment-text">{text}</p>
        <CommentButtonGroup
          // hugState={hugState}
          // id={id}
        />
      </div>
    </div>
  );
}

export default Comment;
