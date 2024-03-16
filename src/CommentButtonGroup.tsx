import { ChatBubbleOvalLeftIcon, HeartIcon } from '@heroicons/react/20/solid'

const CommentButtonGroup = (
  hugState,
  // toggleHug,
  // id
) => {

  const button = "flex rounded  px-2 pl-0  text-xs font-semibold text-secondary -sm hover:text-neutral "

  return (
    <div id="comment-interact-buttons " className="flex w-3/4 mt-2 ">
      <button
        className={button}
      // onClick={() => toggleHug(index)}
      // onClick={() => toggleHug()}
      >
        <HeartIcon
          className={`${hugState ? 'text-red-500' : 'text-current'} h-6 w-6`}
        />
        <p className="self-center px-1">
          Hugs
        </p>
      </button>
      <button
        className={button}
      // onClick={toggleCommentView}
      >

        <ChatBubbleOvalLeftIcon
          className="ml-0.5 h-5 w-5" />
        <p className="self-center px-1">
          {/* {Object.keys(comments).length} Comments */}
          Comments
        </p>
      </button>
    </div>
  )
}
export default CommentButtonGroup;