import React, { Component, lazy, Suspense } from 'react';
import './user.css'

class UserList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {items, checkedItems, changeChecked} = this.props;

        const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        return (
                    <ul>
                        {alphabet.map(arr => <div key={arr} className={'box'}>
                            {arr}
                            <ul>
                                {items.filter(item => item.lastName[0] === arr)
                                    .map(item => <li key={item.id} className={'userblock'}>
                                        {item.lastName + " " + item.firstName}
                                        <input type={'checkbox'} checked={checkedItems ? checkedItems.find(it => it.id === item.id) : false} onChange={(e) => {
                                            //localStorage.setItem("checked", "[]")
                                            changeChecked(e, item);
                                        }}/>
                                    </li>)}
                            </ul>
                        </div>)}

                    </ul>
        );
    }
}

export default UserList;