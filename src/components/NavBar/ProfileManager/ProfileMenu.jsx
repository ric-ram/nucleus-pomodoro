import { Link } from 'react-router-dom';

const ProfileMenu = ({ isLogged=false }) => {
    if(!isLogged) {
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
              <button className="astext ml-1">Logout</button>
            </div>
        )
    }
}

export default ProfileMenu