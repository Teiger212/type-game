import React, { useState } from 'react'
import './InputBar.scss';

interface Props {
    handleFinishedWord: (userText: string) => void
}

const InputBar = React.forwardRef<HTMLInputElement, Props>(({ handleFinishedWord }, ref) => {
    const [userText, setUserText] = useState('')
    const onChangeHandler = (e: any) => setUserText(e.target.value)

    const onFinishedWord = (e: any) => {
        if (e.keyCode === 32) {
            handleFinishedWord(userText)
            setUserText('')
        }
    }

    return (
        <div className="input-bar">
            <input 
                id="user-input"
                type="text"
                value={userText}
                autoFocus
                onChange={onChangeHandler}
                onKeyDown={onFinishedWord}
                ref={ref}
            />
        </div>
    )
})

export default InputBar