SciCastApp.directive('trade',['$rootScope', function($rootScope) {
return {
restrict : 'E',
scope : {
questionId : '=',
interfaceType : '=',
ngShow: "=",
assumption: '=',
latestTrade: '=',
quickTrade: '='
},
controller : "TradeCreateController",
templateUrl : '/public/angularjs/app/partials/trades/_trade.html',
link : function(scope, element, attrs, controller) {
scope.session = $rootScope.session;

}
};
}]);