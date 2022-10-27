import { useContext } from 'react';
import { nanoid } from 'nanoid';
import Thread from './Thread';
import { CommentsContext } from '../contexts/CommentsContext';

function CommentList() {
  const { comments } = useContext(CommentsContext);

  const threadElems = comments.map((rootComment) => (
    <Thread
      rootComment={rootComment}
      key={nanoid()}
    />
  ));

  return <div className="commentList">{threadElems}</div>;
}
export default CommentList;
