import React, { useState, useEffect } from 'react';

//* Cleaning up listeners without Supportive API
const initialLocationState = {
  latitude: null,
  longitude: null,
  speed: null
}

const App = () => {
  const [count, setCountState] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [status, setStatus] = useState(navigator.onLine);

  //* Cleaning up listeners without Supportive API
  const [location, setLocation] = useState(initialLocationState);
  let mounted = true;


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

    //* Cleaning up listeners without Supportive API
    // * this API doesn't provide a solution for unMounting
    navigator.geolocation.getCurrentPosition(handleGeolocation);
    const watchId = navigator.geolocation.watchPosition(handleGeolocation);

    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);

      //* Cleaning up listeners without Supportive API
      navigator.geolocation.clearWatch(watchId);
      mounted = false;

    }
    //* On this way we avoid an infinite loop
    //* If we dont want to listent to more events, we need to set an empty array
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

  const handleGeolocation = event => {
    if(mounted){
      setLocation({
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed
      })
    }
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
      <br/>
      <h2>Geolocation</h2>
      <p>Latitude is {location.latitude}</p>
      <p>Longitude is {location.longitude}</p>
      <p>Speed is {location.speed ? location.speed : '0'}</p>
    </>
  )
}

export default App
