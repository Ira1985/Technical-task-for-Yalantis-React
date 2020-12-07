import React, { Component, lazy, Suspense } from 'react';
import {userService} from "../services/UserServise";
import './user.css'
import UserList from "./UserList";
import CheckedList from "./CheckedList";


class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            checkedItems: []
        }
        this.changeChecked = this.changeChecked.bind(this);
    }

    componentDidMount() {
        userService.getList()
            .then(result => {
                result.sort((emp1, emp2) => emp1.lastName > emp2.lastName ? 1 : -1);
                this.setState({
                    items: result,
                    checkedItems: JSON.parse(localStorage.getItem("checked"))
                })
            });
    }

    changeChecked(e, item) {
        let obj = JSON.parse(localStorage.getItem("checked")) || [];
        if (e.target.checked) {
            obj.push(item);
        } else {
            let index;
            obj.find((it, i) => {
                if(it.id === item.id)
                    index = i;
            })
            obj.splice(index, 1)
        }
        localStorage.setItem("checked", JSON.stringify(obj))
        this.setState({checkedItems: obj})
    }
    render() {
        const {items, checkedItems} = this.state;

        return (
            <div className={'records'}>
                <div className={'allRecord'}>
                    <h5>Employees</h5>
                    <UserList items={items} checkedItems={checkedItems} changeChecked={this.changeChecked}></UserList>
                </div>
                <div className={'checkedRecord'}>
                    <h5>Employees birsday</h5>
                    <hr/>
                    <CheckedList checkedItems={checkedItems}></CheckedList>
                </div>
            </div>
        );
    }
}

export default Users;