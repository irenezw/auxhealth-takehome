import { FC } from 'react';
import Comment from './Comment';
import CommentInput from './CommentInput';

export type CommentType = {
  id: number;
  parent_id: number | null;
  display_name: string;
  text: string;
  created_at: string;
};

type CommentSectionProps = {
  comments: Record<number, CommentType>;
};

const CommentSection: FC<CommentSectionProps> = ({ comments }) => {

  // const [currComments, setCurrComments] = useState(comments);

  // console.log(currComments)

  // const submitComment = () => {
  //   //loading animation
  //   const requestOptions = {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'mode': 'no-cors',
  //     },
  //     body: JSON.stringify({
  //       // {commentIndex}: {
  //       "id": 5,
  //       "parent_id": null,
  //       "display_name": "Irene",
  //       "text": "I think she's pregnant lmao",
  //       "created_at": "2024-03-11T01:16:31.087576"
  //     })
  //   };

  //   // PUT request to change hug count
  //   fetch(`http://127.0.0.1:8000/posts/${index}`, requestOptions)
  //     .then(response => {
  //       if (response.ok) {
  //         response.json()
  //       } else {
  //         setHugState(!newHugState);
  //       }
  //     })
  //   .then(response => response.json())
  //   .then(data => {
  //     setcurrComments(data);
  //   })
  //     .catch(error => {
  //       console.error('Error hugging post', error);
  //     });
  // }

  const [currComments, setCurrComments] = useState(comments);

  // const submitComment = () => {
  //   //loading animation
  //   const requestOptions = {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'mode': 'no-cors',
  //     },
  //     body: JSON.stringify({
  //       // {commentIndex}: {
  //       "id": 5,
  //       "parent_id": null,
  //       "display_name": "Irene",
  //       "text": "I think she's pregnant lmao",
  //       "created_at": "2024-03-11T01:16:31.087576"
  //     })
  //   };

  //   // PUT request to change hug count
  //   fetch(`http://127.0.0.1:8000/posts/${index}`, requestOptions)
  //     .then(response => {
  //       if (response.ok) {
  //         response.json()
  //       } else {
  //         setHugState(!newHugState);
  //       }
  //     })
  //   .then(response => response.json())
  //   .then(data => {
  //     setcurrComments(data);
  //   })
  //     .catch(error => {
  //       console.error('Error hugging post', error);
  //     });
  // }

  const [currComments, setCurrComments] = useState([]);

  const nestComments = (commentsObj) => {
    const comments = Object.values(commentsObj);
    const nestedComments = {};
    const childComments = [];

    // Separate parent and child comments
    comments.forEach(comment => {
      if (comment.parent_id === null) {
        nestedComments[comment.id] = { ...comment, children: [] };
      } else {
        childComments.push(comment);
      }
    });

    // Attach child comments to their respective parents
    childComments.forEach(childComment => {
      if (nestedComments[childComment.parent_id]) {
        nestedComments[childComment.parent_id].children.push(childComment);
      } else {
        // handling nested child comments
        childComments.forEach(parentComment => {
          if (parentComment.id === childComment.parent_id) {
            if (!parentComment.children) {
              parentComment.children = [];
            }
            parentComment.children.push(childComment);
          }
        });
      }
    });

    const organizedComments = Object.values(nestedComments);
    setCurrComments(organizedComments);
    console.log(currComments)
  };

  // const submitComment = () => {
  //   //loading animation
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'mode': 'no-cors',
  //     },
  //     body: JSON.stringify({
  //       // {commentIndex}: {
  //       "id": 5,
  //       "parent_id": null,
  //       "display_name": "Irene",
  //       "text": "I think she's pregnant lmao",
  //       "created_at": "2024-03-11T01:16:31.087576"
  //     })
  //   };

  //   // PUT request to change hug count
  //   fetch(`http://127.0.0.1:8000/posts/${index}`, requestOptions)
  //     .then(response => {
  //       if (response.ok) {
  //         response.json()
  //       } else {
  //         setHugState(!newHugState);
  //       }
  //     })
  //   .then(response => response.json())
  //   .then(data => {
  //     setcurrComments(data);
  //   })
  //     .catch(error => {
  //       console.error('Error hugging post', error);
  //     });
  // }
// console.log(currComments)

  return (
    <div className="mx-6 pt-3 pb-2">
      <div className="border-b border-gray-300 mb-4 "></div>
      <div >
        {currComments}
        {
          Object.values(comments).map(comment => (
            <Comment
              key={comment.id}
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