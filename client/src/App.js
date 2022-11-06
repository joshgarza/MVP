import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    axios.get('/api')
      .then(result => {
        setBackendData(result.data)
      })

    return (
      console.log('fetched data')
    )
  }, [])

  return (
    <>
      <div>
        Hello world!
      </div>
    </>
  )
}

export default App;