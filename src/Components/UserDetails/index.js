import { Component } from 'react';
import Tasks from '../Tasks';

const InitialUserDetailsList = {
  "Ramya": [
    {
      uniqueNo: 1,
      title: 'Build UI app',
      dueDate: '2023-05-12',
      status: 'In Progress',
      description: 'Build the UI app for Lighthall'
    },
    {
      uniqueNo: 2,
      title: 'Complete React Tutorial',
      dueDate: '2023-05-01',
      status: 'Pending',
      description: 'Finish watching the React tutorial on YouTube'
    },
    {
      uniqueNo: 3,
      title: 'Grocery shopping',
      dueDate: '2023-04-23',
      status: 'Pending',
      description: 'Buy groceries for the week'
    },
    {
      uniqueNo: 4,
      title: 'Submit project proposal',
      dueDate: '2023-04-30',
      status: 'In Progress',
      description: 'Submit the project proposal for the upcoming conference'
    },
    {
      uniqueNo: 5,
      title: 'Schedule dentist appointment',
      dueDate: '2023-04-25',
      status: 'Pending',
      description: 'Make an appointment with the dentist for a checkup'
    },
    {
      uniqueNo: 6,
      title: 'Schedule dentist appointment',
      dueDate: '2023-04-25',
      status: 'Pending',
      description: 'Make an appointment with the dentist for a checkup'
    },
    {
      uniqueNo: 7,
      title: 'Book flight tickets',
      dueDate: '2023-05-15',
      status: 'Completed',
      description: 'Book flight tickets for the upcoming vacation'
    },
  ],
  "user2": [
    {
      uniqueNo: 1,
      title: "Task 1",
      description: "Do task 1",
      status: "Incomplete",
      dueDate: "2023-04-30"
    },
    {
      uniqueNo: 2,
      title: "Task 2",
      description: "Do task 2",
      status: "Complete",
      dueDate: "2023-05-01"
    }
  ],
  "user3": [
    {
      uniqueNo: 1,
      title: "Task 1",
      description: "Do task 1",
      status: "Incomplete",
      dueDate: "2023-04-30"
    }
  ]
}

class UserDetails extends Component {
  state = {
    usernameInput: '',
    isUser: null,
    userDetailsList: InitialUserDetailsList['Ramya']
  };

  handleUsernameInputChange = (event) => {
    this.setState({ usernameInput: event.target.value });
  };

  handleUserDetailsListChange = (updatedUserDetailsList) => {
    this.setState({ userDetailsList: updatedUserDetailsList });
  };

  onGoBack = () => {
    this.setState({ usernameInput: '', isUser: null });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { usernameInput } = this.state;
    const username = usernameInput.trim();
    if (InitialUserDetailsList.hasOwnProperty(username)) {
      this.setState({ isUser: true });
      this.setState({ userDetailsList: InitialUserDetailsList[username] })
    }
    else {
      this.setState({ isUser: false });
    }
  };

  render() {
    const { usernameInput, isUser, userDetailsList } = this.state;
    const username = usernameInput.trim();

    // If a user is selected, render the tasks component
    if (isUser === true) {
      return (
        <div>
          <Tasks
            userDetailsList={userDetailsList}
            onUserDetailsListChange={this.handleUserDetailsListChange}
            username={username}
          />
        </div>
      );
    }
    // If no user is selected, show a message
    else if (isUser === false) {
      return <div>
        <p>No tasks found for the user {username}</p>
        <button className="back-button" onClick={this.onGoBack}>
          Back
        </button>
      </div>
    }
    // Otherwise, render the form
    else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Enter Username:
              <input
                type="text"
                value={this.state.username}
                onChange={this.handleUsernameInputChange}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    }
  }
}


export default UserDetails
