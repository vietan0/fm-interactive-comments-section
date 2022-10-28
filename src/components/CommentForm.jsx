/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import { bool, func, string } from 'prop-types';
import { useContext, useEffect, useRef } from 'react';
import { ThreadContext } from '../contexts/ThreadContext';

function CommentForm({
  reply,
  editing,
  replyingTo,
  setIsReplying,
  ownId,
  commentText,
  setCommentText,
  saveFunction,
}) {
  const rootComment = useContext(ThreadContext);
  const textareaRef = useRef(null);

  function save() {
    if (editing) saveFunction(ownId, commentText); // update comment
    else saveFunction(commentText, rootComment.id, replyingTo); // add comment
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') setIsReplying(false);
    if (e.key === 'Enter') save();
  }

  useEffect(() => {
    if (reply || editing) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = commentText.length;
    }
  }, []);

  return (
    <form>
      <textarea
        value={commentText}
        onChange={(e) => {
          setCommentText(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        placeholder={reply ? 'Reply...' : 'Add a comment...'}
        ref={textareaRef}
      />
      <button
        type="button"
        disabled={commentText === ''}
        onClick={save}
      >
        {reply ? 'Reply' : editing ? 'Update' : 'Send'}
      </button>
    </form>
  );
}

CommentForm.propTypes = {
  reply: bool,
  editing: bool,
  replyingTo: string,
  setIsReplying: func,
  ownId: string,
  commentText: string.isRequired,
  setCommentText: func.isRequired,
  saveFunction: func.isRequired,
};

CommentForm.defaultProps = {
  reply: false,
  editing: false,
  replyingTo: '',
  setIsReplying: undefined,
  ownId: undefined,
};

export default CommentForm;
