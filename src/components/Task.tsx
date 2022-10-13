import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Task as TaskType } from '../data'
import '../styles/ReactDnD.css'

interface Props {
    task: TaskType
    index: number
}

const Task: React.FC<Props> = ({ task, index }) => {
    const isDragDisabled = task.id === 'task-1'

    const classses = (isDragging: boolean) =>
        isDragDisabled
            ? 'task isDragDisabled'
            : isDragging ? 'task isDragging' : 'task'

    return (
        <Draggable
            draggableId={task.id}
            index={index}
            isDragDisabled={isDragDisabled}
        >
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps} //handle
                    className={classses(snapshot.isDragging)}
                    aria-roledescription='Press space bar to lift the task' //for screen reader
                >
                    {/* <div className='handle' {...provided.dragHandleProps}/> */}
                    {task.content}
                </div>
            )}
        </Draggable>
    )
}

export default React.memo(Task)