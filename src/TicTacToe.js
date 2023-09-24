import { useState } from 'react'
export const TicTacToe = () => {
    const winningSets = [
        '036', '147', '258', '012', '345', '678', '048', '246'
    ]
    const [squares, setSquares] = useState(new Array(9).fill(''))
    const [xPlayer, setXPlayer] = useState('')
    const [oPlayer, setOPlayer] = useState('')
    const [plays, setPlays] = useState(0);
    const [picked, setPicked] = useState([])
    const [winner, setWinner] = useState(null)
    const [winnerSet, setWinnerSet] = useState('')

    const getWinner = (x, o) => {
        let theWinner;
        let set = 0;
        let xwins = 0, owins = 0;
        while (!theWinner && set <= winningSets.length - 1) {
            const winSet = winningSets[set];

            for (let w of x) xwins = winSet.includes(w) ? xwins + 1 : xwins;
            for (let y of o) owins = winSet.includes(y) ? owins + 1 : owins;

            theWinner = xwins === 3 ? "X" : owins === 3 ? "O" : "";
            if (xwins === 3 || owins === 3) setWinnerSet(winSet)

            set++
            xwins = 0;
            owins = 0;
        }
        if (theWinner) setWinner(theWinner)
    }

    const updateBoard = (plays, pick) => {
        const updatedSquares = [...squares];
        updatedSquares[pick] = (plays % 2 === 0) ? 'X' : 'O';
        setSquares(updatedSquares)
    }

    const handleClick = e => {
        const pick = e.target.id
        setPicked([...picked, pick])
        let playersPicks;
        const xPlays = xPlayer.split('');
        const oPlays = oPlayer.split('');
        if (plays % 2 === 0) {
            xPlays.push(pick);
            playersPicks = xPlayer + pick
            setXPlayer(playersPicks.split('').sort().join(''))

        } else {
            oPlays.push(pick);
            playersPicks = oPlayer + pick
            setOPlayer(playersPicks.split('').sort().join(''))

        }
        updateBoard(plays, pick)
        setPlays(prev => prev + 1);
        if (xPlays.length >= 3 || oPlays.length >= 3) getWinner(xPlays, oPlays);
    }

    const reset = () => {
        setSquares((new Array(9).fill('')))
        setXPlayer('')
        setOPlayer('')
        setPlays(0)
        setPicked([])
        setWinner(null)
        setWinnerSet('')
    }

    return (
        <>
            <h1>Tic Tac Toe</h1>
            <div className='game'>
                {squares.map(
                    (square, i) =>
                        <button
                            disabled={picked.includes(i.toString()) || winner}
                            className={[(plays === 9 && !winner) ? 'tied' : '', winnerSet.includes(i) ? 'winner' : '', winner ? 'game-over' : ''].join(' ')}
                            key={i} id={i} onClick={handleClick}>
                            {square}
                        </button>
                )}
            </div>
            <p>{plays < 9 && (plays % 2 === 0) ? 'X' : 'O'}'s turn</p>
            {plays === 9 && !winner && <p className='tied-result'>TIE</p>}
            {(plays === 9 || winner) && <button className='new-game' onClick={reset}>New Game</button>}
        </>
    )
}