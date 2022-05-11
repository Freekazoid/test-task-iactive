import React from 'react';
import Imgs from './imgs';

export default function AuthorAvatar(props) {
  return (
    <div className="author-time">
      <Imgs src={props.img} />
      <div className="time">{props.time}</div>
    </div>
  )
};