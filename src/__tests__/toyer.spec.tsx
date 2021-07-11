import { mount } from 'enzyme';

import { Toyer } from '../toyer';

it('Test', () => {
  const wrapper = mount(<Toyer />);

  expect(wrapper).toExist();
});
