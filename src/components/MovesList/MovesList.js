import React, {Component} from 'react'
import { observer } from 'mobx-react';

import './MovesList.css'

@observer
export default class MovesList extends Component {

  renderMoves() {
    const moves = this.props.moves

    if (moves.length === 0) return <div>No moves yet...</div>

    return moves.map((move, idx) => {
      return (
        <li key={idx} className="moves-list-item">
          {this.props.showContactName && <div className="item-name">To: {move.to}</div>}
          <div className="item-date">At: {new Date(move.at).toLocaleString()}</div>
          <div className="item-amount">Amout: {move.amount} coins</div>
        </li>
      )
    })
  }

  render() {
    return (
      <div className='moves-list'>
        <div className="moves-list-title">{this.props.title}</div>
        <ul>
          {this.renderMoves()}
        </ul>
      </div>
    )
  }
}