async function logoutUser(event) {
    // Prevent the default behavior of the anchor tag
    event.preventDefault();

    try {
        const response = await fetch('/logoutUser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            delete req.session.token;
            console.log("Logout successful");
            alert("Logout successful");

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
console.log(logoutButton);
if (logoutButton) {
    logoutButton.addEventListener('click', logoutUser);
}
