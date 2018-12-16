import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';

import Chart from '../../components/Chart/Chart';

import {BitcoinService} from '../../services/BitcoinService'
import './StatisticPage.css'
@inject('store')
@observer
class StatisticPage extends Component {
  
  @observable chartsData = []
  @observable loading = false

  async componentDidMount() {
    this.loading = true
    this.chartsData = await BitcoinService.getStatisticsData()
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
            <li className="statistic-chart" key={idx}>{this.renderChart(chart, colors[idx])}</li>
          )
        }
        </ul>
      </div>
    );
  }
}

export default StatisticPage;
