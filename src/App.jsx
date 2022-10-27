import AddAComment from './components/AddAComment';
import CommentList from './components/CommentList';

function App() {
  return (
    <div className="App">
      <CommentList />
      <AddAComment />
      <div className="attribution">
        Challenge by
        {' '}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by
        {' '}
        <a
          href="https://github.com/vietan0"
          target="_blank"
          rel="noreferrer"
        >
          Việt An
        </a>
      </div>
    </div>
  );
}

export default App;
