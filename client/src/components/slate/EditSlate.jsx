import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Main from '../Main';
import TopBar from '../common/TopBar';
import { saveTodo } from '../../actions/todoActions';
import TextInput from '../common/TextInput';
import { validateTodoInput } from '../../utils/validateInput';

/*eslint-disable react/prefer-stateless-function */
class EditSlate extends React.Component {
  constructor(props) {
    super(props);

    //default state
    this.state = {
      id: undefined,
      title: '',
      errors: {}
    };

    //bind methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateSubmit = this.validateSubmit.bind(this);
    this.setUp = this.setUp.bind(this);
  }

  componentDidMount(){
    /**
     * This is used because when the page is navigated to, 
     * componentWillReceiveProps is not called,
     * the state has already been loaded with data
     */
    this.setUp(this.props.todos);
  }

  componentWillReceiveProps(nextProps) {
    /**
     * This is used because when the page is refreshed,
     * state is loaded again therefore when componentDidMount is called,
     * state is still getting data,
     * componentWillReceiveProps is called when state has gotten data
     * to handle the updated state
     */
    this.setUp(nextProps.todos);
  }

  /**
   * Configures state to display title and set id if todo exists
   * 
   * @param {*} props 
   */
  setUp(todos) {
    // get todo id from url if exists
    const id = this.props.match.params.id;
    if (id && todos.length > 0) {
      // get the todo object from state using the id if exists
      const result = todos.find(x => x.id === Number.parseInt(id));
      if (result) {
        this.setState({
          id: result.id,
          title: result.title
        });
      }
    }
  }

  /**
   * Handles the value change event of the input
   * @param {*} event 
   * sets state with current value
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * Validates the todo input
   * @returns {true | false}
   * sets error state
   */
  validateSubmit() {
    const { isValid, errors } = validateTodoInput(this.state);
    this.setState({
      errors
    });
    return isValid;
  }

  /**
   * handles todo form submission
   * validates user input
   * @returns {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    if (this.validateSubmit()) {
      this.props.actions.saveTodo(this.state)
        .then(() => {
          this.props.history.push("/");
        });
    }
  }

  render() {
    const title = 'Edit Todo list in your slate';
    const date = (new Date()).toString();
    return (
      <Main allowAuthenticated>
        <TopBar title={title} date={date} />
        {/*Content starts here */}
        <div className="white">
          <br />
          <div className="container">
            <div>
              <h4 className="secondary-text-color">Enter Todo title below:</h4>
            </div>

            <div className="container">
              <form>
                <TextInput
                  id="title"
                  name="title"
                  type="text"
                  value={this.state.title}
                  onChange={this.handleChange}
                  placeholder="this is a sample title..."
                  error={this.state.errors.title}
                />
                <div className="row">
                  <div className="col s4 m2 l2 xl2">
                    <button type="button" onClick={this.handleSubmit} value="Save" className="btn waves-effect waves-light btn-secondary">
                      Save
                    </button>
                  </div>
                  <div className="col s8 m10 l10 xl10">
                    <NavLink to="/" className="red-text">Cancel</NavLink>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
        {/*Content ends here*/}
      </Main>
    );
  }
}

// prop types
EditSlate.propTypes = {
  actions: PropTypes.object.isRequired,
  todos: PropTypes.array.isRequired
};

/**
 * maps a portion of the state to the props for this component
 * @param {*} state 
 */
const mapStateToProps = (state, ownProps) => ({
  todos: state.todo.todos,
});

/**
 * maps a portion of the actions to the props for this component
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ saveTodo }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSlate);