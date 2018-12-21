import {BitcoinService} from '../BitcoinService'
import axios from 'axios'

jest.mock('axios')

describe('BitcoinService', () => {

    beforeEach(() => {
        axios.get.mockReset()
    })

    it('should get bitcoin rate successfully', async () => {
        expect.assertions(2)
        const resp = {data: 5};
        axios.get.mockResolvedValue(resp)

        const value = await BitcoinService.getBitcoinRate(10)

        expect(value).toBeTruthy()
        expect(axios.get).toBeCalled()
    })

    it('should get market price chart data successfully', async () => {
        expect.assertions(6)

        const chartData = {
            name: 'market price',
            description: 'this is a desription for market data',
            values: [{y: 1}, {y: 2}, {y: 3}]
        }

        const resp = {data: chartData};

        axios.get.mockResolvedValue(resp)

        const marketPriceRes = await BitcoinService.getMarketPrice(resp)

        expect(marketPriceRes).toBeTruthy()
        expect(marketPriceRes.title).toBe(chartData.name)
        expect(marketPriceRes.description).toBe(chartData.description)
        expect(marketPriceRes.data).toEqual(
            expect.arrayContaining(chartData.values.map(item => item.y))
        );

        expect(axios.get).toBeCalled()
        expect(axios.get).toBeCalledTimes(1)
    })

    it('should get confirmed transactions chart data successfully', async () => {
        expect.assertions(6)

        const chartData = {
            name: 'confirmed transactions',
            description: 'this is a desription for confirmed transactions',
            values: [{y: 1}, {y: 2}, {y: 3}]
        }

        const resp = {data: chartData};

        axios.get.mockResolvedValue(resp)

        const result = await BitcoinService.getMarketPrice(resp)

        expect(result).toBeTruthy()
        expect(result.title).toBe(chartData.name)
        expect(result.description).toBe(chartData.description)
        expect(result.data).toEqual(
            expect.arrayContaining(chartData.values.map(item => item.y))
        );

        expect(axios.get).toBeCalled()
        expect(axios.get).toBeCalledTimes(1)
    })
})