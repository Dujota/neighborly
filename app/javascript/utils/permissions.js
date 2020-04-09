export const canShow = (currentUser, listingUserId) =>
  currentUser && (currentUser.id === listingUserId || currentUser.isAdmin);
