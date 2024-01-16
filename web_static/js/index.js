document.addEventListener('DOMContentLoaded', () => {
    const init = async () => {
        try {
            const data = await fetchData('/users/getAllPlace');
            displayPlaces(data.places);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    //fetching from the db
    const fetchData = async (url) => {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.ok ? response.json() : Promise.reject('Failed to fetch data');
    };

    //getting the locations of each place
    const displayPlaces = (places) => {
        const placesContainer = document.getElementById('places');

        places.forEach(place => {
            const allProductsDisplay = createPlaceElement(place);
            placesContainer.appendChild(allProductsDisplay);
        });
    };


    //creating and appending elements
    const createPlaceElement = (place) => {
        const allProductsDisplay = document.createElement('div');
        allProductsDisplay.id = "all_products_display";

        const place_name = document.createElement('p');
        place_name.id = 'place_name';
        place_name.textContent = place.name;

        // Logic for creating place cards
        const placeImages = document.createElement('div');
        placeImages.className = 'place-images';

        place.image.forEach((imageSrc) => {
            const image = document.createElement('img');
            image.className = 'carousel-image';
            image.src = imageSrc;
            placeImages.appendChild(image);

            image.addEventListener('click', (event) => {
                event.preventDefault();
                const placeId = encodeURIComponent(place._id);
                const url = `/details.html?id=${placeId}`;
                window.open(url, '_blank');
            });
        });

        // Add click event listener to each image

        const prevButton = document.createElement('button');
        prevButton.className = 'carousel-button';
        prevButton.textContent = '❮';

        const nextButton = document.createElement('button');
        nextButton.className = 'carousel-button';
        nextButton.textContent = '❯';

        placeImages.appendChild(prevButton);
        placeImages.appendChild(nextButton);

        // Logic for image carousel
        const images = placeImages.querySelectorAll('.carousel-image');
        let currentImageIndex = 0;

        function showImage(index) {
            images.forEach((image, i) => {
                image.style.display = i === index ? 'block' : 'none';
            });
        }

        prevButton.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            showImage(currentImageIndex);
        });

        nextButton.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            showImage(currentImageIndex);
        });

        // Show the first image initially
        showImage(currentImageIndex);

        const place_location = document.createElement('p');
        place_location.id = "place_address";
        place_location.style.fontWeight = 'bold';
        place_location.textContent = place.location;

        const place_price = document.createElement('p');
        place_price.id = "place_price";
        place_price.style.fontWeight = 'bold';
        place_price.textContent = `\$${place.price_by_night} night`;

        allProductsDisplay.appendChild(placeImages);
        allProductsDisplay.appendChild(place_location);
        allProductsDisplay.appendChild(place_price);

        return allProductsDisplay;
    };

    const toggleDropdown = (menu_dropdown) => {
        const dropdown = document.getElementById(menu_dropdown);
        dropdown.classList.toggle('show');
    };
    
    // Add a general click event listener to the document
    document.addEventListener('click', function (event) {
        // Check if the clicked element is not the menu or user icon
        if (!event.target.matches('#menu_icon img') && !event.target.matches('#user_icon img')) {
            // Close all dropdowns
            const dropdowns = document.getElementsByClassName('dropdown-content');
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    });
    
    const userMenuElements = document.getElementsByClassName('user_menu');

    // Add an event listener to the menu icon to toggle the dropdown
    Array.from(userMenuElements).forEach(element => {
        element.addEventListener('click', () => toggleDropdown('menu_dropdown'));
    });

init();    

});
