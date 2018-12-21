import React, { useState } from 'react';

const App = () => {

  const [count, setCountState] = useState(0);

  const incrementCount = () => {
    setCountState(prevCount => prevCount + 1)
    // prevCount does the same than prevState in Class components
  }

  return (
    <button onClick={incrementCount}>
      {count === 0 ? 'Click me, please' : `I was clicked ${count} times`}
    </button>
  )
}

export default App
