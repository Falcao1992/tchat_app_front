import React, {useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

function App() {
  useEffect(() => {
    const fetchonversations = await axios.get('http://localhost/')
  },[])
  return (
    <div className="App">
    
    </div>
  );
}

export default App;
