import AddAComment from './components/AddAComment';
import CommentList from './components/CommentList';

function App() {
  return (
    <main className="App">
      <h1 className="sr-only">
        Interactive comments section - Frontend Mentor Challenge - Solution by Viet An
      </h1>
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
    </main>
  );
}

export default App;
