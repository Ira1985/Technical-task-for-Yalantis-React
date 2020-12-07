import React, { Component, lazy, Suspense } from 'react';

class CheckedList extends Component {

    constructor(props) {
        super(props);
    }

    getObjOfChecked() {
        const {checkedItems} = this.props;
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
        return objOfChecked;
    }

    render() {
        const {checkedItems} = this.props;
        return (
                    checkedItems && checkedItems.length ? Object.keys(this.getObjOfChecked()).map(item => {
                        return <div>
                            <p>{item}</p>
                            {this.getObjOfChecked()[item].map(it =>  {
                                let date = new Date( it.dob );
                                let month = date.toLocaleString('default', { month: 'long' });
                                return <li>{it.lastName + " " + it.firstName + " - " + date.getDate() + " " + month + ", " + date.getFullYear() + " year"}</li>
                            })}
                        </div>
                    }) : <div>No selected employees</div>
        );
    }
}

export default CheckedList;