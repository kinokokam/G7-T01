<template>
  <div class="appointment-list">
    <h2>Your Appointments</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Appointment Date</th>
          <th>Company</th>
          <th>Booking Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="booking in bookings" :key="booking.id">
          <td>{{ formatDate(booking.data.appointmentDate) }}</td>
          <td>{{ booking.data.company }}</td>
          <td>{{ formatDate(booking.data.currentDate) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import axios from 'axios'
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { auth } from "../firebase";

export default {
  name: 'AppointmentList',
  data() {
    return {
      bookings: [],
      user: '',
    }
  },
  async created() {
    // Set up an observer for the user's authentication state
    onAuthStateChanged(auth, async (user) => {
      this.user = user.uid;
      await this.getBookings();
    });

  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },
    // async fetchAppointments() {
    //   try {
    //     const response = await axios.get('https://your-server-endpoint.com/api/user-appointments')
    //     this.appointments = response.data
    //   } catch (error) {
    //     console.error('Error fetching appointments:', error)
    //   }
    // },
    async getBookings() {
      try {
        const firestore = getFirestore();
        const bookingCollection = collection(firestore, 'bookings');
        const q = query(bookingCollection, where("userId", "==", this.user));
        const querySnapshot = await getDocs(q);

        this.bookings = querySnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }));
        console.log(this.bookings)
      } catch (error) {
        console.error("Error getting document:", error);
        console.log(this.user)
      }

    }
  },
  mounted() {
    this.getBookings()
  }
}
</script>

<style scoped>
.appointment-list {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.appointment-list h2 {
  margin-bottom: 1rem;
  font-family: 'Helvetica', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #444;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

.table th {
  font-weight: bold;
  background-color: #f8f9fa;
}
</style>