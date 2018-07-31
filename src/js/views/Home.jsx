import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
//include images into your bundle

export default class Home extends Flux.View {
    
  render() {
    return (
        <div className="text-center mt-5">
            <h1>My first DAPP</h1>
           
            <ul>
                {msgs}
            </ul>
            <br/>
            <input type="text" />
            <button>SEND</button>
        </div>
    );
  }
}
