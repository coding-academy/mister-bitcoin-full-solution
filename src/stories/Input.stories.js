import React from 'react';
import { storiesOf } from '@storybook/react';
import Input from '../components/Input/Input';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';


storiesOf('Input', module)
  .addDecorator(withKnobs)
  .add('input component', () => {
    const onChange = action('input changed')
    const title = text('Name', 'Name')
    return <Input field={{name: title, title}} onInput={onChange} />
  })
  .add('input component without title', () => {
    const onWithoutTitleChange = action('input without title changed')
    return <Input field={{name: 'inputWithoutTitle'}} onInput={onWithoutTitleChange} />
  })