'use strict';

/**
 * @ngdoc function
 * @name twitchSearchApp.controller:TwitchsearchCtrl
 * @description
 * # TwitchsearchCtrl
 * Controller of the twitchSearchApp
 */
angular.module('twitchSearchApp',['twitchSearchService'])
  .controller('TwitchsearchCtrl', function ($scope,twitchSearchServ,$window) {
  $scope.total = 0;
  $scope.currentPage = 1;
  $scope.page = 1;
  $scope.numberOfPages=1;
  $scope.emptyResult= false;
  $scope.disablePrev = true;
  $scope.disableNext = true;
  $scope.showNavigation = false;

  /*Following function requests for new data according to query
  this function also checks if to disable next - previous buttons, number of pages etc */

  $scope.getSearchData = function(searchQuery){
     $scope.showNavigation = true;
        if(searchQuery == null){
            $scope.errorShow = true;
        }else if(searchQuery == ''){
          $scope.errorShow = false;
        }else{
           $scope.errorShow = false;
          twitchSearchServ.getSearchData(searchQuery,$scope.page)
            .then(function (studs) {
                $scope.total = studs.data._total;
                $scope.streams = studs.data.streams;
                if($scope.streams == 0){
                   $scope.emptyResult = true;
                }else{

                      $scope.emptyResult = false;

                }
                angular.forEach($scope.streams, function(value, key){
                   if (value.channel.logo == null){
                      value.channel.logo = "/images/noimage.jpeg"
                   }
                 });
                $scope.numberOfPages = Math.ceil($scope.total/10);
                 if($scope.page == 1){
                    $scope.disablePrev = true;
                   }else{
                    $scope.disablePrev = false;
                   }

                  if($scope.page == $scope.numberOfPages){
                     $scope.disableNext = true;
                   }else{
                     $scope.disableNext = false;
                   }
            });
        } 
  }

    $scope.previousPage = function (searchQuery) {
       if(!searchQuery == null || !searchQuery == '' ){
         $scope.errorShow = false;
        if($scope.page == 1){
          $scope.disablePrev = true;
        }else{
          if($scope.page!=0){
            $scope.disablePrev = false;
              $scope.page-=1;
              $scope.getSearchData(searchQuery);
          }
        }
      }else{
         $scope.errorShow = true;
      }
    };
    $scope.nextPage = function (searchQuery) {
      if(!searchQuery == null || !searchQuery == '' ){
          $scope.errorShow = false;
          $scope.disablePrev = false;
          if($scope.page == $scope.numberOfPages){
              $scope.disableNext = true;
          }else{
             $scope.page+=1;
             $scope.getSearchData(searchQuery);
          }
        }else{
           $scope.errorShow = true;
        }
    };
    $scope.watchStream = function(url){
       $window.open(url);
    }
 
  });
