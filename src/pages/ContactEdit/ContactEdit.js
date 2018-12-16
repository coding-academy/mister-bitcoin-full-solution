import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { observable  } from 'mobx';

import ContactService from '../../services/ContactService'
import { Input } from '../../components/Input/Input'

import './ContactEdit.css'
import imgAvatar from '../../assets/img_avatar.png'
import backImg from '../../assets/icons/back.png'
import deleteImg from '../../assets/icons/delete.png'

const Header = ({contact, onDeleteContact}) => {
  const backUrl = contact._id ? `/contacts/${contact._id}` : `/contacts`

  return (
    <header className="contact-edit-header">
      <Link to={backUrl}>
        <img src={backImg} width="24px" height="24px" alt="Back" />
      </Link>
      {contact._id && <Link to='/' onClick={onDeleteContact}>
      <img src={deleteImg} width="24px" height="24px" alt="Delete" />
      </Link>}
    </header>
  )
}
@inject('store')
@observer
class ContactEdit  extends Component {

  @observable contact = ContactService.getEmptyContact()
  @observable loading = true

  async componentDidMount() {
    const id = this.props.match.params.id; // params -> from url
    if (!id) {
      this.loading = false
      return
    }
    
    try {
      this.contact = await ContactService.getContactById(id)
    } catch(err) {
      this.contact = ContactService.getEmptyContact()
    } finally{
      this.loading = false
    }
  }

  onInputChange = (field) => {
    this.contact = {...this.contact, ...field}
  }

  onFormSubmit = async (event) => {
    event.preventDefault()

    const updatedContact = await this.props.store.contactStore.saveContact(this.contact)
    this.props.history.push(`/contacts/${updatedContact._id}`)    
  }

  onDeleteContact = async () => {
    await this.props.store.contactStore.deleteContact(this.contact)
    this.props.history.push(`/contacts`)
  }

  renderField(name, title, value) {
    return (
      <Input field={{name, title, value}} onInput={this.onInputChange} />
    )
  }

  render() {
    if (this.loading) return <div>Loading...</div>

    const contact = this.contact
    const avatar = contact.picture || imgAvatar

    return (
      <div className="contact-edit">
        <Header contact={contact} onDeleteContact={this.onDeleteContact}/>
        <div className="contact-edit-body">
          <img src={avatar} alt="Person" width="96" height="96" />
          
          <form onSubmit={this.onFormSubmit} className="contact-edit-form">
            
            <div className="form-field">
              {this.renderField('name', 'Name', contact.name)}
            </div>

            <div className="form-field">
              {this.renderField('phone', 'Phone', contact.phone)}
            </div>

            <div className="form-field">
              {this.renderField('email', 'Email', contact.email)}
            </div>
            
            <div className="form-actions-container">
              <button type="submit">Save</button>
            </div>
            
          </form>
        </div>  
      </div>
    )
  }
}

export default ContactEdit;
