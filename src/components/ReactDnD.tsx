import React, { useState } from 'react'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'
import initialData, { Data } from '../data'
import '../styles/ReactDnD.css'
import Column from './Column'

const ReactDnD: React.FC = () => {
    const [data, setData] = useState<Data>(initialData)

    // const onDragStart = (initial: DragStart, provided: ResponderProvided) => {
    //     document.body.style.color = 'blue'
    // }

    const onDragEnd = (result: DropResult) => {
        //document.body.style.color = 'inherit'

        const { destination, source, draggableId, type } = result
        if (!destination) return
        if (
            destination.droppableId === source.droppableId && 
            destination.index === source.index
        ) return

        //moving columns
        if (type === 'column') {
            const newColumnOrder = Array.from(data.columnOrder)
            newColumnOrder.splice(source.index, 1)
            newColumnOrder.splice(destination.index, 0, draggableId)

            const newState = {
                ...data,
                columnOrder: newColumnOrder
            }
            setData(newState)
            return
        }

        const sourceColumn = data.columns[source.droppableId]
        const destinationColumn = data.columns[destination.droppableId]

        //moving task into one column
        if (sourceColumn === destinationColumn) {
            //one column
            const newTaskIds = Array.from(sourceColumn.taskIds)
            newTaskIds.splice(source.index, 1)
            newTaskIds.splice(destination.index, 0, draggableId)

            //update state
            const newColumn = {
                ...sourceColumn,
                taskIds: newTaskIds
            }
            const newState = {
                ...data,
                columns: {
                    ...data.columns,
                    [newColumn.id]: newColumn
                }
            }
            setData(newState)
            return
        }

        //moving task from one column to another
        const startTaskIds = Array.from(sourceColumn.taskIds)
        startTaskIds.splice(source.index, 1)
        const newStartColumn = {
            ...sourceColumn,
            taskIds: startTaskIds
        }

        const finishTaskIds = Array.from(destinationColumn.taskIds)
        finishTaskIds.splice(destination.index, 0, draggableId)
        const newFinishColumn = {
            ...destinationColumn,
            taskIds: finishTaskIds
        }

        const newState = {
            ...data,
            columns: {
                ...data.columns,
                [newStartColumn.id]: newStartColumn,
                [newFinishColumn.id]: newFinishColumn,
            }
        }
        setData(newState)
    }

    return (
        <section>
            <h2 className='title'>React-beautiful-dnd</h2>
            <DragDropContext
                //onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            >
                <Droppable
                    droppableId='all-columns'
                    direction='horizontal'
                    type='column'
                >
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="container"
                        >
                            {data.columnOrder.map((columnId, i) => {
                                const column = data.columns[columnId]
                                const tasks = column.taskIds.map((taskId) => data.tasks[taskId])

                                return <Column key={column.id} column={column} index={i} tasks={tasks} />
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </section>
    )
}

export default ReactDnD