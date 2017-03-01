import React from 'react';

const Card = ({ name, direction , time1, time2, time3 , img}) => (
  <div className="card mb-5">
    <img
      className="card-img-top img-fluid"
      src={img}
      alt="Card cap"
    />
    <div className="card-block">
      <h4 className="card-title">{name}</h4>
      <p>direction : {direction}</p>

    </div>
    <ul className="list-group list-group-flush">
      <li className="list-group-item">prochain metro dans : &nbsp; <strong>{time1}</strong></li>
      <li className="list-group-item">suivant dans  :  &nbsp;<strong>{time2}</strong></li>
      <li className="list-group-item">suivant dans  : &nbsp; <strong>{time3}</strong></li>
    </ul>
  </div>
);

export default Card;
