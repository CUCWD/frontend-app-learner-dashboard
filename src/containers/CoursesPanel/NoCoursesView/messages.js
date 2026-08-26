import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  lookingForChallengePrompt: {
    id: 'Dashboard.NoCoursesView.lookingForChallengePrompt',
    defaultMessage: 'Looking for a new challenge?',
    description: 'Prompt user for new challenge',
  },
  exploreCoursesPrompt: {
    id: 'Dashboard.NoCoursesView.exploreCoursesPrompt',
    defaultMessage: 'Explore our courses to add them to your dashboard.',
    description: 'Prompt user to explore more courses',
  },
  exploreCoursesButton: {
    id: 'Dashboard.NoCoursesView.exploreCoursesButton',
    defaultMessage: 'Explore courses',
    description: 'Button to explore more courses',
  },
  contactAdministratorPrompt: {
    id: 'Dashboard.NoCoursesView.contactAdministratorPrompt',
    defaultMessage: 'Contact your administrator at',
    description: 'Prompt for learners when course discovery is unavailable',
  },
  contactAdministratorPromptSuffix: {
    id: 'Dashboard.NoCoursesView.contactAdministratorPromptSuffix',
    defaultMessage: 'to learn about available courses.',
    description: 'Prompt suffix following the administrator email address',
  },
  contactAdministratorPromptWithoutEmail: {
    id: 'Dashboard.NoCoursesView.contactAdministratorPromptWithoutEmail',
    defaultMessage: 'Contact your administrator to learn about available courses.',
    description: 'Fallback prompt when no administrator email is configured',
  },
  contactAdministratorEmailSubject: {
    id: 'Dashboard.NoCoursesView.contactAdministratorEmailSubject',
    defaultMessage: 'Missing courses on {siteName} learner dashboard',
    description: 'Subject for an email to an administrator about missing courses',
  },
  contactAdministratorEmailBody: {
    id: 'Dashboard.NoCoursesView.contactAdministratorEmailBody',
    defaultMessage: 'Hello,\n\nI am missing courses on my {siteName} learner dashboard.\n\nSite: {siteUrl}',
    description: 'Body for an email to an administrator about missing courses',
  },
  bannerAlt: {
    id: 'Dashboard.NoCoursesView.bannerAlt',
    defaultMessage: 'No Courses view banner',
    description: 'No Courses view basnner',
  },
});

export default messages;
