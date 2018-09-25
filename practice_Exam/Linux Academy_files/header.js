// Array.filter polyfill
if (!Array.prototype.filter) {
	Array.prototype.filter = function (func, thisArg) {
		'use strict';
		if (!((typeof func === 'Function' || typeof func === 'function') && this))
			throw new TypeError();

		var len = this.length >>> 0,
			res = new Array(len),
			t = this,
			c = 0,
			i = -1;
		if (thisArg === undefined) {
			while (++i !== len) {

				if (i in this) {
					if (func(t[i], i, t)) {
						res[c++] = t[i];
					}
				}
			}
		} else {
			while (++i !== len) {

				if (i in this) {
					if (func.call(thisArg, t[i], i, t)) {
						res[c++] = t[i];
					}
				}
			}
		}

		res.length = c;
		return res;
	};
}

// Array.from polyfill
if (!Array.from) {
	Array.from = (function () {
		var toStr = Object.prototype.toString;
		var isCallable = function (fn) {
			return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
		};
		var toInteger = function (value) {
			var number = Number(value);
			if (isNaN(number)) {
				return 0;
			}
			if (number === 0 || !isFinite(number)) {
				return number;
			}
			return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
		};
		var maxSafeInteger = Math.pow(2, 53) - 1;
		var toLength = function (value) {
			var len = toInteger(value);
			return Math.min(Math.max(len, 0), maxSafeInteger);
		};

		return function from(arrayLike /*, mapFn, thisArg */ ) {
			var C = this;

			var items = Object(arrayLike);

			if (arrayLike == null) {
				throw new TypeError('Array.from requires an array-like object - not null or undefined');
			}

			var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
			var T;
			if (typeof mapFn !== 'undefined') {
				if (!isCallable(mapFn)) {
					throw new TypeError('Array.from: when provided, the second argument must be a function');
				}

				if (arguments.length > 2) {
					T = arguments[2];
				}
			}

			var len = toLength(items.length);

			var A = isCallable(C) ? Object(new C(len)) : new Array(len);

			var k = 0;
			var kValue;
			while (k < len) {
				kValue = items[k];
				if (mapFn) {
					A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
				} else {
					A[k] = kValue;
				}
				k += 1;
			}
			A.length = len;
			return A;
		};
	}());
}

// Array.find polyfill
if (!Array.prototype.find) {
	Object.defineProperty(Array.prototype, 'find', {
		value: function (predicate) {
			if (this == null) {
				throw new TypeError('"this" is null or not defined');
			}

			var o = Object(this);

			var len = o.length >>> 0;

			if (typeof predicate !== 'function') {
				throw new TypeError('predicate must be a function');
			}

			var thisArg = arguments[1];

			var k = 0;

			while (k < len) {
				var kValue = o[k];
				if (predicate.call(thisArg, kValue, k, o)) {
					return kValue;
				}
				k++;
			}

			return undefined;
		},
		configurable: true,
		writable: true
	});
}

// Array.includes polyfill
if (!Array.prototype.includes) {
	Object.defineProperty(Array.prototype, 'includes', {
		value: function (searchElement, fromIndex) {

			if (this == null) {
				throw new TypeError('"this" is null or not defined');
			}

			var o = Object(this);
			var len = o.length >>> 0;

			if (len === 0) {
				return false;
			}

			var n = fromIndex | 0;
			var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

			function sameValueZero(x, y) {
				return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
			}

			while (k < len) {
				if (sameValueZero(o[k], searchElement)) {
					return true;
				}
				k++;
			}

			return false;
		}
	});
}

// String.includes polyfill
if (!String.prototype.includes) {
	String.prototype.includes = function (search, start) {
		if (typeof start !== 'number') {
			start = 0;
		}

		if (start + search.length > this.length) {
			return false;
		} else {
			return this.indexOf(search, start) !== -1;
		}
	};
}

// Array.map polyfill
if (!Array.prototype.map) {

	Array.prototype.map = function (callback /*, thisArg*/ ) {

		var T, A, k;

		if (this == null) {
			throw new TypeError('this is null or not defined');
		}

		var O = Object(this);

		var len = O.length >>> 0;

		if (typeof callback !== 'function') {
			throw new TypeError(callback + ' is not a function');
		}

		if (arguments.length > 1) {
			T = arguments[1];
		}

		A = new Array(len);

		k = 0;

		while (k < len) {

			var kValue, mappedValue;

			if (k in O) {

				kValue = O[k];

				mappedValue = callback.call(T, kValue, k, O);

				A[k] = mappedValue;
			}
			k++;
		}

		return A;
	};
}

// Array.forEach polyfill
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

	Array.prototype.forEach = function (callback /*, thisArg*/ ) {

		var T, k;

		if (this == null) {
			throw new TypeError('this is null or not defined');
		}

		var O = Object(this);

		var len = O.length >>> 0;

		if (typeof callback !== 'function') {
			throw new TypeError(callback + ' is not a function');
		}

		if (arguments.length > 1) {
			T = arguments[1];
		}

		k = 0;

		while (k < len) {
			var kValue;

			if (k in O) {
				kValue = O[k];
				callback.call(T, kValue, k, O);
			}

			k++;
		}
	};
}

var navigationJson = 'https://d3bm05a1cocdno.cloudfront.net/navigation.json';
var gemCountPath = '';
var notificationsPath = 'https://m07a2bncy3.execute-api.us-east-1.amazonaws.com/staging/';

//notification service url
var notificationsApiPath  ='';

//path to angular notification center
var notificationsPagePath = '';

var notification_read_status = '5298279a-65c3-472e-9f82-0e2b831ca074';
var notification_unread_status ='0072ae7d-9761-4446-9706-f1a5735919b3';

// var accessToken = localStorage.getItem('access_token');
var categories = [];
var environment = '';
// var location = window.location.href;
var linuxacademyPath = '';
var betaPath = '';
var userPath = 'https://la-connector.linuxacademy.com/users/find_by';
var connectorPath = 'https://la-connector.linuxacademy.com';
var orgsPath = '';
var integerID = 0;
var primaryOrg = {};
var supportHoursHtml = '<p><strong>Official Support Hours:</strong></p> \
<p>Mon - Fri: 6AM CST - 5PM CST<br /> \
Sat - Sun: 12PM CST - 4PM CST<br /> \
One Business Day Response Time</p>';

var dev_token = '';

if (window.location.href.includes('rewrite-staging')) {
    environment = 'rewrite';
    linuxacademyPath = 'http://staging.linuxacademy.com';
    betaPath = 'https://beta-staging.linuxacademy.com';
    gemCountPath = 'https://ca-backend-staging.linuxacademy.com/api/v1/user';
    orgsPath = 'https://estag.linuxacademy.com/api/v1/organizations';
    notificationsApiPath = 'https://svc-notifications-staging.linuxacademy.com/api/v1';
    notificationsPagePath = 'https://rewrite-staging.linuxacademy.com/notifications';
}
else if (window.location.href.includes('staging')) {
    environment = 'staging';
    linuxacademyPath = 'http://staging.linuxacademy.com';
    betaPath = 'https://beta-staging.linuxacademy.com';
    gemCountPath = 'https://ca-backend-staging.linuxacademy.com/api/v1/user';
    orgsPath = 'https://estag.linuxacademy.com/api/v1/organizations';
}
else if (
    window.location.href.includes('beta') ||
    window.location.href.includes('https://linuxacademy.com') ||
    window.location.href.includes('https://enterprise.linuxacademy.com') ||
    window.location.href.includes('https://enterprise-alpha.linuxacademy.com')
) {
    environment = 'production';
    linuxacademyPath = 'https://linuxacademy.com';
    betaPath = 'https://beta.linuxacademy.com';
    gemCountPath = 'https://ca-backend.linuxacademy.com/api/v1/user';
    orgsPath = 'https://eprod.linuxacademy.com/api/v1/organizations';
}
else {
    environment = 'dev';
    linuxacademyPath = 'https://linuxacademy.com';
    betaPath = 'http://beta-staging.linuxacademy.com';
    gemCountPath = 'https://ca-backend-staging.linuxacademy.com/api/v1/user';
    orgsPath = 'https://estag.linuxacademy.com/api/v1/organizations';
    notificationsApiPath = 'https://svc-notifications-staging.linuxacademy.com/api/v1';
    notificationsPagePath = 'http://localhost:4200/notifications'
}


var tokenFinishedProcessing = $.Deferred();
var hasUserId = $.Deferred();
var navigationLoaded = $.Deferred();

// When we've got the token squared away, get the LA User ID
$.when(tokenFinishedProcessing).done(function (v1) {
	getGemCount();
	getUserID();
});

// When we've got the LA User ID, get notifications for them and see if they are an enterprise customer
$.when(hasUserId).done(function (v1) {
	getNotifications();
	determineEnterprise();
});

// When we've got the core nav bits loaded, add more nav stuff to it
$.when(navigationLoaded).done(function (v1) {
	if (userIsAdmin()) {
		$('#account_overlay').prepend('<li><a class="la-link" href="' + linuxacademyPath + '/cp/admin">Admin</a></li>');
	}

	// If no access to cloud servers, show no access to cloud servers
	r = userRoles();

	if (r) {
                if(r.includes('LAAdmin')){
                  setupPlaygroundMenu();
                  setupCloudServersLinking(r);
                }

		// Unless "Free" is wrong
		if (!r.includes('LASubscriber') && (r.includes('LAFree') || r.includes('LAMicrosoft') || r.includes('LAPause'))) {
			$('#cloud-servers-link').prepend(lockedCloudServersHTML());
			$('#mobile-cloud-servers-link').remove();
			$('#cloud-servers-link a').attr('onclick', 'return false');

                        $('#cloud-servers-link').on('mouseenter', function () {
                          $('#cloud-servers-link [data-toggle="tooltip"]').tooltip('show');
                        });

                        $('#cloud-servers-link').on('mouseleave', function (e) {
                          if(mouseLeaveToSibling(e)) {
                            $('#cloud-servers-link [data-toggle="tooltip"]').tooltip('hide');
                          }
                        });
		}

		// If no access to labs, show no access to labs
		// if (!r.includes('LASubscriber') && (r.includes('LAFree') || r.includes('LAMicrosoft')) || r.includes('LAPause') || r.includes('LATrial')) {
		// 	$('#hands-on-labs-link').prepend(lockedHandsOnLabsHTML());
		// 	$('#mobile-hands-on-labs-link').remove();
		// 	$('#hands-on-labs-link a').attr('onclick', 'return false');
		// }

		// If no access to labs, show no access to labs
		if (r.includes('LAPause')) {
		    $('#learning-paths-link').prepend(lockedLearningPathsHTML());
		    $('#mobile-learning-paths-link').remove();
		    $('#learning-paths-link a').attr('onclick', 'return false');

		    $('#learning-paths-link').on('mouseenter', function () {
		        $('#learning-paths-link [data-toggle="tooltip"]').tooltip('show');
		    });

		    $('#learning-paths-link').on('mouseleave', function (e) {
		        if (mouseLeaveToSibling(e)) {
		            $('#learning-paths-link [data-toggle="tooltip"]').tooltip('hide');
		        }
		    });
		}

		// Add community edition banner by logo
		if (!r.includes('LASubscriber') && r.includes('LAFree')) {
			$('#logo').after(planBanner('Community Edition'));
		}

		if (r.includes('LATrial')) {
			$('#logo').after(planBanner('Trial'));
		}

		if (r.includes('LAPause')) {
			$('#logo').after(planBanner('Paused User Edition'));
		}

		if (r.includes('LAMicrosoft')) {
			$('#logo').after(planBanner('Paused User Edition'));
			$('#logo').after('<div class="dropdown pull-right brand-upgrade-btn"><a href="' + linuxacademyPath + '/cp/plan">Upgrade Now!</a></div>');
		}
	}

  $('#primary-navigation').on('mouseleave', function () {
    $('[data-toggle="tooltip"]').tooltip('hide');
  })

	hashDidChange();
	window.addEventListener("hashchange", hashDidChange, false);
});

function hashDidChange() {
	var betaIconRef = $('.beta-icon');

	if (hashContains('activities') || hashContains('quests')) {
		betaIconRef.show();
	} else {
		betaIconRef.hide();
	}
}

$.when(navigationLoaded, hasUserId).done(function (v1, v2) {

	// Add user notes if legacy user
	if (integerID <= 45260) {
		$('#billing-settings-link').after('<li><a class="la-link" href="' + linuxacademyPath + '/cp/usernotes">My Notes</a></li>');
	}

});

// Check token first
(function checkToken() {
	// Wait to check token
	if (accessToken() && decodeToken()) {
		tokenFinishedProcessing.resolve();
	}
})();

function getUserID() {
	$.ajax({
		// /reports/user_id?uuid=4d2c69e4-06b8-4067-9470-2f052de8d1d9
		url: connectorPath + '/users/find_by',
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', accessToken());
		},
		success: function (data) {
			integerID = data.id;
			hasUserId.resolve(integerID);
		},
		error: function (error) {
			// console.log(error.responseJSON)
		},
		complete: function () {
			// Get notifications
		}
	});
}

// Get navigation first
(function getNavigation() {
	// Default to 0 in case errors
	var certificationCourses = [];

	$.ajax({
		url: navigationJson,
		beforeSend: function (xhr) {
			// xhr.setRequestHeader('Authentication', accessToken);
		},
		success: function (data) {
			categories = data.navigation.categories;
			buildCategories(categories);

			certificationCourses = data.navigation.certifications;
			buildCertList(certificationCourses);
			// scrollableSections();
			navigationLoaded.resolve();
		},
		error: function (error) {
			// console.log(error)
		},
		complete: function () {
			// Schedule the next request when the current one's complete
			listenForScrollEvent();
		}
	});
})();

// Get gem count second
function getGemCount() {
	// Default to 0 in case errors

	// If user has a beta token in localstorage, use that. Else, get one.
	// This needs to be done right now because the CA-API does not currently support auth0 tokens only.
	var gemCount = 0;

	$.ajax({
		url: gemCountPath,
		cache: false,
		contentType: 'application/json',
		headers: {
			Authorization: accessToken()
		},
		success: function (data) {
			gemCount = data.gem_count;
		},
		error: function (error) {
			// console.log(error.responseJSON)
		},
		complete: function () {
			// Schedule the next request when the current one's complete
			$('#gemCount').text(gemCount);
		}
	});
}

function determineEnterprise() {
	if (idToken()) {
		$.ajax({
			url: orgsPath,
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken());
			},
			success: function (data) {
				// Pick out the first organization
				primaryOrg = data[0];
			},
			error: function (error) {
				// console.log(error)
			},
			complete: function () {
				// Get notifications
			}
		});
	}
}

// Get notifications third
// LA 1.0
function getNotifications() {
    if (environment == 'dev' || environment == 'rewrite') {
        getNewNotifications();
        return false;
    }

	// Default to 0 in case errors
	var unreadNotifications = 0;
	var recentUnread = [];

	// Get LA User ID
	$.ajax({
		url: notificationsPath + integerID,
		beforeSend: function (xhr) {
			// xhr.setRequestHeader('Authorization', accessToken);
		},
		dataType: 'json',
		success: function (data) {
			unreadNotifications = data.totalUnread;
			recentUnread = data.recentUnread;

			// build list of noticiations
			ulHtml = '';
			recentUnread.forEach(function (notification) {
				ulHtml += '<li> \
<a onclick="showNotification(\'' + cleanNotificationSubject(notification['subject']) + '\', \'' + cleanNotificationText(notification['text']) + '\', \'' + notification['url'] + '\', \'' + notification['timestamp'] + '\')" data-toggle="modal" href="#">' + notification.subject + '</a> \
</li>';
			});
			ulHtml += '<li><a class="la-link" href="' + linuxacademyPath + '/cp/notifications">View all</a></li>';
			$('#notification_overlay').html(ulHtml);
		},
		error: function (error) {
			// console.log(error.statusText)
		},
		complete: function () {

			$('#num_notifications').text(unreadNotifications);

			// setTimeout(getNotifications, 15000);
		}
	});
}


// Notification service Get notifications!
function getNewNotifications() {
    var unreadNotifications = 0;
    var ulHtml = '';
    var subject = '';
    var body = '';
    var link = '';
    var date = '';
    var notification_id = '';
    var receiver_id = '';
    var status_id = '';
    var user_receiver={};
    var decoded_token = decodeToken();
    var user_id = decoded_token['https://linuxacademy.com/auth/uuid'];

    $.ajax({
        url: notificationsApiPath + '/notifications?per_p=10&status_id='+notification_unread_status,
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', accessToken());
        },
        success: function (data) {
            unreadNotifications = data.pagination.records;

            data.data.forEach(function (notification) {

            	//find the receiver belonging to this user
                notification.receivers.forEach(function (receiver){
                    if(receiver.user_id == user_id){
                        user_receiver = receiver;
                    }
                });

                // set up the params
                subject         = cleanNotificationSubject(notification['subject']);
                body            = cleanNotificationText(notification['body']);
                link            = ((typeof notification['links'][0] !== 'undefined') ? notification['links'][0]['link'] : '');
                date            = notification['created_at'];
				notification_id = notification.id;
                status_id       = notification_read_status;
                receiver_id     = user_receiver.id;


                //build the html list
                ulHtml += '<li>';
                ulHtml += '<a onclick="showNewNotification(\''+subject+'\',\''+body+'\',\''+link+'\',\''+date+'\',\''+notification_id+'\',\''+status_id+'\',\''+receiver_id+'\')" data-toggle="modal" href="#">' + subject + '</a>';
                ulHtml += '</li>';
            });

            // view all link for bottom of menu
            ulHtml += '<li><a class="la-link" href="' + notificationsPagePath + '">View all</a></li>';
            $('#notification_overlay').html(ulHtml);
        },
        error: function (error) {
            //console.log(error)
        },
        complete: function () {
            $('#num_notifications').text(unreadNotifications);
        }
    });
}

$(document).ready(function () {
	// Change relative links based on environment asap
	environmentalLinks();

	// Setup account section
	$('#navigationUsername').text(getUsername());

	// Setup support modal
	$('#supportModal input[type="radio"]').on('click', function (element) {
		var id = element.target.id;
		var communitySearch = $('#supportModal #community-search');
		var feedbackForm = $('#supportModal #general-feedback-form');
		var accountHelpForm = $('#supportModal #account-help-form');
		var supportNotice = $('#supportModal #support-notice');

		if (id === 'support-search-community') {
			communitySearch.show();
		} else if (id === 'need-help') {
			// Redirect to the community
			window.location.href = 'https://linuxacademy.com/cp/socialize';
		} else {
			communitySearch.hide();
		}

		if (id === 'account-help') {
			accountHelpForm.show();
		} else {
			accountHelpForm.hide();
		}

		if (id === 'general-feedback') {
			feedbackForm.show();
		} else {
			feedbackForm.hide();
		}

		if (id === 'general-feedback' || id === 'account-help') {
			supportNotice.show();
		} else {
			supportNotice.hide();
		}
	});

	// Submit support to zendesk
	$(document).on('click', "#supportModalSubmit", function () {
		// Get the form values
		// Also the page they are on
		// Also the user agent
		// POST to API

		$.ajax({
			url: connectorPath + "/zendesk",
			data: $("#account-help-form").serialize() + '&page=' + window.location.href + '&user_agent=' + window.navigator.userAgent,
			type: 'post',
			headers: {
				Authorization: accessToken()
			},
			dataType: 'json',
			success: function (data) {
				console.info(data);
			}
		});


		// $.post(connectorPath + "/zendesk", $("#account-help-form").serialize() + '&page=' + window.location.href + '&user_agent=' + window.navigator.userAgent);

		// Show success, hide other options
		successfulSupportMessage();
		return false;
	});


	$(document).on('click', "#feedbackSubmit", function () {

		$.post(connectorPath + "/zendesk", $("#general-feedback-form").serialize() + '&page=' + window.location.href + '&user_agent=' + window.navigator.userAgent);

		// Show success, hide other options
		successfulSupportMessage();
		return false;
	});

	// On modal close, reset form values and hide the success, and show the other options
	$('#supportModal').on('shown.bs.modal', function () {
		$('#support-hours').hide();
		$('#supportModal .form-options').show();
		$('#account-help-form')[0].reset();
		$('#general-feedback-form')[0].reset();
	});

	// Don't close course dropdown
	$(document).on('click', '#library_overlay', function (e) {
		e.stopPropagation();
	});


	// Add Refer a Friend if they aren't an org member
	// Removing due to confliction between Beta RAF and LA RAF
	// if (primaryOrg != {}) {
	//   $('#support-dropdown').after('<div class="dropdown dropdown-la pull-right"> \
	//       <a href="'+ linuxacademyPath +'/cp/referFriend"> \
	//           Refer A Friend<i class="fa fa-share"></i> \
	//       </a> \
	//   </div>');
	// }

	// Hide arrow on popular certifications if user is scrolling
	// Show the .links section as scrolling if it has enough content to scroll
	$(document).on("custom-scroll", ".popular-course .links", function (e) {
		// console.log(e)
		// console.log(this)
		// $(e.target).addClass('scrolling');
		// clearTimeout( $.data( this, "scrollCheck" ) );
		// $.data( this, "scrollCheck", setTimeout(function() {
		//   // When the user stops scrolling, remove the class
		//   $(e.target).removeClass('scrolling');
		// }, 250) );
	});

	// Clicking on a beta link should close the dropdown
	$('#library_overlay').on('click', '.beta-link', function () {
		$('#course-menu').dropdown('toggle');
	});

	// Hovering over the Training menu should show the training menu
	$("#course-menu").on("click", function () {
		window.location.href = 'https://beta.linuxacademy.com/#/learning-center';
	});

  makeMouseOverDropdown($('#training-dropdown'), $('#course-menu'));
  makeMouseOverDropdown($('#community-dropdown'), $('#community-menu'));

	$('#logout').on('click', function () {
		localStorage.clear();
		window.location.href = linuxacademyPath + '/cp/login/quit';
	});

	// Allow hovering over tabs to show popular cert courses
	$(document).on('mouseenter', '#linuxacademy-header [data-toggle="tab"]', function () {
		$(this).tab('show');
	});

	// Detect if we're NOT on Linux Academy, because we need to handle Cloud Servers differently if we're not
	if (!window.location.href.includes('https://linuxacademy.com') ||
		!window.location.href.includes('http://staging.linuxacademy.com') ||
		!window.location.href.includes('dev.linuxacademy.com')
	) {
		// If not on LA, Handle Community Search using a query param instead of form submit
		$("#communitySearchForm").submit(function (e) {
			// Stop form from submitting
			e.preventDefault();
			if (!$("#communitySearchForm input[name='query']").val()) {
				// Search Input is Empty, Navigate to LA Community without search query
				window.location.href = linuxacademyPath + '/cp/socialize';
			} else {
				// Search Input has string, use it to search
				window.location.href = linuxacademyPath + '/cp/socialize/index/query/' + encodeURI($("#communitySearchForm input[name='query']").val());
			}
		});
	}
        r = userRoles();
        if (r) {
          setupCloudServersLinking(r);
        }
});


function setupCloudServersLinking(r){
  $('#cloud-servers-link').on('click', function(e) {
    e.preventDefault();

    // Never show the modal for Free, Microsoft, or Pause plans
    if (r.includes('LAFree') || r.includes('LAMicrosoft') || r.includes('LAPause')) {
      return false;
    }

    if($('#lab2').length) {
      $('#lab2').modal('show');
    } else {
      window.location.href = linuxacademyPath + '/cp/dashboard/index/modal/cloudservers';
    }
  });

}

function accessToken() {
	t = localStorage.getItem('access_token');
	// If there's no access token, try looking for CA's "currentUser" instead
	if(!t && localStorage.getItem('currentUser')) {
		t = JSON.parse(localStorage.getItem('currentUser')).access_token;
	} else if (!t) {
		// Or fail
		t = null;
	}

    if((environment == 'dev' || environment == 'rewrite') && t == null) {
        t = dev_token;
    }

	return t;
}

function idToken() {
	return localStorage.getItem('id_token');
}

// Update all relative links to be solid based on environment second
function environmentalLinks() {
	$('.la-link').each(function (i, link) {
		href = linuxacademyPath + $(link).attr('href');
		$(link).attr('href', href);
	});

	$('.beta-link').each(function (i, link) {
		href = betaPath + $(link).attr('href');
		$(link).attr('href', href);
	});
}

// Trigger the scroll event after the fact since these elements were added dynamically
function listenForScrollEvent() {
	el = $('.tab-content .popular-course .links');
	el.on("scroll", function () {
		el.trigger("custom-scroll");
	});
}

// Get the uuid from the token
function uuid() {
	token = decodeToken();
	if (token && token['https://linuxacademy.com/auth/uuid']) {
		return token['https://linuxacademy.com/auth/uuid'];
	} else {
		return '';
	}
}

function decodeToken() {
	if (accessToken()) {
		token = accessToken().replace(/-/g, '+').replace(/_/g, '/');
		return JSON.parse(atob(token.split('.')[1]));
	}
}

function getUsername() {
	token = decodeToken();

	// Show username if available, then name if available, then email if available, or fail
	if (token && token['https://linuxacademy.com/auth/username']) {
		return token['https://linuxacademy.com/auth/username'];
	} else if (token && token.name) {
		return token.name;
	} else if (token && token['https://linuxacademy.com/auth/email']) {
		return token['https://linuxacademy.com/auth/email'];
	} else {
		return 'Account';
	}
}

function userRoles() {
	token = decodeToken();

	if (token) {
		return token['https://linuxacademy.com/auth/roles'];
	}
}

function userIsAdmin() {
	var token = decodeToken();

	if (token) {
		roles = token['https://linuxacademy.com/auth/roles'];

		if (token && roles.includes('LAAdmin')) {
			return true;
		} else {
			return false;
		}
	}

	return false;
}

function buildCategories(categories) {
	html = '';
	categories.forEach(function (category) {
		html += '<li class="col-md-1"> \
<a class="hex-topic-link" href="' + category.path + '"> \
<img class="hex-topic" height="48px" width="43px" src="' + category.icon + '"><br> \
' + category.name + ' \
</a> \
</li>';
	});
	$('#course-categories').append(html);
}

function buildCertList(certs) {
	$.each(certs, function (key, values) {
		var html = '';
		var c = transformCourseNameToID(key);

		html += '<li role="presentation" class="nav-item popular-course"> \
			<a class="nav-link ' + c + '" href="#' + c + '-certifications" aria-controls="' + c + 'certifications" role="tab" data-toggle="tab"> \
				<img src="' + getCategoryImage(key) + '"> \
					' + key + ' \
				<mat-icon class="mat-icon material-icons" role="img" aria-hidden="true">chevron_right</mat-icon> \
			</a> \
		</li>';
		// Add to HTML then add subsection
		$('#popular-options').append(html);

		var category = categories.find(function(cat) {
			return cat.name == key;
		});

		buildCertSection(c, values, category.path);
	});
	// Show the first tab
	$('.popular-course a.aws').tab('show');
}

function transformCourseNameToID(name) {
	return name.toLowerCase().replace(' ', '');
}

function getCategoryImage(name) {
	return categories.find(function (category) {
		if (category.name === name) {
			return category.icon;
		}
	}).icon;
}

function buildCertSection(transformedName, values, path) {
	// console.log(transformedName);

	// active = index === 0 ? 'active' : '';
	active = '';
	html = '<div role="tabpanel" class="popular-course tab-pane' + active + '" id="' + transformedName + '-certifications"> \
<div class="section">';

	// Sort certs by provider, even if there is no provider
	providers = groupCertificationByProvider(values);

	// Add a row if this is a linux section, because it has sub-categories
	if (transformedName === 'linux') {
		html += '<div class="tab-content linux-container"><div class="col-lg-4 col-md-5 sub-categories"><h2>Sub-Categories</h2><ul class="nav nav-stacked nav-pills">';

		// Build sub-category listing
		providers.forEach(function (provider, index) {
			// Hoping these are only ever linux providers
			if (provider !== undefined) {
				html += '<li><a href="#linux-' + index + '" aria-controls="linux-' + index + '" role="tab" data-toggle="tab">' + provider + '<mat-icon class="mat-icon material-icons">chevron_right</mat-icon></a></li>';
			}
		});

		html += '</ul></div>'; // Close sub categories
	}

	providers.forEach(function (provider, index) {
		// If provider is undefined, set the column to full width, else use 1/2 sections
		if (provider === undefined) {
			col = 'col-lg-12';
			extraAttr = '';
		} else {
			col = 'col-lg-8 col-md-7 tab-pane';

			extraAttr = 'role="tabpanel" id="linux-' + index + '"';

			// Also add a row for the sub-categories
		}

		html += '<div ' + extraAttr + ' class="provider col-md-12 ' + col + ' provider-' + transformedName + '">';

		byProvider = certificationsByProvider(provider, values);

		// Wrap links in a container
		html += '<div class="scroll-hide"><div class="links">';
		byProvider.forEach(function (course) {
			html += '<a href="' + course.path + '">' + course.name + '</a>';
		});

		html += '<a href="' + path + '" class="see-all">See All</a>';
		html += '</div></div></div>';
	});

	if (transformedName === 'linux') {
		html += '</div>';
	}

	html += '</div></div>';
	$('#popular-tab .tab-content').prepend(html);
}

function groupCertificationByProvider(values) {
	a = Array.from(new Array(values.map(function (course) {
		return course.provider;
	})));

	a = a[0];

	var arr = [];

	for (var i = 0; i < a.length; i++) {
		if (arr.indexOf(a[i]) === -1) {
			arr.push(a[i]);
		}
	}

	return arr;
}

function certificationsByProvider(provider, certifications) {
	return certifications.filter(function (cert) {
		if (provider === undefined) {
			return cert;
		} else {
			return cert.provider === provider;
		}
	});
}

function scrollableSections() {
	linkSections = $('.popular-course .provider-linux .links');

	linkSections.each(function (index, section) {

		// If there's more than 4 children in the section, and it's the Linux category, do a cut off
		if (section.children.length > 4) {
			// $(section).addClass('scrollable');
			$(section).append('<div class="scrollable"><mat-icon class="mat-icon material-icons">expand_more</mat-icon></div>');
		}
	});
}

function lockedCloudServersHTML() {
  return upgradeHTML("Get access to 6 cloud servers (18+ distros) to spin up on your own!</br><a style='background-color: #1bb398; display: inline-block; text-decoration:none; color: white; border-radius: 3px; cursor: pointer; margin-top:12px; padding: 10px 20px;' href='" + linuxacademyPath + "/cp/plan/all'>Upgrade Now!</a>");
}

function lockedHandsOnLabsHTML() {
  return upgradeHTML("Upgrade to access Hands-on Labs!</br><a style='background-color: #1bb398; display: inline-block; text-decoration: none; color: white; border-radius: 3px; cursor: pointer; margin-top: 12px; padding: 10px 20px;' href='" + linuxacademyPath + "/cp/plan/all'>Upgrade Now!</a>");
}

function lockedLearningPathsHTML() {
  return upgradeHTML("Find and enroll in a learning path to reach your training goals.</br><a style='background-color: #1bb398; display: inline-block; text-decoration: none; color: white; border-radius: 3px; cursor: pointer; margin-top: 12px; padding: 10px 20px;' href='" + linuxacademyPath + "/cp/plan/all'>Upgrade Now!</a>");
}

function upgradeHTML(title) {
	return '<div class="free-community-nav-link la-link" \
data-toggle="tooltip" \
data-placement="bottom" \
data-container=".custom-tip-container" \
data-html="true" \
data-trigger="focus manual" \
title="' + title + '"> \
<i class="fa fa-lock"></i> \
</div>';
}

function planBanner(planType) {
	return '<span class="free-trial">' + planType + '</span>';
}

function successfulSupportMessage() {
	$('#support-hours').html('<div class="alert alert-success">Your message has been received.  We will respond by email as quickly as we can!' + supportHoursHtml + '</div>').show();
	$('#supportModal .form-options').hide();
	$('#account-help-form')[0].reset();
	$('#general-feedback-form')[0].reset();
}

// LA 1.0 show notifications
function showNotification(subject, text, url, timestamp) {
	$('#notificationModal .modal-title').text(subject);
	$('#notificationModal .modal-body').html(text + '<br /><br /><a href="' + url + '">' + url + '</a>');
	// Show modal
	$('#notificationModal').modal();

	// Mark as read & update totals
	$.ajax({
		url: notificationsPath + '/' + integerID + '/' + timestamp,
		dataType: 'json',
		method: 'POST',
		complete: function () {
			// Get notifications
			getNotifications();
		}
	});
}

//Notification service show notifications
function showNewNotification(subject,body,link,date,notification_id,status_id,receiver_id) {

    $('#notificationModal .modal-title').text(subject);
    $('#notificationModal .modal-body').html(body + '<br /><br /><a href="' + link + '">' + link + '</a>');
    $('#notificationModal').modal();

    // Mark as read & update totals
    $.ajax({
        url: notificationsApiPath + '/notifications/' + notification_id,
        dataType: 'json',
        method: 'PUT',
        data: {
            receiver_id: receiver_id,
            status_id: status_id
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', accessToken());
        },
        complete: function () {
            getNotifications();
        }
    });
}

function hashContains(searchString) {
	return window.location.hash.indexOf(searchString) >= 0;
}

function elementHasClass(elementRef, className) {
  return elementRef.className.indexOf(className) >= 0;
}

function makeMouseOverDropdown(buttonRef, dropdownRef) {
  buttonRef.on('mouseenter', function () {
    if (!elementHasClass(this, 'open')) {
      dropdownRef.dropdown('toggle');
    }
  });

  buttonRef.on('mouseleave', function () {
    if (elementHasClass(this, 'open')) {
      dropdownRef.dropdown('toggle');
	}

	$(this).find('a').blur();
  });
}

function mouseLeaveToSibling(eventObj) {
  return (
    eventObj.relatedTarget.offsetParent === eventObj.target.offsetParent.nextElementSibling ||
    eventObj.relatedTarget.offsetParent === eventObj.target.offsetParent.previousElementSibling
  );
}

function cleanNotificationSubject(str) {
  // Remove all single and double Quotes
  str = str.replace(/['"]+/g, '');
  // Replace all Link Breaks with a space and return
  return str.replace(/(\r\n\t|\n|\r\t|\r|\r\n)/gm, ' ');
}

function cleanNotificationText(str) {
  var breakTag = '<br>';
  // Remove all single and double Quotes
  str = str.replace(/['"]+/g, '');
  // Replace all Link Breaks with a <br>
  str = str.replace(/(\r\n\t|\n|\r\t|\r|\r\n)/gm, breakTag);
  // Remove 3 or more <br> elements in a row with a single <br> and return
  return str.replace(/(<br\s*\/?>){3,}/gi, '<br>');
}

function setupPlaygroundMenu() {
  // create the li element
  var pMenu = $("<li></li>");
  pMenu.attr('class', 'dropdown');
  pMenu.attr('id', 'playground-dropdown');

  // add the top level anchor tag
  pMenu.append('<a aria-controls="playground_overlay" data-toggle="dropdown" href="" id="playground-menu" aria-haspopup="true"></a>');

  // add the icon to it
  pMenu.children('a').append('<i class="fa fa-wrench"></i><br>Cloud Servers');

  // add the dropdown container
  pMenu.append('<div aria-labelledby="playground-menu" class="nav-la-main-playground-overlay dropdown-menu dropdown-menu-center" id="playground_overlay" role="menu"></div>');

  // create a container for the menu items list
  var mList = $('<div class="playground-dd-container custom-course-nav"></div');

  // add the bootstrap formatting
  mList.append('<div class="row"><div class="col-md-12"><ul class="row nav-la-topics" id="playground-options">');

  // build a link to the original
  var csOrig = $('<li class="col-md-6" id="cloud-servers-link"></li>');
  csOrig.append('<a class="labs-nav-extra-padding nav-simple-link" href="#"><i class="fa fa-wrench" style="margin-bottom: 12px;font-size: 24px;"></i><br>Original</a>')

  // build a link to the playground
  var pBeta = $('<li class="col-md-6" id="playground-link"><a class="labs-nav-extra-padding nav-simple-link" href="#"><i class="fa fa-cloud" style="margin-bottom: 12px;font-size: 24px;"></i><br>Playground</a></li>');

  // add the links to the list container
  mList.children().children().children().append(csOrig);
  mList.children().children().children().append(pBeta);

  // add the menu container to the top level menu item
  pMenu.children('#playground_overlay').append(mList);

  // swap out the old cloud servers link with the new one
  $('#cloud-servers-link').replaceWith(pMenu);

  makeMouseOverDropdown($('#playground-dropdown'), $('#playground-menu'));

  // this happens after bootstrap script runs, so we might need these two
  $(document).on('click', '#playground-link', 'a', function(e) {
    $('#playgroundModal').modal();
  });

  $(document).on('click', '#playground-link', 'a', function(e) {
    $('#playgroundModal').modal();
  });

  $('#playgroundModal iframe').attr('src', 'https://cs-fe.linuxacademy.com');

}
