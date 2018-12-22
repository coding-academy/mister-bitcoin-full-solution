import {UserStore} from '../UserStore'

import userService from '../../services/UserService'
jest.mock('../../services/UserService');

describe('UserStore', () => {
    
    let store;
    let newUser = {
        name: "Muki", 
        coins: 100, 
        moves: []
    }

    beforeEach(() => {
        userService.loadUser.mockReturnValue(newUser)
        store = new UserStore(null)
    })

    it('should signup successfully', async () => {
        expect.assertions(5)

        userService.signup.mockReturnValue(newUser)
        store.signup('aa')

        expect(store.user).toBeTruthy()
        expect(store.user.name).toBe(newUser.name)
        expect(store.user.coins).toBe(newUser.coins)
        expect(store.user.moves.length).toBe(0)
        expect(userService.signup).toBeCalled()
    })

    it('should call to update move', async () => {
        expect.assertions(1)
        userService.addMove.mockReturnValue(newUser)
        store.transferCoins(null, 2)
        expect(userService.addMove).toBeCalled()
    })

    it('should return moves of specific contact', async () => {
        expect.assertions(1)

        const selectedContact = {
            "_id": "5a56640269f443a5d64b32ca",
            "name": "Ochoa Hyde",
            "email": "ochoahyde@renovize.com",
            "phone": "+1 (968) 593-3824"
        }

        const rootStore = { contactStore: { selectedContact } }
        
        let user = {
            name: "Muki", 
            coins: 70, 
            moves: [
                {toId: 'aaa', to: 'Puki', amount: 20, at: Date.now()},
                {toId: selectedContact._id, to: selectedContact.name, amount: 10, at: Date.now()}
            ]
        }

        userService.loadUser.mockReturnValue(user)
        store = new UserStore(rootStore)

        expect(store.movesToCurrContact.length).toBe(1)
    })
    
})