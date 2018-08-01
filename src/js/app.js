App = {
    web3Provider: null,
    contracts: {},

    init: function () {
        // Initialization
        return App.initWeb3();
    },

    initWeb3: function () {
        // Is there an injected web3 instance?
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },

    initContract: function () {
        fetch('Echo.json').then(function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract
            const EchoArtifact = data;
            App.contracts.Echo = TruffleContract(EchoArtifact);

            // Set the provider for our contract
            App.contracts.Echo.setProvider(App.web3Provider);

            // Use our contract to retrieve and mark the adopted pets
            App.bindEvents();
        });

        fetch('Sum.json').then(function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract
            App.contracts.Sum = TruffleContract(data);

            // Set the provider for our contract
            App.contracts.Sum.setProvider(App.web3Provider);

            // Use our contract to retrieve and mark the adopted pets
            App.bindEvents();
        });
    },

    bindEvents: () => {
        let button = document.querySelector("#send-button");
        console.log(button);
        button.addEventListener("click", () => {
            if (text !== "")
                App.echo(text);
        });

    },

    echo: function (text) {
        App.contracts.Sum.deployed().then(function (instance) {
            console.log(instance);
            return instance.sum.call(1, 2);
        }).then(function (text) {
            console.log("RESPONSE FROM CONTRACT:", text);
            const child = $(`<div class='row'>${text}</div>`);
            document.querySelector("history-board").appendChild(child);

        }).catch(function (err) {
            console.log(err.message);
        });



        let echoInstance;
        App.contracts.Echo.deployed().then(function (instance) {
            console.log(instance);
            echoInstance = instance;
            return echoInstance.echo.call(text);
        }).then(function (text) {
            console.log("RESPONSE FROM CONTRACT:", text);
            const child = $(`<div class='row'>${text}</div>`);
            document.querySelector("history-board").appendChild(child);

        }).catch(function (err) {
            console.log(err.message);
        });
    },
};

window.onload = function () {
    App.init();
};
