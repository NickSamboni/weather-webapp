import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

//arrays of button props that we'll need to change depending on the 
const STYLES = ['btn--primary', 'btn--outline', 'btn--test'];
const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({ children, type, onClick, buttonStyle, buttonSize }) => {

  const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]; //saves the button style props 
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]; //saves the button size props

  //this will render the button and assign a children, this makes possible to use this button constructor for every button in the page
  return (
    <Link to='/Signup' className='btn-mobile'>
      <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}> {children} </button>
    </Link>
  );
};
