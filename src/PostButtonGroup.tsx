import {React} from 'react';

import { ChatBubbleOvalLeftIcon, HeartIcon, BookmarkIcon } from '@heroicons/react/20/solid'


const PostButtonGroup = ({
  toggleHug,
  numHugs,
  toggleCommentView,
  comments,
  hugState,
  index
}) => {

  const button = "flex rounded px-2 pl-0 text-xs font-semibold text-secondary -sm hover:text-neutral pb-3"

  return (
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

  )
}

export default PostButtonGroup;