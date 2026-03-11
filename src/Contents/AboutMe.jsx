import React, { useState } from 'react';
import Typewriter from '../components/Typewriter';
import myphoto from '../assests/myphoto2.jpg';

export default function Aboutme() {
    return (
        <div className='about_me_container'>
            <div className='about_box1'>
                <div>
                    <img src={myphoto} alt="My Photo" 
                        style={{ 
                            height: '300px', 
                            objectFit:'cover' ,
                            imageRendering:'auto',
                            justifyItems: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            border: '1px solid rgb(160, 0, 0)',
                            borderRadius: '5px',
                            boxShadow: '0 0 20px 8px rgb(80, 0, 0)', // Adds a glow effect
                        }} 
                    />
                </div>
                <div className='about_box2'>
                    <div style={{fontSize:'3rem', color:'rgb(255, 0, 0)', textShadow: '0 0 10px rgb(148, 32, 32)'}}>
                        Hello, I'm Ron Vanz
                    </div>
                    <hr style={{border: '1px solid rgb(255, 100, 100)', margin:'0px 0px 10px 0px',width:"100%" }}></hr> 
                    <div> 
                        <Typewriter />
                    </div>
                    <div style={{marginTop:'2rem'}}>
                        My goal is to build high-performance applications where functional 
                        logic meets elegant, intuitive design.
                    </div>
                </div>
            </div>
        </div>
    );
}