import React, {Component} from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import './ContactFilter.css'
@observer
class ContactFilter extends Component {
    @observable term = '';

    onInputChange = (ev) => {
      this.term = ev.target.value;
      this.props.onFilter(this.term);
    }

    render(){
        return (
            <div className="contact-filter">
                <input
                    placeholder="Search"
                    value={this.term}
                    onChange={this.onInputChange} />
            </div>
        );
    }
}

export default ContactFilter

