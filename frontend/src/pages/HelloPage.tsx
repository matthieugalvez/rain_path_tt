import { useEffect, useState } from 'react';
import { getHello } from '../services/api';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    getHello().then((data) => {
      setMessage(data.message);
    });
  }, []);

  return <h1>{message}</h1>;
}

export default App;
