import React from 'react';
import { storiesOf } from '@storybook/react';
import ContactFilter from '../components/ContactFilter/ContactFilter';
import { action } from '@storybook/addon-actions';

const onFilter = action('typing...')

storiesOf('ContactFilter', module)
  .add('search component with action', () => (
    <ContactFilter onFilter={onFilter} />
  ))