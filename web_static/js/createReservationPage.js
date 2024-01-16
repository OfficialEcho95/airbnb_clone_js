document.addEventListener('DOMContentLoaded', async () => {
    const dates_and_display_date = document.getElementById('dates_and_display_date');
    const edit = document.getElementById('edit');
    const display_date = document.getElementById('display_date');
    const price_by_night_times_nDays = document.getElementById('price_by_night_times_nDays');
    const starterPrice = 71.3;
    const additionalFeePerGuest = 4.87;
    let checkInDate, checkOutDate, noOfDays;

    const searchParam = new URLSearchParams(window.location.search);
    const id = searchParam.get('placeid');

    // Function to fetch data
    const fetchData = async () => {
        try {
            const response = await fetch(`/users/details/${encodeURIComponent(id)}`);
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error occurred:', error);
            throw error;
        }
    };

    let data;
    try {
        data = await fetchData();
    } catch (error) {
        console.error("Error fetching data");
    }

    //display of the preview image
    const firstImageSrc = data.place.image[0];

    if (firstImageSrc) {
        const image_container = document.getElementById('airbnb_preview');
        image_container.src = firstImageSrc;
    }

    //display airbnb name
    const airbnName = data.place.name;
    const airbnb_name = document.getElementById('airbnb_name');
    airbnb_name.textContent = airbnName;


    //display stars and ratings
    const rating = document.getElementById('rating');

    // Function to create a star element
    const createStarElement = () => {
        const star = document.createElement('span');
        star.textContent = '★';
        return star;
    };

    // Function to append stars to the ratings element based on the rating value
    const appendStars = () => {
        if (typeof (data.place.ratings === 'number')) {
            const numberOfStars = Math.round(data.place.ratings);
            for (let i = 0; i < numberOfStars; i++) {
                const starElement = createStarElement();
                rating.appendChild(starElement);
            }
        } else {
            console.error('Invalid rating value:', data.place.ratings);
        }
    };

    // Set the text content of ratings to the actual rating value
    rating.textContent = data.place.ratings;

    // Append stars based on the rating value
    appendStars();


    const options = {
        mode: 'range',
        dateFormat: 'd/m/y',
        minDate: 'today',
        onClose: async function (selectedDates) {
            if (selectedDates.length === 2) {
                checkInDate = selectedDates[0];
                checkOutDate = selectedDates[1];
                noOfDays = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

                display_date.textContent = `Check-in: ${checkInDate.toLocaleDateString()} - Check-out: ${checkOutDate.toLocaleDateString()})`;

                try {
                    if (Array.isArray(data.place)) {
                        data.place.forEach(place => {
                            displayTotalPrice(place, noOfDays);
                        });
                    } else {
                        displayTotalPrice(data.place, noOfDays);
                    }

                } catch (err) {
                    console.log('Error occurred:', err);
                }


            }
        }
    };

    //function and package to open, close and select dates
    let calendar = flatpickr(dates_and_display_date, options);

    edit.addEventListener('click', function () {
        calendar.destroy();
        calendar = flatpickr(dates_and_display_date, options);
    });

    const guest_edit = document.getElementById('guest_edit');
    const display_guests = document.getElementById('display_guests');
    const guests_and_display_guests = document.getElementById('guests_and_display_guests');
    const guestModal = document.getElementById('guestModal');
    const modalSelect = document.getElementById('modalSelect');
    const closeGuestButton = document.getElementById('closeGuestButton');

    function openGuestModal() {
        guests_and_display_guests.style.display = 'none';
        guestModal.style.display = 'flex';
    }

    async function closeGuestModal(place) {
        const selectedGuests = modalSelect.value;
        display_guests.textContent = selectedGuests;

        // display the total when the guestModal is closed
        const totalAmount = await getTotal(displayTotalPrice(place, noOfDays), selectedGuests);

        const totalAmountFigure = document.getElementById('amount_figure');
        totalAmountFigure.textContent = `\$${totalAmount}`;
        guestModal.style.display = 'none';
        guests_and_display_guests.style.display = 'flex';


        return selectedGuests;
    }

    for (let i = 1; i <= 10; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        modalSelect.appendChild(option);
    }

    guest_edit.addEventListener('click', openGuestModal);
    closeGuestButton.addEventListener('click', () => closeGuestModal(data.place));

    //function calculates the total between price per night and number of days to spend 
    function displayTotalPrice(place, noOfDays) {
        const price_by_night = place.price_by_night;
        const totalPrice = place.price_by_night * noOfDays;
        const total_price_by_night_times_nDays = document.getElementById('total_price_by_night_times_nDays');
        total_price_by_night_times_nDays.textContent = `\$${totalPrice}`;
        price_by_night_times_nDays.textContent = `$${price_by_night} x ${noOfDays} nights`;

        return total_price_by_night_times_nDays;
    }


    //function to calculate total amount (sum of the display total price and the airbnb service fee)

    async function getTotal(displayTotalPrice, selectedGuests) {
        // Calculate the dynamic service fee based on the number of guests

        const airbnb_service_fee = document.getElementById('service_fee');
        const dynamicServiceFee = starterPrice + (selectedGuests - 1) * additionalFeePerGuest;
        airbnb_service_fee.textContent = `\$${dynamicServiceFee}`;
        // Calculate the total amount
        const totalPriceElement = displayTotalPrice;
        const totalPriceText = totalPriceElement.textContent;
        const totalPriceNumeric = parseFloat(totalPriceText.replace('$', ''));

        const totalPrice = totalPriceNumeric + dynamicServiceFee;

        return parseFloat(totalPrice);

    }

    let place = data.place;
    let selectedGuests = modalSelect.value;



    //phone modal functionalities
    const modal = document.getElementById('phone_modal');
    const addButton = document.getElementById('add_phone_number_button');
    const closeButton = document.querySelector('.close');
    const continueButton = document.getElementById('continue_button');
    const phoneInput = document.getElementById('phone_input');

    // Open modal
    addButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Close modal
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Continue button action
    continueButton.addEventListener('click', () => {
        const phoneNumber = phoneInput.value;
        // phoneNumber will be called in the reservation logic
        console.log('Entered Phone Number:', phoneNumber);
        modal.style.display = 'none';
    });

    // Close modal if clicked outside the modal
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    //phone modal functionality close


    //functionalities to the confirm and pay button
    const confirmButton = document.getElementById('confirm_pay_button');
    confirmButton.addEventListener('click', async function () {

        const totalAmount = await getTotal(displayTotalPrice(place, noOfDays), selectedGuests);
        const phoneNumber = phoneInput.value;

    
        if (!phoneNumber || !selectedGuests || !noOfDays) {
            alert('All fields are required.');
            return;
        }

        const response = await fetch('/reservations/createReservation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                checkIn: checkInDate,
                checkOut: checkOutDate,
                totalAmount,
                status: 'pending',
                phone: phoneNumber,
                guestNumber: closeGuestButton,
                placeId: id,
            }),
        });

        if (response.ok) {

            //still to handle action when the reservation is created, maybe 
            //redirect to a reservation confirmation page
            alert('Reservation created');

            window.location.href = '/dashboard.html?'
        }
    });

});
