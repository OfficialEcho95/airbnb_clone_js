const loginUser = async (credentials) => {
    try {
        const response = await fetch('/users/loginUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        return response;
    } catch (error) {
        console.error('Error in loginUser function:', error);
        throw error;
    }
};

async function submitForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Call the function to get the token
        const response = await loginUser({ email, password });

        if (response.ok) {
            const { data: { token, name } } = await response.json();

            // Use the token as needed
            sessionStorage.setItem('authToken', token);

            // Set the session cookie on the client side
            document.cookie = `sessionID=${token}; HttpOnly`;

            // Display success message
            showSuccessMessage();

            // Redirect to the dashboard after a delay
            setTimeout(() => {
                window.location.href = `/dashboard.html?name=${encodeURIComponent(name)}?dashboard`;
            }, 3000);

        } else {
            const data = await response.json();

            console.error('Error logging in:', data.message);

            if (data.errors) {
                // Handle validation errors
                const errorMessage = Object.values(data.errors).map((e) => e.message).join(', ');
                alert(`Validation error: \n${errorMessage}`);
            } else {
                alert("Something went wrong. Please try again");
            }
        }
    } catch (error) {
        console.log("Error logging in: ", error);
        alert("Error encountered");
    }
}

function showSuccessMessage() {
    // Create the success message element
    const successMessage = document.createElement('div');
    successMessage.textContent = 'Login successful';
    successMessage.className = 'success-message';

    // Append it to the body
    document.body.appendChild(successMessage);

    // Set a timeout to fade out and remove the message after 1 second
    setTimeout(() => {
        successMessage.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 1000);
    }, 3000); // Adjust the duration of the message as needed

    // Set fixed position styles to keep it at the top
    successMessage.style.position = 'fixed';
    successMessage.style.top = '0';
    successMessage.style.left = '50%';
    successMessage.style.transform = 'translateX(-50%)';

    // Add additional styling as needed
}

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login_button');
    if (loginButton) {
        loginButton.addEventListener('click', submitForm);
    }

     // Listen for 'keydown' event on the document
     document.addEventListener('keydown', (event) => {
        // Check if the pressed key is the 'Enter' key
        if (event.key === 'Enter') {
            // Simulate a click on the login button
            if (loginButton) {
                loginButton.click();
            }
        }
    });
});

