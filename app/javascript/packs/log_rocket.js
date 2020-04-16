// LogRocket
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

LogRocket.init('qqsj0f/neighborly');
setupLogRocketReact(LogRocket);

// Note that the gon include in the rails layout needs to be above this file's javascript_pack_tag
if (window.gon) {
  const {
    current_user_id: currentUserId,
    current_user_full_name: name,
    current_user_email: email,
    current_user_role_names: userType,
  } = window.gon;

  LogRocket.identify(currentUserId, {
    name,
    email,
    userType,
  });
}
