import React, { useState } from 'react';


export default function Imgs({ children }) {
  let [lengthText, setLengthText] = useState(false);

  const lengthString = (text) => {
    var sliced = lengthText ? text.length : text.slice(0, 248);
    if (sliced.length < text.length) {
      return sliced;
    }
    return false;
  }

  return (
    <div className="text-msg">
      <p>
        {lengthString(children) ? (lengthString(children)) : children}
      </p>
      {lengthString(children) ? <div className="more" onClick={setLengthText}>Далее</div> : null}
    </div>
  )
};
