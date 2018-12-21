import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';

import Chart from '../../components/Chart';

import {BitcoinService} from '../../services/BitcoinService'
import './StatisticPage.css'
@inject('store')
@observer
class StatisticPage extends Component {
  
  @observable marketPrice = null
  @observable confirmedTransactions = null
  @observable loading = true

  async componentDidMount() {
    this.loading = true
    this.marketPrice = await BitcoinService.getMarketPrice()
    this.confirmedTransactions = await BitcoinService.getConfirmedTransactions()
    this.loading = false
  }

  renderChart(chart, color) {
    const {title, data, description} = chart
    return (
      <li className="statistic-chart">
        <Chart title={title} 
              data={data} 
              description={description} 
              color={color} />
      </li>
    )
  }

  render() {
    if (this.loading) return <div>Loading...</div>

    return (
      <div className="statistic-page">
        <ul>
          {this.renderChart(this.marketPrice, 'blue')}
          {this.renderChart(this.confirmedTransactions, 'green')}
        </ul>
      </div>
    );
  }
}

export default StatisticPage;
