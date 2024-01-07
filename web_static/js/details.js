const details = async () => {
    try {
        const searchParam = new URLSearchParams(window.location.search);
        const id = searchParam.get('id');
        const response = await fetch(`/users/details/${encodeURIComponent(id)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            // Create HTML elements to display details
            const container_div = document.getElementById('details_container');

            const heading = document.createElement('h1');
            heading.id = 'title_heading'
            heading.textContent = data.place.name;

            //image and all the functionalities
            const image = document.createElement('div');
            image.className = 'image_div';

            data.place.image.forEach(imageSrc => {
                const image_container = document.createElement('div');
                image_container.className = 'image_div_container';

                const img = document.createElement('img');
                img.className = 'image';
                img.src = imageSrc;

                // Add click event listener to each image for opening the lightbox
                img.addEventListener('click', () => {
                    openLightbox(imageSrc);
                });

                image_container.appendChild(img);
                image.appendChild(image_container)
            });

            //opening the lightbox
            function openLightbox(imageSrc) {
                const lightboxModal = document.getElementById('lightbox-modal');
                const lightboxImage = document.getElementById('lightbox-image');

                lightboxImage.src = imageSrc;
                lightboxModal.style.display = 'block';
            }

            // closing the lightbox
            function closeLightbox() {
                const lightboxModal = document.getElementById('lightbox-modal');
                lightboxModal.style.display = 'none';
            }

            // event listener to close button
            const closeButton = document.getElementById('close-button');

            if (closeButton) {
                closeButton.addEventListener('click', closeLightbox);
            }

            const addressParagraph = document.createElement('p');
            addressParagraph.id = 'address_paragraph';
            addressParagraph.textContent = data.place.location;

            const space_details = document.getElementById('space_details');

            const guests = document.getElementById('guests');
            guests.textContent = `${data.place.max_guest} guest`;

            const bedrooms = document.getElementById('bedrooms');
            bedrooms.textContent = `${data.place.number_rooms} bedrooms`;

            const bathrooms = document.getElementById('bathrooms');
            bathrooms.textContent = `${data.place.number_bathrooms} bathrooms`;

            const ratings_review_summary = document.getElementById('ratings_reviews_summary');

            const ratings = document.getElementById('ratings');
            const ratingValue = data.place.ratings;

            const accommodation_features = document.getElementById('accommodation_features');

            const descriptionParagraph = document.getElementById('description_paragraph');
            descriptionParagraph.textContent = data.place.description;

            const where_you_sleep = document.getElementById('where_you_sleep');

            const amenities_zone = document.getElementById('amenities_zone');

            // Function to create a star element
            const createStarElement = () => {
                const star = document.createElement('span');
                star.textContent = '★';
                return star;
            };

            // Function to append stars to the ratings element based on the rating value
            const appendStars = () => {
                const numberOfStars = Math.round(ratingValue);
                for (let i = 0; i < numberOfStars; i++) {
                    const starElement = createStarElement();
                    ratings.appendChild(starElement);
                }
            };

            // Set the text content of ratings to the actual rating value
            ratings.textContent = `${ratingValue}`;

            // Append stars based on the rating value
            appendStars();
            const review = document.getElementById('reviews');
            review.textContent = 'Reviews';

            // Add the elements to the new div
            container_div.appendChild(heading);
            container_div.appendChild(image);
            container_div.appendChild(addressParagraph);
            container_div.appendChild(space_details);
            container_div.appendChild(ratings_review_summary);
            container_div.appendChild(accommodation_features);
            container_div.appendChild(where_you_sleep);
            container_div.appendChild(amenities_zone);

        } else {
            console.error('Error fetching place details:', response.status);
        }

    } catch (error) {
        console.error('Error getting details:', error);

    }
};


// Function to display amenities
const displayAmenities = (amenitiesData) => {
    const amenities_available = document.getElementById('amenities_available');

    // Set a limit for the number of amenities initially displayed
    const initialDisplayLimit = 4;

    amenitiesData.amenity.slice(0, initialDisplayLimit).forEach(element => {
        // Create a new span element for each amenity
        const name_elem = document.createElement('span');
        name_elem.textContent = element.name;

        const icon_elem = document.createElement('img');
        icon_elem.src = element.icon;

        amenities_available.appendChild(icon_elem);
        amenities_available.appendChild(name_elem);
    });

    // Create a "Show More" button
    const showMoreButton = document.createElement('button');
    showMoreButton.id = 'showMoreButton';
    showMoreButton.textContent = 'Show all amenities';
    showMoreButton.addEventListener('click', () => {
        // Display all remaining amenities when the button is clicked
        amenitiesData.amenity.slice(initialDisplayLimit).forEach(element => {
            const name_elem = document.createElement('span');
            name_elem.textContent = element.name;

            const icon_elem = document.createElement('img');
            icon_elem.src = element.icon;

            amenities_available.appendChild(icon_elem);
            amenities_available.appendChild(name_elem);
        });

        // Hide the "Show More" button after displaying all amenities
        showMoreButton.style.display = 'none';
    });

    // Append the "Show More" button to the 'amenities_available' container
    amenities_available.appendChild(showMoreButton);
};


// Function to fetch amenities data
const fetchAmenities = async () => {
    try {
        const amenitiesResponse = await fetch('http://localhost:3000/users/getAmenities', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (amenitiesResponse.ok) {
            const amenitiesData = await amenitiesResponse.json();
            displayAmenities(amenitiesData);
        } else {
            console.error('Error fetching amenities:', amenitiesResponse.status);
        }
    } catch (error) {
        console.error('Error encountered:', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    details();
    fetchAmenities();
});
