import { render } from '@testing-library/react';

import { Toyer, ToyerVideo } from '../toyer';

describe('init', () => {
  it('should work', () => {
    const { container } = render(
      <Toyer height={120} width={300}>
        <ToyerVideo src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'} playing />
      </Toyer>,
    );

    expect(container).toBeDefined();
  });
});
