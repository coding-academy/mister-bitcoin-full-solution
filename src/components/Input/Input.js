import React from 'react';
import './Input.css'

const Input = (props) => {
    
    const onInputChange = (event) => {
      props.onInput({[props.field.name]: event.target.value});
    }

    const {value, title, name } = props.field
    return (
        <div className="form-group input-container">
            {title && (<label>{title}</label>)}
            <input 
                className="input"
                placeholder={name}
                value={value}
                onChange={onInputChange}/>
        </div>
    );
}

export default Input