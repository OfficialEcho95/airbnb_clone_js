document.addEventListener("DOMContentLoaded", function () {
    // Fetch the content of index_heder.html
    fetch('./index_header.html')
        .then(response => response.text())
        .then(html => {
            // Inject the content into the specified container
            document.getElementById("index_header").innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching index.html:', error);
        });
});
