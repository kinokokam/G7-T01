<template>

    <div id="app" class="container mt-4">
            <NavBar></NavBar>
        <div class="row g-5">
            <Calendar class="col-lg-6 calendar-container" @date-selected="updateSelectedDate"
                :selectedDate="selectedDate" />
            <BookingForm class="col-lg-6 booking-form-container" :selectedDate="selectedDate" />
        </div>
    </div>
    <div class="row mt-4">
        <div class="col-12">
            <AppointmentList ref="appointmentList" />
        </div>
    </div>
</template>
<script>
import Calendar from "./calendar.vue";
import BookingForm from "./bookingForm.vue";
import AppointmentList from "./appointmentList.vue";
import NavBar from "./navbar.vue";

export default {
    name: "App",
    components: {
        Calendar,
        BookingForm,
        NavBar
        
    },
    data() {
        return {
            selectedDate: null,
        };
    },
    methods: {
        updateSelectedDate(date) {
            this.selectedDate = date;
        },
    },
};
</script>

<style>
@import "/src/assets/external.css";
@import "/src/assets/appointmentBooking.css";
</style>
