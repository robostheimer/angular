'use strict';

/* App Module */
//var teachernamehash = window.location.hash.split('/')[2];
var TAS_SITE = angular.module('TAS_SITE', ['ngRoute',  'BaseballCardInfo', 'ClassPage',  'Media', 'ngSanitize', 'ngAnimate', 'Alumni','TabPages', 'FAQs', 'TASA', 'Homepage','Highlights','ngTouch','Footer', 'SearchBox', 'Navigation', 'RespNav','angulartics', 'angulartics.google.analytics', 'Favorites']);
TAS_SITE.config(['$routeProvider',
  function($routeProvider) {
   $routeProvider.
  	  when('/home/', {
        templateUrl: 'partials/home.html',
       controller: 'homePageController'
      }).
      when('/Home/', {
        templateUrl: 'partials/home.html',
       controller: 'homePageController'
      }).
 	 	when('/highlights/', {
        templateUrl: 'partials/highlights.html',
       controller: 'highlightsController'
      }).
      when('/contact/', {
        templateUrl: 'partials/contact.html',
       controller: 'highlightsController'
      }).
       when('/Contact/', {
        templateUrl: 'partials/contact.html',
       controller: 'highlightsController'
      }).
      
      when('/pastseasons/', {
        templateUrl: 'partials/pastseasons.html',
       controller: 'pastController'
      }).
       when('/past_seasons/', {
        templateUrl: 'partials/pastseasons.html',
       controller: 'pastController'
      }).
       when('/Past_Seasons/', {
        templateUrl: 'partials/pastseasons.html',
       controller: 'pastController'
      }).
       when('/Past_seasons/', {
        templateUrl: 'partials/pastseasons.html',
       controller: 'pastController'
      }).
       when('/past_Season/', {
        templateUrl: 'partials/pastseasons.html',
       controller: 'pastController'
      }).
       when('/past_season/', {
        templateUrl: 'partials/pastseasons.html',
       controller: 'pastController'
      }).
       when('/Past_Season/', {
        templateUrl: 'partials/pastseasons.html',
       controller: 'pastController'
      }).
      
       when('/NOAA_Corps/', {
        templateUrl: 'partials/noaacorps.html',
       controller: 'corpsController'
      }).
        when('/noaa_corps/', {
        templateUrl: 'partials/noaacorps.html',
       controller: 'corpsController'
      }).
        when('/NOAA_corps/', {
        templateUrl: 'partials/noaacorps.html',
       controller: 'corpsController'
      }).
        when('/noaa_Corps/', {
        templateUrl: 'partials/noaacorps.html',
       controller: 'corpsController'
      }).
        when('/corps/', {
        templateUrl: 'partials/noaacorps.html',
       controller: 'corpsController'
      }).
        when('/Corps/', {
        templateUrl: 'partials/noaacorps.html',
       controller: 'corpsController'
      }).
      
        when('/feeds/', {
        templateUrl: 'partials/feeds.html',
       controller: 'corpsController'
      }).
        when('/Feeds/', {
        templateUrl: 'partials/feeds.html',
       controller: 'corpsController'
      }).
      
      when('/Highlights/', {
        templateUrl: 'partials/highlights.html',
       controller: 'pastController'
      }).
 	  when('/NETASA/', {
        templateUrl: 'partials/NETASA.html',
       	controller: 'getTASAData'
      }).
      when('/netasa/', {
        templateUrl: 'partials/NETASA.html',
       	controller: 'getTASAData'
      }).
  	  when('/faqs/', {
        templateUrl: 'partials/faqs.html',
       	controller: 'getFAQsData'
      }).
       when('/faq/', {
        templateUrl: 'partials/faqs.html',
       	controller: 'getFAQsData'
      }).
      when('/FAQs/', {
        templateUrl: 'partials/faqs.html',
       	controller: 'getFAQsData'
      }).
       when('/FAQ/', {
        templateUrl: 'partials/faqs.html',
       	controller: 'getFAQsData'
      }).
  	   when('/ships/', {
        templateUrl: 'partials/ships.html',
       	controller: 'Tabs'
      }).
        when('/ship/', {
        templateUrl: 'partials/ships.html',
       	controller: 'Tabs'
      }).
       when('/ships/:tabname', {
        templateUrl: 'partials/ships.html',
       	controller: 'Tabs'
      }).
       when('/ship/:tabname', {
        templateUrl: 'partials/ships.html',
       	controller: 'Tabs'
      }).
  	   when('/how_to_apply/', {
        templateUrl: 'partials/how_to_apply.html',
       	controller: 'Tabs'
      }).
       when('/how_to_apply/:tabname', {
        templateUrl: 'partials/how_to_apply.html',
       	controller: 'Tabs'
      }).
  	   when('/resources/', {
        templateUrl: 'partials/resources.html',
       	controller: 'Tabs'
      }).
       when('/resources/:tabname', {
        templateUrl: 'partials/resources.html',
       	controller: 'Tabs'
      }).
  	   when('/about/', {
        templateUrl: 'partials/about.html',
       	controller: 'Tabs'
      }).
       when('/about/:tabname', {
        templateUrl: 'partials/about.html',
       	controller: 'Tabs'
      }).
  	   when('/alumni/', {
        templateUrl: 'partials/alumni.html',
       	controller: 'TabsPages-NoTop'
      }).
       when('/alumni/:tabname', {
        templateUrl: 'partials/alumni.html',
       	controller: 'TabsPages-NoTop'
      }).
  	  when('/alumni/:tab', {
        templateUrl: 'partials/alumni.html',
       	controller: 'AlumniPage'
      }).
  	  when('/alumni_spotlight/:spot_num', {
        templateUrl: 'partials/spotlight.html',
       	controller: 'spotPage'
      }).
	  when('/indiv_spotlight/:spot_title', {
        templateUrl: 'partials/indiv_spotlight.html',
       	controller: 'openIndivSpot'
      }).
      when('/alumni_spotlight/', {
        templateUrl: 'partials/spotlight.html',
       	controller: 'spotPage'
      }).
      when('/alumni_spotlights/', {
        templateUrl: 'partials/spotlight.html',
       	controller: 'spotPage'
      }).
  	  when('/pow/:pow_num', {
        templateUrl: 'partials/pow.html',
       	controller: 'powPage'
      }).
      when('/photo_of_week/:pow_num', {
        templateUrl: 'partials/pow.html',
       	controller: 'powPage'
      }).
      when('/photos_of_week/:pow_num', {
        templateUrl: 'partials/pow.html',
       	controller: 'powPage'
      }).
  	  when('/pow/', {
        templateUrl: 'partials/pow.html',
       	controller: 'powPage'
      }).
      when('/photos_of_week/', {
        templateUrl: 'partials/pow.html',
       	controller: 'powPage'
      }).
      when('/photo_of_week/', {
        templateUrl: 'partials/pow.html',
       	controller: 'powPage'
      }).
  	  when('/media/', {
        templateUrl: 'partials/media.html',
       	controller: 'mediaPage'
      }).
      when('/news/:news_num', {
        templateUrl: 'partials/news.html',
       	controller: 'newsPage'
      }).
      when('/news/', {
        templateUrl: 'partials/news.html',
       	controller: 'newsPage'
      }).
      when('/:year/:teachername/', {
        templateUrl: 'partials/profile.html',
       redirectTo:'/:year/:teachername/blogs'
      }).
      when('/2009/:teachername/:tab', {
        templateUrl: 'partials/profile.html',
        controller: 'changeTab'
      }).
      when('/2009/', {
        templateUrl: 'partials/class.html',
        controller: 'classPage'
      }).
     when('/2010/:teachername/:tab', {
        templateUrl: 'partials/profile.html',
        controller: 'changeTab'
      }).
      when('/2010/', {
        templateUrl: 'partials/class.html',
        controller: 'classPage'
      }).
      when('/2011/:teachername/:tab', {
        templateUrl: 'partials/profile.html',
        controller: 'changeTab'
      }).
     when('/2011/', {
        templateUrl: 'partials/class.html',
        controller: 'classPage'
      }).
     when('/2012/:teachername/:tab', {
        templateUrl: 'partials/profile.html',
        controller: 'changeTab'
      }).
     when('/2012/', {
        templateUrl: 'partials/class.html',
        controller: 'classPage'
      }). 
     when('/2013/:teachername/:tab', {
        templateUrl: 'partials/profile.html',
        controller: 'changeTab'
      }).
     when('/2013/', {
        templateUrl: 'partials/class.html',
        controller: 'classPage'
      }).
     when('/2014/:teachername/:tab', {
        templateUrl: 'partials/profile.html',
        controller: 'changeTab'
      }).
    when('/2014/', {
        templateUrl: 'partials/class.html',
        controller: 'classPage'
      }).
    when('/2015/', {
        templateUrl: 'partials/class.html',
        controller: 'classPage'
      }).  
    otherwise({
      	templateUrl: 'partials/home.html',
        redirectTo: '/home/'
        //controller:'partials/home.html'
     });






     // use the HTML5 History API
		

  }])
  
.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
         $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
    	$httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]); 
  
  /*app.run(function($rootScope, $location, $anchorScroll, $routeParams) {
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    $location.hash($routeParams.scrollTo);
    $anchorScroll();  
  });
}) */
