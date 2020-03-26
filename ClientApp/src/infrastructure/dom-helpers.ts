export function getDocumentMaxZIndex() {
  const elements = document.querySelectorAll('*');
  let maxZIndex = 0;

  elements.forEach(element => {
    const zIndex = getComputedStyle(element, null).getPropertyValue('z-index');

    if (+zIndex > maxZIndex && zIndex !== 'auto') {
      maxZIndex = +zIndex;
    }
  });
  return maxZIndex;
}
