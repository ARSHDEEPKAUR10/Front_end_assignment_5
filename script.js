const API_KEY = "DxYV7iA5VlJyrtcwTf8cj1xkaefA155KM49YQf8z";
const BASE_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";
const gallery = document.getElementById("gallery");

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