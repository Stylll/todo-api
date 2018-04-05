import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Main from '../Main';
import TopBar from '../common/TopBar';
import { getTodoItems, deleteTodoItem, saveTodoItem } from '../../actions/todoItemActions';
import { getTodoById } from '../../actions/todoActions';
import ItemList from './ItemList';

/*eslint-disable react/prefer-stateless-function */
class SlateItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todo: {
        title: '',
        date: ''
      }
    };

    // bind methods
    this.handleComplete = this.handleComplete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    // get the todo id from the url
    const todoId = this.props.match.params.todoId;
    // get todo items related to that id
    this.props.actions.getTodoItems({ todoId });
    // get the exact todo object using the todo id
    this.props.actions.getTodoById({ id: todoId });
  }

  /**
   * handles the complete status of an item
   * @param {*} event 
   * @param {object} item 
   * Updates the item complete state
   * Calls the saveTodoItem action
   * Reloads the todoItems in the state
   */
  handleComplete(event, item) {
    event.preventDefault();
    item.complete = (item.complete) ? 'false' : 'true';
    this.props.actions.saveTodoItem(item)
      .then(() => {
        this.props.actions.getTodoItems({todoId: item.todoId});
      });
  }

  /**
   * calls the api to delete item
   * @param {object} item 
   */
  deleteItem(item) {
    this.props.actions.deleteTodoItem(item)
      .then(() => {
        this.props.actions.getTodoItems({ todoId: item.todoId });
      });
  }

  /**
   * Handles delete click event from item row
   * @param {*} event 
   * @param {object} item 
   * Creates the confirm popup
   */
  handleDelete(event, item) {
    event.preventDefault();
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Are you sure?</h1>
            <p>You want to delete this record?</p>
            <div className="row">
              <div className="col s6 m6 l6">
                <button className="btn green" onClick={onClose}>No</button>
              </div>
              <div className="col s6 m6 l6">
                <button
                  className="btn red" onClick={() => {
                    this.deleteItem(item);
                    onClose();
                  }}>Yes, Delete it!
                </button>
              </div>
            </div>
          </div>
        );
      }
    });
  }

  render() {
    return (
      <Main allowAuthenticated>
        <TopBar title={this.props.singleTodo.title} date={this.props.singleTodo.createdAt} />
        {/*Content Starts Here*/}
        <div className="white">
          <br />
          <ItemList items={this.props.todoItems} handleComplete={this.handleComplete} handleDelete={this.handleDelete} />
        </div>
        {/*Content Ends Here*/}
        {/* FAB Start */}
        <div className="fixed-action-btn">
          <NavLink to={`/item/${this.props.singleTodo.id}/edit`} className="btn-floating btn-large waves-effect waves-light primary-bg-color">
            <i className="material-icons">add</i>
          </NavLink>
        </div>
        {/* FAB End */}
      </Main>
    );
  }
}

// prop types
SlateItem.propTypes = {
  todoItems: PropTypes.array.isRequired,
  singleTodo: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

/**
 * maps a portion of the state to the props for this component
 * @param {*} state 
 */
const mapStateToProps = state => {
  return {
    todoItems: state.todoItems,
    singleTodo: state.todo.singleTodo
  };
};

/**
 * maps a portion of the actions to the props for this component
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ getTodoItems, getTodoById, deleteTodoItem, saveTodoItem }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SlateItem);