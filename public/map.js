		var map = L.map('map', {
		  center: [0, 0],          // Starting coordinates
		  zoom: 13,                // Initial zoom level
		  minZoom: 3,              // Minimum allowed zoom (drunter, Karte wiederholt sich)
		  maxZoom: 18,             // Maximum allowed zoom (drüber wird grau)
		  worldCopyJump: false 	   // prevents snapping to the other side
		});
		
		const southWest = L.latLng(-85, -180);  // bottom-left corner
		const northEast = L.latLng(85, 180);    // top-right corner
		const bounds = L.latLngBounds(southWest, northEast);

		map.setMaxBounds(bounds);
		map.options.maxBoundsViscosity = 1.0; // 1 = fully resist dragging outside
		
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'		//little line at bottom-right
        }).addTo(map);
		
       	var WeedLeafIcon = L.divIcon({ //Custom Ganja-leaf Icon
			html: `<span style="font-size: 32px;">🍃</span>`,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
        });
		
        var CurrentPositionIcon = L.divIcon({ //Custom Current Position Icon
			html: `<span style="font-size: 32px;">👽</span>`,
            iconSize: [32, 32],
            iconAnchor: [0, 0],
            popupAnchor: [24, 0]
        });

        var SelectedIcon = L.divIcon({ //Custom Selected Icon
		    html: `<span style="font-size: 32px;">📍</span>`,
            iconSize: [32, 32],
            iconAnchor: [16, 302],
        });
		
        var CoffeeShopIcon = L.divIcon({ //Custom Selected Icon
		    html: `<span style="font-size: 32px;">☕</span>`,
            iconSize: [32, 32],
            iconAnchor: [16, 302],
        });

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      map.setView([latitude, longitude], 13);

      // Create marker
      const marker = L.marker([latitude, longitude], { icon: CurrentPositionIcon })
        .addTo(map)
        .bindPopup(AlienWisdoms)
        .openPopup();
    },
    (error) => {
      console.error("Geolocation error:", error.message);
      // Optional: fallback location
    }
  );
} else {
  alert("Geolocation is not supported by your browser.");
}
  
// GO TO HOME BUTTON
document.getElementById("GoToHome").addEventListener('click', () => {
		    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.setView([latitude, longitude], 13);

	  }
      
	  );
		});