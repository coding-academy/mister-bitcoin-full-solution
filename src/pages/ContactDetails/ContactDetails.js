import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import TransferCoins from '../../components/TransferCoins/TransferCoins'
import MovesList from '../../components/MovesList/MovesList'

import imgAvatar from '../../assets/img_avatar.png'
import backImg from '../../assets/icons/back.png'
import editImg from '../../assets/icons/edit.png'
import './ContactDetails.css'

@inject('store')
@observer
class ContactDetails extends Component {
  
  componentDidMount() {
    const id = this.props.match.params.id; // params -> from url
    this.props.store.contactStore.fetchContact(id)
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
    const avatar = contact.picture || imgAvatar

    return (
      <div className="contact-details">
        {this.renderHeader(contact)}
        <div className="contact-details-body">
          <img src={avatar} alt="Person" width="96" height="96" />
          <div className="contact-details-row">Name: {contact.name}</div>
          <div className="contact-details-row">Phone: {contact.phone}</div>
          <div className="contact-details-row">Email: {contact.email}</div>
        </div>

        <div className="transter-coins-container">
          <TransferCoins contact={contact}/>
        </div>

        <div className="moves-list-container">
          <MovesList moves={this.props.store.userStore.movesToCurrContact} title="Your Moves:"/>
        </div>
      </div>
    )
  }
  
}

export default ContactDetails;
