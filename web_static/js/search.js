document.addEventListener('DOMContentLoaded', () => {

    const search = async () => {
        const inputField = document.getElementById('input_field_contains_search');
        const searchTerm = inputField ? inputField.value : alert('No such place found');

        console.log(inputField.value);
        try {
            const response = await fetch(`/users/searchPlace?search=${encodeURIComponent(searchTerm)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.status >= 200 && response.status < 300) {
                // Redirect after processing the search results
                window.location.href = `/search_result.html?search=${encodeURIComponent(searchTerm)}`;
            }
        } catch (err) {
            console.error('Error encountered searching for place:', err);
        }
    };


    document.getElementById('icon_search').
        addEventListener('click', (event) => {
            event.preventDefault();
            search();
        });


    document.getElementById('input_field_contains_search').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            search();
        }
    });
});
