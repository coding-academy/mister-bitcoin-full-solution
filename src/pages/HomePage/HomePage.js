import React, { Component } from 'react';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import {observable} from 'mobx'

import MovesList from '../../components/MovesList'
import bitcoinService from '../../services/BitcoinService'

import './HomePage.css'
import coinsImg from '../../assets/icons/coins.png'
import bitcoinImg from '../../assets/icons/bitcoin.png'
import upImg from '../../assets/icons/arrow-up.png'
import downImg from '../../assets/icons/arrow-down.png'

@inject('store')
@observer
class HomePage extends Component {
  
  @observable bitcoinRate = 0
  @observable imgCoinsClassName = ''
  @observable imgArrow = null
  

  async componentDidMount() {
    this.stopWatching = bitcoinService.watchBitcoinRate((rate)=>{
      this.imgArrow = rate > this.bitcoinRate ? upImg : downImg
      this.bitcoinRate = rate
      this.imgCoinsClassName = 'animated wobble'
      setTimeout(()=>this.imgCoinsClassName = '', 2000)
    })
  }
  componentWillUnmount() {
    this.stopWatching();
  }

  @computed get balance() {
    const coins = this.props.store.userStore.user.coins
    return +((this.bitcoinRate * coins).toFixed(2));
  }

  render() {
    const {name, coins} = this.props.store.userStore.user

    return (
      <div className="home-page">
          <div className="user-details">
            <div className="user-name">Hello {name}!</div>
            <div className="user-coins-count">
              <img src={coinsImg} alt="coins" width="24px" height="24px" className={this.imgCoinsClassName}/> 
              Balance: {coins}$ | {this.balance}Ƀ
            </div>
            <div className="user-coins-rate">
              <img src={bitcoinImg} alt="bitcoin" width="24px" height="24px" /> BTC: {this.bitcoinRate}
              {this.imgArrow && <img src={this.imgArrow} alt="arrow" width="16px" height="16px"/> }
            </div>
          </div>
          <MovesList showContactName moves={this.props.store.userStore.lastMoves} title="Your last 3 Moves:"/>
      </div>
    );
  }
}

export default HomePage;
