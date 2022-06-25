import { ReactComponent as EmailIcon } from '../../icons/signForm/emailIcon.svg';
import FormInput from './FormInput';
import { ReactComponent as PasswordIcon } from '../../icons/signForm/lockIcon.svg';
import { ReactComponent as UserIcon } from '../../icons/signForm/userIcon.svg';

function SignUpForm() {
  return (
        <>
          <FormInput icon={<EmailIcon />} placeholder='Email' />
          <FormInput icon={<UserIcon />} placeholder='Username' />
          <FormInput icon={<PasswordIcon />} placeholder='Password' />
          <p>By signing up, you agree to our terms of service and privacy policy</p>
        </>
  )
}

function LogInForm() {
  return (
    <>
      <FormInput icon={<UserIcon />} placeholder='Username' />
      <FormInput icon={<PasswordIcon />} placeholder='Password' />
      <a href='#' >Forgot your password?</a>
    </>
  )
}

const Form = ({ isSignUp }) => {
  return (
    <div className='form'>
        { isSignUp ? <SignUpForm /> : <LogInForm />}
    </div>
  )
}

export default Form