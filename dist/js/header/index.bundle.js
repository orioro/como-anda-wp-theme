(function () {
	'use strict';

	jQuery(function () {
	  var $mainHeader = jQuery('#main-header');
	  var $window = jQuery(window);

	  var updateFarFromTop = function updateFarFromTop() {
	    if ($window.scrollTop() > 10) {
	      $mainHeader.addClass('far-from-top');
	    } else {
	      $mainHeader.removeClass('far-from-top');
	    }
	  };

	  $window.on('scroll', updateFarFromTop);
	});
	/**
	 * Transform header color according to section color
	 */

	jQuery(function () {
	  var $mainHeader = jQuery('#main-header');
	  var $window = jQuery(window);
	  var $bgColorSections = Array.from(jQuery('[data-bg-color-section]')).map($);
	  var BG_COLORS_BY_COLOR_SCHEME = {
	    'gray-light': '#E0E0E0',
	    'gray': '#BFBFBF',
	    'gray-dark': '#808080',
	    'blue': '#3880BD',
	    'blue-light': '#B1C2C3',
	    'yellow': '#FFCD20',
	    'brown': '#BA9B88',
	    'orange': '#EF7013',
	    'orange-light': '#FFAF74',
	    'red': '#EC3233',
	    'red-light': '#ECABAB',
	    'green': '#5F8C3F',
	    'green-light': '#B1D698'
	  };

	  var updateHeaderColor = function updateHeaderColor() {
	    // Scroll top + header height + 1px (1px to next position)
	    var colorPosition = $window.scrollTop() + $mainHeader.outerHeight() + 1;
	    var $bgColorSection = $bgColorSections.find(function ($section) {
	      var _$section$offset = $section.offset(),
	          top = _$section$offset.top;

	      var bottom = top + $section.outerHeight();
	      return colorPosition >= top && colorPosition < bottom;
	    });

	    if ($bgColorSection) {
	      $mainHeader.css({
	        backgroundColor: BG_COLORS_BY_COLOR_SCHEME[$bgColorSection.attr('data-bg-color-section')]
	      });
	    } else {
	      $mainHeader.css({
	        backgroundColor: 'transparent'
	      });
	    }
	  };

	  $window.on('scroll', updateHeaderColor);
	  updateHeaderColor();
	});
	/**
	 * Mobile menu trigger
	 */

	jQuery(function () {
	  var $body = jQuery('body');
	  var $menuTrigger = jQuery('#mobile-menu-trigger');
	  var $menuOverlay = jQuery('#mobile-menu-overlay');
	  var $mainMenuContainer = jQuery('#main-menu-container');
	  $menuTrigger.on('click', function () {
	    $body.toggleClass('menu-open');
	  });
	  $menuOverlay.on('click', function () {
	    $body.removeClass('menu-open');
	  });
	  $mainMenuContainer.on('click', 'a', function (e) {
	    $body.removeClass('menu-open');
	  });
	});

}());
