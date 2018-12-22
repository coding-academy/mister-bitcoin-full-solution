import axios from 'axios'

export default {
    getBitcoinRate,
    getMarketPrice,
    getConfirmedTransactions
}


function getBitcoinRate(value)  {
    return _getRequest(`https://blockchain.info/tobtc?currency=USD&value=${value}`)
}

async function getMarketPrice() {
    const res = await _getRequest('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
    return {
        title: res.name,
        data: res.values.map(point => point.y), 
        description: res.description
    }
}

async function getConfirmedTransactions () {
    const res = await _getRequest('https://api.blockchain.info/charts/n-transactions?format=json&cors=true')
    return {
        title: res.name,
        data: res.values.map(point => point.y), 
        description: res.description
    }
}

function _getRequest(url) {
    return axios.get(url)
        .then(res => res.data)
}



