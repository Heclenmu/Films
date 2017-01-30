var app = angular.module('app', [])

app.controller('filmCtrl', function($scope, $http, $location) {

  var base = 'http://api.themoviedb.org/3';
  var apiKey = '2f4038e83265214a0dcd6ec2eb3276f5';
  var callback = 'JSON_CALLBACK';
  $scope.noFilmSelected = true;


  $scope.showByTitle = function(){
    var query = encodeURIComponent($('#filmTitleInput').val());
    var service = '/search/movie';
    var url = base + service + '?api_key=' + apiKey +'&query='+ query + '&callback=' + callback;
    findFilm(url)
  }

  $scope.showPopularFilms = function(){
    var service = '/movie/popular';
    var url = base + service + '?api_key=' + apiKey + '&callback=' + callback;
    findFilm(url);
    }

    findFilm = function(url){
      $http.jsonp(url).
        success(function(data) {
          $scope.results = data.results
        }).
        error(function(data) {
            $scope.error = true;
        });
    }

  $scope.setFilm = function(film){
      $scope.noFilmSelected = false;
      sessionStorage.setItem('film', JSON.stringify(film));
  };
});

app.controller('filmDetailCtrl', function($scope, $http) {
  $scope.movieInfo = JSON.parse(sessionStorage.getItem('film'));
});
