import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [profileImage, setProfileImage] = useState('https://i.pravatar.cc/300'); // Placeholder profile image
  const navigate = useNavigate();

  // Simulate login check from localStorage when component mounts
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus) {
      setIsLoggedIn(true); // Set the login state from localStorage
    }
  }, []);

  // Simulate login function
  function handleLogin() {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Store login status
  }

  // Simulate logout function
  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Remove login status
    localStorage.clear();
    navigate('/'); // Navigate to home after logout (optional)
  }

  return (
    <>
      <nav className="footer bg-neutral text-neutral-content items-center p-4">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between">
          <nav>
            <ul className="flex items-center justify-between font-bold text-sm text-white uppercase no-underline">
              <li>
                <Link to="/" className="hover:text-gray-200 hover:underline px-4 cursor-pointer">
                  <span className="text-accent">Home</span>
                </Link>
              </li>
              <li>
                <Link to="/home/about" className="hover:text-gray-200 hover:underline px-4 cursor-pointer">
                  <span className="text-accent">About</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right-side buttons */}
          {/* <div className="flex items-center text-lg no-underline text-white pr-6">
            {!isLoggedIn ? (
              <button className="btn btn-outline btn-accent mx-2" onClick={handleLogin}>
                Login
              </button>
            ) : (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={profileImage} alt="Profile" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/" className="justify-between">Profile</Link>
                  </li>
                  <li>
                    <Link to="/" onClick={handleLogout}>Logout</Link>
                  </li>
                </ul>
              </div>
            )}
          </div> */}
        </div>
      </nav>
    </>
  );
}
