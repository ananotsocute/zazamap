		var map = L.map('map', {
		  center: [51.83795177528101, 6.61479949951172], // Starting coordinates
		  zoom: 13,                // Initial zoom level
		  minZoom: 3,              // Minimum allowed zoom (drunter, Karte wiederholt sich)
		  maxZoom: 18,              // Maximum allowed zoom (drüber wird grau)
		  worldCopyJump: false // prevents snapping to the other side
		});
		
		const southWest = L.latLng(-85, -180);  // bottom-left corner
		const northEast = L.latLng(85, 180);    // top-right corner
		const bounds = L.latLngBounds(southWest, northEast);

		map.setMaxBounds(bounds);
		map.options.maxBoundsViscosity = 1.0; // 1 = fully resist dragging outside
		
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'		//little line at bottom-right
        }).addTo(map);

        var customIcon = L.icon({ //Custom Ganja-leaf Icon
            iconUrl: 'marijuana.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });
		
        fetch("/places")
    .then(response => response.json())
	.then(data => {
		if (data && data.places) {
			data.places.forEach(place => {
				const marker = L.marker([place.lat, place.lng], { icon: customIcon })
					.addTo(map)
					.bindPopup(); // PopUp-Window (no need anymore)

//Wenn auf Marker geklickt...
				marker.placeData = place;

				marker.on('click', () => {
					document.getElementById('PlacePopUp').style.display = 'block';
					document.getElementById('PlaceName').innerText = `${marker.placeData.name}`;
					document.getElementById('PlaceDescription').innerText = `${marker.placeData.description}`;
					console.log(marker.placeData.name);
					console.log(marker.placeData.description);
				});
			});
		} else {
			console.error("No places found or invalid data structure.");
		}
	})
    .catch(error => console.error("Error loading places:", error));
        
        let selectedCoordinates = null;
		let clickMarker = null; // Store the marker

//Wenn auf random Ort auf Map geklickt...
		map.on('click', function(event) {
			selectedCoordinates = event.latlng;

			// Show coordinates in UI
			document.getElementById('coordinates').innerText =
				`Coordinates: ${selectedCoordinates.lat.toFixed(5)}, ${selectedCoordinates.lng.toFixed(5)}`;

			// Show the AddPlace popup
			animatePopUp()

			// Create or move the marker
			if (clickMarker) {
				clickMarker.setLatLng(selectedCoordinates);
			} else {
				clickMarker = L.marker(selectedCoordinates).addTo(map);
			}
		});
        
        function openPopup() {
            document.getElementById('popup').style.display = 'block';
        }
		
		