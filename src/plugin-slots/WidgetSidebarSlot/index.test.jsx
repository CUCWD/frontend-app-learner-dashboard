import { mergeConfig } from '@edx/frontend-platform';
import { shallow } from '@edx/react-unit-test-utils';

import { IntlProvider } from '@edx/frontend-platform/i18n';
import { reduxHooks } from 'hooks';
import WidgetSidebarSlot from '.';

jest.mock('hooks', () => ({
  reduxHooks: {
    usePlatformSettingsData: jest.fn(),
  },
}));

const courseSearchUrl = 'mock-url';

describe('WidgetSidebar', () => {
  beforeEach(() => jest.resetAllMocks());

  test('snapshots', () => {
    mergeConfig({ ENABLE_DISCOVER_NEW: true });
    const wrapper = shallow(<WidgetSidebarSlot />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });

  test('hides the course-discovery widget when disabled by configuration', () => {
    mergeConfig({ ENABLE_DISCOVER_NEW: false });
    const wrapper = shallow(<WidgetSidebarSlot />);
    expect(wrapper.instance.findByType('LookingForChallengeWidget')).toHaveLength(0);
  });
});
