import React from 'react';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Button, Hyperlink, Image } from '@openedx/paragon';
import { Search } from '@openedx/paragon/icons';
import { baseAppUrl } from 'data/services/lms/urls';

import emptyCourseSVG from 'assets/empty-course.svg';
import { reduxHooks } from 'hooks';

import messages from './messages';
import './index.scss';

export const NoCoursesView = () => {
  const { formatMessage } = useIntl();
  const { courseSearchUrl } = reduxHooks.usePlatformSettingsData();
  const infoEmail = getConfig().INFO_EMAIL;
  const siteName = getConfig().SITE_NAME || 'Open edX';
  const siteUrl = getConfig().LMS_BASE_URL || '';
  const contactAdministratorUrl = infoEmail && `mailto:${infoEmail}?${new URLSearchParams({
    subject: formatMessage(messages.contactAdministratorEmailSubject, { siteName }),
    body: formatMessage(messages.contactAdministratorEmailBody, { siteName, siteUrl }),
  })}`;
  const noCoursesPrompt = infoEmail
    ? (
      <>
        {formatMessage(messages.contactAdministratorPrompt)}{' '}
        <Hyperlink destination={contactAdministratorUrl}>{infoEmail}</Hyperlink>{' '}
        {formatMessage(messages.contactAdministratorPromptSuffix)}
      </>
    )
    : formatMessage(messages.contactAdministratorPromptWithoutEmail);

  return (
    <div
      id="no-courses-content-view"
      className="d-flex align-items-center justify-content-center mb-4.5"
    >
      <Image src={emptyCourseSVG} alt={formatMessage(messages.bannerAlt)} />
      <h3 className="h1">
        {formatMessage(messages.lookingForChallengePrompt)}
      </h3>
      <p>
        {getConfig().ENABLE_DISCOVER_NEW !== false
          ? formatMessage(messages.exploreCoursesPrompt)
          : noCoursesPrompt}
      </p>
      {getConfig().ENABLE_DISCOVER_NEW !== false && (
        <Button
          variant="brand"
          as="a"
          href={baseAppUrl(courseSearchUrl)}
          iconBefore={Search}
        >
          {formatMessage(messages.exploreCoursesButton)}
        </Button>
      )}
    </div>
  );
};

export default NoCoursesView;
