import {UserStore} from '../UserStore'

import {UserService} from '../../services/UserService'
jest.mock('../../services/UserService');

describe('UserStore', () => {
    
    let store;
    let newUser = {
        name: "Muki", 
        coins: 100, 
        moves: []
    }

    beforeEach(() => {
        UserService.loadUser.mockReturnValue(newUser)
        store = new UserStore(null, UserService)
    })

    it('should signup successfully', async () => {
        expect.assertions(5)

        UserService.signup.mockReturnValue(newUser)
        store.signup('aa')

        expect(store.user).toBeTruthy()
        expect(store.user.name).toBe(newUser.name)
        expect(store.user.coins).toBe(newUser.coins)
        expect(store.user.moves.length).toBe(0)
        expect(UserService.signup).toBeCalled()
    })

    it('should call to update move', async () => {
        expect.assertions(1)
        UserService.addMove.mockReturnValue(newUser)
        store.transferCoins(null, 2)
        expect(UserService.addMove).toBeCalled()
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

        UserService.loadUser.mockReturnValue(user)
        store = new UserStore(rootStore, UserService)

        expect(store.movesToCurrContact.length).toBe(1)
    })
    
})