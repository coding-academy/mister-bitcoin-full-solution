import React from 'react';
import { storiesOf } from '@storybook/react';
import Chart from '../components/Chart/Chart';
import { withKnobs, color } from '@storybook/addon-knobs';

const data = [5, 10, 5, 20, 8, 15, 5, 10, 5, 20, 8, 15, 5, 10, 5, 20, 8, 15, 5, 10, 5, 20, 8, 15]

storiesOf('Chart', module)
  .addDecorator(withKnobs)
  .add('example to blue color', () => (
    <Chart title={'Example Chart'} 
              data={data} 
              description={'this is an example chart component'} 
              color={'blue'} />
  ))
  .add('example with knobs', () => {
    const value = color('color', 'red');

    return <Chart title={'Example Chart with knobs'} 
              data={data} 
              description={'this is an example chart component'} 
              color={value} />
  })