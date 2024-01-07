const places = async () => {
    try {
        const response = await fetch('/users/getAllPlace', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (response.ok) {
            const placesContainer = document.getElementById('places');


            data.places.forEach(place => {
                const allProductsDisplay = document.createElement('div');
                allProductsDisplay.id = "all_products_display";

                const place_name = document.createElement('p');
                place_name.id = 'place_name';
                place_name.textContent = place.name;

                // for creating place cards
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
                place_price.textContent = `${place.price_by_night} night`;

                allProductsDisplay.appendChild(placeImages);
                allProductsDisplay.appendChild(place_location);
                allProductsDisplay.appendChild(place_price);

                placesContainer.appendChild(allProductsDisplay);
            });

        }
    } catch (error) {
        console.log('error encountered:', error)
    }
}

places()

function toggleDropdown(menu_dropdown) {
    const dropdown = document.getElementById(menu_dropdown);
    dropdown.classList.toggle('show');
}

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
