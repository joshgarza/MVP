import { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { AiOutlineHome, AiOutlineCalendar, AiOutlineLineChart, AiOutlineProfile } from 'react-icons/ai';
import { BsChatDots } from "react-icons/bs";

const ClientView = ({ userInfo, getUserData, clearUserInfo, getUserWorkouts }) => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState('');
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

  const iconStyle = 'h-full w-full p-4 text-4xl flex items-center justify-center';

  const mapNavOptions = () => {
    return navOptions.map((navOption, i) => {
      return (
        <Link className={`${iconStyle} ${navOptions[i].touched ? 'bg-gray-400' : 'bg-white'}`} to={navOptions[i].name} onTouchStart={(e) => {
              handleTouchStart(e, i)
            }} onTouchEnd={(e) => {
              handleTouchEnd(e, i)
            }}>
            {renderIcon(navOption.name)}
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

  const handleTouchStart = (e, idx) => {
    console.log(idx)
    const copyNavOptions = [...navOptions];
    navOptions[idx].touched = true;

    setNavOptions(copyNavOptions);
  }

  const handleTouchEnd = (e, idx) => {
    const copyNavOptions = [...navOptions];
    navOptions[idx].touched = false;

    setNavOptions(copyNavOptions);
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
    <div className="w-full h-screen">
      <section className="block fixed inset-x-0 bottom-0 bg-white shadow border">
        <ul className="flex items-center justify-center">
          {mapNavOptions()}
        </ul>
      </section>
      <Outlet />
    </div>
  )
}

export default ClientView;