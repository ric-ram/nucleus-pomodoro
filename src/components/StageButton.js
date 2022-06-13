
const StageButton = ({ title, activeClass, _callback }) => {
  return (
    <button className={["stage-btn", activeClass].join(' ')} onClick={_callback}>{title}</button>
  )
}

export default StageButton