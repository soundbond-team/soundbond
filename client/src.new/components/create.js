import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
 
export default class Create extends Component {
    // This is the constructor that stores the data.
    constructor(props) {
        super(props);
    
        this.onChangeExampleAttribute = this.onChangeExampleAttribute.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            string_attribute: "",
        };
    }
 
    // This methods will update the state properties.
    onChangePersonLevel(e) {
        this.setState({
            string_attribute: e.target.value,
        });
    }
 
    // This function will handle the submission.
    onSubmit(e) {
        e.preventDefault();
    
        // When post request is sent to the create url, axios will add a new record(newAttribute) to the database.
        const newAttribute = {
            string_attribute: this.state.string_attribute,
        };
    
        axios
            .post("http://localhost:5000/example/add", newAttribute)
            .then((res) => console.log(res.data));
    
        // We will empty the state after posting the data to the database
        this.setState({
            string_attribute: "",
        });
    }
 
    // This following section will display the form that takes the input from the user.
    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <h3>Create New Record</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>String attribute: </label>
                    <input
                    type="text"
                    className="form-control"
                    value={this.state.string_attribute}
                    onChange={this.onChangeExampleAttribute}
                    />
                </div>
                <div className="form-group">
                    <input
                    type="submit"
                    value="Create Example"
                    className="btn btn-primary"
                    />
                </div>
                </form>
            </div>
        );
    }
}