<template>
  <div>
    <h1>Book Your Appointment</h1>
    <form>
      <label for="name">Username</label>
      <input type="text" id="name" v-model="form.username" disabled />

      <label for="email">Email Address</label>
      <input type="email" id="email" v-model="form.email" disabled />

      <label for="phone">Phone Number</label>
      <input type="tel" id="phone" v-model="form.contactNum" disabled />

      <label for="agency">Agency</label>
      <!-- <input type="text" id="agency" v-model="form.agency" @input="searchAgencies" /> -->
      <select v-model="selectedCompany">
        <option v-for="company in companies" :key="id" :value="company.id">
          {{ company.id }}
        </option>
      </select>
      <button type="submit" @click="submitForm">Book Appointment</button>
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
        company: "",
      },
      user: "",
      companies: [],
      selectedCompany:'',
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

    // submitForm() {
    //   this.$emit("username", this.form.username);
    //   this.$emit("company", this.selectedCompany);
    // }
  },
};
</script>
