import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import Chart from '../../components/Chart';

import bitcoinService from '../../services/BitcoinService'
import './StatisticPage.css'
@observer
class StatisticPage extends Component {
  
  @observable chartsData = null
  @observable loading = true

  async componentDidMount() {
    this.loading = true

    this.chartsData = await Promise.all([
      bitcoinService.getMarketPrice(), 
      bitcoinService.getConfirmedTransactions()
    ])

    this.loading = false
  }

  renderChart(chart, color) {
    const {title, data, description} = chart
    return (
      <Chart title={title} 
            data={data} 
            description={description} 
            color={color} />
    )
  }

  render() {
    if (this.loading) return <div>Loading...</div>

    const colors = ['blue', 'green']
    return (
      <div className="statistic-page">
        <ul>
        {
          this.chartsData.map( (chart, idx) => 
            <li className="statistic-chart" key={idx}>{this.renderChart(chart, colors[idx])}</li>)
        }
        </ul>
      </div>
    );
  }
}

export default StatisticPage;
