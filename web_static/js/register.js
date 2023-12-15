async function submitForm() {
    const first_name = document.getElementById('first').value;
    const last_name = document.getElementById('last').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/users/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data);
            alert(`Signup successful. Please log in.`);
            redirect('/login');
        } else {
            console.error('Error creating user:', data.message);
            
            if (data.errors) {
                // Handle validation errors
                const errorMessage = Object.values(data.errors).map((e) => e.message).join(', ');
                alert(`Validation error: \n${errorMessage}`);
            } else {
                alert("Something went wrong. Please try again");
            }           
        }

    } catch (error) {
        console.error('Error:', error);
        alert("Something went wrong. Please try again.");
    }
}
