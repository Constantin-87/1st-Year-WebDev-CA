// Create tooltip element for displaying ticket information
let tooltip = document.createElement("div");
tooltip.id = "tooltip";
document.body.appendChild(tooltip);

// Global variables to keep track of the selected day, route and curent user
let selectedDay;
let selectedRoute;
let username = document.body.dataset.username;

// Function that fetches calendar data from the server
function fetchCalendarData(route) {
    return fetch('/api/busschedule')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Fetch operation error:', error);
            });
}

// Function that displays the calendar for a selected route
function displayCalendar(data, route) {
    // Hide all calendar containers
    const calendarContainers = document.querySelectorAll('.calendar-container');
    calendarContainers.forEach(container => container.style.display = 'none');

    const filteredData = data.filter(item => item.route === route);
    const calendar = createCalendarHTML(filteredData);
    const calendarContainer = document.getElementById('calendar-' + route);
    if (calendarContainer) {
        calendarContainer.innerHTML = calendar;
        calendarContainer.style.display = 'block';
    }
    attachDayCellEventListeners(filteredData); // Attach click event listeners to day cells
}

// Function that creates HTML for the calendar
function createCalendarHTML(data) {
    let calendarHtml = '<table class="calendar-table">';

    // Generate HTML for each month
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
        if (monthIndex % 4 === 0) {
            calendarHtml += '<tr>'; // New row every 4 months
        }

        calendarHtml += '<td>';
        calendarHtml += `<div class="month-name">${getMonthName(monthIndex)}</div>`;
        calendarHtml += '<table class="month-calendar"><tr>';

        // Days of the week headers
        const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
        daysOfWeek.forEach(day => {
            calendarHtml += `<th>${day}</th>`;
        });
        calendarHtml += '</tr><tr>';

        // Calculate the day of the week for the first day of the month
        let firstDayOfMonth = new Date(data[0].date.year, monthIndex, 1).getDay();
        firstDayOfMonth = firstDayOfMonth === 0 ? 7 : firstDayOfMonth; // Adjusting Sunday from 0 to 7

        // Fill blanks for days before the first of the month
        if (firstDayOfMonth > 1) {
            calendarHtml += '<td colspan="' + (firstDayOfMonth - 1) + '"></td>'; // Adjust colspan as needed
        }

        // Generate days for each month
        let daysInMonth = new Date(data[0].date.year, monthIndex + 1, 0).getDate();
        let dayCounter = firstDayOfMonth - 1;

        for (let day = 1; day <= daysInMonth; day++) {
            let dayData = data.find(d => d.date.dayOfMonth === day && d.date.monthValue - 1 === monthIndex);
            let isRunningDay = dayData && dayData.availableTickets !== -1; // Check if the day is a running day
            let cellClass = isRunningDay ? 'running-day' : '';
            let ticketCount = isRunningDay ? dayData.availableTickets : -1;
            calendarHtml += `<td class="${cellClass} day-cell" data-month-index="${monthIndex}" data-tickets="${ticketCount}">${day}</td>`;

            dayCounter++;

            if (dayCounter % 7 === 0 && day !== daysInMonth) {
                calendarHtml += '</tr><tr>'; // Start a new row each week
            }
        }

        // Fill in blanks for remaining days of the week after the last day of the month
        let remainingCells = 7 - (dayCounter % 7);
        if (remainingCells < 7) {
            calendarHtml += '<td colspan="' + remainingCells + '"></td>';
        }

        calendarHtml += '</tr></table></td>';
        if (monthIndex % 4 === 3) {
            calendarHtml += '</tr>'; // End row every 4 months
        }
    }

    calendarHtml += '</table>';
    return calendarHtml;
}


// Function to attach click event listeners to day cells
function attachDayCellEventListeners(data) {
    const dayCells = document.querySelectorAll('.day-cell');
    dayCells.forEach(cell => {
        let monthIndex = cell.getAttribute('data-month-index');
        let day = parseInt(cell.textContent);
        let dayData = data.find(d => d.date.dayOfMonth === day && d.date.monthValue - 1 === parseInt(monthIndex));

        if (dayData) {
            cell.classList.remove('sold-out-day', 'limited-tickets-day', 'available-day', 'not-running-day');
            if (dayData.availableTickets === -1) {
                cell.classList.add('not-running-day');
            } else if (dayData.availableTickets === 0) {
                cell.classList.add('sold-out-day');
            } else if (dayData.availableTickets > 0 && dayData.availableTickets <= 5) {
                cell.classList.add('limited-tickets-day');
            } else {
                cell.classList.add('available-day');
            }
        }

        // Click event listener
        cell.addEventListener("click", function () {
            if (selectedDay) {
                selectedDay.classList.remove("selected-day");
            }
            this.classList.add("selected-day");
            selectedDay = this;
            selectedDay.setAttribute('data-date', `${this.textContent}/${parseInt(monthIndex) + 1}/${data[0].date.year}`);
        });

        // Mouseover event to show tooltip
        cell.addEventListener('mouseover', function (event) {
            let dayInfo = 'Data not available'; // Default message
            if (dayData) {
                if (dayData.availableTickets === -1) {
                    dayInfo = 'Not running this day';
                } else if (dayData.availableTickets === 0) {
                    dayInfo = 'Sold out';
                } else {
                    dayInfo = `${dayData.availableTickets} tickets available`;
                }
            }

            // Offset the tooltip position
            let xOffset = 20; // Horizontal offset
            let yOffset = 20; // Vertical offset

            tooltip.innerHTML = dayInfo;
            tooltip.style.left = (event.pageX + xOffset) + 'px';
            tooltip.style.top = (event.pageY + yOffset) + 'px';
            tooltip.style.display = 'block';
        });

        // Mouseout event to hide tooltip
        cell.addEventListener('mouseout', function () {
            tooltip.style.display = 'none';
        });

        // Mouseover event for hover effect
        cell.addEventListener('mouseover', function () {
            this.classList.add('hover-effect');
        });

        // Mouseout event to remove hover effect
        cell.addEventListener('mouseout', function () {
            this.classList.remove('hover-effect');
        });
    });
}

// DOMContentLoaded event to setup initial interactions
document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('bookTicketBtn').onclick = () => toggleSectionVisibility('bookTicket', 'bookedTickets');

    // Update the event listener for the 'Already booked tickets' button
    document.getElementById('bookedTicketsBtn').onclick = () => {
        if (username) {
            fetchBookedTickets(username);
            toggleSectionVisibility('bookedTickets', 'bookTicket');
        } else {
            console.error('User not logged in');
        }
    };

    const routeButtons = document.querySelectorAll('.route-button');
    routeButtons.forEach(button => {
        button.addEventListener('click', function () {
            selectedRoute = this.textContent.trim();
            fetchCalendarData(selectedRoute).then(data => displayCalendar(data, selectedRoute));
        });
    });

    document.querySelector('.route-button').click(); // Automatically click the first route button
});

// Function to toggle visibility between booking and booked tickets sections
function toggleSectionVisibility(showSectionId, hideSectionId) {
    document.getElementById(showSectionId).style.display = 'flex';
    document.getElementById(hideSectionId).style.display = 'none';
}

// Function to get the name of the month based on index
function getMonthName(monthIndex) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[monthIndex];
}

// Function to send a POST request to reserve a ticket
function reserveTicket(route, date) {
    const apiUrl = '/api/tickets/reserve';

    // Create a JSON object with the data to be sent
    const ticketData = {
        route: route,
        date: date
    };

    // Send a POST request to the API
    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticketData)
    })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Server responded with an error');
                }
                return response.json();
            })
            .then(data => {
                alert(data.message);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while reserving the ticket.');
            });
}

// Event listener for the "Buy Ticket" button
document.getElementById('buyTicketBtn').addEventListener('click', function () {
    if (!selectedDay) {
        alert("Please select a day.");
        return;
    }

    const availableTickets = parseInt(selectedDay.getAttribute('data-tickets'));

    if (availableTickets === -1) {
        alert("The bus is not running on this day, please select a running day.");
    } else if (availableTickets === 0) {
        alert("No tickets available.");
    } else {
        // Call reserveTicket function and then refresh calendar
        reserveTicket(selectedRoute, selectedDay.getAttribute('data-date'))
                .then(() => {
                    fetchCalendarData(selectedRoute).then(data => displayCalendar(data, selectedRoute));
                    // Reset selectedDay and update UI
                    if (selectedDay) {
                        selectedDay.classList.remove("selected-day");
                        selectedDay = null;
                    }
                });
    }
});

function fetchBookedTickets(username) {
    fetch(`/api/tickets/bookedTickets/${username}`)
            .then(response => {
                if (!response.ok) {
                    console.error('Error response from server:', response.status, response.statusText);
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(tickets => displayBookedTickets(tickets))
            .catch(error => {
                console.error('Error fetching booked tickets:', error);
            });
}

function displayBookedTickets(tickets) {
    const bookedTicketsContainer = document.getElementById('bookedTickets');
    let htmlContent = '';

    if (tickets.length === 0) {
        htmlContent = '<p class="no-tickets-msg">No tickets booked.</p>';
    } else {
        tickets.forEach(ticket => {
            htmlContent += `<div class="ticket-card">
                                <div class="ticket-header">Ticket Number: ${ticket.ticketNumber}</div>
                                <p class="ticket-info">Route: ${ticket.route}</p>
                                <p class="ticket-info">Travel date: ${ticket.ticketDate}</p>
                                <div class="passenger-details">
                                    <p><strong>Passenger Info:</strong></p>
                                    <p>Name: ${ticket.passenger.name}</p>
                                    <p>Surname: ${ticket.passenger.surname}</p>
                                    <p>Age: ${ticket.passenger.age}</p>
                                    <p>Gender: ${ticket.passenger.gender}</p>
                                    <p>Date of birth: ${ticket.passenger.dateOfBirth}</p>
                                </div>
                            </div>`;
        });
    }
    bookedTicketsContainer.innerHTML = htmlContent;
}


