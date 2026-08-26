import { mergeConfig } from '@edx/frontend-platform';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import urls from 'data/services/lms/urls';
import LearnerDashboardHeader from '.';
import { findCoursesNavClicked } from './hooks';

const courseSearchUrl = '/course-search-url';

jest.mock('hooks', () => ({
  reduxHooks: {
    usePlatformSettingsData: jest.fn(() => ({
      courseSearchUrl,
    })),
  },
}));
jest.mock('./hooks', () => ({
  ...jest.requireActual('./hooks'),
  findCoursesNavClicked: jest.fn(),
}));

const mockedHeaderProps = jest.fn();
jest.mock('containers/MasqueradeBar', () => jest.fn(() => <div>MasqueradeBar</div>));
jest.mock('./ConfirmEmailBanner', () => jest.fn(() => <div>ConfirmEmailBanner</div>));
jest.mock('@edx/frontend-component-header', () => jest.fn((props) => {
  mockedHeaderProps(props);
  return <div>Header</div>;
}));

describe('LearnerDashboardHeader', () => {
  beforeEach(() => jest.clearAllMocks());
  it('renders and discover url is correct', () => {
    mergeConfig({ ORDER_HISTORY_URL: 'test-url' });
    render(<IntlProvider locale="en"><LearnerDashboardHeader /></IntlProvider>);
    expect(screen.getByText('ConfirmEmailBanner')).toBeInTheDocument();
    expect(screen.getByText('MasqueradeBar')).toBeInTheDocument();
    expect(screen.getByText('Header')).toBeInTheDocument();
    const props = mockedHeaderProps.mock.calls[0][0];
    const { mainMenuItems } = props;
    const discoverUrl = mainMenuItems[1].href;
    mainMenuItems[1].onClick();
    expect(discoverUrl).toBe(urls.baseAppUrl(courseSearchUrl));
    expect(findCoursesNavClicked).toHaveBeenCalledWith(urls.baseAppUrl(courseSearchUrl));
  });

  it('should display Help link if SUPPORT_URL is set', () => {
    mergeConfig({ SUPPORT_URL: 'http://localhost:18000/support' });
    render(<IntlProvider locale="en"><LearnerDashboardHeader /></IntlProvider>);
    const props = mockedHeaderProps.mock.calls[0][0];
    const { secondaryMenuItems } = props;
    expect(secondaryMenuItems.length).toBe(1);
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
