import React from 'react'
import {mount} from 'enzyme';

import ContactPreview from './ContactPreview'

describe('ContactPreview', () => {
    
    const contact = {
      name: 'Joe',
      email: 'email@email.com',
      phone: '088-720-34-34'
    }

    it('should have image and name', () => {
      expect.assertions(4)

      const wrapper = mount(<ContactPreview contact={contact} />)
      const img = wrapper.find('img')
      expect(img).toBeDefined()
      expect(wrapper.contains(contact.name)).toEqual(true)
      expect(wrapper.contains(contact.email)).toEqual(false)
      expect(wrapper.contains(contact.phone)).toEqual(false)
    })
})