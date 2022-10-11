import React, { useState } from 'react'
import '../styles/Plain.css'

interface Card {
    id: number
    order: number
    text: string
}

const cards: Card[] = [
    { id: 1, order: 2, text: 'Card 1' },
    { id: 2, order: 1, text: 'Card 2' },
    { id: 3, order: 4, text: 'Card 3' },
    { id: 4, order: 3, text: 'Card 4' },
]

const Plain: React.FC = () => {
    const [list, setList] = useState<Card[]>(cards)
    const [currentCard, setCurrentCard] = useState<Card | null>(null)

    const onDragStart = (e: React.DragEvent<HTMLDivElement>, card: Card) => {
        console.log('drag', card)
        setCurrentCard(card)
    }
    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); //вкл.изменение курсора
        //console.log('drag over', e.target);
        (e.target as HTMLDivElement).style.background = 'lightgray' //подсветка
    }
    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        console.log('drag leave');
        (e.target as HTMLDivElement).style.background = 'white'
    }
    const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        console.log('drag end', e.target);
        setCurrentCard(null)
    }
    const onDrop = (e: React.DragEvent<HTMLDivElement>, card: Card) => {
        e.preventDefault() // ?
        console.log('drop', e.target, card);
        setList(list.map((c) => {
            if (c.id === card.id) {
                return { ...c, order: currentCard?.order! }
            }
            if (c.id === currentCard?.id) {
                return { ...c, order: card.order }
            }
            return c
        }));
        (e.target as HTMLDivElement).style.background = 'white'
    }

    const sorting = <T extends Card>(a: T, b: T) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    return (
        <section>
            <h2 className='title'>Plain</h2>
            <div className='plain-list'>
                {list.sort(sorting).map((card) => (
                    <div
                        key={card.id}
                        className='plain-list__card'
                        draggable
                        onDragStart={(e) => onDragStart(e, card)} //взяли draggable-элемент
                        onDragOver={(e) => onDragOver(e)} //находимся над draggable-элементом
                        onDragLeave={(e) => onDragLeave(e)} //вышли за пределы draggable-элемента
                        onDragEnd={(e) => onDragEnd(e)} //закончили перемещение
                        onDrop={(e) => onDrop(e, card)} //отпустили карточку, завершение переноса
                    >
                        {card.text}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default React.memo(Plain)