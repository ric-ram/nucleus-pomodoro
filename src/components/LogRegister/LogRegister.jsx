import { Link, useNavigate } from "react-router-dom";

import Form from './Form';
import { ReactComponent as RightIcon } from '../../icons/signForm/rightArrow.svg';
import { SettingContext } from './../../context/SettingsContext';
import { useContext } from 'react';

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

    const { setIsLoggedIn, onLogin } = useContext(SettingContext);

    let navigate = useNavigate();

    const handleOnSubmit = () => {
        setIsLoggedIn(true);
        onLogin();
        navigate("/");
    }
    
    return (
        <>
            <div className='form-container'>
                <Banner title={isSignUp ? "Sign Up" : "Log In"} />
                <Selector isSignUp={isSignUp} />
                <form onSubmit={handleOnSubmit}>
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