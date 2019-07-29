import ImageMapper from "react-image-mapper";
import doskvolMap from "../CityMap/doskvol-map.jpg";
import React from "react";

export const imgWidth = 2192;
export const imgHeight = 1648;

const CityImageMapper = ({width, height, selectArea, map}) => {
    let scaledWidth = width;
    let scaledHeight = Math.floor(imgHeight * width / imgWidth);
    if (width/imgWidth > height/imgHeight) {
        scaledWidth = Math.floor(imgWidth * height / imgHeight);
        scaledHeight = height;
    }

    return <ImageMapper
        src={doskvolMap} map={map}
        imgWidth={imgWidth} imgHeight={imgHeight}
        width={scaledWidth} height={scaledHeight}
        onClick={selectArea}
    />
};

export default CityImageMapper;