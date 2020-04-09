export const canShow = (currentUser = {}, resourceUserId = '') =>
  currentUser.isAdmin || currentUser.id === resourceUserId;
