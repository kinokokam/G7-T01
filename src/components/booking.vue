<template>
    <div id="app" class="container mt-4">
      <div class="row g-5">
        <!-- <Calendar class="col-lg-6 calendar-container" @date-selected="updateSelectedDate" :selectedDate="selectedDate" /> -->
        <BookingForm />
      </div>
      
      <div class="row mt-4">
        <div class="col-12">
          <AppointmentList ref="appointmentList" />
        </div>
      </div>

    </div>
  </template>
  
<script>
import BookingForm from "./bookingForm.vue";
import AppointmentList from "./appointmentList.vue";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { auth } from "../firebase";

export default {
    name: "App",
    components: {
        BookingForm,
        AppointmentList
    },
    data() {
        return {
            selectedDate: null,
            company: '',
            userId: '',
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

        async logout() {
            try {
                await signOut(auth); // Clear authentication and log out
                this.user = null;    // Clear user data in the component
                this.$router.push("/login"); // Redirect to login page after logout
            } catch (error) {
                console.error("Error logging out:", error);
            }
        },
    },
};
</script>

<style>
@import "/src/assets/external.css";
@import "/src/assets/appointmentBooking.css";
</style>
