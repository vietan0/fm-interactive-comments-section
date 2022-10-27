/* eslint-disable consistent-return */
import { useContext, useEffect, useRef } from 'react';
import { string, func } from 'prop-types';
import { CommentsContext } from '../contexts/CommentsContext';

function Popup({ commentId, setPopupShown }) {
  const { deleteComment } = useContext(CommentsContext);
  const popupBg = useRef(null);
  const closeBtn = useRef(null);
  const cancelBtn = useRef(null);

  function closePopup(e) {
    const possibleTargets = [popupBg.current, closeBtn.current, cancelBtn.current];
    if (possibleTargets.includes(e.target)) {
      setPopupShown(false);
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', closePopup);
    return () => {
      document.body.removeEventListener('click', closePopup);
    };
  }, []);

  return (
    <div
      className="popup-bg"
      ref={popupBg}
    >
      <div className="dialog">
        <button
          type="button"
          ref={closeBtn}
        >
          ❌
        </button>
        <p>Do you want to delete this comment?</p>
        <div className="buttons">
          <button
            type="button"
            onClick={() => {
              deleteComment(commentId);
              setPopupShown(false);
            }}
            className="delete"
          >
            Delete
          </button>
          <button
            type="button"
            ref={cancelBtn}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

Popup.propTypes = {
  commentId: string.isRequired,
  setPopupShown: func.isRequired,
};
export default Popup;
