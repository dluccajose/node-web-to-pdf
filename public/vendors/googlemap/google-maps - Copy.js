var locations = [
    ['Bondi Beach', -33.890542, 151.274856, 4, 'http://labs.google.com/ridefinder/images/mm_20_purple.png'],
    ['Coogee Beach', -33.923036, 151.259052, 5, 'http://labs.google.com/ridefinder/images/mm_20_purple.png'],
    ['Cronulla Beach', -34.028249, 151.157507, 3, 'http://labs.google.com/ridefinder/images/mm_20_purple.png'],
    ['Manly Beach', -33.80010128657071, 151.28747820854187, 2, 'http://labs.google.com/ridefinder/images/mm_20_purple.png'],
    ['Maroubra Beach', -33.950198, 151.259302, 1, 'http://labs.google.com/ridefinder/images/mm_20_purple.png']
];

var map = new google.maps.Map(document.getElementById('aheto-map'), {
    zoom: 10,
    center: new google.maps.LatLng(-33.92, 151.25),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#444444"
            }]
        },
        {
            "featureType": "administrative.country",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "administrative.province",
            "elementType": "labels.icon",
            "stylers": [{
                    "hue": "#ff0000"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
                "color": "#f2f2f2"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{
                    "saturation": -100
                },
                {
                    "lightness": 45
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{
                "visibility": "simplified"
            }]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
                    "color": "#46bcec"
                },
                {
                    "visibility": "on"
                }
            ]
        }
    ]
});

var infowindow = new google.maps.InfoWindow();

var marker, i;

for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        icon: locations[i][4]
    });
}
