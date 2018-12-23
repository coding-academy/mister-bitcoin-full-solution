import { observable, action  } from 'mobx';
import contactService from '../services/ContactService'
export class ContactStore {
    @observable contacts = []
    @observable selectedContact = {}
    @observable nextContactId = ''
    @observable isLoading = false
    @observable status = ''
    
    @action
    async fetchContacts(filterBy = null) {
        this.isLoading = true
        this.contacts = await contactService.getContacts(filterBy)
        this.isLoading = false
    }

    @action
    async fetchContact(id) {
        this.status = ''
        this.isLoading = true
        try {
            this.selectedContact = await contactService.getContactById(id)
            this.nextContactId  = await contactService.getNextContactId(id)
        } catch(err) {
            this.status = 'error'
        } finally{
            this.isLoading = false
        }
    }

    @action
    async saveContact(contact) {
        const updatedContact = await contactService.saveContact(contact)
        if (contact._id) {
            const index = this.contacts.findIndex(c => c._id === contact._id)
            this.contacts[index] = contact
        } else {
            this.contacts.push(updatedContact)
        }

        return updatedContact
    }

    @action
    async deleteContact(contact) {
        if (!contact._id) return
        await contactService.deleteContact(contact._id)
        await this.fetchContacts()
    }
}