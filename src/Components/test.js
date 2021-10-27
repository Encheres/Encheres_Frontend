import React, {Component} from 'react';
import {Kaliedo_api} from '../apis_redux/apis/encheres'
class test extends Component {
    constructor(props) {
        super(props);
    }
    onClick = async() => {
        try{
            const  contractAddress = '0x5132bdd72834342db2616165145f54a2d58882c0'; // you can get this by calling the constructor function
            const result = await Kaliedo_api.get('/u0qiuild3m/' + contractAddress + '/age', {});
            console.log(result);
        }catch(e){
            console.log(e);
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.onClick}>  Submit</button>
            </div>
        );
    }
}
export default test;