import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import { selectUserAddress } from '../Data/Selectors';

class AccountDisplay extends Component {
    render() {
        return (
            <span>
                {this.props.contract? <span role="img" aria-label="contract">📝</span>:<span role="img" aria-label="key">🔑</span>}
                {this.props.account}
                { (this.props.userAddress) && (this.props.account) && (this.props.userAddress.toLowerCase() === this.props.account.toLowerCase()) && (<b> (Vous)</b>)}
            </span>
        );
    }
}

export default connect(
    state => ({
        userAddress : selectUserAddress(state)
    }),
    dispatchEvent => ({})
)(AccountDisplay);