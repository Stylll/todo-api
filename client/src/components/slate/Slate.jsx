import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Main from '../Main';
import TopBar from '../common/TopBar';
import TodoList from './TodoList';
import { getTodo } from '../../actions/todoActions';

/*eslint-disable react/prefer-stateless-function */
class Slate extends React.Component {

  componentDidMount() {
    this.props.actions.getTodo();
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
          <TodoList todos={this.props.todo.todos} />
        </div>
        {/*Content Ends Here*/}
        {/* FAB Start */}
        <div className="fixed-action-btn">
          <a className="btn-floating btn-large waves-effect waves-light primary-bg-color">
            <i className="material-icons">add</i>
          </a>
        </div>
        {/* FAB End */}
      </Main>
    );
  }
}

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
    actions: bindActionCreators({ getTodo }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Slate);