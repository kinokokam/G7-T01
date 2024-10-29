<template>
  <div>
    <h1>Book Your Appointment</h1>
    <form @submit.prevent="submitForm">
      <label for="name">Full Name</label>
      <input type="text" id="name" v-model="form.name" required />

      <label for="email">Email Address</label>
      <input type="email" id="email" v-model="form.email" required />

      <label for="phone">Phone Number</label>
      <input type="tel" id="phone" v-model="form.phone" required />

      <label for="agency">Agency</label>
      <input
        type="text"
        id="agency"
        v-model="form.agency"
        @input="searchAgencies"
      />

      <ul v-if="agencySuggestions.length" class="suggestions-list">
        <li
          v-for="agency in agencySuggestions"
          :key="agency.id"
          @click="selectAgency(agency.name)"
        >
          {{ agency.name }}
        </li>
      </ul>

      <button type="submit">Book Appointment</button>
    </form>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "BookingForm",
  props: ["selectedDate"],
  data() {
    return {
      form: {
        name: "",
        email: "",
        phone: "",
        agency: "",
      },
      agencySuggestions: [],
    };
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
    resetForm() {
      this.form = {
        name: "",
        email: "",
        phone: "",
        agency: "",
      };
      this.$emit("date-selected", null);
    },
  },
};
</script>
