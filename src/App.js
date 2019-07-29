import React from 'react';
import './App.css';
import ImageMapper from 'react-image-mapper';
import doskvolMap from './doskvol-map.jpg';
import map from './const/map';
import ReactModal from 'react-modal';
import CityMap from "./CityMap";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedArea: null,
        }
    }

    componentDidMount() {

    }


    render() {
        const {selectedArea} = this.state;
        console.log("Selected area", this.state.selectedArea);
        return (
            <div className="App">
                <ReactModal
                    isOpen={selectedArea != null}
                    onRequestClose={this.deselectArea.bind(this)}
                    style={{
                        content: {
                            top: '5%',
                            left: '20%',
                            right: '20%',
                            bottom: 'auto',
                        }
                    }}
                >
                    <h3>{selectedArea}
                    </h3>
                </ReactModal>
                <CityMap
                    selectArea={this.selectArea.bind(this)}
                />
            </div>
        );
    }

    selectArea(area, _, event) {
        this.setState({selectedArea: area.name});
        console.log("clicked", area)
    }

    deselectArea() {
        this.setState({selectedArea: null})
    }
}

export default App;
