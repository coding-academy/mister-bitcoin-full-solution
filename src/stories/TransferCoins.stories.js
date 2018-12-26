import React from 'react';
import { storiesOf } from '@storybook/react';
import TransferCoins from '../components/TransferCoins/TransferCoins';
import { action } from '@storybook/addon-actions';
import { contactWithoutImg as contact } from './utils'

const transferCoins = action('transfer coins')


storiesOf('TransferCoins', module)
  .add('Transfer Coins action', () => (
    <TransferCoins contact={contact} maxCoins={40} onTransferCoins={transferCoins} />
  ))