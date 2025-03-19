const API_KEY = "DxYV7iA5VlJyrtcwTf8cj1xkaefA155KM49YQf8z";
const BASE_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";

async function fetchMarsPhotos(date) {
    try {
        const response = await fetch(`${BASE_URL}?earth_date=${date}&api_key=${API_KEY}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        return data.photos;
    } catch (error) {
        console.error("Error fetching Mars photos:", error);
        return [];
    }
}

function displayPhotos(photos, description) {
    gallery.innerHTML = ""; // Clear previous photos
    if (photos.length === 0) {
        gallery.innerHTML = "<p>No photos available for this date.</p>";
        return;
    }

    photos.slice(0, 3).forEach(photo => {
        const imgElement = document.createElement("img");
        imgElement.src = photo.img_src;
        imgElement.alt = `Mars Rover Photo - ${photo.earth_date}`;

        const caption = document.createElement("p");
        caption.textContent = description || `Captured on: ${photo.earth_date}`;

        const container = document.createElement("div");
        container.appendChild(imgElement);
        container.appendChild(caption);

        gallery.appendChild(container);
    });
}
fetchMarsPhotos("2025-03-15").then(photos => displayPhotos(photos, "Significant Rover Mission Date"));

document.getElementById("loadPhotos").addEventListener("click", async () => {
    const selectedDate = document.getElementById("datePicker").value;
    if (!selectedDate) {
        alert("Please select a date!");
        return;
    }

    const photos = await fetchMarsPhotos(selectedDate);
    displayPhotos(photos, `Photos from ${selectedDate}`);
});
