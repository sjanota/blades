import ImageMapper from "react-image-mapper";
import doskvolMap from "../CityMap/doskvol-map.jpg";
import React from "react";
import isEqual from "react-fast-compare";

export const imgWidth = 2192;
export const imgHeight = 1648;

const CityImageMapper = ({width, height, selectArea, map, setHighlightedDistrict, cleanHighlightedDistrict}) => {
    let scaledWidth = width;
    let scaledHeight = Math.floor(imgHeight * width / imgWidth);
    if (width/imgWidth > height/imgHeight) {
        scaledWidth = Math.floor(imgWidth * height / imgHeight);
        scaledHeight = height;
    }

    return <MyImageMapper
        src={doskvolMap} map={map}
        imgWidth={imgWidth} imgHeight={imgHeight}
        width={scaledWidth} height={scaledHeight}
        onClick={selectArea}
        onMouseEnter={area => setHighlightedDistrict(area.name)}
        onMaouseLeave={cleanHighlightedDistrict}
    />
};

class MyImageMapper extends ImageMapper {
    shouldComponentUpdate(nextProps) {
        const propChanged = this.watchedProps.some(prop => this.props[prop] !== nextProps[prop]);
        return !isEqual(nextProps.map, this.state.map) || propChanged;    }
}

export default CityImageMapper;