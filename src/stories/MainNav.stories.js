import React from 'react';
import { storiesOf } from '@storybook/react';
import MainNav from '../components/MainNav/MainNav';
import StoryRouter from 'storybook-react-router';

storiesOf('MainNav', module)
  .addDecorator(StoryRouter())
  .add('display the main nav bar', () => (
    <MainNav />
  ))