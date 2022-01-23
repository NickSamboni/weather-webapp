import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false); //set the click to false by default
  const [button, setButton] = useState(true);

  const ClickAction = () => setClick(!click); //change the state on the click with a function
  const MenuOff = () => setClick(false);

  // logic that controls the button appearence when the dimensions of the screen changes
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  // react hook that prevents the button to reset every time we reload the page
  useEffect(() => {
    showButton();
  }, []);

  // triggers/init the showButton function 
  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/Home' className='navbar-logo' onClick={MenuOff}><img src='images/Logo24-01.png' alt='logo' width='50px'/> UStations </Link>
          <div className='menu-icon' onClick={ClickAction}> 
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}> 
            <li className='nav-item'> <Link to='/Home' className='nav-links' onClick={MenuOff}> Home </Link> </li>
            <li className='nav-item'> <Link to='/Maps' className='nav-links' onClick={MenuOff}> Maps </Link></li>
            <li className='nav-item'> <Link to='/Login' className='nav-links' onClick={MenuOff}> Login </Link> </li>
            <li>                      <Link to='/Signup' className='nav-links-mobile' onClick={MenuOff}> Sign Up </Link> </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;