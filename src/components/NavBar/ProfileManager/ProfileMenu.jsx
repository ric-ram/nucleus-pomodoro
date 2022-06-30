import { Link, useNavigate } from 'react-router-dom';

import { SettingContext } from './../../../context/SettingsContext';
import { useContext } from 'react';

const ProfileMenu = ({ isLoggedIn, setOpen }) => {

    const { setIsLoggedIn } = useContext(SettingContext);
    
    let navigate = useNavigate();

    const handleLogout = () => {
        setOpen(false);
        setIsLoggedIn(false);
        navigate("/");
    }

    if(!isLoggedIn) {
        return (
          <div className="profile-menu-logged-off">
              <Link className="astext route-link" to="/signup" >Sign Up for Free</Link>
              <Link className="astext route-link" to="/login" >Login</Link>
          </div>
        )
    } else {
        return (
            <div className="profile-menu-logged-in" >
              <p className="ml-1 mt-1">your@email.com</p>
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