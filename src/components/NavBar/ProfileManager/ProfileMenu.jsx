import ProfilePopUp from './ProfilePopUp';
import { SettingContext } from './../../../context/SettingsContext';
import { useContext } from 'react';
import { useState } from 'react';

const ProfileMenu = ({ callSignUp, isAuthenticated, setOpen, user }) => {

    const { callLogin, logout } = useContext(SettingContext);
    const [openPopUp, setOpenPopUp] =  useState(false);
    const [toDelete, setToDelete] = useState(false);

    const handleResetPassword = () => {
        setToDelete(false);
        setOpenPopUp(true);
    }

    const handleDeleteAccount = () => {
        setToDelete(true);
        setOpenPopUp(true);
    }

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
        return (
            <div className="profile-menu-logged-in" >
              <p className="ml-1 mt-1 mr-1">{user.email}</p>
              <div className="small-line"></div>
              <button className="astext ml-1" onClick={handleResetPassword} >Reset Password</button>
              <button className="astext  ml-1" onClick={handleDeleteAccount} >Delete Account</button>
              <div className="small-line"></div>
              <button onClick={handleLogout} className="astext ml-1">Logout</button>
              <ProfilePopUp toDelete={toDelete} open={openPopUp} setOpen={setOpenPopUp} />
            </div>
        )
    }
}

export default ProfileMenu