import React from 'react';
import Typewriter from 'typewriter-effect';

export default function TypewriterComponent() {
  return (
    <div className='Typewriter'>
      <Typewriter 
        onInit={(typewriter) => {
          typewriter
            .typeString('Front-end Developer')
            .pauseFor(1000)
            .deleteAll()
            .typeString('Full Stack Developer')
            .pauseFor(1000)
            .deleteAll()
            .typeString('Programmer')
            .pauseFor(1000)
            .start();
        }}
        options={{
          loop: true,
          delay: 30,       // Global typing speed (ms per character)
        }}
      />
    </div>
  );
};


