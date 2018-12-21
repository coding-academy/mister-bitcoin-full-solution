import {ContactStore} from './ContactStore'
import {UserStore} from './UserStore'

class RootStore {

    constructor() {
      this.contactStore = new ContactStore(this)
      this.userStore = new UserStore(this)
    }

}

export const store = new RootStore()