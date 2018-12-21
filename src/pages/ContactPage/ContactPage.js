import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ContactList from '../../components/ContactList'
import ContactFilter from '../../components/ContactFilter'
import { inject, observer } from 'mobx-react';

import './ContactPage.css'
import addImg from '../../assets/icons/plus.png'

@inject('store')
@observer
class ContactPage extends Component {
  
  componentDidMount() {
    this.props.store.contactStore.fetchContacts()
  }

  contactSearch = ({search}) => {
    this.props.store.contactStore.fetchContacts({term: search})
  }
  
  render() {
    const contactStore = this.props.store.contactStore

    return (
      <div className="contacts-page">
        <div className="search-container">
          <ContactFilter onFilter={this.contactSearch} />
        </div>
        <div className="contacts-container">
            <ContactList contacts={contactStore.contacts} />
        </div>
        <div className="action-container">
          <Link to={'/contacts/new'}>
            <img src={addImg} width="48px" height="48px" alt="Add New" />
          </Link>
        </div>
      </div>
    );
  }
}

export default ContactPage;
