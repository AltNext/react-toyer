import { mount } from 'enzyme';

import { Toyer } from '../toyer';

describe('init', () => {
  it('should work', () => {
    const wrapper = mount(<Toyer />);

    expect(wrapper).toBeDefined();
  });
});
