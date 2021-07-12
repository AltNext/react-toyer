import { render } from '@testing-library/react';

import { Toyer } from '../toyer';

describe('init', () => {
  it('should work', () => {
    const { container } = render(<Toyer height={120} width={300} />);

    expect(container).toBeDefined();
  });
});
