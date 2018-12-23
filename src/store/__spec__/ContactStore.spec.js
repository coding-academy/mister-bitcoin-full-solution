import {ContactStore} from '../ContactStore'

import contactService from '../../services/ContactService'
jest.mock('../../services/ContactService');

describe('ContactStore', () => {
    
    const contacts = [{
        "_id": "5a56640269f443a5d64b32ca",
        "name": "Ochoa Hyde",
        "email": "ochoahyde@renovize.com",
        "phone": "+1 (968) 593-3824"
    },
    {
        "_id": "5a5664025f6ae9aa24a99fde",
        "name": "Hallie Mclean",
        "email": "halliemclean@renovize.com",
        "phone": "+1 (948) 464-2888"
    }]

    let store;

    beforeEach(() => {
        store = new ContactStore()
        contactService.getContacts.mockReset()
        contactService.getContactById.mockReset()
    })

    it('should fecth contacts successfully', async () => {
        expect.assertions(2)

        contactService.getContacts.mockResolvedValue(contacts)
        await store.fetchContacts()

        expect(store.contacts.length).toEqual(contacts.length)
        expect(contactService.getContacts).toBeCalled()
    })

    it('should fecth contact by id successfully', async () => {
        expect.assertions(2)
        const contact = contacts[0]
        contactService.getContactById.mockResolvedValue(contact)
        await store.fetchContact('aaa')

        expect(store.selectedContact).toEqual(contact)
        expect(contactService.getContactById).toBeCalled()
    })

    it('should set status to error when fetch rejected', async () => {
        expect.assertions(3)
        const error = 'some error'
        contactService.getContactById.mockImplementation(() => Promise.reject(error));
        await store.fetchContact('aaa')

        expect(store.selectedContact).toEqual({})
        expect(store.status).toBe('error')
        expect(contactService.getContactById).toBeCalled()
    })

    it('should add new contact', async () => {
        expect.assertions(3)

        const count = contacts.length
        const contact = {
            "name": "Parsons Norris",
            "email": "parsonsnorris@renovize.com",
            "phone": "+1 (958) 502-3495"
        }

        contactService.getContacts.mockResolvedValue(contacts)
        await store.fetchContacts()
        contactService.saveContact
            .mockResolvedValue(
                Object.assign(
                    {}, 
                    contact, 
                    {"_id": "bb"}));
        await store.saveContact(contact)

        expect(contactService.getContacts).toBeCalled()
        expect(store.contacts.length).toEqual(count + 1)
        expect(contactService.saveContact).toBeCalled()
    })

    it('should save updated an existing contact', async () => {
        expect.assertions(3)

        const count = contacts.length
        const contact = contacts[0]

        contact.name = "Jemmy Who"

        contactService.getContacts.mockResolvedValue(contacts)
        await store.fetchContacts()

        contactService.saveContact.mockResolvedValue(contact)
            
        await store.saveContact(contact)

        expect(contactService.getContacts).toBeCalled()
        expect(store.contacts.length).toEqual(count)
        expect(contactService.saveContact).toBeCalled()
    })
})