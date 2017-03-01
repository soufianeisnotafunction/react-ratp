import React from 'react';

const greetings = () => alert('Hi !');

const Header = () => (
  <div className="jumbotron jumbotron-fluid" onClick={greetings}>
    <div className="container">
      <h1 className="display-3">RATP</h1>
      <p className="lead">
        les horaires mieux que chez la ratp
      </p>
    </div>
  </div>
);

export default Header;
