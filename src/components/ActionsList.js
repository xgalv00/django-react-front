import React, { Component } from "react";
import ActionsApiService from "../../src/ActionsApiService";
import { Link } from "react-router-dom";

const actionsApiService = new ActionsApiService();

class ActionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: []
    };
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    actionsApiService
      .getActions()
      .then(data => {
        this.setState({ actions: data });
      })
      .catch(err => console.log(err));
  }
  handleDelete(id) {
    actionsApiService.deleteAction(id).then(() => {
      let newActions = this.state.actions.filter(action => action.id !== id);
      this.setState({ actions: newActions });
    });
  }
  render() {
    return (
      <div className="actions--list">
        <table className="table">
          <thead key="thead">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Created</th>
              <th>Description</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {this.state.actions.map(action => (
              <tr key={action.id}>
                <td>{action.id}</td>
                <td>{action.name}</td>
                <td>{action.created}</td>
                <td>{action.description}</td>
                <td>{action.completed ? "Yes" : "No"}</td>
                <td>
                  <button onClick={() => this.handleDelete(action.id)}>
                    Delete
                  </button>
                  <a href={`/actions/${action.id}/`}>Update</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/create/" className="btn btn-primary m-5">Create Test Actions</Link>
      </div>
    );
  }
}

export default ActionList;
