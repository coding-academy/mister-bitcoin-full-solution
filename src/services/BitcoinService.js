import axios from 'axios'

const getBitcoinRate = (value) => {
    return getRequest(`https://blockchain.info/tobtc?currency=USD&value=${value}`)
}

const getMarketPrice = async () => {
    const res = await getRequest('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
    return {
        title: res.name,
        data: res.values.map(point => point.y), 
        description: res.description
    }
}

const getConfirmedTransactions = async () => {
    const res = await getRequest('https://api.blockchain.info/charts/n-transactions?format=json&cors=true')
    return {
        title: res.name,
        data: res.values.map(point => point.y), 
        description: res.description
    }
}

const getRequest = (url) => {
    return axios.get(url)
        .then(res => res.data)
}



export default {
    getBitcoinRate,
    getMarketPrice,
    getConfirmedTransactions
}