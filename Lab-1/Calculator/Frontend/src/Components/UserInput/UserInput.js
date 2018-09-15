import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';

class userInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayValue : ''
        }
    }

    inputChangeHandler = (event)=> {
        this.setState({
            displayValue: event.target.value
        })
    }
    
    clearInputHandler = (event)=> {
        let originalInput = this.state.displayValue;
        let finalInput = originalInput.substring(0, originalInput.length - 1);
        this.setState({
            ...this.state,
            displayValue : finalInput
        })
    }

    displayInputHandler =(inputData)=> {
        let originalDisplay = this.state.displayValue;
        let outputDisplay = originalDisplay + inputData;
        this.setState({
            ...this.state,
            displayValue : outputDisplay
        })
    }

    processInputHandler =(event)=>{
        //prevent page from refresh
        event.preventDefault();

        // let data = {
        //     displayValue: this.state.displayValue
        // }

        // axios.get('http://localhost:3001/process?displayValue='+ this.state.displayValue)
        axios.get('http://localhost:3001/process', {params:{displayValue:this.state.displayValue}})
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                this.setState({
                    displayValue : response.data.displayValue
                })
            }else if(response.status === 500){
                this.setState({
                    displayValue : "Please Enter the correct Operands"
                })
            } else {
                this.setState({
                    displayValue : response.data.displayValue 
            })
            }
        })
        .catch( error =>{
            console.log("error:", error);
        });
    }

    render(){
        const inputBoxStyle = {
            fontSize: '25px',
            padding : '10px auto',
            margin: '10px auto',
            textAlign: 'right',
            border: '2px solid purple',
            width: '97%',
            height: '50px'
        }
        return(
            <div className="container">
                <div className="login-form">
                    <div className="main-div">
                        <div className="panel">
                            <h2>Calculator</h2>
                            <p>Please enter Input</p>
                        </div>
                        <div>
                            <input style={inputBoxStyle} type="text" autoFocus
                                    onChange={this.inputChangeHandler}
                                    value={this.state.displayValue} />
                            <br></br>
                            <br></br>         
                        </div>
                        <div>
                            <div style={{width: "45%",float: "left", cursor : "pointer"}}>
                            <button style = {{cursor : "pointer"}} onClick= {()=>{this.displayInputHandler("+")}} className="btn btn-primary" type="submit">+</button>
                            <br></br>
                            <br></br>
                            </div>   
                            <div style={{width: "45%", float: "right"}}>
                                <button style = {{cursor : "pointer"}} onClick= {()=>{this.displayInputHandler("-")}} className="btn btn-primary" type="submit">-</button>
                                <br></br>
                                <br></br>
                            </div>
                            <div style={{width: "45%",float: "left", cursor : "pointer"}}>
                                <button style = {{cursor : "pointer"}} onClick= {()=>{this.displayInputHandler("*")}} className="btn btn-primary" type="submit">*</button>
                                <br></br>
                                <br></br> 
                            </div>
                            <div style={{width: "45%", float: "right"}}>
                                <button style = {{cursor : "pointer"}} onClick= {()=>{this.displayInputHandler("/")}} className="btn btn-primary" type="submit">/</button>
                                <br></br>
                                <br></br> 
                            </div>
                                <div style={{width: "45%",float: "left"}}>
                                <button style = {{cursor : "pointer"}} onClick= {()=>{this.clearInputHandler()}} className="btn btn-response" type="submit">Clear</button>
                                </div>
                            <form>
                                <div style={{width: "45%", float: "right"}}>
                                    <button style = {{cursor : "pointer"}} onClick= {this.processInputHandler.bind(this)} className="btn btn-response" type="submit">Enter</button>
                                </div> 
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
        }
    // }
}

export default userInput;