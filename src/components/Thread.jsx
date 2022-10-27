/* eslint-disable react/forbid-prop-types */
import {
  shape, string, number, object, array,
} from 'prop-types';
import Comment from './Comment';
import ThreadProvider from '../ThreadContext';

function Thread({ rootComment }) {
  return (
    <ThreadProvider value={rootComment}>
      <div className="thread">
        <Comment
          comment={rootComment}
          key={rootComment.id}
        />
        <div className="replies">
          {rootComment.replies
            && rootComment.replies.map((reply) => (
              <Comment
                comment={reply}
                isAReply
                key={reply.id}
              />
            ))}
        </div>
      </div>
    </ThreadProvider>
  );
}

Thread.propTypes = {
  rootComment: shape({
    id: string.isRequired,
    content: string.isRequired,
    createdAt: string.isRequired,
    score: number.isRequired,
    user: object.isRequired,
    replies: array,
  }).isRequired,
};

export default Thread;
