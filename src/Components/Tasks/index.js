import { Component } from "react"
import TaskItem from "../TaskItem"
import AddTask from '../AddTask'
import UserDetails from "../UserDetails"
import './index.css'


class Tasks extends Component {
    state = {
        latestUniqueNo: 0,
        isAddTaskVisible: false,
        isEditModalVisible: false,
        isHomePage: false,
        taskToEdit: {}
    }

    onAddTask = () => {
        this.setState({ isAddTaskVisible: true })
    }

    onEditTask = (task) => {
        this.setState({ taskToEdit: task, isEditModalVisible: true, isAddTaskVisible: false })
    }

    onDeleteTask = (uniqueNo) => {
        const updatedUserDetailsList = this.props.userDetailsList.filter((task) => task.uniqueNo !== uniqueNo);
        this.props.onUserDetailsListChange(updatedUserDetailsList);
    }

    onSaveEditedTask = (editedTask) => {
        const updatedUserDetailsList = this.props.userDetailsList.map(each => {
            if (each.uniqueNo === editedTask.uniqueNo) {
                return editedTask
            }
            return each
        })
        this.props.onUserDetailsListChange(updatedUserDetailsList);
        this.setState({ isEditModalVisible: false, taskToEdit: {} })
    }

    onCancelAddTask = () => {
        this.setState({ isAddTaskVisible: false })
    }

    onAddNewTask = (newTask) => {

        const updatedUserDetailsList = [
            ...this.props.userDetailsList,
            {
                uniqueNo: this.state.latestUniqueNo + 1,
                ...newTask
            }
        ]
        this.props.onUserDetailsListChange(updatedUserDetailsList);
        this.setState({ isAddTaskVisible: false, latestUniqueNo: this.state.latestUniqueNo + 1 })
    }

    onBackClick = () => {
        this.setState({ isHomePage: true })
    }

    render() {
        const { userDetailsList, username } = this.props;
        if (this.state.isHomePage) {
            return <UserDetails />
        }
        else {
            return (
                <div className="container">
                    <h1>Hello, {username}</h1>
                    <button className="add-task-button" onClick={this.onAddTask}>
                        Click to add your tasks
                    </button>
                    <button className="add-task-button" onClick={this.onBackClick}>
                        Back
                    </button>
                    {this.state.isAddTaskVisible && (
                        <AddTask onCancelAddTask={this.onCancelAddTask} onAddNewTask={this.onAddNewTask} />
                    )}
                    {userDetailsList.map(each => (
                        <TaskItem
                            key={each.uniqueNo}
                            uniqueNo={each.uniqueNo}
                            title={each.title}
                            dueDate={each.dueDate}
                            status={each.status}
                            description={each.description}
                            onEdit={() => this.onEditTask(each)}
                            onSaveEdit={this.onSaveEditedTask}
                            onDeleteTask={this.onDeleteTask}
                        />
                    ))}
                </div>
            )
        }
    }
}


export default Tasks
