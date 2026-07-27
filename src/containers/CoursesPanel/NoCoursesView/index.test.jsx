import React from 'react';
import { mergeConfig } from '@edx/frontend-platform';
import { shallow } from '@edx/react-unit-test-utils';
import { Button } from '@openedx/paragon';

import EmptyCourse from '.';

jest.mock('hooks', () => ({
  reduxHooks: {
    usePlatformSettingsData: jest.fn(() => ({
      courseSearchUrl: '/course-search-url',
    })),
  },
}));

describe('NoCoursesView', () => {
  test('snapshot', () => {
    mergeConfig({ ENABLE_DISCOVER_NEW: true });
    expect(shallow(<EmptyCourse />).snapshot).toMatchSnapshot();
  });

  test('shows administrator guidance instead of course discovery when disabled', () => {
    mergeConfig({
      ENABLE_DISCOVER_NEW: false,
      INFO_EMAIL: 'support@example.com',
      SITE_NAME: 'Example Academy',
      LMS_BASE_URL: 'https://courses.example.com',
    });
    const wrapper = shallow(<EmptyCourse />);

    expect(wrapper.instance.findByType(Button)).toHaveLength(0);
  });
});
