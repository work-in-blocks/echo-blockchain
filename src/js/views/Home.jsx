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
            web3: null,
            contracts: {}
        };
        // this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    componentDidMount() {
        let web3Provider;
        if (typeof web3 !== 'undefined') {
            web3Provider = web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
        }
        web3 = new Web3(web3Provider);
        const EchoArtifact = Echo;
        this.state.contracts.Echo = TruffleContract(EchoArtifact);

        // Set the provider for our contract
        this.state.contracts.Echo.setProvider(web3Provider);

        this.getFullHistory();

    }

    getFullHistory() {
        console.log("METAMASK2");
        let echoInstance;
        const that = this;
        this.state.contracts.Echo.deployed().then(function (instance) {
            echoInstance = instance;
            return echoInstance.fullHistory.call();
        }).then(function (text) {
            console.log("RESPONSE FROM CONTRACT:", text);
            that.setState({msgs: text.split("||")});
        }).catch(function (err) {
            console.log(err);
        });
    }

    echo() {
        let echoInstance;
        const that = this;

        web3.eth.getAccounts(function (error, accounts) {
            if ("GET ACCOUNTS ERRORL", error) {
                console.log(error);
            }

            const account = accounts[0];
            that.state.contracts.Echo.deployed().then(function (instance) {
                echoInstance = instance;
                const msg = `${that.state.username}: ${that.state.text}`;
                return echoInstance.echo(msg, {from: account});
            }).then(function (text) {
                console.log("METAMASK1");
                that.getFullHistory();
            }).catch(function (err) {
                console.log("ECHO ERROR:", err.message);
            });
        });
    }

    render() {
        const msgHTML = this.state.msgs.map((msg, i) => {
            return <li key={i}>
                {msg}
            </li>
        });

        return (
            <div className="text-center mt-5">
                <h1>My first DAPP</h1>
                <ul>
                    {msgHTML}
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
