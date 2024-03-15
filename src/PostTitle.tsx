import { React, FC, useEffect, useState } from 'react';
import moment from 'moment';
import './App.css'
import CommentSection from './CommentSection.tsx'
import { ChatBubbleOvalLeftIcon, HeartIcon, BookmarkIcon } from '@heroicons/react/20/solid'



const PostTitle = ({ title }) => {

  const titleDataAndText = {};

  const clipAuthorData = (title) => {

    let indexOfLastBracket = -1; // Initialize with -1, a common practice to indicate "not found"
    for (let i = 0; i < title.length; i++) {
      if (title[i] === ']') {
        indexOfLastBracket = i;
      }
    }
    if (indexOfLastBracket !== -1) { // Check if ']' was found
      let authorData = title.slice(1, indexOfLastBracket);
      let postTitle = title.slice(indexOfLastBracket + 1, title.length + 1);
      titleDataAndText.authorData = authorData;
      titleDataAndText.postTitle = postTitle;

    } else {
      return ""; // Return an empty string if no closing bracket is found
    }
  };

  clipAuthorData(title)

  return (
    <div className="flex">
      <div className="avatar-placeholder mr-3">
        <div className="bg-neutral text-neutral-content rounded-full w-8 h-8 flex items-center justify-center">
          <span className="text-xs">{titleDataAndText.authorData}</span>
        </div>
      </div>
      <div>
        {titleDataAndText.postTitle}
      </div>
    </div>
  );
}

export default PostTitle;