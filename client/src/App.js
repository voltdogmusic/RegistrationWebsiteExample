import React, {Component} from 'react';

const herokuURL = 'https://morning-thicket-56092.herokuapp.com/';

class App2 extends Component {

    state = {
        title:""
    };


    componentDidMount() {
        this.getDataFromDb();
    }


    async getDataFromDb() {
        const respVar = await fetch(`http://localhost:3002/posts`);
        const jsonVar = await respVar.json();

        console.log(jsonVar);




    };



    render() {
        return (
            <div>

            </div>
        );
    }
}

App2.propTypes = {};

export default App2;
