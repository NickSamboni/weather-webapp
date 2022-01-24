import React from 'react';
import { Button } from './Button';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <div className='hero-container' style={{ backgroundImage: "url(/images/img2.jpg)"}}>
     
      <h1>WELCOME</h1>
      <p>Enjoy our maps</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          JOIN US!
        </Button>
        
      </div>
    </div>
  );
}
