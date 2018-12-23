import React from 'react'
import './MovesList.css'

const Moves = ({moves, showContactName}) => {
  if (moves.length === 0) return <div>No moves yet...</div>

  return moves.map((move, idx) => {
    return (
      <li key={idx} className="moves-list-item">
        {showContactName && <div className="item-name">To: {move.to}</div>}
        <div className="item-date">At: {new Date(move.at).toLocaleString()}</div>
        <div className="item-amount">Amout: {move.amount} coins</div>
      </li>
    )
  })
}

const MovesList = (props) =>  {
  return (
    <div className='moves-list'>
      <div className="moves-list-title">{props.title}</div>
      <ul>
        <Moves moves={props.moves} showContactName={props.showContactName} />
      </ul>
    </div>
  )
}

export default MovesList