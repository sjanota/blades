import React from 'react';
import './App.css';
import ImageMapper from 'react-image-mapper';
import doskvolMap from './doskvol-map.jpg';
import map from './const/map';
import ReactModal from 'react-modal';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedArea: null,
            width: null
        }
    }

    componentDidMount() {

    }


    render() {
        const {selectedArea, width} = this.state;
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
                <Wrapper
                    selectArea={this.selectArea.bind(this)}
                    setSize={this.setSize.bind(this)}
                    width={width}
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

    setSize(size) {
        if (size.width !== this.state.width) {
            console.log("set width", size.width);
            this.setState({width: size.width})
        }
    }
}

export default App;

class Wrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: null,
            ref: React.createRef()
        };

        this.updateWidth = this.updateWidth.bind(this);
    }

    updateWidth() {
        const width = this.state.ref.current.clientWidth;
        if (width !== this.state.width) {
            this.setState({width});
        }
    }

    componentDidMount() {
        this.updateWidth();

        window.addEventListener('resize', this.updateWidth);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWidth);
    }

    render() {
        const {selectArea} = this.props;
        const {width, ref} = this.state;

        return (
            <div className={"App-wrapper"} ref={ref}>
                <ImageMapper
                    src={doskvolMap} map={map}
                    imgWidth={2192} imgHeight={1648}
                    width={width} height={1648 * width / 2192}
                    onClick={selectArea}
                />
            </div>
        )
    }
}
