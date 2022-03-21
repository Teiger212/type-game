import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button/Button'
import './Modal.scss'

interface Props {
    title: string;
    content: string;
    onConfirm: () => void;
}

const Backdrop:React.FC<{onConfirm: () => void}> = ({ onConfirm }) => {
    return <div className="backdrop" onClick={onConfirm} />
}


const Overlay:React.FC<Props> = ({ title, onConfirm, content }) => {

    return (
        <div className="modal">
            <header className="header">
                <h2>{ title }</h2>
            </header>
            <div className="content">
                { content }
            </div>
            <footer className="footer">
                <Button onClick={onConfirm}>Okay</Button>
            </footer>
        </div>
    )
}

const GameModal:React.FC<Props> = ({ onConfirm, title, content }) => (
    <>
        {
            ReactDOM.createPortal(
                <Backdrop onConfirm={onConfirm} />,
                document.getElementById('backdrop-root')!
            )
        }
        {
            ReactDOM.createPortal(
                <Overlay title={title} content={content} onConfirm={onConfirm} />,
                document.getElementById('overlay-root')!
            )
        }
    </>
)

export default GameModal