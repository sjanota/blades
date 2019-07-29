import React from "react";
import ImageMapper from "react-image-mapper";
import doskvolMap from "./doskvol-map.jpg";
import map from "./map";
import './CityMap.css';

export default class Wrapper extends React.Component {

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
            <div className={"CityMap"} ref={ref}>
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