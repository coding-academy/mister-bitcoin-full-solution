import {ContactStore} from './ContactStore'
import {UserStore} from './UserStore'

import ContactService from '../services/ContactService'
import {UserService} from '../services/UserService'

class RootStore {

    constructor() {
      this.contactStore = new ContactStore(this, ContactService)
      this.userStore = new UserStore(this, UserService)
    }

}

export const store = new RootStore()