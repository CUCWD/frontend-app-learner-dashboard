import { mergeConfig } from '@edx/frontend-platform';
import { shallow } from '@edx/react-unit-test-utils';
import Header from '@edx/frontend-component-header';

import urls from 'data/services/lms/urls';
import LearnerDashboardHeader from '.';
import { findCoursesNavClicked } from './hooks';

jest.mock('hooks', () => ({
  reduxHooks: {
    usePlatformSettingsData: jest.fn(() => ({
      courseSearchUrl: '/course-search-url',
    })),
  },
}));
jest.mock('./hooks', () => ({
  ...jest.requireActual('./hooks'),
  findCoursesNavClicked: jest.fn(),
}));
jest.mock('containers/MasqueradeBar', () => 'MasqueradeBar');
jest.mock('./ConfirmEmailBanner', () => 'ConfirmEmailBanner');
jest.mock('@edx/frontend-component-header', () => 'Header');

describe('LearnerDashboardHeader', () => {
  test('render', () => {
    mergeConfig({ ORDER_HISTORY_URL: 'test-url' });
    const wrapper = shallow(<LearnerDashboardHeader />);
    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.instance.findByType('ConfirmEmailBanner')).toHaveLength(1);
    expect(wrapper.instance.findByType('MasqueradeBar')).toHaveLength(1);
    expect(wrapper.instance.findByType(Header)).toHaveLength(1);
    wrapper.instance.findByType(Header)[0].props.mainMenuItems[1].onClick();
    expect(findCoursesNavClicked).toHaveBeenCalledWith(urls.baseAppUrl('/course-search-url'));
    expect(wrapper.instance.findByType(Header)[0].props.secondaryMenuItems.length).toBe(0);
  });

  test('should display Help link if SUPPORT_URL is set', () => {
    mergeConfig({ SUPPORT_URL: 'http://localhost:18000/support' });
    const wrapper = shallow(<LearnerDashboardHeader />);
    expect(wrapper.instance.findByType(Header)[0].props.secondaryMenuItems.length).toBe(1);
  });
  test('should display Programs link if it is enabled by configuration', () => {
    mergeConfig({ ENABLE_PROGRAMS: true, ENABLE_DISCOVER_NEW: true });
    const wrapper = shallow(<LearnerDashboardHeader />);
    expect(wrapper.instance.findByType(Header)[0].props.mainMenuItems.length).toBe(3);
  });

  test('should hide Discover New when disabled by configuration', () => {
    mergeConfig({ ENABLE_PROGRAMS: false, ENABLE_DISCOVER_NEW: false });
    const wrapper = shallow(<LearnerDashboardHeader />);
    expect(wrapper.instance.findByType(Header)[0].props.mainMenuItems).toHaveLength(1);
  });
});
