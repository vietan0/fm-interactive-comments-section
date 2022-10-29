import PropTypes from 'prop-types';
import {
  useEffect, createContext, useState, useMemo,
} from 'react';
import { nanoid } from 'nanoid';

const CommentsContext = createContext();

function CommentsProvider({ children }) {
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  // eslint-disable-next-line consistent-return
  function findComment(id) {
    // return [found, foundIndex, parentObj, parentIndex]
    let found = comments.find((cmt) => cmt.id === id);
    let foundIndex = comments.findIndex((cmt) => cmt.id === id);
    let parentCmt;
    let parentIndex;
    // if found, return early
    if (foundIndex !== -1) {
      return [found, foundIndex, parentCmt, parentIndex];
    }

    for (let i = 0; i < comments.length; i += 1) {
      if (comments[i].replies.length > 0) {
        found = comments[i].replies.find((reply) => reply.id === id);
        foundIndex = comments[i].replies.findIndex((reply) => reply.id === id);
        parentCmt = comments[i];
        parentIndex = i;
        // if found, return early
        if (foundIndex !== -1) {
          return [found, foundIndex, parentCmt, parentIndex];
        }
      }
    }
  }

  function addComment(commentText, parentId, replyingTo = undefined) {
    function takeOutTag(str) {
      const matchTagAtBeginning = /^@\w+\s*/;
      // if there's a tag
      if (matchTagAtBeginning.test(str) !== null) {
        const tag = str.match(matchTagAtBeginning)[0];
        return str.substring(tag.length); // remove tag from comment
      }
      return str;
    }
    const commentTextWithoutTag = takeOutTag(commentText);

    const newCommentObj = replyingTo
      ? {
        id: nanoid(),
        content: commentTextWithoutTag,
        createdAt: 'just now',
        score: 0,
        replyingTo,
        user: currentUser,
      }
      : {
        id: nanoid(),
        content: commentTextWithoutTag,
        createdAt: 'just now',
        score: 0,
        user: currentUser,
        replies: [],
      };

    if (commentTextWithoutTag !== '') {
      setComments((prevArr) => {
        const newArr = [...prevArr];
        if (replyingTo) {
          // push a reply to a comment.replies array
          const [parent, parentIndex] = findComment(parentId);
          const updatedReplies = [...parent.replies];
          updatedReplies.push(newCommentObj); // add a new reply
          const updatedParentObj = { ...parent, replies: updatedReplies };
          newArr.splice(parentIndex, 1, updatedParentObj);
        } else {
          // push a root comment
          newArr.push(newCommentObj);
        }
        return newArr;
      });
    }
  }

  function deleteComment(id) {
    const [, foundIndex, parentObj, parentIndex] = findComment(id);
    setComments((prevArr) => {
      const newArr = [...prevArr];
      if (parentObj === undefined) {
        // case: root comment
        newArr.splice(foundIndex, 1); // delete comment
        return newArr;
      }
      // case: reply
      // replace the whole parent comment
      const updatedReplies = [...parentObj.replies];
      updatedReplies.splice(foundIndex, 1); // delete reply
      const updatedParentObj = { ...parentObj, replies: updatedReplies };
      newArr.splice(parentIndex, 1, updatedParentObj);
      return newArr;
    });
  }

  function updateComment(id, updatedCommentText) {
    const [found, foundIndex, parentObj, parentIndex] = findComment(id);
    console.log([found, foundIndex, parentObj, parentIndex]);
    setComments((prevArr) => {
      const newArr = [...prevArr];
      if (parentObj === undefined) {
        // case: root comment
        const newCommentObj = { ...found, content: updatedCommentText, createdAt: 'just now' };
        newArr.splice(foundIndex, 1, newCommentObj); // replace with new comment
        return newArr;
      }
      // case: reply
      // replace the whole parent comment
      const updatedReplies = [...parentObj.replies];
      const newReplyObj = { ...found, content: updatedCommentText };
      updatedReplies.splice(foundIndex, 1, newReplyObj); // replace with new reply
      const updatedParentObj = { ...parentObj, replies: updatedReplies };
      newArr.splice(parentIndex, 1, updatedParentObj);
      return newArr;
    });
  }

  useEffect(() => {
    // first load
    (async function fetchAndSet() {
      const res = await fetch(
        'https://gist.githubusercontent.com/vietan0/0baa7ea3fb7303637001c6db28b10901/raw/b89325e6a39d1c82a8f888d32839623a600d8e51/commentData.json',
      );
      const obj = await res.json();
      setComments(obj.comments);
      setCurrentUser(obj.currentUser);
      localStorage.setItem('comments', JSON.stringify(obj.comments));
      localStorage.setItem('currentUser', JSON.stringify(obj.currentUser));
    }());
  }, []);

  useEffect(() => {
    // synchronize
    localStorage.setItem('comments', JSON.stringify(comments));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [comments, currentUser]);

  const passedVals = useMemo(() => ({
    comments,
    setComments,
    currentUser,
    setCurrentUser,
    findComment,
    addComment,
    deleteComment,
    updateComment,
  }));
  return <CommentsContext.Provider value={passedVals}>{children}</CommentsContext.Provider>;
}

CommentsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { CommentsContext };
export default CommentsProvider;
