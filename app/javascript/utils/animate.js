export const animateCSS = (element, animationName, callback, ...rest) => {
  const node = document.querySelector(element);
  node.classList.add('animated', animationName, ...rest);

  function handleAnimationEnd() {
    node.classList.remove('animated', animationName);
    node.removeEventListener('animationend', handleAnimationEnd);

    if (typeof callback === 'function') callback();
  }

  node.addEventListener('animationend', handleAnimationEnd);
};
