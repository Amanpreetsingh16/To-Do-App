import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      currenttask: "",
    };
  }
  handelchange = (e) => {
    this.setState({ currenttask: e.target.value });
  };
  handelsubmit = (e) => {
    if (this.state.currenttask.length === 0) {
      return;
    }
    this.setState({
      tasks: [
        ...this.state.tasks,
        {
          task: this.state.currenttask,
          id: uuidv4(),
          isEdit: false,
        },
      ],
      currenttask: "",
    });
  };

  handeldelete = (id) => {
    let arr = this.state.tasks.filter((taskobj) => {
      return taskobj.id !== id;
    });
    this.setState({
      tasks: [...arr],
    });
  };

  handelEdit = (id) => {
    console.log(this.state.tasks);
    this.setState({
      tasks: this.state.tasks.map((taskobj) => {
        if (taskobj.id === id)
          return {
            ...taskobj,
            isEdit: true,
          };
        else {
          return taskobj;
        }
      }),
    });
  };
  handleSave = (obj, task) => {
    this.setState({
      tasks: this.state.tasks.map((tObj) => {
        if (obj.id == tObj.id) {
          return {
            ...tObj,
            task : task,
            isEdit: false,
          };
        } else return tObj;
      }),
    });
  };
  render() {
    const { handleChange } = this.props;
    return (
      <div className="container">
        <h1>Task-Tracker</h1>
        <div>
          <label className="input-cont" htmlFor="new-todo">What needs to be done?</label>
        </div>
        <div className="input-txt-cont">
        <input
        className="inputtxt"
          type="text"
          onChange={this.handelchange}
          value={this.state.currenttask}
        />
        <button className="btn" onClick={this.handelsubmit}>Submit</button>
        </div>
        <ul>
            <h3>Tasks</h3>
          {this.state.tasks.map((taskobj) => {
            console.log(taskobj);
            return (
              <ListCard
                handelEdit={this.handelEdit}
                handeldelete={this.handeldelete}
                handleSave={this.handleSave}
                taskobj={taskobj}
                id={taskobj.id}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Todo;

class ListCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: "",
    };
  }
  handleUpdateState = (taskobj) => {
    this.setState({
      edit: taskobj.task,
    });
  };

  handelSaveState = () => {
    this.props.handleSave(this.props.taskobj, this.state.edit);
    this.setState({
      edit: "",
    });
  };

  handleChange = (e) => {
    this.setState({
      edit: e.target.value,
    });
  };

  render() {
    const { handelEdit, handeldelete, taskobj } = this.props;
    return (
      <li key={taskobj.id}>
        {taskobj.isEdit ? (
          <>
            <input 
            className="save-inp"
              type="text"
              onChange={this.handleChange}
              value={this.state.edit}
            />

            <button className="list-btn save" onClick={this.handelSaveState}>Save</button>
          </>
        ) : (
          <>
            <p>{taskobj.task}</p>
            <button
            className="list-btn edit"
              onClick={() => {
                this.handleUpdateState(taskobj);
                handelEdit(taskobj.id);
              }}
            >
              Edit
            </button>
            <button
             className="list-btn del"
              onClick={() => {
                handeldelete(taskobj.id);
              }}
            >
              Delete
            </button>
          </>
        )}
      </li>
    );
  }
}
