import { createContext } from 'react';
import { element, object } from 'prop-types';

const ThreadContext = createContext();

function ThreadProvider({ children, value }) {
  return (
    <ThreadContext.Provider value={value}>{children}</ThreadContext.Provider>
  );
}

ThreadProvider.propTypes = {
  children: element.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  value: object.isRequired,
};

export { ThreadContext };
export default ThreadProvider;
