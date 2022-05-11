import React from 'react';

export default function AuthorName(props) {
  return (
    <div className="author-comments">
      <h3>{props.name}</h3>
      <p>{props.comment}</p>
    </div>
  )
};
