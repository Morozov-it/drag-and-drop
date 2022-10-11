import React, { useState, useEffect } from 'react'
import '../styles/Complex.css'

interface Task {
    id: number
    title: string
}
interface Board {
    id: number
    title: string
    items: Task[]
}

const items: Board[] = [
    { id: 1, title: 'To do', items: [{ id: 1, title: 'To go for a shopping' }, { id: 2, title: 'Throw garbage' }] },
    { id: 2, title: 'To check', items: [{ id: 3, title: 'Code review' }, { id: 4, title: 'Refactoring' }] },
    { id: 3, title: 'Completed', items: [{ id: 5, title: 'Film a video' }, { id: 6, title: 'Make timing' }]},
]

const getBoards = () => {
    const userBoards = localStorage.getItem('boards')
    return !!userBoards
        ? JSON.parse(userBoards) as Board[]
        : items
}

const Complex: React.FC = () => {
    const [boards, setBoards] = useState<Board[]>(getBoards())
    const [currentBoard, setCurrentBoard] = useState<Board | null>(null)
    const [currentItem, setCurrentItem] = useState<Task | null>(null)

    const onDragStart = (e: React.DragEvent<HTMLDivElement>, board: Board, item: Task) => {
        setCurrentBoard(board)
        setCurrentItem(item)
    }
    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault() //вкл.изменение курсора
        let element = e.target as HTMLDivElement
        if (element.className === 'board__item') {
            element.style.boxShadow = '0 2px 3px gray'
        }
    }
    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        let element = e.target as HTMLDivElement
        element.style.boxShadow = 'none'
    }
    const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        let element = e.target as HTMLDivElement
        element.style.boxShadow = 'none'
        setCurrentBoard(null)
        setCurrentItem(null)
    }
    const onDrop = (e: React.DragEvent<HTMLDivElement>, board: Board, item: Task) => {
        e.preventDefault() // ?
        e.stopPropagation()
        let element = e.target as HTMLDivElement
        element.style.boxShadow = 'none'
        if (currentItem?.id !== item.id) {
            if (currentBoard?.id !== board.id) {
                //удаление из выбранной доски
                const currentIndex = currentBoard?.items.indexOf(currentItem!)!
                currentBoard?.items.splice(currentIndex, 1)!
                //вставка в drop доску
                const dropIndex = board.items.indexOf(item)
                board.items.splice(dropIndex, 0, currentItem!)
                //изменение состояния
                setBoards(boards.map((b) => {
                    if (b.id === board.id) {
                        return board!
                    }
                    if (b.id === currentBoard?.id) {
                        return currentBoard!
                    }
                    return b
                }))
            } else {
                const currentIndex = board.items.indexOf(currentItem!)
                const dropIndex = board.items.indexOf(item)
                board.items.splice(currentIndex, 1)
                board.items.splice(dropIndex, 0, currentItem!)
                //изменение состояния
                setBoards(boards.map((b) => {
                    if (b.id === board.id) {
                        return board!
                    }
                    return b
                }))
            }
        }
        
    }

    const onDragOverBoard = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault() //вкл.изменение курсора
        let element = e.target as HTMLDivElement
        if (element.className === 'board') {
            element.style.boxShadow = '0 2px 3px gray'
        }
    }
    const onDropBoard = (e: React.DragEvent<HTMLDivElement>, board: Board) => {
        e.preventDefault()
        let element = e.target as HTMLDivElement
        element.style.boxShadow = 'none'
        //удаление из выбранной доски
        const currentIndex = currentBoard?.items.indexOf(currentItem!)!
        currentBoard?.items.splice(currentIndex, 1)!
        //добавление в drop доску
        board.items.push(currentItem!)
        //изменение состояния
        setBoards(boards.map((b) => {
            if (b.id === board.id) {
                return board!
            }
            if (b.id === currentBoard?.id) {
                return currentBoard!
            }
            return b
        }))
    }

    useEffect(() => {
        localStorage.setItem('boards', JSON.stringify(boards))
    }, [boards])

    return (
        <section>
            <h2 className='title'>Complex</h2>
            <div className="boards">
                {boards.map((board) => (
                    <div
                        key={board.id}
                        className="board"
                        onDragOver={(e) => onDragOverBoard(e)}
                        onDrop={(e) => onDropBoard(e, board)}
                        onDragLeave={(e) => onDragLeave(e)}
                        onDragEnd={(e) => onDragEnd(e)}
                    >
                        <h4 className="board__title">{board.title}</h4>
                        {board.items.map((item) => (
                            <div
                                key={item.id}
                                className="board__item"
                                draggable
                                onDragStart={(e) => onDragStart(e, board, item)} //взяли draggable-элемент
                                onDragOver={(e) => onDragOver(e)} //находимся над draggable-элементом
                                onDragLeave={(e) => onDragLeave(e)} //вышли за пределы draggable-элемента
                                onDragEnd={(e) => onDragEnd(e)} //закончили перемещение
                                onDrop={(e) => onDrop(e, board, item)} //отпустили карточку, завершение переноса
                            >
                                {item.title}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default React.memo(Complex)