import React from 'react'
import {mount} from 'enzyme';

import Input from './Input'

describe('Input', () => {
    
    const field = {
        name: 'fname',
        title: 'First Name',
        value: 'Joe'
    }

    const onInputChange = jest.fn()
    const wrapper = mount(<Input field={field} onInput={onInputChange} />) 
    

    beforeEach(() => {
        onInputChange.mockClear()
    })

    it('should set the props correctly inside the input', () => {
        expect.assertions(2)
        const inputRef = wrapper.find('input')
        const inputInstance = inputRef.instance()
        
        expect(inputInstance.value).toBe(field.value)
        expect(inputInstance.placeholder).toBe(field.name)
    })

    it('should call to onInput callback function', () => {
        expect.assertions(1)
        const inputRef = wrapper.find('input')
        inputRef.simulate('change');
        expect(onInputChange).toBeCalled()
    })

    it('should have title', () => {
        expect.assertions(1)
        const label = wrapper.find('label')
        expect(label.contains(field.title)).toEqual(true)
    })
})