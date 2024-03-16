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

  const [currComments, setCurrComments] = useState(comments);

  const submitComment = () => {
    //loading animation
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'mode': 'no-cors',
      },
      body: JSON.stringify({
        // {commentIndex}: {
        "id": 5,
        "parent_id": null,
        "display_name": "Irene",
        "text": "I think she's pregnant lmao",
        "created_at": "2024-03-11T01:16:31.087576"
      })
    };

    // PUT request to change hug count
    fetch(`http://127.0.0.1:8000/posts/${index}`, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json()
        } else {
          setHugState(!newHugState);
        }
      })
    .then(response => response.json())
    .then(data => {
      setcurrComments(data);
    })
      .catch(error => {
        console.error('Error hugging post', error);
      });
  }


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