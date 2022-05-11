import React from 'react';

export default function Imgs(props) {
  return (
    <img className={'img' + (props.className ? ' ' + props.className : '')} src={props.src} />
  )
};
