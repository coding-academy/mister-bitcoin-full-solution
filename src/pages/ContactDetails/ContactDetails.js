import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';

import TransferCoins from '../../components/TransferCoins'
import MovesList from '../../components/MovesList'

import './ContactDetails.css'
import imgAvatar from '../../assets/img_avatar.png'
import backImg from '../../assets/icons/back.png'
import editImg from '../../assets/icons/edit.png'

@inject('store')
@observer
class ContactDetails extends Component {
  state = {
    currentId: ''
  };
  @observable message = ''

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.match.params.id !== prevState.currentId){
      return { currentId: nextProps.match.params.id};
    } 
    else {
        return null;
    }

  }

  constructor(props) {
    super(props);

    this.transferCoins = this.transferCoins.bind(this)
  }

  componentDidMount() {
    const id = this.props.match.params.id; // params -> from url
    this.props.store.contactStore.fetchContact(id)
    this.setState({currentId: id})
  }

  componentDidUpdate(prevProps) {
    /**
      * this is the initial render
      * without a previous prop change
      */
    if(prevProps === undefined) {
      return false
    }

    if(prevProps.match.params.id !== this.state.currentId){
      //fetchContact and set state to reload
      this.props.store.contactStore.fetchContact(this.state.currentId)
    }
  }

  async transferCoins(amount) {
    const contact = this.props.store.contactStore.selectedContact
    await this.props.store.userStore.transferCoins(contact, amount)
    this.message = "Transfer Done Succefully!"
    setTimeout(() => this.message = '', 1000);
  }

  renderHeader(contact, nextContactId) {
    return (
      <header className="contact-details-header">
        <Link to={`/contacts`} >
          <img src={backImg} width="24px" height="24px" alt="Back" />
        </Link>
        <Link to={`/contacts/${nextContactId}`}>
          Next >
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
    const nextContactId = this.props.store.contactStore.nextContactId

    const maxCoins = this.props.store.userStore.user.coins
    const avatar = contact.picture || imgAvatar
    const message = this.message

    return (
      <div className="contact-details">
        {this.renderHeader(contact, nextContactId)}
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