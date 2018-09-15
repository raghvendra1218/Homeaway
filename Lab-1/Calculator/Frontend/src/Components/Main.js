import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import userInput from './UserInput/UserInput'
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={userInput}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;