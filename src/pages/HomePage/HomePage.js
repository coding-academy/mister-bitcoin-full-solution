import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {observable} from 'mobx'

import MovesList from '../../components/MovesList'
import {BitcoinService} from '../../services/BitcoinService'

import coinsImg from '../../assets/icons/coins.png'
import bitcoinImg from '../../assets/icons/bitcoin.png'
import './HomePage.css'

@inject('store')
@observer
class HomePage extends Component {
  
  @observable bitcoinRate = 0

  async componentDidMount() {
    const coins = this.props.store.userStore.user.coins
    this.bitcoinRate = await BitcoinService.getBitcoinRate(coins)
  }

  render() {
    const {name, coins} = this.props.store.userStore.user

    return (
      <div className="home-page">
          <div className="user-details">
            <div className="user-name">Hello {name}!</div>
            <div className="user-coins-count">
              <img src={coinsImg} alt="coins" width="24px" height="24px" /> Coins: {coins} 
            </div>
            <div className="user-coins-rate">
            <img src={bitcoinImg} alt="bitcoin" width="24px" height="24px" /> BTC: {this.bitcoinRate}
            </div>
          </div>
          <MovesList showContactName moves={this.props.store.userStore.lastMoves} title="Your last 3 Moves:"/>
      </div>
    );
  }
}

export default HomePage;
