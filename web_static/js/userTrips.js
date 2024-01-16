document.addEventListener('DOMContentLoaded', async () => {
    const all_contents = document.getElementById('all_contents');

    let placeName;
    let reservationId;

    try {
        const response = await fetch('/reservations/allTrips', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();

            if (data.userTrips) {
                data.userTrips.forEach(trips => {
                    placeName = document.createElement('p');
                    placeName.id = 'placeName';
                    const totalAmount = document.createElement('p');
                    totalAmount.id = 'totalAmount';
                    const daysSpent = document.createElement('p');
                    daysSpent.id = 'daysSpent';

                    placeName.textContent = trips.place.name;
                    totalAmount.textContent = `Total amount paid: ${trips.totalAmount}`;
                    daysSpent.textContent = `Number of days spent: ${calculateDaysSpent(trips.dates.checkIn, trips.dates.checkOut)}`;

                    all_contents.appendChild(placeName);
                    all_contents.appendChild(daysSpent);
                    all_contents.appendChild(totalAmount);

                    //functionality for placeName to get details about about user trips
                    placeName.addEventListener('click', async function () {

                        reservationId = trips._id;
                        console.log(reservationId);
                        window.location.href = `tripsdetails.html?reservationId=${encodeURIComponent(reservationId)}`;
                    });
                });
            }
        } else {
            console.error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }

    function calculateDaysSpent(checkInDate, checkOutDate) {
        const startDate = new Date(checkInDate);
        const endDate = new Date(checkOutDate);

        // Calculate the difference in days
        const timeDifference = endDate.getTime() - startDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

        return daysDifference;
    }
});
