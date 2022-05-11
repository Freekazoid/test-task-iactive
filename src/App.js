import './reset.css';
import './index.css';

import React, { useState, useEffect } from 'react';

import Messanger from './view/messanger'
import Button from './components/buttons'

function App() {

  const [reverseList, setReverseList] = useState(false);

  const handleClickReList = () => {
    setReverseList(!reverseList)
  }

  return (
    <div className="App">
      <Messanger reverse={reverseList} />
      <Button className="reverse list" onClick={handleClickReList}>reverse list</Button>
    </div>
  );
}

export default App;
