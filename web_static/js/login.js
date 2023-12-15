async function submitForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/users/loginUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            }),
        });

        const data = await response.json();

        if (response.ok){
            console.log("Login successful");
            alert("Login successful");
            // window.location.href = '/dashboard';

        } else {
            console.error('Error logging in:', data.message);

            if (data.errors) {
                // Handle validation errors
                const errorMessage = Object.values(data.errors).map((e) => e.message).join(', ');
                alert(`Validation error: \n${errorMessage}`);
            } else {
                alert("Something went wrong. Please try again");
            }           
        }
    } catch (error){
        console.log("Error logging in: ", error);
        alert("Error encountered");
    }
}
