import React from 'react';

import { getConfig } from '@edx/frontend-platform';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import LookingForChallengeWidget from 'plugins/LookingForChallengeWidget';

// eslint-disable-next-line arrow-body-style
export const WidgetSidebarSlot = () => (
  <PluginSlot
    id="org.openedx.frontend.learner_dashboard.widget_sidebar.v1"
    idAliases={['widget_sidebar_slot']}
  >
    {getConfig().ENABLE_DISCOVER_NEW !== false && <LookingForChallengeWidget />}
  </PluginSlot>
);

export default WidgetSidebarSlot;
