import React, { Component } from "react";
import ActionsApiService from "../../src/ActionsApiService";

const actionsApiService = new ActionsApiService();

export class ActionCreateUpdate extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    if (params && params.id) {
      actionsApiService.getAction(params.id).then(action => {
        this.refs.title.value = action.title;
        this.refs.description.value = action.description;
        this.refs.completed.value = action.completed;
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
        title: this.refs.title.value,
        description: this.refs.description.value,
        completed: this.refs.completed.checked
      })
      .then(() => {
        alert("Action Created ");
      })

      .catch(() => {
        alert("Error! Please check the form.");
      });
  }

  handleUpdate(id) {
    actionsApiService
      .updateAction({
        id: id,
        title: this.refs.title.value,
        description: this.refs.description.value,
        completed: this.refs.completed.checked
      })
      .then(() => {
        alert("Action updated!");
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
            <input type="text" className="form-control" ref="title" />
          </div>
          <div className="form-group">
            <label>Description:</label>

            <input type="text" className="form-control" ref="description" />
          </div>
          <div className="form-group">
            <input type="checkbox" ref="completed" />
            <label className="p-2">Completed</label>
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default ActionCreateUpdate;
