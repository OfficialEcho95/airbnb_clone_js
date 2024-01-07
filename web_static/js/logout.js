async function logoutUser(event) {
    // Prevent the default behavior of the anchor tag
    event.preventDefault();

    try {
        const response = await fetch('/users/logoutUser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log("Logout successful");
            alert("Logout successful");

            // Replace the current history entry with the index page
            window.history.replaceState({}, document.title, '/index.html');

            // Redirect to the index page
            window.location.href = '/index.html';
        } else {
            const data = await response.json();
            console.error('Error logging out:', data.message);
            alert("Error logging out. Please try again.");
        }
    } catch (error) {
        console.error('Error logging out:', error);
        alert("Error logging out. Please try again.");
    }
}

const logoutButton = document.getElementById('logout_button');
if (logoutButton) {
    logoutButton.addEventListener('click', (event) => {
        logoutUser(event);
    });
}
