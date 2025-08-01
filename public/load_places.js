	let currentPlace = null;
	
	fetch("/places")
    .then(response => response.json())
	.then(data => {
		// Load Places to smoke
		if (data && data.places) {
			data.places.forEach(place => {
				const marker = L.marker([place.lat, place.lng], { icon: WeedLeafIcon })
					.addTo(map)
					

//Wenn auf Marker geklickt...
				marker.placeData = place;

				marker.on('click', () => {
					currentPlace = marker.placeData;  // ← set currentPlace here
					
					document.getElementById('PlacePopUp').style.display = 'block';
					document.getElementById('PopUp-Footer').style.display = 'none';
					document.getElementById('PlaceName').innerText = `${marker.placeData.name}`;
					document.getElementById('PlaceDescription').innerText = `${marker.placeData.description}`;
					document.getElementById("googlemaps-link").innerHTML = `<a href="https://www.google.com/maps?q=${marker.placeData.lat},${marker.placeData.lng}">📌 Directions</a>`
					document.getElementById("bubatzkarte-link").innerHTML = `<a href="https://bubatzkarte.app/map?lat=${marker.placeData.lat}&lng=${marker.placeData.lng}">🇩🇪 See if you can smoke here</a>`
				});
			});
		} else {
			console.error("No places found or invalid data structure.");
		}
		
		// Load Coffeeshops
		if (data && data.shops) {
			data.shops.forEach(place => {
				const marker = L.marker([place.lat, place.lng], { icon: CoffeeShopIcon })
					.addTo(map)
					

//Wenn auf Marker geklickt...
				marker.placeData = place;

				marker.on('click', () => {
					document.getElementById('PlacePopUp').style.display = 'block';
					document.getElementById('PlaceName').innerText = `📌 ${marker.placeData.name}`;
					document.getElementById('PlaceDescription').innerText = `${marker.placeData.description}`;
					document.getElementById("googlemaps-link").innerHTML = `<a href="https://www.google.com/maps?q=${marker.placeData.lat},${marker.placeData.lng}">📌 Directions</a>`
					document.getElementById("bubatzkarte-link").innerHTML = `<a href="https://bubatzkarte.app/map?lat=${marker.placeData.lat}&lng=${marker.placeData.lng}">🇩🇪 See if you can smoke here</a>`
				});
			});
		} else {
			console.error("No places found or invalid data structure.");
		}
	})
    .catch(error => console.error("Error loading places:", error));
        
function ExpandPopUp() {
	document.getElementById("PopUp-Footer").style.display = "block";
}       

		