/**
 * https://stackoverflow.com/questions/487073/how-to-check-if-element-is-visible-after-scrolling
 * @param  {[type]} element     [description]
 * @param  {[type]} fullyInView [description]
 * @return {[type]}             [description]
 */
export const isElementInView = (element, fullyInView) => {
  var pageTop = jQuery(window).scrollTop();
  var pageBottom = pageTop + jQuery(window).height();
  var elementTop = jQuery(element).offset().top;
  var elementBottom = elementTop + jQuery(element).height();

  if (fullyInView === true) {
    return ((pageTop < elementTop) && (pageBottom > elementBottom));
  } else {
    return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
  }
}
