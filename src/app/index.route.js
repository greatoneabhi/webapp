angular.module('buycepsApp')
.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('app/home');

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
            templateUrl: 'client/home/home.html'
        })
      
        .state('admin', {
          url: '/admin',
          templateUrl: 'admin/navigation/admin.html'
        })
  
        .state('admin.users', {
          url: '/users',
          templateUrl: 'admin/users/users.html'
        })
  
        .state('admin.home', {
          url: '/home',
          templateUrl: 'admin/home/home.html'
        });
})
.run();