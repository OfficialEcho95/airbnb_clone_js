document.addEventListener('DOMContentLoaded', () => {
    const userNameElement = document.getElementById('user_name');
    const params = new URLSearchParams(window.location.search);
    const userName = params.get('name');

    if (userNameElement && userName) {
        userNameElement.textContent = `Welcome, ${decodeURIComponent(userName)}!`;
    }
});


//functionality to the trips anchor button
document.addEventListener('DOMContentLoaded', () => {
    const tripsButton = document.getElementById('trips_button');

    if (tripsButton) {
        tripsButton.addEventListener('click', async function () {
            try {
                const response = await fetch('/reservations/allTrips');

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const params = new URLSearchParams(window.location.search);
                const userName = params.get('name');
                
                window.location.href = `/userTrips.html?allusertrips=${decodeURIComponent(userName)}`;

            } catch (error) {
                console.error('Error fetching trips:', error.message);
            }
        });
    }
});


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


