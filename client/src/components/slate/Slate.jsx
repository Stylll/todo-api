import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Main from '../Main';
import TopBar from '../common/TopBar';
import TodoList from './TodoList';
import { getTodo, deleteTodo } from '../../actions/todoActions';

/*eslint-disable react/prefer-stateless-function */
class Slate extends React.Component {
  constructor(props) {
    super(props);

    //bind methods
    this.deleteItem = this.deleteItem.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.actions.getTodo();
  }

  /**
   * calls the api to delete todo
   * @param {object} todo 
   */
  deleteItem(todo) {
    this.props.actions.deleteTodo(todo)
      .then(() => {
        this.props.actions.getTodo();
      });
  }

  /**
   * Handles delete click event from todo row
   * @param {*} event 
   * @param {object} todo 
   * Creates the confirm popup
   */
  handleDelete(event, todo) {
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
                    this.deleteItem(todo);
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
    const title = 'My Slate';
    const date = (new Date()).toString();
    return (
      <Main allowAuthenticated>
        <TopBar title={title} date={date} />
        {/*Content Starts Here*/}
        <div className="white">
          <br />
          <TodoList todos={this.props.todo.todos} handleDelete={this.handleDelete} />
        </div>
        {/*Content Ends Here*/}
        {/* FAB Start */}
        <div className="fixed-action-btn">
          <NavLink to="/edit" className="btn-floating btn-large waves-effect waves-light primary-bg-color">
            <i className="material-icons">add</i>
          </NavLink>
        </div>
        {/* FAB End */}
      </Main>
    );
  }
}

// prop types
Slate.propTypes = {
  todo: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

/**
 * maps a portion of the state to the props for this component
 * @param {*} state 
 */
const mapStateToProps = state => ({
  todo: state.todo
});

/**
 * maps a portion of the actions to the props for this component
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ getTodo, deleteTodo }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Slate);