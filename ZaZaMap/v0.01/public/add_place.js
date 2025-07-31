function animatePopUp() {
		  const box = document.getElementById('AddPlace-popup');

		  box.style.display = 'block'; // Make it visible
		  box.style.transform = 'translateX(-50%) translateY(100%)'; // Reset to start position

		  const duration = 100;
		  const start = performance.now();

		  const startY = 100;    // % from bottom
		  const endY = 0;      // 

		  function animate(time) {
			const progress = Math.min((time - start) / duration, 1);
			const currentY = startY + (endY - startY) * progress;
			box.style.transform = `translateX(-50%) translateY(${currentY}%)`;

			if (progress < 1) {
			  requestAnimationFrame(animate);
			}
		  }

		  requestAnimationFrame(animate);

    }
	
	map.on('click', function (e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    setCoordinates(lat, lng);
});

let selectedLat = null;
let selectedLng = null;

// Example function to set coordinates (call this from your map click handler)
function setCoordinates(lat, lng) {
    selectedLat = lat;
    selectedLng = lng;
    document.getElementById("coordinates").innerText = `Lat: ${lat}, Lng: ${lng}`;
}

function savePlace() {
    const name = document.getElementById('placeName').value.trim();
    const description = document.getElementById('placeDescription').value.trim();

    if (!name || !description || selectedLat === null || selectedLng === null) {
        alert('Please fill in all fields and select coordinates on the map.');
        return;
    }

    const newPlace = {
        name,
        lat: selectedLat,
        lng: selectedLng,
        description
    };

    fetch('/add-place', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPlace)
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to save place.');
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('Place added successfully!');
            closeaddplacepopup();
            // Optionally clear form and coordinates
            document.getElementById('placeName').value = '';
            document.getElementById('placeDescription').value = '';
            document.getElementById('coordinates').innerText = 'Click on the map to get coordinates.';
            selectedLat = null;
            selectedLng = null;
        } else {
            alert('Failed to save place.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while saving the place.');
    });
}