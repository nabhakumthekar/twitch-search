'use strict';

/**
 * @ngdoc service
 * @name twitchSearchApp.twitchSearchServ
 * @description
 * # twitchSearchServ
 * Service in the twitchSearchApp.
 */

var app = angular.module('twitchSearchService',[]);
app.service('twitchSearchServ', ['$http', function ($http){
	//var searchData ={}

	this.getSearchData = function(query,page){
	
	if(curentPage < page){
		var offset = (page+1)*10;
	}else{
		var offset = (page-1)*10;
	}
	
	var curentPage = page;
	var config = {
               headers : {
                   'Accept': 'application/vnd.twitchtv.v5+json',
				   'Client-ID': 'y0rkzq9zy1rf9lu4s540q5c7ss4ctd'
                },
				params:{
					query:query,offset:offset,limt:10
				}
        };
	return $http.get('https://api.twitch.tv/kraken/search/streams',config);
  };
}]);