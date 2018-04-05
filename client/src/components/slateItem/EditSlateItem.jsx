import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Main from '../Main';
import TopBar from '../common/TopBar';
import { saveTodoItem } from '../../actions/todoItemActions';
import TextInput from '../common/TextInput';
import {validateTodoItemInput} from '../../utils/validateInput';

/*eslint-disable react/prefer-stateless-function */
class EditSlateItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: undefined,
      todoId: undefined,
      content: '',
      errors: {}
    };
    // bind methods to the component
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setUp = this.setUp.bind(this);
  }

  componentDidMount(){
    /**
     * This is used because when the page is navigated to, 
     * componentWillReceiveProps is not called,
     * the state has already been loaded with data
     */
    this.setUp(this.props.items);
  }

  componentWillReceiveProps(nextProps) {
    /**
     * This is used because when the page is refreshed,
     * state is loaded again therefore when componentDidMount is called,
     * state is still getting data,
     * componentWillReceiveProps is called when state has gotten data
     * to handle the updated state
     */
    this.setUp(nextProps.items);
  }

  /**
   * Configures state to set id, todoId, and content for the item
   * 
   * @param {array} props 
   */
  setUp(items) {
    // get item id and todoId from url if exists
    const id = this.props.match.params.id;
    const todoId = this.props.match.params.todoId;
    let result;
    if (id && items.length > 0) {
      // get the item object from state using the id if exists
      result = items.find(x => x.id === Number.parseInt(id));
    }
    this.setState({
      id: (result) ? result.id || undefined : undefined,
      todoId: (result) ? result.todoId || todoId || undefined : todoId || undefined,
      content: (result) ? result.content || '' : ''
    });
  }

  /**
   * checks if the state is valid
   * @returns {isValid, errors}
   */
  validateForm(){
    const {isValid, errors} = validateTodoItemInput(this.state);
    this.setState({
      errors
    });
    return isValid;
  }

  /**
   * handles the change event of the text input
   * @param {*} event 
   * updates the state with the text value
   */
  handleChange(event){
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * Handles form submission
   * @param {*} event 
   * Checks if the form is valid
   * Calls the save action
   */
  handleSubmit(event){
    event.preventDefault();
    if(this.validateForm()){
      this.props.actions.saveTodoItem(this.state)
        .then(() => {
          this.props.history.push(`/item/${this.state.todoId}`);
        });
    }
  }

  render() {
    const title = 'Edit Todo item in your todo';
    const date = (new Date()).toString();
    return (
      <Main allowAuthenticated>
        <TopBar title={title} date={date} />
        {/*Content Starts here */}
        <div className="white">
          <br />
          <div className="container">
            <div>
              <h4 className="secondary-text-color">Enter Todo item below:</h4>
            </div>

            <div className="container">
              <form>
                <TextInput 
                  name="content"
                  type="text"
                  id="content"
                  placeholder="this is a todo item..."
                  value={this.state.content}
                  onChange={this.handleChange}
                  error={this.state.errors.content}
                />
                <div className="row">
                  <div className="col s4 m2 l2 xl2">
                    <button type="button" onClick={this.handleSubmit} value="Save" className="btn waves-effect waves-light btn-secondary">
                      Save
                    </button>
                  </div>
                  <div className="col s8 m10 l10 xl10">
                    <NavLink to={`/item/${this.state.todoId}`} className="red-text">Cancel</NavLink>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
        {/*Content Ends here */}
      </Main>
    );
  }
}

//prop types
EditSlateItem.propTypes = {
  items: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

/**
 * maps a portion of the state to the props for this component
 * @param {*} state 
 */
const mapStateToProps = state => {
  return {
    items: state.todoItems
  };
};

/**
 * maps a portion of the actions to the props for this component
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ saveTodoItem }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSlateItem);