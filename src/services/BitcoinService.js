import axios from 'axios'

const getBitcoinRate = (value) => {
    return getRequest(`https://blockchain.info/tobtc?currency=USD&value=${value}`)
}

const getBitcoinHistory = async () => {
    const res = await getRequest('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
    return {
        title: res.name,
        data: res.values.map(point => point.y), 
        description: res.description
    }
}

const getTransactionsHistory = async () => {
    const res = await getRequest('https://api.blockchain.info/charts/n-transactions?format=json&cors=true')
    return {
        title: res.name,
        data: res.values.map(point => point.y), 
        description: res.description
    }
}

const getStatisticsData = () => {
    return Promise.all([getBitcoinHistory(), getTransactionsHistory()])
}

const getRequest = (url) => {
    return axios.get(url)
        .then(res => res.data)
}



export const BitcoinService = {
    getBitcoinRate,
    getStatisticsData
}