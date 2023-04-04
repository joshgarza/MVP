import { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { AiOutlineHome, AiOutlineCalendar, AiOutlineLineChart, AiOutlineProfile } from 'react-icons/ai';
import { BsChatDots } from "react-icons/bs";

const ClientNavBar = ({ userInfo, getUserData, clearUserInfo, getUserWorkouts }) => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState('');
  const [selected, setSelected] = useState('dashboard')
  const [navOptions, setNavOptions] = useState([
    {name: 'dashboard', touched: false},
    {name: 'calendar', touched: false},
    {name: 'progress', touched: false},
    {name: 'chat', touched: false},
    {name: 'profile', touched: false}
  ]);

  useEffect(() => {
    if (userInfo?.id) {
      getUserWorkouts();
    }
  }, [])

  const iconStyle = 'w-full p-4 text-4xl flex items-center justify-center rounded-3xl';

  const mapNavOptions = () => {
    return navOptions.map((navOption, i) => {
      const { name, touched } = navOption
      return (
        <Link className={`${iconStyle} ${touched ? 'bg-gray-400' : 'bg-white'} ${name === selected ? 'bg-gray-400' : 'bg-white'}`} to={name} onContextMenu={(e) => handleContextMenu(e)} onTouchStart={(e) => {
              handleTouchStart(e, i)
            }} onTouchEnd={(e) => {
              handleTouchEnd(e, i, name)
            }}>
            {renderIcon(name)}
        </Link>
      )
    })
  }

  const renderIcon = (name) => {
    // eslint-disable-next-line default-case
    switch (name) {
      case 'dashboard':
        return <AiOutlineHome/>
      case 'calendar':
        return <AiOutlineCalendar/>
      case 'progress':
        return <AiOutlineLineChart/>
      case 'chat':
        return <BsChatDots/>
      case 'profile':
        return <AiOutlineProfile/>
    }
  }

  const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  const handleTouchStart = (e, idx) => {
    e.preventDefault();
    e.stopPropagation();
    e.cancelBubble = true;
    e.returnValue = false;
    console.log(idx)
    const copyNavOptions = [...navOptions];
    navOptions[idx].touched = true;

    setNavOptions(copyNavOptions);
  }

  const handleTouchEnd = (e, idx, name) => {
    const copyNavOptions = [...navOptions];
    navOptions[idx].touched = false;

    setNavOptions(copyNavOptions);
    setSelected(name)
  }

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

  return (
    <div className="w-full h-full ">
      <section className="block fixed inset-x-0 bottom-0 bg-white shadow border">
        <ul className="flex items-center justify-center">
          {mapNavOptions()}
        </ul>
      </section>
      <Outlet />
    </div>
  )
}

export default ClientNavBar;