import './GameStatistics.scss'

interface Props {
    score: number;
    time: number;
}

const GameStatistics:React.FC<Props> = ({ score, time }) => {
    const secondsRemaining = (time / 1000).toFixed(0)

    return (
        <div className="game-statistics">
            <p>Score: <span className="stat">{score }</span></p>
            <p>Time Remaining: <span className="stat">{ secondsRemaining }</span></p>
        </div>
    )
}

export default GameStatistics