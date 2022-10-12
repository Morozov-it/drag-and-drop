export interface Task {
    id: string
    content: string
}
export interface Column {
    id: string
    title: string
    taskIds: string[]
}
export interface Data {
    tasks: { [key: string]: Task }
    columns: { [key: string]: Column }
    columnOrder: string[]
}

const initialData: Data = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Content-1' },
        'task-2': { id: 'task-2', content: 'Content-2' },
        'task-3': { id: 'task-3', content: 'Content-3' },
        'task-4': { id: 'task-4', content: 'Content-4' },
        'task-5': { id: 'task-5', content: 'Content-5' },
        'task-6': { id: 'task-6', content: 'Content-6' },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
        },
        'column-2': {
            id: 'column-2',
            title: 'In progress',
            taskIds: ['task-5', 'task-6']
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: []
        },
    },
    columnOrder: ['column-1', 'column-2', 'column-3']
}

export default initialData