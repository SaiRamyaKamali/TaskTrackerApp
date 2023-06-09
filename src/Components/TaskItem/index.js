import './index.css'
import EditTask from '../EditTask'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const TaskItem = (props) => {
    const { uniqueNo, title, dueDate, status, description, onEdit, onSaveEdit, onDeleteTask } = props
    const [isEdit, setIsEdit] = useState(false);
    const edit = () => {
        setIsEdit(true);
        onEdit();
    };
    const closeEdit = () => {
        setIsEdit(false);
    };

    const saveEdit = (savedTask) => {
        onSaveEdit(savedTask)
    }

    const deleteTask = () => {
        onDeleteTask(uniqueNo)
    }


    return (
        <div className="bg-container">
            <div className='top-container'>
                <div className='header-container'>
                    <h1 className='title'>{title}</h1>
                    <p className='duedate'>by {dueDate}</p>
                </div>
                <div className='buttons'>
                    <button onClick={edit}><FontAwesomeIcon icon={faEdit} /></button>
                    <button onClick={deleteTask}><FontAwesomeIcon icon={faTrashAlt} /></button>
                </div>
            </div>
            <p className='status'>{status}</p>
            <p className='description'>{description}</p>
            {isEdit && <EditTask uniqueNo={uniqueNo} title={title} dueDate={dueDate} status={status} description={description} closeEdit={closeEdit} saveEdit={saveEdit} />}
        </div>
    )
}

export default TaskItem