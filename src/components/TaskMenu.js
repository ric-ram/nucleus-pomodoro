

const TaskMenu = () => {
  return (
    <div className="task-menu">
        <h1>Project Manager</h1>
        <div className="line"></div>
        <form>
            <input type="text" id="taskname" placeholder="New task" />
        </form>
        <p>Hint: <a href="#" target="_blank" >Sign Up for FREE</a> to save tasks after refresh</p>
        <div className=""></div>
        <span role="button" className="select-proj">
            Change Project
            <span role="img" className="down-icon"></span>
        </span>
    </div>
)
}

export default TaskMenu