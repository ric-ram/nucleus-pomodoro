import { useEffect, useRef } from 'react';

import { useState } from 'react';

const Banner = (props) => {
    return (
        <div className='form-banner'>
            {props.title}
        </div>
    )
}

const Selector = (props) => {

    const handleOnClickLogIn = () => {
        props.setIsSignUp(false);
    }

    const handleOnClickSignUp = () => {
        props.setIsSignUp(true);
    }

    return (
        <div className='selector'>
            <button onClick={handleOnClickLogIn} className={!props.isSignUp ? 'focused-btn' : ''} >Log In</button>
            <button onClick={handleOnClickSignUp} className={props.isSignUp ? 'focused-btn' : ''}>Sign Up</button>
        </div>
    )
}

const LogRegister = () => {

   const [isSignUp, setIsSignUp] = useState(true); 
    
  return (
    <>
        <div className='form-container'>
            <Banner title="Sign Up" />
            <Selector isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
            <div className='form-placeholder'>
            </div>
        </div>
    </>
  )
}

export default LogRegister