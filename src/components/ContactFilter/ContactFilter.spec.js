import React from 'react'
import {mount} from 'enzyme';

import ContactFilter from './ContactFilter'

describe('ContactFilter', () => {
    
    it('should invoke callback with object that contains search property', () => {
        const text = 'some search text'
        expect.assertions(1)

        return new Promise( resolve => {

            const onFilter = ({search}) => {
                expect(search).toBe(text)
                resolve()
            }

            const wrapper = mount(<ContactFilter onFilter={onFilter} />)
            const input = wrapper.find('input')
    
            input.simulate('change', {target: {value: text}});
        })
    })
})