import React from "react";
import map from "./map";
import './CityMap.css';
import DistrictDetailsModal from "../DistrictDetailsModal/DistrictDetailsModal";
import CityImageMapper from "../CityImageMapper/CityImageMapper";
import {Route} from "react-router";
import classnames from 'classnames'

export default class CityMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: null,
            height: null,
            ref: React.createRef(),
            shouldUpdate: true,
            updateDelay: null,
            selectedDistrict: null
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
        const {width, height, ref, selectedDistrict} = this.state;

        const newMap = {
            name: map.name,
            areas: map.areas.map( area => {
                // console.log("is selected", area.name, area.name === selectedDistrict);
                return area.name !== selectedDistrict ? area :
                    {...area, preFillColor: "rgba(255, 255, 255, 0.5)"}
            })
        };

        return (
            <div className={"CityMap"}>
                <DistrictsList
                    districts={map.areas}
                    selectedDistrict={selectedDistrict}
                    selectDistrict={this.selectDistrict.bind(this)}
                    deselectDistrict={this.deselectDistrict.bind(this)}
                />
                <Route path={`${match.url}/:district`} component={RoutedDistrictDetailsModal}/>
                <div className={"CityMap_Image"} ref={ref}>
                    <CityImageMapper
                        width={width}
                        height={height}
                        selectArea={this.selectArea.bind(this)}
                        map={newMap}
                    />
                </div>
            </div>
        )
    }

    selectDistrict(selectedDistrict) {
        this.setState({selectedDistrict})
    }

    deselectDistrict() {
        this.setState({selectedDistrict: null});
    }
}

const RoutedDistrictDetailsModal = ({match, history}) => {
    return <DistrictDetailsModal
        district={match.params.district}
        onRequestClose={history.goBack}
    />
};

const DistrictsList = ({districts, selectedDistrict, selectDistrict, deselectDistrict}) => {

    const onMouseEnter = (districtName) => () => {
        selectDistrict(districtName)
    };

    return <ul className={'DistrictList'}>
        {districts.map(district => {
            const classes = classnames('DistrictListEntry', {
                active: selectedDistrict === district.name
            });
            return <li
                key={district.name}
                className={classes}
                onMouseEnter={onMouseEnter(district.name)}
                onMouseLeave={deselectDistrict}
            >{district.name}</li>
        })}
    </ul>
};
