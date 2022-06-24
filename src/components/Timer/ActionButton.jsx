

const ActionButton = ({ title, typeClass, actionClass, activeClass, _callback }) => {
  
  return (
    <button className={[typeClass, actionClass, activeClass].join(' ')} onClick={_callback}>{title}</button>
  )
}

export default ActionButton