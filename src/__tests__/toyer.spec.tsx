import { render } from '@testing-library/react';

import { Toyer } from '../toyer';

describe('testing', () => {
  it('test', () => {
    const { container } = render(<Toyer />);

    expect(container).toBeDefined();
  });
});
