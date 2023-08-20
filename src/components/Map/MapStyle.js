export default {
    disableDefaultUI: true, // Disables the default UI components
    clickableIcons: false, // Disables the clickable icons (markers)
    styles: [
        {
            elementType: "geometry",
            stylers: [
                {
                    color: "#1e4366", // Adjust the geometry color
                },
            ],
        },
        {
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#ffffff", // Adjust the text fill color
                },
            ],
        },
        {
            elementType: "labels.text.stroke",
            stylers: [
                {
                    color: "#1e4366", // Adjust the text stroke color
                },
            ],
        },
        {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [
                {
                    color: "#146da1", // Adjust the administrative geometry stroke color
                },
            ],
        },
        {
            featureType: "administrative.land_parcel",
            elementType: "geometry.stroke",
            stylers: [
                {
                    color: "#2e89c3", // Adjust the land parcel geometry stroke color
                },
            ],
        },
        {
            featureType: "administrative.land_parcel",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#ffffff", // Adjust the land parcel labels text fill color
                },
            ],
        },
        {
            featureType: "landscape.natural",
            elementType: "geometry",
            stylers: [
                {
                    color: "#305f89", // Adjust the natural landscape color
                },
            ],
        },
        {
            featureType: "poi",
            elementType: "geometry",
            stylers: [
                {
                    color: "#305f89", // Adjust the POI geometry color
                },
            ],
        },
        {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#ffffff", // Adjust the POI labels text fill color
                },
            ],
        },
        {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [
                {
                    color: "#136c98", // Adjust the park geometry fill color
                },
            ],
        },
        {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#ffffff", // Adjust the park labels text fill color
                },
            ],
        },
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [
                {
                    color: "#104d79", // Adjust the road geometry color
                },
            ],
        },
        {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [
                {
                    color: "#105d8e", // Adjust the arterial road geometry color
                },
            ],
        },
        {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [
                {
                    color: "#0b4a70", // Adjust the highway road geometry color
                },
            ],
        },
        {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [
                {
                    color: "#1b6f9e", // Adjust the highway road geometry stroke color
                },
            ],
        },
        {
            featureType: "road.highway.controlled_access",
            elementType: "geometry",
            stylers: [
                {
                    color: "#0d5483", // Adjust the controlled access road geometry color
                },
            ],
        },
        {
            featureType: "road.highway.controlled_access",
            elementType: "geometry.stroke",
            stylers: [
                {
                    color: "#1c7db3", // Adjust the controlled access road geometry stroke color
                },
            ],
        },
        {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#ffffff", // Adjust the local road labels text fill color
                },
            ],
        },
        {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [
                {
                    color: "#305f89", // Adjust the transit line geometry color
                },
            ],
        },
        {
            featureType: "transit.line",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#ffffff", // Adjust the transit line labels text fill color
                },
            ],
        },
        {
            featureType: "transit.line",
            elementType: "labels.text.stroke",
            stylers: [
                {
                    color: "#1e4366", // Adjust the transit line labels text stroke color
                },
            ],
        },
        {
            featureType: "transit.station",
            elementType: "geometry",
            stylers: [
                {
                    color: "#305f89", // Adjust the transit station geometry color
                },
            ],
        },
        {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [
                {
                    color: "#00b4d8", // Adjust the water geometry fill color
                },
            ],
        },
        {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#ffffff", // Adjust the water labels text fill color
                },
            ],
        },{
            featureType: "poi",
            elementType: "labels",
            stylers: [
                { visibility: "off" } // Hide labels for points of interest
            ]
        },
        {
            featureType: "road",
            elementType: "labels",
            stylers: [
                { visibility: "off" } // Hide road labels
            ]
        },
        {
            featureType: "transit",
            elementType: "labels",
            stylers: [
                { visibility: "off" } // Hide transit labels
            ]
        },
        {
            featureType: "administrative",
            elementType: "labels",
            stylers: [
                { visibility: "off" } // Hide administrative labels
            ]
        },
        {
            featureType: "water",
            elementType: "labels",
            stylers: [
                { visibility: "off" } // Hide water labels
            ]
        },
        {
            featureType: "landscape",
            elementType: "labels",
            stylers: [
                { visibility: "off" } // Hide landscape labels
            ]
        },
    ],

};
