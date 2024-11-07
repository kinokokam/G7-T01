<template>

    <div id="app" class="container mt-4">
        <div class="row g-5">
            <Calendar class="col-lg-6 calendar-container" @date-selected="updateSelectedDate"
                :selectedDate="selectedDate" />
            <BookingForm class="col-lg-6 booking-form-container" :selectedDate="selectedDate" @click="submitBooking" />
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
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { auth } from "../firebase";

export default {
    name: "App",
    components: {
        Calendar,
        BookingForm,
        AppointmentList
    },
    data() {
        return {
            selectedDate: null,
            company: '',
            userId: '',
            currentDate: new Date().toLocaleDateString(),
            user: '',

        };
    },
    created() {
        // Set up an observer for the user's authentication state
        onAuthStateChanged(auth, (user) => {
            this.user = user;
        });
    },
    methods: {
        updateSelectedDate(date) {
            this.selectedDate = date;
        },
        submitBooking() {
            // const user = auth.currentUser;
            try {
                const firestore = getFirestore();
                const bookingCollection = collection(firestore, 'bookings');
                const booking = {
                    userId: this.user.uid,
                    appointmentDate: this.selectedDate.toLocaleDateString(),
                    company: "insert Company here",
                    currentDate: this.currentDate
                };
                // add data in to database
                const docRef = addDoc(bookingCollection, booking);
                
                console.log("Booking successful created!");
            } catch (err) {
                this.error = err.message; // Display error message
                console.error("Error creating bookings:", err);
            }
        },
    },
};
</script>

<style>
@import "/src/assets/external.css";
@import "/src/assets/appointmentBooking.css";
</style>
