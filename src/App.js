import React, { useState } from 'react';

const App = () => {

  const [count, setCountState] = useState(0);

  const incrementCount = () => {
    setCountState(count + 1)
  }

  return (
    <button onClick={incrementCount}>
      {count === 0 ? 'Click me, please' : `I was clicked ${count} times`}
    </button>
  )
}

export default App
