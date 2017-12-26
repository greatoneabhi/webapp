angular.module('buycepsApp')
.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('app/home');

    $stateProvider

        .state('login', {
            url: '/login',
            templateUrl: 'client/login/login.html',
            controller: 'loginController',
            controllerAs: 'ctrl'
        })

        .state('register', {
            url: '/register',
            templateUrl: 'client/register/register.html',
            controller: 'registerController',
            controllerAs: 'ctrl'
        })

        .state('app', {
            url: '/app',
            templateUrl: 'client/navigation/navigation.html',
            controller: 'navigationController',
            controllerAs: 'ctrl'
        })
        
        .state('app.home', {
            url: '/home',
            templateUrl: 'client/home/home.html'
        })
  
        .state('app.profile', {
            url: '/profile',
            templateUrl: 'client/profile/profile.html'
        })
      
        .state('admin', {
          url: '/admin',
          templateUrl: 'admin/navigation/admin.html'
        })
  
        .state('admin.users', {
          url: '/users',
          templateUrl: 'admin/users/users.html',
          controller: 'usersController',
          controllerAs: 'ctrl'
        })
  
        .state('admin.home', {
          url: '/home',
          templateUrl: 'admin/home/home.html'
        });
})
.run(function($http, $window) {
  var token = $window.localStorage.getItem('auth_token');
  $http.defaults.headers.common['x-access-token'] = token;
});