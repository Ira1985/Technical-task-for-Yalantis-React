import React, { Component, lazy, Suspense } from 'react';
import {userService} from "../services/UserServise";
import './user.css'


class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            checkedItems: []
        }
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
    render() {
        const {items, checkedItems} = this.state;

        const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
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
                    <ul>
                        {alphabet.map(arr => <div key={arr} className={'box'}>
                            {arr}
                            <ul>
                                {items.filter(item => item.lastName[0] === arr)
                                    .map(item => <li key={item.id} className={'userblock'}>
                                        {item.lastName + " " + item.firstName}
                                        <input type={'checkbox'} checked={checkedItems ? checkedItems.find(it => it.id === item.id) : false} onChange={(e) => {
                                            //localStorage.setItem("checked", "[]")
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
                                        }}/>
                                    </li>)}
                            </ul>
                        </div>)}

                    </ul>
                </div>
                <div className={'checkedRecord'}>
                    <h5>Employees birsday</h5>
                    <hr/>
                    {checkedItems ? Object.keys(objOfChecked).map(item => {
                        return <div>
                            <p>{item}</p>
                            {objOfChecked[item].map(it =>  {
                                let date = new Date( it.dob );
                                let month = date.toLocaleString('default', { month: 'long' });
                                return <li>{it.lastName + " " + it.firstName + " - " + date.getDate() + " " + month + ", " + date.getFullYear() + " year"}</li>
                            })}
                        </div>
                    }) : <div></div>}
                </div>
            </div>
        );
    }
}

export default Users;