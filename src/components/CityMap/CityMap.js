import React from "react";
import ImageMapper from "react-image-mapper";
import doskvolMap from "./doskvol-map.jpg";
import map from "./map";
import './CityMap.css';

const imgWidth = 2192;
const imgHeight = 1648;

export default class Wrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: null,
            height: null,
            ref: React.createRef()
        };

        this.updateWidth = this.updateWidth.bind(this);
    }

    updateWidth() {
        const currentWidth = this.state.ref.current.clientWidth;
        const currentHeight = this.state.ref.current.clientHeight;
        if (currentWidth !== this.state.width || currentHeight !== this.state.height) {
            let width = currentWidth;
            let height = imgHeight * width / imgWidth;
            if (currentWidth/imgWidth > currentHeight/imgHeight) {
                height = currentHeight;
                width = imgWidth * height / imgHeight;
            }
            this.setState({width, height});
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
        const {width, height, ref} = this.state;

        return (
            <div className={"CityMap"} ref={ref}>
                <ImageMapper
                    src={doskvolMap} map={map}
                    imgWidth={imgWidth} imgHeight={imgHeight}
                    width={width} height={height}
                    onClick={selectArea}
                />
            </div>
        )
    }
}