// Initialize current month and year
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Render calendar
function renderCalendar() {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const firstDayOffset = firstDayOfMonth.getDay();

    const calendarTitle = document.getElementById('calendar-title');
    const calendarContainer = document.getElementById('calendar');
    calendarContainer.innerHTML = '';  // Clear previous days

    // Set month and year in title
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    calendarTitle.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    // Render the days of the week
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = day;
        calendarContainer.appendChild(dayElement);
    });

    // Add empty divs before the first day of the month
    for (let i = 0; i < firstDayOffset; i++) {
        const emptyElement = document.createElement('div');
        emptyElement.classList.add('day');
        calendarContainer.appendChild(emptyElement);
    }

    // Render the days in the month
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day-number');
        dayElement.textContent = day;

        // Disable past dates
        const date = new Date(currentYear, currentMonth, day);
        if (date < today.setHours(0, 0, 0, 0)) {
            dayElement.classList.add('disabled');
        } else {
            dayElement.onclick = () => selectDate(day);
        }

        calendarContainer.appendChild(dayElement);
    }
}

// Handle the date selection
function selectDate(day) {
    const dayElements = document.querySelectorAll('.day-number');
    dayElements.forEach(element => {
        element.classList.remove('selected');
    });
    const selectedDayElement = Array.from(dayElements).find(element => element.textContent == day);
    if (selectedDayElement) {
        selectedDayElement.classList.add('selected');
    }
}

// Navigation buttons
document.getElementById('prev-month').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
});

document.getElementById('next-month').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
});

// Initial calendar rendering
renderCalendar();

// Form submission
document.getElementById('booking-form').addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Appointment booked successfully!');
});