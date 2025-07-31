function report() {
const confirmed = confirm("Do you want to report this place?");
  if (confirmed) {
    // Example place data, replace with your actual current place data object
    const placeData = currentPlace; 

    fetch('/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(placeData)
    })
    .then(res => {
      if (res.ok) {
        alert("Thank you for your report!");
      } else {
        alert("Failed to send report.");
      }
    })
    .catch(() => alert("Error sending report."));
  }
}