import { number } from 'prop-types';
import { useState } from 'react';

function Score({ score }) {
  const [num, setNum] = useState(score);
  const [modified, setModified] = useState('');

  function upvote() {
    if (modified === 'upvoted') {
      setNum(score);
      setModified('');
    } else {
      setNum(score + 1);
      setModified('upvoted');
    }
  }
  function downvote() {
    if (modified === 'downvoted') {
      setNum(score);
      setModified('');
    } else if (score > 0) {
      setNum(score - 1);
      setModified('downvoted');
    }
  }
  return (
    <div className="score">
      <button
        type="button"
        onClick={upvote}
        className={modified === 'upvoted' ? 'selected' : ''}
        aria-label="upvote"
      >
        <i className="ri-add-line" />
      </button>
      {num}
      <button
        type="button"
        onClick={downvote}
        className={modified === 'downvoted' ? 'selected' : ''}
        aria-label="downvote"
      >
        <i className="ri-subtract-line " />
      </button>
    </div>
  );
}

Score.propTypes = {
  score: number.isRequired,
};

export default Score;
