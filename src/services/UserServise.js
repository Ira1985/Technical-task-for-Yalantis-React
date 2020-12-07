import {API} from "../helpers/configAxios";

export const userService = {
    getList,
    //getItem
};

function getList() {
    return API.get('/task0/users')
        .then(res => {
            if(res && res.status === 200){
                if(res.data){
                    return res.data;
                }else
                    return null;
            }
            return null;
        })
        .catch(error => {
            console.log(error);
            return error;
        });
}