//this file loads the dashboard_header

document.addEventListener("DOMContentLoaded", function () {
    fetch('./dashboard_header.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById("dashboardHeader").innerHTML = html;
        }).catch(error => {
            console.error('Error fetching dashboard_header.html', error);
        });

});
