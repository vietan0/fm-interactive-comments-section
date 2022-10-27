import { useContext, useState } from 'react';
import { bool, string } from 'prop-types';
import CommentForm from './CommentForm';
import { CommentsContext } from '../contexts/CommentsContext';

function AddAComment({ reply, replyingTo }) {
  const { currentUser, addComment } = useContext(CommentsContext);
  const [commentText, setCommentText] = useState(
    // if there is a rootComment
    // (which mean the one we're adding is a reply)
    replyingTo ? `@${replyingTo} ` : '',
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
        replyingTo={replyingTo}
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
  replyingTo: string,
};

AddAComment.defaultProps = {
  reply: false,
  replyingTo: '',
};

export default AddAComment;
