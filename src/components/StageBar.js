import StageButton from './StageButton';

const StageBar = () => {
  return (
    <ul className="stage-placeholder">
        <li>
            <StageButton 
            title='Work'
            activeClass='active-stage-btn' />
        </li>
        <li>
            <StageButton title='Short Break'/>
        </li>
        <li>
            <StageButton title='Long Break'/>
        </li>
    </ul>
  )
}

export default StageBar