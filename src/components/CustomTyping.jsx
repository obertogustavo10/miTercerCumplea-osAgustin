import React from "react";
import { Typewriter } from "react-simple-typewriter";

const TypingEffect = () => {
  const typingStyle = {
    fontFamily: "Arial, sans-serif",
    fontSize: "1.5rem",
    color: "gray",
    fontWeight: "bold",
  };

  return (
<div style={{
    position: "absolute",
    top: '30px',
    padding: '20px',
    left: '5px',
    width: '95vw', 
    maxWidth: '400px', 
    height: 'auto',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
}}>
  <h1 style={typingStyle}>
    <Typewriter
      words={[
        "Te invito a mi DINO FIESTA",
        "Para celebrar y jugar juntos.",
      ]}
      loop={2}
      cursor
      cursorStyle="_"
      typeSpeed={50}
      deleteSpeed={30}
      delaySpeed={2000}
    />
  </h1>
</div>


  );
};

export default TypingEffect;
