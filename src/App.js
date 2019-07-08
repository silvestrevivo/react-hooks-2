import React, { useState, useEffect } from 'react';

const App = () => {

  const [count, setCountState] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null })

  useEffect(() => {
    // this function is executed after every render
    // could be equivalent to componentDidMount() + componentDidUpdate()
    document.title = `You have clicked ${count} times`
    //* this is the right place to register an Event Listener
    //* The issue is that we don't want to register this event everytime the
    //* component is updated (we have to avoid side effects)
    window.addEventListener('mousemove', mouseMoveHandler);

    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
    }
    //* On this way we avoid an infinite loop
  }, [count]);

  const incrementCount = () => {
    setCountState(prevCount => prevCount + 1)
    // prevCount does the same than prevState in Class components
  }

  const toggleLight = () => {
    setIsOn(prevIsOn => !prevIsOn);
    // prevIsOn prevents bad behaviour with asynchronous timing
  }

  const mouseMoveHandler = event => {
    setMousePosition({
      x: event.pageX,
      y: event.pageY
    })
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
      <h2>Mouse Position</h2>
      <p>X position: {mousePosition.x}</p>
      <p>Y position: {mousePosition.y}</p>
    </>
  )
}

export default App
