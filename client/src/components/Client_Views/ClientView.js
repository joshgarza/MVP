import { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const ClientView = ({ userInfo, getUserData, clearUserInfo, getUserWorkouts }) => {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo?.id) {
      getUserWorkouts();
    }
  }, [])

  const handleLogout = async () => {
    setError('');
    try {
      await logout();
      navigate('/login');
      clearUserInfo();
    } catch (err) {
      setError(err);
    }
  };
  if (!currentUser) {
    return (
      navigate('/login')
    )
  }
  // TODO: logo should be clickable and redirect to dashboard
  return (
    <>
      <header className="bg-gray-900">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <img className="h-12" src="https://i.postimg.cc/t7G1VFrh/purple-with-black.png"/>
          </div>
          <div>
            <button className="block text-gray-500 hover:text-white focus:text-white focus:outline-none" type="button" onClick={() => setIsOpen(!isOpen)}>
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? <path fillRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/> :
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>}
              </svg>
            </button>
          </div>
        </div>
        <div className={isOpen ? 'block px-2 pt-2 pb-4': "hidden"}>
          <Link className="block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800" to="dashboard" onClick={() => setIsOpen(!isOpen)}>Dashboard</Link>
          <Link className="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800" to="workouts" onClick={() => setIsOpen(!isOpen)}>Workouts</Link>
          <Link className="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800" to="profile" onClick={() => setIsOpen(!isOpen)}>Profile</Link>
          <div className="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800 hover:cursor-pointer" onClick={handleLogout}>Log Out</div>
        </div>
      </header>
      <Outlet />
    </>
  )
}

export default ClientView;