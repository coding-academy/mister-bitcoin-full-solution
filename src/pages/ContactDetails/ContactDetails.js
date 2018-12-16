import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import TransferCoins from '../../components/TransferCoins/TransferCoins'
import MovesList from '../../components/MovesList/MovesList'

import imgAvatar from '../../assets/img_avatar.png'
import backImg from '../../assets/icons/back.png'
import editImg from '../../assets/icons/edit.png'
import './ContactDetails.css'
import { observable } from 'mobx';

@inject('store')
@observer
class ContactDetails extends Component {
  
  @observable message = ''

  constructor(props) {
    super(props);

    this.transferCoins = this.transferCoins.bind(this)
  }

  componentDidMount() {
    const id = this.props.match.params.id; // params -> from url
    this.props.store.contactStore.fetchContact(id)
  }

  async transferCoins(amount) {
    const contact = this.props.store.contactStore.selectedContact
    await this.props.store.userStore.transferCoins(contact, amount)
    this.message = "Transfer Done Succefully!"
    setTimeout(() => this.message = '', 1000);
  }

  renderHeader(contact) {
    return (
      <header className="contact-details-header">
        <Link to={`/contacts`} >
          <img src={backImg} width="24px" height="24px" alt="Back" />
        </Link>
        <Link to={`/contacts/edit/${contact._id}`}>
          <img src={editImg} width="24px" height="24px" alt="Edit" />
        </Link>
      </header>
    )
  }

  render() {
    if (this.props.store.contactStore.isLoading) return <div>Loading...</div>

    const contact = this.props.store.contactStore.selectedContact
    const maxCoins = this.props.store.userStore.user.coins
    const avatar = contact.picture || imgAvatar
    const message = this.message

    return (
      <div className="contact-details">
        {this.renderHeader(contact)}
        <div className="contact-details-message">{message}</div>
        <div className="contact-details-body">
          <img src={avatar} alt="Person" width="96" height="96" />
          <div className="contact-details-row">Name: {contact.name}</div>
          <div className="contact-details-row">Phone: {contact.phone}</div>
          <div className="contact-details-row">Email: {contact.email}</div>
        </div>

        <div className="transter-coins-container">
          <TransferCoins contact={contact} maxCoins={maxCoins} onTransferCoins={this.transferCoins} />
        </div>

        <div className="moves-list-container">
          <MovesList moves={this.props.store.userStore.movesToCurrContact} title="Your Moves:"/>
        </div>
      </div>
    )
  }
  
}

export default ContactDetails;
