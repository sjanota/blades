import React from 'react';
import './App.css';
import CityMap from "../CityMap/CityMap";
import {NavTab} from "react-router-tabs";
import {Redirect, Route, Switch} from "react-router";
import "react-router-tabs/styles/react-router-tabs.css";


class App extends React.Component {
    render() {
        return (
            <div className="App">
                <NavTab to={"/city-map"}>City Map</NavTab>
                <NavTab to={"/bohaters"}>Bohaters</NavTab>
                <div className={"App_Pages"}>
                    <Switch>
                        <Route path={"/city-map"} component={CityMap}/>
                        <Route path={"/bohaters"} render={() => <h3>Bohaters</h3>}/>
                        <Redirect to={"/city-map"} from={"/"}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
