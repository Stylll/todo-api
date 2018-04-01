import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {beautifyDate} from '../../utils/utils';

const TodoListRow = ({todo}) => {
  return (
    <li className="collection-item">
      <div className="row">
        <div className="col s8 m8 l8 xl8">
          <NavLink to={`/item/${todo.id}`} className="black-text">
            <h5>{todo.title}</h5>
          </NavLink>
          <small>{beautifyDate(todo.createdAt)}</small>
        </div>
        <div className="col s2 m2 l2 xl2">
          <NavLink to={`/edit/${todo.id}`} className="secondary-content center primary-text-color" >
            <i className="material-icons">edit</i>
          </NavLink>
        </div>
        <div className="col s2 m2 l2 xl2">
          <a href="#modal1" className="secondary-content red-text"><i className="material-icons">delete</i></a>
        </div>
      </div>
    </li>
  );
};

TodoListRow.propTypes = {
  todo: PropTypes.object.isRequired
};

export default TodoListRow;