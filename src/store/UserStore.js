import { observable, action, computed  } from 'mobx';
import userService from '../services/UserService'
export class UserStore {
    @observable user = null;
    @observable isLoading = true;
    @observable isProcessing = true;

    constructor(rootStore) {
        this.rootStore = rootStore
        this.user = userService.loadUser()
    }
    
    @action
    signup(name) {
        this.isLoading = true
        this.user = userService.signup(name)
        this.isLoading = false
    }

    @action
    transferCoins(contact, amount) {
        this.isProcessing = true
        this.user = userService.addMove(contact, amount)
        this.isProcessing = false
    }

    @computed
    get isUserExist() {
        return !!this.user
    }

    @computed
    get movesToCurrContact() {
        const selectedContactId = this.rootStore.contactStore.selectedContact._id
        return this.user.moves.filter(move => move.toId === selectedContactId)
    }

    @computed
    get lastMoves() {
        return this.user.moves.slice(0, 3)
    }  
}