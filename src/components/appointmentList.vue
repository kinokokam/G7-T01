<template>
  <div class="appointment-list">
    <h2>Your Appointments</h2>

    <!-- Filter by Company Name with the Button beside the input -->
    <div class="mb-3 d-flex">
      <input type="text" class="form-control me-2" id="filterName" v-model="filterCompany"
        placeholder="Enter company name to filter" />
      <button class="btn btn-primary ms-2" @click="filterBookings">Filter</button>
      <button class="btn btn-secondary ms-2" @click="clearFilter">Clear</button>

    </div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th @click="sortApptDate" style="cursor: pointer;">
            Appointment Date
            <span v-if="sortApptOrder === 'asc'">↑</span>
            <span v-if="sortApptOrder === 'desc'">↓</span>
          </th>
          <th>Company</th>
          <th @click="sortBookings" style="cursor: pointer;">
            Booking Date
            <span v-if="sortOrder === 'asc'">↑</span>
            <span v-if="sortOrder === 'desc'">↓</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="booking in sortedBookings" :key="booking.id">
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
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { auth } from "../firebase";

export default {
  name: 'AppointmentList',
  data() {
    return {
      bookings: [], // Fetch all bookings
      user: '',
      sortedBookings: [], // Sorted bookings array
      sortOrder: "desc", // Default sort order (ascending)
      sortApptOrder: "asc", // Default sort order (ascending)
      filterCompany: "", // Text to filter by
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
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    },

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
        // console.log(this.bookings)
        this.sortedBookings = [...this.bookings]; // Show all bookings
        this.sortBookings();
      } catch (error) {
        console.error("Error getting document:", error);
        console.log(this.user)
      }

    },
    sortBookings() {
      // Toggle the sort order
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";

      // Sort bookings based on the selected sort order (ascending or descending)
      this.sortedBookings.sort((a, b) => {
        const dateA = new Date(a.data.currentDate);
        const dateB = new Date(b.data.currentDate);

        if (this.sortOrder === "asc") {
          return dateA - dateB; // Ascending order (oldest first)
        } else {
          return dateB - dateA; // Descending order (newest first)
        }
      });
    },
    sortApptDate() {
      // Toggle the sort order
      this.sortApptOrder = this.sortApptOrder === "asc" ? "desc" : "asc";

      // Sort bookings based on the selected sort order (ascending or descending)
      this.sortedBookings.sort((a, b) => {
        const dateA = new Date(a.data.appointmentDate);
        const dateB = new Date(b.data.appointmentDate);

        if (this.sortApptOrder === "asc") {
          return dateA - dateB; // Ascending order (oldest first)
        } else {
          return dateB - dateA; // Descending order (newest first)
        }
      });
    },


    // Filter bookings based on company name
    filterBookings() {
      this.sortedBookings = this.bookings.filter((booking) => {
        return (
          booking.data.company &&
          booking.data.company.toLowerCase().includes(this.filterCompany.toLowerCase())
        );
      });
    },
    clearFilter() {
      this.filterCompany = ""; // Clear the filter text
      // this.sortedBookings = [...this.bookings]; // Show all bookings
      this.sortedBookings = [...this.bookings].sort((a, b) => {
        const dateA = new Date(a.data.currentDate);
        const dateB = new Date(b.data.currentDate);

        // Sorting in descending order (newest first)
        return dateB - dateA;
      });
    },
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