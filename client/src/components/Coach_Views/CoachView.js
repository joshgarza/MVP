import { useState } from 'react';
import { Link , useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const CoachView = ({ getUserData, clearUserInfo }) => {
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <>
      <header className="bg-gray-900">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
          <img className="h-12" src="https://i.postimg.cc/t7G1VFrh/purple-with-black.png"/>
          </div>
          <div>
            <button className="block text-gray-500 hover:text-white focus:text-white focus:outline-none z-30 top-6 right-3 absolute" type="button" onClick={() => setIsOpen(!isOpen)}>
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? <path fillRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/> :
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>}
              </svg>
            </button>
          </div>
        </div>
        <div className={isOpen ? 'animate-slide-in-right h-full w-[18rem] flex flex-col flex-grow absolute top-0 right-0 bg-black  px-6 pt-2 pb-4 z-10': "animate-slide-out-right h-full w-[18rem] flex flex-col flex-grow absolute top-0 right-0 bg-black  px-6 pt-2 pb-4 z-10"}>
          <div className="h-20"></div>
          <Link className="block px-2 py-1 text-white text-3xl font-semibold rounded hover:bg-gray-800" to="dashboard" onClick={() => setIsOpen(!isOpen)}>Dashboard</Link>
          <Link className="mt-1 block px-2 py-1 text-white text-3xl font-semibold rounded hover:bg-gray-800" to="program" onClick={() => setIsOpen(!isOpen)}>Add Workouts</Link>
          <Link className="mt-1 block px-2 py-1 text-white text-3xl font-semibold rounded hover:bg-gray-800" to="profile" onClick={() => setIsOpen(!isOpen)}>Profile</Link>
          <div className="mt-1 block px-2 py-1 text-white text-3xl font-semibold rounded hover:bg-gray-800 hover:cursor-pointer" onClick={handleLogout}>Log Out</div>
        </div>
      </header>
      <Outlet />
    </>
  )
}

export default CoachView;