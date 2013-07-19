function initialize() {

	// Create an array of styles.
	var styles = [
	{
		featureType: "all",
		stylers: [
			{ saturation: -80 }
		]
	},
	{
		featureType: "road.arterial",
		elementType: "geometry",
		stylers: [
			{ hue: "#ffffff" },
			{ saturation: 0 }
		]
	},
	{
		featureType: "poi.business",
		elementType: "labels",
		stylers: [
		  { visibility: "off" }
		]
	 
	}
	];

	// Create a new StyledMapType object, passing it the array of styles,
	// as well as the name to be displayed on the map type control.
	var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

	// Create a map object, and include the MapTypeId to add
	// to the map type control.
	var mapOptions = {
		zoom: 16,
		center: new google.maps.LatLng(38.347319,-0.485705),
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
		}
	};
	
	var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
	var companyLogo = new google.maps.MarkerImage('img/marcador_mapa.png',
		new google.maps.Size(100,50),
		new google.maps.Point(0,0),
		new google.maps.Point(50,50)
	);
	
	var companyShadow = new google.maps.MarkerImage('img/marcador_sombra.png',
		new google.maps.Size(130,50),
		new google.maps.Point(0,0),
		new google.maps.Point(50, 30)
	);

	var contentString = '<div id="desc_marcador">'+
		'<div id="siteNotice">'+
		'</div>'+
		'<h1 id="firstHeading" class="mapFirstHeading"><span>PRO</span>ÁRQUITA</h1>'+
		'<div id="bodyContent">'+
		'<p>Gestión integral de proyectos de arquitectura<br><br>Avenida Constitución, 14, 5º Cntro<br>03002 Alicante</p>'+
		'</div>'+
		'</div>';

	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});
	var companyPos = new google.maps.LatLng(38.347319,-0.485705);
	var companyMarker = new google.maps.Marker({
		position: companyPos,
		map: map,
		title:"ProÁrquita",
		icon: companyLogo,
		shadow: companyShadow
	});

	//Associate the styled map with the MapTypeId and set it to display.
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');
	  
	google.maps.event.addListener(companyMarker, 'click', function() {
		infowindow.open(map,companyMarker);
	});
	/* Si en vez de mostrar la info mediante clic, la mostramos mediante mouseout, el siguiente código sirve para cerrar la ventana de info */
	//google.maps.event.addListener(companyMarker, 'mouseout', function() {
		//infowindow.close();
	//});
}