import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Column as ColumnType, Task as TaskType } from '../data'
import '../styles/ReactDnD.css'
import Task from './Task'

interface Props {
    column: ColumnType
    index: number
    tasks: TaskType[]
}

const Column: React.FC<Props> = ({ column, index, tasks }) => {
    return (
        <Draggable
            draggableId={column.id}
            index={index}
        >
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className='column'
                >
                    <h3
                        {...provided.dragHandleProps}
                        className={snapshot.isDragging ? 'column__title isDragging' : 'column__title'}
                    >
                        {column.title}
                    </h3>
                    <Droppable
                        droppableId={column.id}
                        type='task' //required to not mess between drop areas!
                        //direction='horizontal'
                        //isDropDisabled={column.id === 'column-3'}
                    >
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={snapshot.isDraggingOver ? 'list isDraggingOver' : 'list'}
                            >
                                {tasks.map((task, i) => <Task key={task.id} task={task} index={i} />)}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    )
}

export default Column