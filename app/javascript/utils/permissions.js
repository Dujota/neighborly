export const canShow = (currentUser, resourceUserId = '') =>
  currentUser && (currentUser.isAdmin || currentUser.id === resourceUserId);
