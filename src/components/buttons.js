import React from 'react';

export default function Button({ onClick, children, className }) {
  const randomId = () => {
    let result = '';
    let words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    let max_position = words.length - 1;
    for (let i = 0; i < 8; ++i) {
      let position = Math.floor(Math.random() * max_position);
      result = result + words.substring(position, position + 1);
    }

    return result;
  }
  return (
    <button type="button" id={randomId()} className={(className || "")} onClick={onClick}>
      {children}
    </button>
  )
};