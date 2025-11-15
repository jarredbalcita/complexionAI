import React from 'react';
import './Card.css';

const Card = ({ children, className = '', padding = 'md', hover = false }) => {
  const classes = `card card-padding-${padding} ${hover ? 'card-hover' : ''} ${className}`;

  return <div className={classes}>{children}</div>;
};

export default Card;
