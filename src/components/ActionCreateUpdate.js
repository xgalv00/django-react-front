import React, { Component } from "react";
import ActionsApiService from "../../src/ActionsApiService";

const actionsApiService = new ActionsApiService();

export class ActionCreateUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', description: '', completed: false};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    if (params && params.id) {
      actionsApiService.getAction(params.id).then(action => {
        this.setState({...action});
      });
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    const {
      match: { params }
    } = this.props;
    if (params && params.id) {
      this.handleUpdate(params.id);
    } else {
      this.handleCreate();
    }
  }
  handleCreate() {
    actionsApiService
      .createAction({
        name: this.state.name,
        description: this.state.description,
        completed: this.state.completed
      })
      .then(() => {
        this.props.history.push('/');
      })

      .catch(() => {
        alert("Error! Please check the form.");
      });
  }

  handleUpdate(id) {
    actionsApiService
      .updateAction({
        id: id,
        name: this.state.name,
        description: this.state.description,
        completed: this.state.completed
      })
      .then(() => {
        this.props.history.push('/');
      })
      .catch(() => {
        alert("Error! Please check your form.");
      });
  }

  render() {
    return (
      <div className="container mt-4">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" className="form-control" id="name" value={this.state.name}
                   onChange={(e) => this.setState({name: e.target.value})}/>
          </div>
          <div className="form-group">
            <label>Description:</label>

            <input type="text" className="form-control" id="description" value={this.state.description}
                   onChange={(e) => this.setState({description: e.target.value})}/>
          </div>
          <div className="form-group">
            <input type="checkbox" checked={this.state.completed}
                   onChange={(e) =>
                     this.setState({completed: e.target.checked})
                   }/>
            <label className="p-2">Completed</label>
          </div>
          <button className="btn btn-primary" type="submit" id='submit'>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default ActionCreateUpdate;
