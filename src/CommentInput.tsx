import { React } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/20/solid'

const CommentInput = () => {
  return (
    <div className="input-container flex py-2 mx-4 mr-6">
      {/* Avatar Icon */}
      <label htmlFor="comment" className="self-center block py-2 text-l font-medium leading-6 text-gray-900">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content rounded-full w-8">
            <span className="text-xs">Me</span>
          </div>
        </div>
      </label>
      {/* Text input */}
      <div className="flex pl-3 self-center w-full relative">
        <input
          type="text"
          name="comment"
          id="comment"
          className="block w-full bg-base-100 rounded-2xl border-0 pl-4 pr-10 py-1.5 text-gray-900 sm:text-sm sm:leading-6 focus:ring-1 focus:ring-inset focus:ring-accent"
          placeholder="Write a comment..."
        />
        <PaperAirplaneIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500" />
      </div>
    </div>)
}

export default CommentInput;