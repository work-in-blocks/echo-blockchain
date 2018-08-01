import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
//include images into your bundle
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import Echo from '../../contracts/Echo.json';


export default class Home extends Flux.View {

    constructor() {
        super();
        this.state = {
            msgs: [],
            username: '',
            text: '',
            web3Provider: null,
            web3: null,
            contracts: {}
        };
        // this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    componentDidMount() {
        console.log("componentDidMount");
        if (typeof web3 !== 'undefined') {
            this.state.web3Provider = web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            this.state.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        this.state.web3 = new Web3(this.state.web3Provider);
        console.log("TRUFFLE", TruffleContract);
        console.log("ECHO", Echo);
        const EchoArtifact = Echo;
        this.state.contracts.Echo = TruffleContract(EchoArtifact);

        // Set the provider for our contract
        this.state.contracts.Echo.setProvider(this.state.web3Provider);

        this.getFullHistory();

    }

    getFullHistory() {
        let echoInstance;
        const that = this;
        this.state.contracts.Echo.deployed().then(function (instance) {
            echoInstance = instance;
            return echoInstance.fullHistory.call();
        }).then(function (text) {
            console.log("RESPONSE FROM CONTRACT:", text);
        }).catch(function (err) {
            console.log(err);
        });
    }

    echo() {
        let echoInstance;
        const that = this;
        this.state.contracts.Echo.deployed().then(function (instance) {
            echoInstance = instance;
            const msg = `${that.state.username}: ${that.state.text}`;
            return echoInstance.echo.call(msg);
        }).then(function (text) {
            console.log("RESPONSE FROM CONTRACT:", text);
            that.state.msgs.push(text);
            that.setState({msgs: that.state.msgs});
            this.getFullHistory();
        }).catch(function (err) {
            console.log(err.message);
        });
    }

    render() {
        return (
            <div className="text-center mt-5">
                <h1>My first DAPP</h1>

                <ul>
                    <li>Test</li>
                </ul>
                <br/>
                <p>
                    Username:<input type="text" onChange={(e) => this.setState({username: e.target.value})}
                                    value={this.state.username}/>
                </p>
                <p>
                    Text:<input type="text" onChange={(e) => this.setState({text: e.target.value})}
                                value={this.state.text}/>
                </p>
                <button onClick={() => {
                    console.log("1");
                    this.echo()
                }}>SEND
                </button>
            </div>
        );
    }
}
