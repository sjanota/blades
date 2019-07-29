import React from 'react';
import CityImageMapper from "./CityImageMapper";
import {mount} from 'enzyme';
import ImageMapper from "react-image-mapper";

describe('CityImageMapper', () => {
    it('scales height if out of scale', () => {
        const width = 100;
        const height = 100;
        const wrapper = mount(<CityImageMapper width={width} height={height}/>);
        expect(wrapper.find(ImageMapper)).toHaveProp('height', 75);
        expect(wrapper.find(ImageMapper)).toHaveProp('width', 100);
    });

    it('scales width if out of scale', () => {
        const width = 300;
        const height = 100;
        const wrapper = mount(<CityImageMapper width={width} height={height}/>);
        expect(wrapper.find(ImageMapper)).toHaveProp('height', 100);
        expect(wrapper.find(ImageMapper)).toHaveProp('width', 133);
    });
});

