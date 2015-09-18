(function(){
	angular.module('app')
		.controller('MapController',

			['$scope','$http','$timeout',
			function($scope,$http,$timeout){


			console.log("MapController ready!!!!");

			// Creo las opciones del mapa
		    var mapCanvas = document.getElementById('map-canvas');
			var mapOptions = {
				center: {lat: -12.087667262738698, lng: -77.05123901367188},
		    	zoom: 10
		    }
		    

		    var map;
		    map = new google.maps.Map(mapCanvas, mapOptions);

		    var myLocation;
			if(navigator.geolocation) 
			{
				navigator.geolocation.getCurrentPosition(function(position) 
				{
					myLocation = 
				  		new google.maps.LatLng(
				  			position.coords.latitude,
				            position.coords.longitude
				        );
				    map.setCenter(myLocation);

				}, function() {
					handleNoGeolocation(true);
				});
			} else {
				// Browser doesn't support Geolocation
				handleNoGeolocation(false);
			}

			var marks = [];
			var info = [];
			var departamento = $('.departamento');


			departamento.on('change', function(){
				var value = departamento.val();
				console.log(value);
				if (value=="lima") {
					$('.distrito').removeAttr('disabled','disabled');

				}else{
					$('.distrito').attr('disabled','disabled');

					$http.get('/data/'+value+'.json')
					.success(function(data, status, headers, config) {
						// console.log(data);
						$.each(data, function(key, value) {
						    console.log(value.latitude, value.longitude);
						    createMark(value.latitude,value.longitude);
						});

					})
					.error(function(data, status, headers, config) {
						console.log("file not found");
						clearmarks();
					});
				}

			})

			var distrito = $('.distrito');
			distrito.on('change', function(){
				var value = distrito.val();
				console.log(value);
				$http.get('/data/'+value+'.json')
					.success(function(data, status, headers, config) {
						// console.log(data);
						$.each(data, function(key, value) {
						    console.log(value.latitude, value.longitude);
						    createMark(value);
						});

					})
					.error(function(data, status, headers, config) {
						console.log("file not found");
						clearmarks();
					});

			})
			

			// marker.addListener('click', function() {
			// 	infowindow.open(map, marker);
			// });
			
			function createInfoWindows(){
				for (var i = 0; i < marks.length; i++) 
				{
					var mark = marks[i];
					google.maps.event.addListener(mark, 'click', function () {
						// where I have added .html to the marker object.
						// infowindow.setContent(this.html);
			  			var contentString = '<p>Hola mundo</p>';
						var infowindow = new google.maps.InfoWindow({
						    content: contentString,
						    maxWidth: 200
						});
						infowindow.open(map, mark);
					});
				}

			}


			// Limpiar marcas del mapa
			function clearmarks(){
				var l = marks.length;
				for (var i = 0; i < l; i++) {
					marks[i].setMap(null);
					info[i].setMap(null);		
				}
			}
			// metodo para crear una marca
			function createMark(data){
				//	Creo el nuevo marcador y lo asigno al mapa principal
				var myLatLng = new google.maps.LatLng(data.latitude,data.longitude);
				var tmp_marks = new google.maps.Marker({
					position: myLatLng,
					icon: "images/location.png",
					map: map
				});
	  			var contentString = '<h3>'+data.name+'</h3>';
	  				contentString += '<p>';
	  				contentString += data.addres;
	  				contentString += '</p>';

				var infowindow = new google.maps.InfoWindow({
				    content: contentString,
				    maxWidth: 200
				});
				// infowindow.open(map, tmp_marks);
				google.maps.event.addListener(tmp_marks, 'click', function () {
					// infowindow.setContent(this.html);
					infowindow.open(map, this);
				});
				// Agrego la marka en el Array de markas
				marks.push(tmp_marks);
				info.push(infowindow);

			}






		}]);


})();
