import React from 'react';
import Input from '../Input';
import './ContactFilter.css'

const ContactFilter = (props) => {

    const field = {name: "search", value: props.term}
    return (
        <div className="contact-filter">
            <Input field={field} onInput={props.onFilter} />
        </div>
    );
}

export default ContactFilter