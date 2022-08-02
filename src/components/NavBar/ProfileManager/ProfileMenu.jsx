import { SettingContext } from './../../../context/SettingsContext';
import { useContext } from 'react';

const ProfileMenu = ({ callSignUp, isAuthenticated, setOpen, user }) => {

    const { callLogin, logout } = useContext(SettingContext);


    const handleLogout = () => {
        setOpen(false);
        logout({ returnTo: window.location.origin });
    }

    if(!isAuthenticated) {
        return (
          <div className="profile-menu-logged-off">
              <a className="astext route-link" onClick={callSignUp} >Sign Up for Free</a>
              <a className="astext route-link" onClick={callLogin} >Login</a>
          </div>
        )
    } else {
        console.log(JSON.stringify(user, null, 2))
        return (
            <div className="profile-menu-logged-in" >
              <p className="ml-1 mt-1 mr-1">{user.email}</p>
              <div className="small-line"></div>
              <button className="astext ml-1">Reset Password</button>
              <button className="astext  ml-1">Delete Account</button>
              <div className="small-line"></div>
              <button onClick={handleLogout} className="astext ml-1">Logout</button>
            </div>
        )
    }
}

export default ProfileMenu