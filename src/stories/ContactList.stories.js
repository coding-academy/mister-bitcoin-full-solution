import React from 'react';
import { storiesOf } from '@storybook/react';
import ContactList from '../components/ContactList/ContactList';
import StoryRouter from 'storybook-react-router';
import { contactList as contacts } from './utils'


storiesOf('ContactList', module)
  .addDecorator(StoryRouter())
  .add('contact list', () => (
    <ContactList contacts={contacts} />
  ))