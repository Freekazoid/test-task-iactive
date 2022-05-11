import React from 'react';

export default function HashLinck(props) {
  return (
    <div className="hash-tags">
      {
        Object.entries(props.data).map(([key, value]) => (
          <a className={value.active ? 'active' : ''} key={key} href={value.href}>{value.text}</a>
        ))
      }
    </div>
  )
};