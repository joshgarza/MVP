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
            <div className="h-8 text-white">Logo</div>
          </div>
          <div>
            <button className="block text-gray-500 hover:text-white focus:text-white focus:outline-none" type="button" onClick={() => setIsOpen(!isOpen)}>
              <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? <path fill-rule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/> :
                <path fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>}
              </svg>
            </button>
          </div>
        </div>
        <div className={isOpen ? 'block px-2 pt-2 pb-4': "hidden"}>
          <Link className="block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800" to="dashboard" onClick={() => setIsOpen(!isOpen)}>Dashboard</Link>
          <Link className="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800" to="program" onClick={() => setIsOpen(!isOpen)}>Add Workouts</Link>
          <Link className="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800" to="profile" onClick={() => setIsOpen(!isOpen)}>Profile</Link>
          <button className="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800" onClick={handleLogout}>Log Out</button>
        </div>
      </header>
      <Outlet />
    </>
  )
}

export default CoachView;