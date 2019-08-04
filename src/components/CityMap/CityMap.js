import React from "react";
import map from "./map";
import './CityMap.css';
import DistrictDetailsModal from "../DistrictDetailsModal/DistrictDetailsModal";
import CityImageMapper from "../CityImageMapper/CityImageMapper";
import {Route} from "react-router";

export default class CityMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: null,
            height: null,
            ref: React.createRef(),
            shouldUpdate: true,
            updateDelay: null
        };

        this.updateWidth = this.updateWidth.bind(this);
        this.updateWidthThrottle = this.updateWidthThrottle.bind(this);
    }

    updateWidth() {
        if (!this.state.ref.current) {
            return
        }

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
        this.clearDelay();
        window.removeEventListener('resize', this.updateWidth);
    }

    selectArea(area) {
        const {history, match} = this.props;
        history.push(`${match.url}/${area.name}`);
    }

    render() {
        const {match} = this.props;
        const {width, height, ref} = this.state;

        return (
            <div className={"CityMap"} ref={ref}>
                <Route path={`${match.url}/:district`} component={RoutedDistrictDetailsModal}/>
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

const RoutedDistrictDetailsModal = ({match, history}) => {
    return <DistrictDetailsModal
        district={match.params.district}
        onRequestClose={history.goBack}
    />
};