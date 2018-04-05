import React from 'react';
import PropTypes from 'prop-types';
import ItemListRow from './ItemListRow';

const ItemList = ({handleComplete, items, handleDelete}) => {
  return(
    <div className="container">
      <ul className="collection">
        {items.map(item => <ItemListRow key={item.id} handleComplete={handleComplete} item={item} handleDelete={handleDelete} />)}
      </ul>
    </div>
  );
};

// prop types
ItemList.propTypes = {
  handleComplete: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired
};

export default ItemList;