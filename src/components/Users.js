import React, { Component, lazy, Suspense } from 'react';
import {userService} from "../services/UserServise";
import './user.css'
import UserList from "./UserList";


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

        let objOfChecked = {};
        let addObj = checkedItems ? checkedItems.map(item => {
            let date = new Date( item.dob );
            let month = date.toLocaleString('default', { month: 'long' });
            if(objOfChecked.hasOwnProperty(month)) {
                objOfChecked[month].push(item);
            } else {
                objOfChecked[month] = [item];
            }
        }) :  {};
        return (
            <div className={'records'}>
                <div className={'allRecord'}>
                    <h5>Employees</h5>
                    <UserList items={items} checkedItems={checkedItems} changeChecked={this.changeChecked}></UserList>
                </div>
                <div className={'checkedRecord'}>
                    <h5>Employees birsday</h5>
                    <hr/>
                    {checkedItems && checkedItems.length ? Object.keys(objOfChecked).map(item => {
                        return <div>
                            <p>{item}</p>
                            {objOfChecked[item].map(it =>  {
                                let date = new Date( it.dob );
                                let month = date.toLocaleString('default', { month: 'long' });
                                return <li>{it.lastName + " " + it.firstName + " - " + date.getDate() + " " + month + ", " + date.getFullYear() + " year"}</li>
                            })}
                        </div>
                    }) : <div>No selected employees</div>}
                </div>
            </div>
        );
    }
}

export default Users;