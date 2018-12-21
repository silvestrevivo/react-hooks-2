import React, { useState } from 'react';

const App = () => {

  const [count, setCountState] = useState(0);
  const [isOn, setIsOn] = useState(false);

  const incrementCount = () => {
    setCountState(prevCount => prevCount + 1)
    // prevCount does the same than prevState in Class components
  }

  const toggleLight = () => {
    setIsOn(prevIsOn => !prevIsOn);
    // prevIsOn prevents bad behaviour with asynchronous timing
  }

  return (
    <>
      <h2>Counter</h2>
      <button onClick={incrementCount}>
        {count === 0 ? 'Click me, please' : `I was clicked ${count} times`}
      </button>
      <h2>Toggle light</h2>
      <img
        src={isOn ? 'https://icon.now.sh/highlight/fd0' : 'https://icon.now.sh/highlight/aaa'}
        alt="Flashlight"
        style={{ height: '100px', width: '100px' }} onClick={toggleLight} />
    </>
  )
}

export default App
