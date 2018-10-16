var tab = (function () {
	'use strict';

	// Public APIs
	var publicAPIs = {};
	var settings;

	// Defaults
	var defaults = {
		// Selectors
		selectorTab: '.tab-toggle',
		selectorTabContent: '.tab-pane',

		// Classes
		classTab: 'is-selected',
		classTabContent: 'is-selected',
		init: 'js-tab',
	};

	// Merge two or more objects together
	var extend = function () {

		// Variables
		var extended = {};
		var deep = false;
		var i = 0;

		// Check if a deep merge
		if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
			deep = arguments[0];
			i++;
		}

		// Merge the object into the extended object
		var merge = function (obj) {
			for (var prop in obj) {
				if (obj.hasOwnProperty(prop)) {
					// If property is an object, merge properties
					if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
						extended[prop] = extend(extended[prop], obj[prop]);
					} else {
						extended[prop] = obj[prop];
					}
				}
			}
		};

		// Loop through each object and conduct a merge
		for (; i < arguments.length; i++) {
			var obj = arguments[i];
			merge(obj);
		}

		return extended;
	};

	// Close all tab toggles and tab panes
	var closeTabs = function (selector, selectedClass) {
		var items = Array.from(document.querySelectorAll(selector));
		items.forEach(function (item) {
			item.classList.remove(selectedClass);
		});
	};

	// Open target tab and tab content
	var openSelectedTab = function (tab, tabContent) {

		// Close all tab toggles and tab panes
		closeTabs(settings.selectorTab, settings.classTab);
		closeTabs(settings.selectorTabContent, settings.classTabContent);

		// Select our target tab toggle and tab pane
		tab.classList.add(settings.classTab);
		tabContent.classList.add(settings.classTabContent);
	};

	var clickHandler = function (event) {
		// Only run if the clicked link was an tab toggle
		if ( !event.target.classList.contains(settings.selectorTab.substring(1)) ) return;

		// Prevent default link behavior
		event.preventDefault();

		// Get the target tab pane
		var selectedTabContent = document.querySelector(event.target.hash);
		if (!selectedTabContent) return;

		openSelectedTab(event.target, selectedTabContent);
	};

	// Toggle tab content with ID
	publicAPIs.toggleTab = function (tabContent) {

		// Get the target tab pane
		var selectedTabContent = document.querySelector(tabContent);
		if (!selectedTabContent) return;

		// Get the target tab
		var selectedTab = document.querySelector('[href="' + tabContent + '"]');

		openSelectedTab(selectedTab, selectedTabContent);
	};

	publicAPIs.init = function (options) {
		settings = extend(defaults, options || {});

		// Listen for click event
		document.addEventListener('click', clickHandler, false);

		// Add initialization class
		document.documentElement.classList.add(settings.init);
	};

	return publicAPIs;
})();

tab.init();

// Toggle #spiderman tab
tab.toggleTab('#wonder-woman');
