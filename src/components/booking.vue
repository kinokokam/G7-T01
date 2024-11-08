<template>

    <div id="app" class="container mt-4">
        <div class="row g-5">
            <Calendar class="col-lg-6 calendar-container" @date-selected="updateSelectedDate"
                :selectedDate="selectedDate" />
            <BookingForm class="col-lg-6 booking-form-container" :selectedDate="selectedDate" @username="updateUserName"
                @click="submitBooking" @company="getCompanyName"/>
        </div>
    </div>
    <div class="row mt-4">
        <div class="col-12">
            <AppointmentList ref="appointmentList" />
        </div>
    </div>

    <!-- Bootstrap Modal -->
    <div class="modal fade" id="bookingSuccessModal" tabindex="-1" aria-labelledby="bookingSuccessModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="bookingSuccessModalLabel">Booking Successful</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Your booking has been successfully created. Thank you!</p>
                    <p><strong>Booking Details:</strong></p>
                    <ul>
                        <li><strong>Appointment Date:</strong> {{ bookingDetails.appointmentDate }}</li>
                        <li><strong>Company:</strong> {{ bookingDetails.company }}</li>
                        <li><strong>Current Date:</strong> {{ bookingDetails.currentDate }}</li>
                        <li><strong>Booked By:</strong> {{ bookingDetails.userName }}</li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="refreshPage">Make
                        Another
                        Booking</button>
                    <!-- <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Back to H</button> -->
                </div>
            </div>
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
            currentDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
            user: '',
            showModal: false,
            bookingDetails: {
                appointmentDate: '',
                company: '', // Replace with actual company if available
                currentDate: '',
                userName: '', // Example for showing user's name
            },
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
                    appointmentDate: this.selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
                    company: this.company,
                    currentDate: this.currentDate
                };

                // this.bookingDetails.userName = data.username

                // add data in to database
                addDoc(bookingCollection, booking);
                this.bookingDetails = booking;
                // Booking successfully created, show the success modal
                this.showModal = true;

                // You can also use Bootstrap modal's JavaScript API if needed
                const modalElement = new bootstrap.Modal(document.getElementById('bookingSuccessModal'));
                modalElement.show();

                console.log("Booking successfully created!");

            } catch (err) {
                this.error = err.message; // Display error message
                console.error("Error creating bookings:", err);
            }
        },
        refreshPage() {
            this.$router.go(0);
        },
        updateUserName(userName) {
            this.bookingDetails.userName = userName;
        },
        getCompanyName(company){
            this.company = company

        }
    },
};
</script>

<style>
@import "/src/assets/external.css";
@import "/src/assets/appointmentBooking.css";
</style>
