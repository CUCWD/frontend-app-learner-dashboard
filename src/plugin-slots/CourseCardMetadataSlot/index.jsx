import React from 'react';
import PropTypes from 'prop-types';
import { PluginSlot } from '@openedx/frontend-plugin-framework';

const CourseCardMetadataSlot = ({ cardId }) => (
  <PluginSlot
    id="org.openedx.frontend.learner_dashboard.course_card_metadata.v1"
    pluginProps={{
      cardId,
    }}
  >
  </PluginSlot>
);

CourseCardMetadataSlot.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCardMetadataSlot;