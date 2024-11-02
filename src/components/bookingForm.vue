<template>
  <div>
    <h1>Book Your Appointment</h1>
    <form @submit.prevent="submitForm">
      <label for="name">Username</label>
      <input type="text" id="name" v-model="form.username" disabled />

      <label for="email">Email Address</label>
      <input type="email" id="email" v-model="form.email" disabled />

      <label for="phone">Phone Number</label>
      <input type="tel" id="phone" v-model="form.contactNum" disabled />

      <label for="agency">Agency</label>
      <input type="text" id="agency" v-model="form.agency" @input="searchAgencies" />

      <ul v-if="agencySuggestions.length" class="suggestions-list">
        <li v-for="agency in agencySuggestions" :key="agency.id" @click="selectAgency(agency.name)">
          {{ agency.name }}
        </li>
      </ul>

      <button type="submit">Book Appointment</button>
    </form>
  </div>
</template>

<script>
// import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { auth } from "../firebase";

export default {
  name: "BookingForm",
  props: ["selectedDate"],
  data() {
    return {
      form: {
        username: "",
        email: "",
        contactNum: "",
        agency: "",
      },
      user: "",
      agencySuggestions: [],
    };
  },
  async created() {
    onAuthStateChanged(auth, async (user) => {
      this.user = user.uid;
      await this.fetchUserData();
    });
  },
  methods: {
    searchAgencies() {
      if (this.form.agency.length < 2) {
        this.agencySuggestions = [];
        return;
      }

      axios
        .get(
          `https://your-server-endpoint.com/api/renovation-agencies?query=${this.form.agency}`
        )
        .then((response) => {
          this.agencySuggestions = response.data;
        })
        .catch((error) => {
          console.error("Error fetching agencies:", error);
          this.agencySuggestions = [];
        });
    },
    selectAgency(agencyName) {
      this.form.agency = agencyName;
      this.agencySuggestions = [];
    },
    submitForm() {
      if (!this.selectedDate) {
        alert("Please select a date from the calendar.");
        return;
      }

      const appointmentData = {
        ...this.form,
        date: this.selectedDate.toISOString().split("T")[0],
      };

      axios
        .post(
          "https://your-server-endpoint.com/api/appointments",
          appointmentData
        )
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            alert(
              `Appointment booked for ${this.form.name} on ${appointmentData.date}`
            );
            this.resetForm();
            this.$emit("appointment-booked");
          } else {
            alert(
              "There was an error booking your appointment. Please try again."
            );
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert(
            "There was an error connecting to the server. Please try again."
          );
        });
    },
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

  },
};
</script>
