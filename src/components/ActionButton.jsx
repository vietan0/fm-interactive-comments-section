import { oneOf, func } from 'prop-types';

function ActionButton({ action, setFunction }) {
  function handleClick() {
    switch (action) {
      case 'reply':
        setFunction((prevIsReplying) => !prevIsReplying);
        break;
      case 'delete':
        setFunction(); // openPopup
        break;
      case 'edit':
        setFunction((prevIsEditing) => !prevIsEditing);
        break;
      default:
        console.log("Can't find case: ", action);
        break;
    }
  }

  return (
    <button
      type="button"
      className={action === 'delete' ? 'delete' : ''}
      onClick={handleClick}
    >
      {action === 'reply' && (
        <>
          <i className="ri-reply-fill" />
          Reply
        </>
      )}
      {action === 'edit' && (
        <>
          <i className="ri-edit-line" />
          Edit
        </>
      )}
      {action === 'delete' && (
        <>
          <i className="ri-delete-bin-line" />
          Delete
        </>
      )}
    </button>
  );
}

ActionButton.propTypes = {
  action: oneOf(['reply', 'edit', 'delete']).isRequired,
  setFunction: func.isRequired,
};

export default ActionButton;
