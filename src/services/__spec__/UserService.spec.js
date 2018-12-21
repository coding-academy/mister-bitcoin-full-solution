import {UserService} from '../UserService'

describe('UserService', () => {
    const name = "Muki"

    it('should signup and create user successfully', () => {
        expect.assertions(4)

        const name = "Muki"
        const user = UserService.signup(name)
        expect(user).toBeTruthy()
        expect(user.name).toBe(name)
        expect(user.coins).toBe(100)
        expect(user.moves.length).toBe(0)
    })

    it('should load user successfully', () => {
        expect.assertions(2)
        
        UserService.signup(name)
        const user = UserService.loadUser()
        expect(user).toBeTruthy()
        expect(user.name).toBe(name)
    })

    it('should add move to user successfully', () => {
        expect.assertions(3)

        UserService.signup(name)
        const user = UserService.addMove({name: 'Puki', _id: '123'}, 3)
        expect(user).toBeTruthy()
        expect(user.name).toBe(name)
        expect(user.coins).toBe(97)
    })
})