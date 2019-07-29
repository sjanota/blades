import React from "react";
import ImageMapper from "react-image-mapper";
import doskvolMap from "./doskvol-map.jpg";
import map from "./map";

const imgWidth = 2192;
const imgHeight = 1648;

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
        this.updateWidthDelayed = this.updateWidthDelayed.bind(this);
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

    clearDelay() {
        if (this.state.updateDelay) {
            clearTimeout(this.state.updateDelay)
        }
    }

    updateWidthDelayed() {
        this.clearDelay();
        const updateDelay = setTimeout(function () {
            this.setState({shouldUpdate: true})
        }.bind(this), 200);
        this.setState({updateDelay, shouldUpdate: false});
        this.updateWidth();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState.shouldUpdate
    }

    componentDidMount() {
        this.updateWidth();
        window.addEventListener('resize', this.updateWidthDelayed);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWidth);
        this.clearDelay();
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