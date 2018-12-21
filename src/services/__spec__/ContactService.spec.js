import contactService from '../ContactService'

describe('ContactService', () => {

    it('should get contacts successfully', async () => {
        expect.assertions(1)

        const contacts = await contactService.getContacts()
        expect(contacts).toBeTruthy()
    })

    it('should get contacts with filter return one contact', async () => {
        expect.assertions(1)

        const contacts = await contactService.getContacts({term: 'Parsons'})
        expect(contacts.length).toBe(1)
    })

    it('should get contacts with filter empty array when search term not exist', async () => {
        expect.assertions(1)

        const contacts = await contactService.getContacts({term: 'aaa'})
        expect(contacts.length).toBe(0)
    })

    it('should get one contact by id successfully', async () => {
        expect.assertions(2)

        const contact = await contactService.getContactById('5a56640252d6acddd183d319')
        expect(contact).toBeTruthy()
        expect(contact).toEqual(
            expect.objectContaining({
              name: expect.any(String),
              email: expect.any(String),
              phone: expect.any(String),
              _id: expect.any(String),
            }),
          )
    })

    it('should delete contact successfully', async () => {
        expect.assertions(2)

        const contacts = await contactService.getContacts()
        const contactsCount = contacts.length
        const updatedContacts = await contactService.deleteContact(contacts[0]._id)
        expect(updatedContacts).toBeTruthy()
        expect(updatedContacts.length).toEqual(contactsCount-1)
    })

    it('should edit existing contact successfully', async () => {
        expect.assertions(2)

        var contacts = await contactService.getContacts()
        const contactsCount = contacts.length
        const contact = JSON.parse(JSON.stringify(contacts[0]))
        contact.name = 'Muki'

        const updatedContact = await contactService.saveContact(contact)

        contacts = await contactService.getContacts()
        expect(updatedContact).toBeTruthy()
        expect(contacts.length).toEqual(contactsCount)
    })

    it('should add new contact successfully', async () => {
        expect.assertions(3)
        const contact = {
            name: 'Puki',
            email: 'puki@email.com',
            phone: '9876543'
        }

        var contacts = await contactService.getContacts()
        const contactsCount = contacts.length
        const updatedContact = await contactService.saveContact(contact)
        contacts = await contactService.getContacts()
        expect(updatedContact).toBeTruthy()
        expect(updatedContact._id).toBeTruthy()
        expect(contacts.length).toEqual(contactsCount+1)
    })

    it('should get empty contact successfully', async () => {
        expect.assertions(3)

        const contact = await contactService.getEmptyContact()
        expect(contact).toBeTruthy()
        expect(contact).toEqual(
            expect.objectContaining({
              name: expect.any(String),
              email: expect.any(String),
              phone: expect.any(String),
              
            }),
          )

        expect(contact._id).toBeUndefined()
    })
})