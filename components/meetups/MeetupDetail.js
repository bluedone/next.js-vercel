import React, { Fragment } from 'react';
import classes from './MeetupDetail.module.css';
const MeetupDetail = ({ image, title, address, description }) => {
  return (
    <section className={classes.detail}>
      <img src={image} alt={title}></img>
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{description}</p>
    </section>
  );
};

export default MeetupDetail;
