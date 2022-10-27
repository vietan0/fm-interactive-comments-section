import { useContext, useState } from 'react';
import { bool } from 'prop-types';
import { CommentsContext } from '../CommentsContext';
import CommentForm from './CommentForm';
import { ThreadContext } from '../ThreadContext';

function AddAComment({ reply }) {
  const rootComment = useContext(ThreadContext);
  const { currentUser, addComment } = useContext(CommentsContext);
  const [commentText, setCommentText] = useState(
    // if there is a rootComment
    // (which mean the one we're adding is a reply)
    rootComment ? `@${rootComment.user.username} ` : '',
  );

  return (
    <div className="addAComment">
      {currentUser.image && (
        <img
          src={currentUser.image.png}
          alt={`${currentUser.username}'s profile pic`}
          className="profilePic"
        />
      )}
      <CommentForm
        reply={reply}
        commentText={commentText}
        setCommentText={setCommentText}
        // eslint-disable-next-line react/jsx-no-bind
        saveFunction={addComment}
      />
    </div>
  );
}

AddAComment.propTypes = {
  reply: bool,
};

AddAComment.defaultProps = {
  reply: false,
};

export default AddAComment;
