import React from 'react';
import imgAvatar from '../../assets/img_avatar.png'
import './ContactPreview.css'

const ContactPreview = ({contact}) => {
  return (
    <div className="contact-preview">
      <img src={imgAvatar} alt="Person" width="96" height="96" />
      <span>{contact.name}</span>
    </div>
  )
}

export default ContactPreview;
