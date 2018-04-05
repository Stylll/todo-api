import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';


const ItemListRow = ({handleComplete, item, handleDelete}) => {

  return (
    <li className="collection-item">
      <div className="row">
        <div className="col s2 m2 l2 xl2">
          <div className="switch left">
            <label>
              <input type="checkbox" onChange={e => handleComplete(e, item)} checked={(item.complete ? true : false)} />
              <span className="lever"></span>
            </label>
          </div>
        </div>
        <div className="col s6 m6 l6 xl6">
          <h5 className={`item-text ${item.complete ? 'line-through' : ''}`}>{item.content}</h5>
        </div>
        <div className="col s2 m2 l2 xl2">
          <NavLink to={`/item/${item.todoId}/edit/${item.id}`} className="secondary-content center">
            <i className="material-icons primary-text-color">edit</i>
          </NavLink>
        </div>
        <div className="col s2 m2 l2 xl2">
          <a href="#!" name="deletelink" onClick={e => handleDelete(e, item)} className="secondary-content"><i className="material-icons red-text">delete</i></a>
        </div>
      </div>
    </li>
  );
};

// prop types
ItemListRow.propTypes = {
  handleComplete: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

export default ItemListRow;