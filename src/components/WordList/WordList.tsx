import './WordList.scss'

interface Props {
    currentWords: string[];
}

const WordList:React.FC<Props> = ({ currentWords }) => {

    return (
        <div className="words-bank-container">
            <ul className="words-bank">
                { currentWords.map((word, i) => <li key={i} className="word">{ word }</li>)}
            </ul>
        </div>
    )
}

export default WordList