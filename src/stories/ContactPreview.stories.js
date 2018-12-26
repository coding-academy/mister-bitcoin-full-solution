import React from 'react';
import { storiesOf } from '@storybook/react';
import ContactPreview from '../components/ContactPreview/ContactPreview';
import { contactWithoutImg, contact } from './utils';

storiesOf('ContactPreview', module)
  .add('contact preview', () => (
    <ContactPreview contact={contact} />
  ))
  .add('display defalut contact img', () => (
    <ContactPreview contact={contactWithoutImg} />
  ))