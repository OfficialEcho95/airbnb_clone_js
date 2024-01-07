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

            // Get the 'search_results' div
            const search_results_div = document.getElementById('results');
            console.log(search_results_div);

            // Add a heading "Search Results"
            const heading = document.createElement('h2');
            heading.textContent = 'Search Results';

            // Append the heading to the 'search_results' div
            search_results_div.appendChild(heading);

            // Iterate over the places and create card elements for each result
            data.places.forEach(place => {
                // Create a card container
                const card = document.createElement('div');
                card.classList.add('card');

                // Create an image element
                const image = document.createElement('img');
                image.src = place.image;
                image.alt = place.name;

                // Create a paragraph element for the place name
                const nameParagraph = document.createElement('p');
                nameParagraph.textContent = place.name;

                // Create a paragraph element for the place description
                const descriptionParagraph = document.createElement('p');
                descriptionParagraph.textContent = place.description;

                // Append the image, name, and description to the card
                card.appendChild(image);
                card.appendChild(nameParagraph);
                card.appendChild(descriptionParagraph);

                // Add click event listener to handle redirection
                card.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.location.href = `/details.html?id=${encodeURIComponent(place._id)}`;
                });

                // Append the card to the 'search_results' div
                search_results_div.appendChild(card);
            });
        }
    } catch (err) {
        console.error('Error encountered searching for place:', err);
    }
});
