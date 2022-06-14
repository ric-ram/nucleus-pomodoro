import NavigationBar from './components/NavigationBar';
import TaskTextButton from './components/TaskTextButton';

function App() {
  return (
    <>
      <NavigationBar />
      <div className='center'>
        <TaskTextButton />
      </div>
    </>
  );
}

export default App;
