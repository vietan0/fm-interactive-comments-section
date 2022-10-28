/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/forbid-prop-types */
import {
  bool, shape, number, string, object, array,
} from 'prop-types';
import { useContext, useState } from 'react';
import { CommentsContext } from '../contexts/CommentsContext';
import ActionButton from './ActionButton';
import AddAComment from './AddAComment';
import CommentForm from './CommentForm';
import Score from './Score';
import Popup from './Popup';

// eslint-disable-next-line no-unused-vars
function Comment({ comment, isAReply }) {
  const { currentUser, updateComment } = useContext(CommentsContext);
  const [isMine] = useState(currentUser.username === comment.user.username);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [commentBeingEdited, setCommentBeingEdited] = useState(comment.content);
  const [popupShown, setPopupShown] = useState(false);

  function openPopup() {
    setPopupShown(true);
  }

  return (
    <div>
      <div className="comment">
        <Score score={comment.score} />
        <div className="main">
          <div className="top">
            <div className="info">
              <img
                src={comment.user.image.png}
                alt={`${comment.user.username}'s profile pic`}
                className="profilePic"
              />
              <span className="username">{comment.user.username}</span>
              {isMine && <span className="tag">you</span>}
              <span className="createdAt">{comment.createdAt}</span>
            </div>
            <div className="actions">
              {isMine && (
                <>
                  <ActionButton
                    action="delete"
                    setFunction={openPopup}
                  />
                  <ActionButton
                    action="edit"
                    setFunction={setIsEditing}
                  />
                </>
              )}
              <ActionButton
                action="reply"
                setFunction={setIsReplying}
              />
            </div>
          </div>
          {isEditing ? (
            <CommentForm
              editing
              ownId={comment.id}
              commentText={commentBeingEdited}
              setCommentText={setCommentBeingEdited}
              saveFunction={updateComment}
            />
          ) : (
            <p>
              {comment.replyingTo && (
              <span className="replyingTo">
                @
                {comment.replyingTo}
              </span>
              )}
              {' '}
              {comment.content}
            </p>
          )}
        </div>
      </div>
      {isReplying && (
        <AddAComment
          reply
          replyingTo={comment.user.username}
          setIsReplying={setIsReplying}
        />
      )}
      {popupShown && (
        <Popup
          commentId={comment.id}
          setPopupShown={setPopupShown}
        />
      )}
    </div>
  );
}

Comment.propTypes = {
  comment: shape({
    id: string.isRequired,
    content: string.isRequired,
    createdAt: string.isRequired,
    score: number.isRequired,
    user: object.isRequired,
    replies: array,
    replyingTo: string,
  }).isRequired,
  isAReply: bool,
};

Comment.defaultProps = {
  isAReply: false,
};

export default Comment;
