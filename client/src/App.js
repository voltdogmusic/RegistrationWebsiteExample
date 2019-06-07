// /client/App.js
import React, {Component} from 'react';
import axios from 'axios';


const localURL = 'http://localhost:3000/';
const herokuURL = 'https://morning-thicket-56092.herokuapp.com/';

class App extends Component {
    // initialize our state
    state = {
        data: [],
        id: 0,
        message: null,
        intervalIsSet: false,
        idToDelete: null,
        idToUpdate: null,
        objectToUpdate: null,
    };

    // when component mounts, first thing it does is fetch all existing data in our db
    // then we incorporate a polling logic so that we can easily see if our db has
    // changed and implement those changes into our UI
    componentDidMount() {
        this.getDataFromDb();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getDataFromDb, 1000);
            this.setState({ intervalIsSet: interval });
        }
    }

    // never let a process live forever
    // always kill a process everytime we are done using it
    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }

    // just a note, here, in the front end, we use the id key of our data object
    // in order to identify which we want to Update or delete.
    // for our back end, we use the object id assigned by MongoDB to modify
    // data base entries

    // our first get method that uses our backend api to
    // fetch data from our data base
    //this does not work like the other one, only with localhost
    getDataFromDb = () => {
        fetch(herokuURL+ 'api/getData')
            .then((data) => data.json()) //turn incoming data into JSON, using the JSON method on the object the promise gives us
            .then((res) => this.setState({data: res.data}));//set the state to the data

        console.log(this.state.data);
    };

    // our put method that uses our backend api
    // to create new query into our data base

    //message comes from the value in the form (see the render method), the message is captured in the input and then updated with the button
    //<button onClick={() => this.putDataToDB(this.state.message)}>
    //                         ADD
    //                     </button>
    putDataToDB = (message) => {
        let currentIds = this.state.data.map((data) => data.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }

        //axios post request, notice the second parameter contains an object to post, the first param is the URI of the service endpoint
        axios.post(herokuURL+ 'api/putData', {
            id: idToBeAdded,
            message: message,
        });
    };

    // our delete method that uses our backend api
    // to remove existing database information
    deleteFromDB = (idTodelete) => {
        parseInt(idTodelete);
        let objIdToDelete = null;
        this.state.data.forEach((dat) => {
            if (dat.id == idTodelete) {
                objIdToDelete = dat._id;
            }
        });

        axios.delete(herokuURL+ 'api/deleteData', {
            data: {
                id: objIdToDelete,
            },
        });
    };

    // our update method that uses our backend api
    // to overwrite existing data base information
    updateDB = (idToUpdate, updateToApply) => {
        let objIdToUpdate = null;
        parseInt(idToUpdate);
        this.state.data.forEach((dat) => {
            if (dat.id == idToUpdate) {
                objIdToUpdate = dat._id;
            }
        });

        axios.post(herokuURL+ 'api/updateData', {
            id: objIdToUpdate,
            update: {message: updateToApply},
        });
    };

    // here is our UI
    // it is easy to understand their functions when you
    // see them render into our screen
    render() {
        const {data} = this.state;
        return (
            <div>
                <ul>
                    {data.length <= 0
                        ? 'NO DB ENTRIES YET'
                        : data.map((dat) => (
                            <li style={{padding: '10px'}} key={data.message}>
                                <span style={{color: 'gray'}}> id: </span> {dat.id} <br/>
                                <span style={{color: 'gray'}}> data: </span>
                                {dat.message}
                            </li>
                        ))}
                </ul>
                <div style={{padding: '10px'}}>
                    <input
                        type="text"
                        onChange={(e) => this.setState({message: e.target.value})}
                        placeholder="add something in the database"
                        style={{width: '200px'}}
                    />
                    <button onClick={() => this.putDataToDB(this.state.message)}>
                        ADD
                    </button>
                </div>
                <div style={{padding: '10px'}}>
                    <input
                        type="text"
                        style={{width: '200px'}}
                        onChange={(e) => this.setState({idToDelete: e.target.value})}
                        placeholder="put id of item to delete here"
                    />
                    <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
                        DELETE
                    </button>
                </div>
                <div style={{padding: '10px'}}>
                    <input
                        type="text"
                        style={{width: '200px'}}
                        onChange={(e) => this.setState({idToUpdate: e.target.value})}
                        placeholder="id of item to update here"
                    />
                    <input
                        type="text"
                        style={{width: '200px'}}
                        onChange={(e) => this.setState({updateToApply: e.target.value})}
                        placeholder="put new value of the item here"
                    />
                    <button
                        onClick={() =>
                            this.updateDB(this.state.idToUpdate, this.state.updateToApply)
                        }
                    >
                        UPDATE
                    </button>
                </div>
            </div>
        );
    }
}

export default App;