document.addEventListener('DOMContentLoaded', async () => {
    const searchParam = new URLSearchParams(window.location.search);
    const searchTerm = searchParam.get('search');

    try {
        const response = await fetch(`/users/searchPlace?search=${encodeURIComponent(searchTerm)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.status >= 200 && response.status < 300) {
            const data = await response.json();

            const search_result_container = document.createElement('div');
            const search_results_div = document.getElementById('results');

            const heading = document.createElement('h2');
            heading.id = 'search_result';
            heading.textContent = `Search Results for ${searchTerm}`;

            search_results_div.appendChild(heading);

            // Get user location
            const userLocation = getUserLocation();

            // Display places
            displayPlaces(data.places, search_results_div, userLocation);

            search_result_container.appendChild(heading);
            search_result_container.appendChild(search_results_div);
            document.body.appendChild(search_result_container);
        }
    } catch (err) {
        console.error('Error encountered searching for place:', err);
    }
});

const displayPlaces = (places, container, userLocation) => {
    places.forEach(location => {
        const allProductsDisplay = createPlaceElement(location, userLocation);
        container.appendChild(allProductsDisplay);
    });
};

const createPlaceElement = (place, userLocation) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const image = document.createElement('img');
    image.id = 'result_image';
    image.src = place.image;
    image.alt = place.name;

    const location_and_reserve_container = document.createElement('div');
    const locationParagraph = document.createElement('p');
    locationParagraph.className = 'paragraph';
    const address = place.location.split(',');
    const city = address[1].trim();
    const state = address[2].trim();
    locationParagraph.textContent = `${city}, ${state}`;
    location_and_reserve_container.appendChild(locationParagraph);

    const priceParagraph = document.createElement('p');
    priceParagraph.textContent = `\$${place.price_by_night} night`;
    priceParagraph.className = 'paragraph';

    // Calculate distance
    const distanceToAirbnb = document.createElement('p');
    const distance = calculateDistance(userLocation.latitude, userLocation.longitude, place.latitude, place.longitude);
    distanceToAirbnb.textContent = `Distance: ${distance.toFixed(2)} km`;

    card.appendChild(image);
    card.appendChild(locationParagraph);
    card.appendChild(distanceToAirbnb);
    card.appendChild(priceParagraph);

    card.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = `/details.html?id=${encodeURIComponent(place._id)}`;
    });

    return card;
};

// Your existing functions (calculateDistance and getUserLocation) go here

const getUserLocation = () => {
    // Logic to get user location from local storage or other sources
    const storedLocation = localStorage.getItem('userLocation');

    if (storedLocation) {
        const { latitude, longitude } = JSON.parse(storedLocation);
        return { latitude, longitude };
    }

    return { latitude: 0, longitude: 0 }; // Default location if user location is not available
};

const calculateDistance = (userLat, userLng, placeLat, placeLng) => {
    // Haversine formula to calculate distance between two points
    const R = 6371; // Radius of Earth in kilometers
    const dLat = (placeLat - userLat) * (Math.PI / 180);
    const dLng = (placeLng - userLng) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(userLat * (Math.PI / 180)) * Math.cos(placeLat * (Math.PI / 180)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
};
