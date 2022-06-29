import Form from './Form';
import { Link } from "react-router-dom";
import { ReactComponent as RightIcon } from '../../icons/signForm/rightArrow.svg';

const Banner = (props) => {
    return (
        <div className='form-banner'>
            {props.title}
        </div>
    )
}

const Selector = (props) => {

    return (
        <div className='selector'>
            <Link to="/login" className={!props.isSignUp ? 'focused-btn' : ''} >Log In</Link>
            <Link to="/signup" className={props.isSignUp ? 'focused-btn' : ''}>Sign Up</Link>
        </div>
    )
}

const LogRegister = ({ isSignUp }) => {
    
    return (
        <>
            <div className='form-container'>
                <Banner title={isSignUp ? "Sign Up" : "Log In"} />
                <Selector isSignUp={isSignUp} />
                <form>
                    <div className='form-placeholder'>
                        <Form isSignUp={isSignUp}/>
                    </div>
                    <button type="submit" className='submit-form'>{isSignUp ? 'Sign Up' : 'Log In'} {<RightIcon />}</button>
                </form>
            </div>
        </>
    )
}

export default LogRegister