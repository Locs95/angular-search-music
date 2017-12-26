(function() {

     var app = angular.module("app", ["ngRoute"]);


     app.factory('MusicService', function() {

     	    var playingMusic = false,
     	    playingUrl = '', 
     	    audio = '';

     	    return {
     	    	playAudio: function(track, item_id) {

     	    		var play_btn = document.querySelector('#play-btn-'+item_id);
             		var pause_btn = document.querySelector('#pause-btn-'+item_id);
             		var play_b = document.querySelectorAll('span[data-btn="play"]');
	             	var pause_b = document.querySelectorAll('span[data-btn="pause"]');

     	    		if(playingMusic === false) {
     	    			playingMusic = true;
     	    			playingUrl = track;
     	    			audio = new Audio(track);
     	    			audio.play();
     	    			play_btn.className = 'ng-hide';
     	    			pause_btn.className = 'ng-show';
     	    		}
     	    		else {
     	    			if(track == playingUrl) {
     	    				playingMusic = false;
     	    				playingUrl = '';
     	    				audio.pause();
     	    				play_btn.className = 'ng-show';
     	    				pause_btn.className = 'ng-hide';
     	    			}
     	    			else {
     	    				playingUrl = track;
     	    				audio.pause();
	     	    		    audio = new Audio(track);
	     	    		    audio.play();
                            
                            console.log(play_b);
                            var i;
                            var a;
                            // play_b.map(function(item, i) {
                            // 	item.className = 'ng-show';
                            // }); 
                            // pause_b.map(function(item, i) {
                            // 	item.className = 'ng-hide';
                            // });
                            for(i = 0; i < play_b.length; i++) {
                            	play_b[i].className = 'ng-show';
                            	pause_b[i].className = 'ng-hide';
                            }
                            
	     	    		    // play_b.className = 'ng-show';
     	    			    // pause_b.className = 'ng-hide';

     	    			    play_btn.className = 'ng-hide';
     	    				pause_btn.className = 'ng-show';
     	    			}
 
     	    		}
     	    	}
     	    };
     });

     app.controller('MusicList', function($scope, $http, MusicService) {
           
            this.play_icon = true;
     	    this.pause_icon = false;
           
           this.searchMusic = function() {
           	   var api_url = 'https://api-v2.hearthis.at/search/?t=' + this.search_music;
	           var that = this;
	           
	           $http.get(api_url).then(function(data) {
	           	   that.music = data.data;

	           	   console.log(data.data);
	           });

           };


           this.handlePlay = function(track, item_id) {


               MusicService.playAudio(track, item_id);

           	   console.log(track);
           };

          

  

     });

})();