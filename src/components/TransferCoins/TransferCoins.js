import React, {Component} from 'react'
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';

import './TransferCoins.css'

@inject('store')
@observer
class TransferCoins extends Component {

    @observable amount = ''
    @observable message = ''
    @observable error = ''

    onFormSubmit = (event) => {
      event.preventDefault()
      if (!this.amount) return
  
      const amount = Number(this.amount)
      const userCoins = this.props.store.userStore.user.coins

      if (!amount) {
        this.error = 'Please enter a valid number'
        return
      }
      
      if (amount < 0) {
        this.error = 'Please enter a valid amount'
        return
      }

      if (amount > userCoins) {
        this.error = `Insufficient funds, you have ${userCoins} coins`
        return
      }
      
      this.props.store.userStore.transferCoins(this.props.contact, amount)
      this.message = 'Transfer done!'
      
      setTimeout(() => this.resetValues(), 1000);
    }
  
    resetValues() {
      this.message = ''
      this.amount = ''
      this.error = ''
    }

    onInputChange = (event) => {
      this.amount = event.target.value
      this.error = ''
    }
    
    render() {
      return (
        <div className='transfer-coins'>
          <div>Transfer coins to {this.props.contact.name}:</div>
          <form onSubmit={this.onFormSubmit} className='transfer-form'>
            <label>Amount:</label>
              <input 
                  className='input-amount'
                  value={this.amount}
                  onChange={this.onInputChange}/>
            <div className='btn-submit'>
              <button type='submit' disabled={!this.amount}>Transfer</button>
            </div>
          </form>
          <div className='message-container'>
            <div>{this.message ? this.message : ''}</div>
            <div className='error'>{this.error ? this.error : ''}</div>
          </div>
        </div>
      )
    }
  }

  export default TransferCoins