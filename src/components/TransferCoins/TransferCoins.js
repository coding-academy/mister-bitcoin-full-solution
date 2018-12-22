import React, {Component} from 'react'
import './TransferCoins.css'

class TransferCoins extends Component {

    state = {
      amount: '',
      message: '',
      error: ''
    }

    onFormSubmit = (event) => {
      event.preventDefault()
      const { amount } = this.state

      if (!amount) return
  
      const amountNum = Number(amount)
      const maxCoins = this.props.maxCoins

      if (!amountNum) {
        this.setState({error: 'Please enter a valid number'})
        return
      }
      
      if (amountNum < 0) {
        this.setState({error: 'Please enter a valid amount'})
        return
      }

      if (amount > maxCoins) {
        this.setState({error: `Insufficient funds, you have ${maxCoins} coins`})
        return
      }
      
      this.props.onTransferCoins(amountNum)
      this.setState({amount: '', error: ''})
      this.elAnimValue.innerText = amountNum
      
      this.elAnimValue.style.animation = 'sendCoinAnimation 1s infinite'
      setTimeout(() => {
        this.elAnimValue.style.animation = ''
      }, 1000);
      
    }
  
    onInputChange = (event) => {
      this.setState({amount: event.target.value, error: ''})
    }
    
    render() {
      const { amount, error, message } = this.state

      return (
        <div className='transfer-coins'>
          <div>Transfer coins to {this.props.contact.name}:</div>
          <span className="anim-value" ref={(elAnimValue) => { this.elAnimValue = elAnimValue }}></span>
          <form onSubmit={this.onFormSubmit} className='transfer-form'>
            <label>Amount:</label>
              <input 
                  className='input-amount'
                  value={amount}
                  onChange={this.onInputChange}/>
            <div className='btn-submit'>
              <button type='submit' disabled={!amount}>Transfer</button>
            </div>
          </form>
          <div className='message-container'>
            <div>{message}</div>
            <div className='error'>{error}</div>
          </div>
        </div>
      )
    }
  }

  export default TransferCoins