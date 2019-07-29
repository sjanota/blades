import React from "react";
import map from "./map";
import './CityMap.css';
import DistrictDetailsModal from "../DistrictDetailsModal/DistrictDetailsModal";
import CityImageMapper from "../CityImageMapper/CityImageMapper";

export default class CityMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: null,
            height: null,
            ref: React.createRef(),
            shouldUpdate: true,
            updateDelay: null,
            selectedArea: null
        };

        this.updateWidth = this.updateWidth.bind(this);
        this.updateWidthThrottle = this.updateWidthThrottle.bind(this);
    }

    updateWidth() {
        const width = this.state.ref.current.clientWidth;
        const height = this.state.ref.current.clientHeight;
        if (width !== this.state.width || height !== this.state.height) {
            this.setState({width, height});
        }
    }

    clearDelay() {
        if (this.state.updateDelay) {
            clearTimeout(this.state.updateDelay)
        }
    }

    updateWidthThrottle() {
        this.clearDelay();
        const updateDelay = setTimeout(function () {
            this.setState({shouldUpdate: true})
        }.bind(this), 300);
        this.setState({updateDelay, shouldUpdate: false});
        this.updateWidth();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState.shouldUpdate
    }

    componentDidMount() {
        this.updateWidth();
        window.addEventListener('resize', this.updateWidthThrottle);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWidth);
        this.clearDelay();
    }

    selectArea(area) {
        this.setState({selectedArea: area.name});
        console.log("clicked", area)
    }

    deselectArea() {
        this.setState({selectedArea: null})
    }

    render() {
        const {width, height, ref, selectedArea} = this.state;

        return (
            <div className={"CityMap"} ref={ref}>
                <DistrictDetailsModal
                    selectedArea={selectedArea}
                    deselectArea={this.deselectArea.bind(this)}
                />
                <CityImageMapper
                    width={width}
                    height={height}
                    selectArea={this.selectArea.bind(this)}
                    map={map}
                />
            </div>
        )
    }
}