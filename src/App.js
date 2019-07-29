import React from 'react';
import './App.css';
import CityMap from "./CityMap/CityMap";
import DistrictDetailsModal from "./DistrictDetailsModal/DistrictDetailsModal";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedArea: null,
        }
    }

    render() {
        const {selectedArea} = this.state;
        return (
            <div className="App">
                <DistrictDetailsModal
                    selectedArea={selectedArea}
                    deselectArea={this.deselectArea.bind(this)}
                />
                <CityMap
                    selectArea={this.selectArea.bind(this)}
                />
            </div>
        );
    }

    selectArea(area) {
        this.setState({selectedArea: area.name});
        console.log("clicked", area)
    }

    deselectArea() {
        this.setState({selectedArea: null})
    }
}

export default App;
