angular.module('buycepsApp')
.config(function($stateProvider, $urlRouterProvider) {
    console.log("Routing");

    $urlRouterProvider.otherwise('/login');

    $stateProvider

        .state('login', {
            url: '/login',
            templateUrl: 'client/login/login.html'
        })

        .state('register', {
            url: '/register',
            templateUrl: 'client/register/register.html'
        })

        .state('app', {
            url: '/app',
            templateUrl: 'client/navigation/navigation.html'
        })
        
        .state('app.home', {
            url: '/home',
            templateUrl: 'client/home/home.html',
            params: { 'token': null }
        })
      
        .state('admin', {
          url: '/admin',
          templateUrl: 'admin/admin.html',
          params: { 'token' : null }
        });
});