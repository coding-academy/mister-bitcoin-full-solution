import userService from '../UserService'

describe('UserService', () => {
    const name = "Muki"

    it('should signup and create user successfully', () => {
        expect.assertions(4)

        const name = "Muki"
        const user = userService.signup(name)
        expect(user).toBeTruthy()
        expect(user.name).toBe(name)
        expect(user.coins).toBe(10000)
        expect(user.moves.length).toBe(0)
    })

    it('should load user successfully', () => {
        expect.assertions(2)
        
        userService.signup(name)
        const user = userService.loadUser()
        expect(user).toBeTruthy()
        expect(user.name).toBe(name)
    })

    it('should add move to user successfully', () => {
        expect.assertions(3)

        const coinsToTransfer = 3
        const newUser = userService.signup(name)
        const user = userService.addMove({name: 'Puki', _id: '123'}, coinsToTransfer)
        expect(user).toBeTruthy()
        expect(user.name).toBe(name)
        expect(user.coins).toBe(newUser.coins - coinsToTransfer)
    })
})