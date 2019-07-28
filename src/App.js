import React from 'react';
import './App.css';
import ImageMapper from 'react-image-mapper';
import doskvolMap from './doskvol-map.jpg';
import map from './const/map';

const width = 1000;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="App">
                    <ImageMapper src={doskvolMap} map={map}
                                 imgWidth={2192} imgHeight={1648}
                                 width={width} height={1648*width/2192}
                                 onLoad={this.load}
                                 onClick={this.clicked}
                                 onMouseEnter={this.enterArea}
                                 onMouseLeave={this.leaveArea}
                                 onMouseMove={this.moveOnArea}
                                 onImageClick={this.clickedOutside}
                                 onImageMouseMove={this.moveOnImage}
                    />
            </div>
        );
    }

    clicked(area, _, event) {
        console.log("clicked", area)
    }

    load() {
        console.log("load")
    }

    enterArea(area) {
        console.log("enterArea", area)
    }

    leaveArea(area) {
        console.log("leaveArea", area)
    }

    moveOnArea(area) {
        console.log("moveOnArea", area)
    }

    clickedOutside(area) {
        console.log("clickedOutside", area)
    }

}

export default App;
