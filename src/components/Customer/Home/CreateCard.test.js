import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import CreateCard from './CreateCard.js';
import GroupedButton from './GroupedButton.js'

configure({adapter: new Adapter()});

describe('<CreateCard />', () => {
    it('should receive price from the grouped butto to print', () => {
        const wrapper = shallow(<CreateCard />);
        expect(wrapper.find(GroupedButton));
    });
});