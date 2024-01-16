//displays the details of each reservation/trip

document.addEventListener('DOMContentLoaded', async () => {
    const params = new window.URLSearchParams(window.location.search);
    reservationId = params.get('reservationId');

    const response = await fetch(`/reservations/reservationById/${encodeURIComponent(reservationId)}`);

    try {
        if (response.ok) {
            const reservationData = await response.json();
            const reservationDetails = document.getElementById('reservationDetails');
            const reservation_det = document.getElementById("following_are_details_of_your_reservation");
            const firstname = document.getElementById("dear_firstname");
            const dates = document.getElementById('dates');
            const price = document.getElementById('price');
            const guestsNumber = document.getElementById('guestsNumber');
            const totalAmount = document.getElementById('totalAmount');
            const placeImages = document.getElementById('placeImages');

            console.log(reservationData.reservation);
            const reservation = reservationData.reservation;


            firstname.textContent = `Dear ${reservation.guest.first_name},`;
            reservation_det.innerHTML = `The following are details of your trip to <strong>${reservation.place.name};</strong>`;

            reservation.place.image.forEach(ImageSrc => {
                placeImages.src = ImageSrc;
            });

            const checkinDateString = reservationData.reservation.dates.checkIn
            const checkoutDateString = reservationData.reservation.dates.checkOut
            const checkinDate = checkinDateString.split('T')[0];
            const checkoutDate = checkoutDateString.split('T')[0];

            dates.innerHTML = `1. You checked in on <strong>${checkinDate}<\strong> and checked out on <strong>${checkoutDate}<\strong>.`;
            price.innerHTML = `2. The price to stay per night is <strong>$${reservation.place.price_by_night}<\strong>.`;
            guestsNumber.innerHTML = `3. The price for airbnb service for <strong>${reservation.guestsNumber}<\strong> `
            totalAmount.innerHTML = `4. The total amount paid for both accommodation and airbnb service is <strong>$${reservation.totalAmount}<\strong>.`















        }
    } catch (error) {
        console.error('Error occurred: ', error);
    }
});
