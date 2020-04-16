// LogRocket
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

LogRocket.init('qqsj0f/neighborly');
setupLogRocketReact(LogRocket);

// Note that the gon include in the rails layout needs to be above this file's javascript_pack_tag
if (window.gon) {
  const {
    currentUserId,
    currentUserFullName: name,
    currentUserEmail: email,
    currentUserRoleNames: userType,
  } = window.gon;

  LogRocket.identify(currentUserId, {
    name,
    email,
    userType,
  });
}
