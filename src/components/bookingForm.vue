<template>

  <div id="app" class=" mt-4 booking-form-container">
    <div class="row g-5">
      <h1>Book Your Appointment</h1>
      <Calendar class="col-lg-6 " @date-selected="updateSelectedDate" :selectedDate="selectedDate" />
      <div class="col-lg-6 booking-form-container">
        <form @submit.prevent="handleSubmit">
          <label for="name">Username</label>
          <input type="text" id="name" v-model="form.username" disabled />

          <label for="email">Email Address</label>
          <input type="email" id="email" v-model="form.email" disabled />

          <label for="phone">Phone Number</label>
          <input type="tel" id="phone" v-model="form.contactNum" disabled />

          <label for="agency">Agency</label>
          <select v-model="selectedCompany">
            <option v-for="company in companies" :key="id" :value="company.id">
              {{ company.id }}
            </option>
          </select>
          <button type="submit" @click="submitBooking">Book Appointment</button>
        </form>
      </div>
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
// import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { auth } from "../firebase";
import Calendar from "./calendar.vue";



export default {
  name: "BookingForm",
  props: ["selectedDate"],
  components: {
    Calendar
  },
  data() {
    return {
      selectedDate: null,
      form: {
        username: "",
        email: "",
        contactNum: "",
        company: "",
      },
      user: "",
      companies: [],
      selectedCompany: '',
      currentDate: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'long', year: 'numeric'}),
      bookingDetails: {
        appointmentDate: '',
        company: '', // Replace with actual company if available
        currentDate: '',
        userName: '', // Example for showing user's name
      },
      showModal: false, // To trigger modal visibility
    };
  },
  async created() {
    onAuthStateChanged(auth, async (user) => {
      this.user = user.uid;
      await this.fetchUserData();
      await this.getAllCompanies();
    });
  },
  methods: {
    async fetchUserData() {
      // Get User by ID
      try {
        const firestore = getFirestore();
        const usersCollection = collection(firestore, 'users');
        const q = query(usersCollection, where("__name__", "==", this.user)); // Use `__name__` to query by document ID
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data(); // Get the data from the first document
          console.log(data)
          this.form = data;
          return data;
        } else {
          console.log("No such document!");
          return null;
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    },
    updateSelectedDate(date) {
      this.selectedDate = date;
    },
    async getAllCompanies() {
      // Get all Company Name
      try {
        const firestore = getFirestore();
        const companyCollection = collection(firestore, 'id-companies');
        const querySnapshot = await getDocs(companyCollection);
        this.companies = querySnapshot.docs.map(doc => ({
          id: doc.id
        }));
        console.log(this.companies)
        this.selectedCompany = this.companies[0].id;
      } catch (error) {
        console.error("Error getting document:", error);
      }
    },
    submitBooking() {
      console.log('test');
      const user = auth.currentUser;
      try {
        const firestore = getFirestore();
        const bookingCollection = collection(firestore, 'bookings');
        const booking = {
          userId: this.user,
          appointmentDate: this.selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
          company: this.selectedCompany,
          currentDate: this.currentDate
        };


        // add data in to database
        addDoc(bookingCollection, booking);
        this.bookingDetails = booking;
        this.bookingDetails.userName = this.form.username;


        // You can also use Bootstrap modal's JavaScript API if needed
        this.showModal = true;

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

  },
};
</script>
