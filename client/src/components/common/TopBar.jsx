import React from 'react';
import PropTypes from 'prop-types';
import {beautifyDate} from '../../utils/utils';

const TopBar = ({title, date}) => {

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m12 l12 xl12">
          <h1 className="white-text">{title}</h1>
          <span className="white-text left">{beautifyDate(date)}</span>
        </div>
      </div>
      <br />
    </div>
  );
};

//prop types
TopBar.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};

export default TopBar;