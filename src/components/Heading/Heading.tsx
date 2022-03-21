import React from 'react'
import GameStatistics from '../GameStatistics/GameStatistics'
import './Heading.scss'

interface Props {
    score: number;
    time: number;
}

const Heading:React.FC<Props> = ({ score, time }) => {
    return (
        <div className="heading">
            <h1>The Typing Game</h1>
            <GameStatistics score={score} time={time}/>
        </div>
    )
}

export default Heading