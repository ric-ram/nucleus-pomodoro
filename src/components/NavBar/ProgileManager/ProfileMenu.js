

const ProfileMenu = ({ isLogged=false }) => {
    if(!isLogged) {
        return (
          <div className="profile-menu-logged-off">
              <button className="astext">Sign Up for Free</button>
              <button className="astext">Login</button>
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