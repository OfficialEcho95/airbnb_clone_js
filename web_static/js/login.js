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
        throw error; // Re-throw the error for further handling in the calling code
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
            
            alert("Login successful");

            window.location.href = `/dashboard.html?name=${encodeURIComponent(name)}`;

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

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login_button');
    if (loginButton) {
        loginButton.addEventListener('click', submitForm);
    }
});