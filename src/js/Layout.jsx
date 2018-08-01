import React from 'react';
import Flux from "@4geeksacademy/react-flux-dash";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./views/Home.jsx";

export default class Layout extends Flux.View {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Switch>
                            <Route exact path="/" component={Home} />                            
                            <Route render={() => <h1>Not found!</h1>} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
