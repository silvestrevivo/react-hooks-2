import React, { useState, useEffect } from 'react';

const App = () => {

  const [count, setCountState] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [status, setStatus] = useState(navigator.onLine);

  useEffect(() => {
    // this function is executed after every render
    // could be equivalent to componentDidMount() + componentDidUpdate()
    document.title = `You have clicked ${count} times`
    //* this is the right place to register an Event Listener
    //* The issue is that we don't want to register this event everytime the
    //* component is updated (we have to avoid side effects)
    window.addEventListener('mousemove', mouseMoveHandler);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
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

  const handleOnline = () => {
    setStatus(true);
  }

  const handleOffline = () => {
    setStatus(false);
  }

  return (
    <>
      <h2>Counter</h2>
      <button onClick={incrementCount}>
        {count === 0 ? 'Click me, please' : `I was clicked ${count} times`}
      </button>
      <br/>
      <h2>Toggle light</h2>
      <img
        src={isOn ? 'https://icon.now.sh/highlight/fd0' : 'https://icon.now.sh/highlight/aaa'}
        alt="Flashlight"
        style={{ height: '100px', width: '100px' }} onClick={toggleLight} />
      <br/>
      <h2>Mouse Position</h2>
      <p>X position: {mousePosition.x}</p>
      <p>Y position: {mousePosition.y}</p>
      <br/>
      <h2>Network Status</h2>
      <p>You are <strong>{status ? 'online' : 'offline'}</strong></p>
    </>
  )
}

export default App
