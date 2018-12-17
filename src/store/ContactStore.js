import { observable, action  } from 'mobx';

export class ContactStore {
    @observable contacts = [];
    @observable selectedContact = {};
    @observable isLoading = false;
    @observable status = ''
    
    constructor(rootStore, contactService) {
        this.rootStore = rootStore
        this.contactService = contactService
        this.fetchContacts()
    }

    @action
    async fetchContacts(term = null) {
        const filterBy = {term}
        this.isLoading = true
        this.contacts = await this.contactService.getContacts(filterBy)
        this.isLoading = false
    }

    @action
    async fetchContact(id) {
        this.status = ''
        this.isLoading = true
        try {
            this.selectedContact = await this.contactService.getContactById(id)
        } catch(err) {
            this.status = 'error'
            this.selectedContact = {}
        } finally{
            this.isLoading = false
        }
    }

    @action
    async saveContact(contact) {
        const updatedContact = await this.contactService.saveContact(contact)
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
        await this.contactService.deleteContact(contact._id)
        await this.fetchContacts()
    }
}