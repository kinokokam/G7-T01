<template>
  <div class="container d-flex align-items-center justify-content-center vh-100">
    <div class="row w-100">
      <!-- Login Section -->
      <div class="col-md-6 col-lg-5 mx-auto">
        <div id="login" class="p-4 border rounded shadow-sm">
          <h2 class="text-center">Login</h2>
          <form @submit.prevent="handleLogin" class="mt-4">
            <div class="mb-3">
              <input type="email" v-model="email" class="form-control" placeholder="Email" required />
            </div>
            <div class="mb-3">
              <input type="password" v-model="password" class="form-control" placeholder="Password" required />
            </div>
            <div class="mb-3 text-center">
              <a href="#" @click.prevent="navigateToForgotPassword">Forgot password?</a>
            </div>
            <button type="submit" class="btn btn-primary w-100 mb-3">Login</button>
            <div class="text-center my-3" id="others">
              <hr /><span>or</span>
              <hr />
            </div>
            <div class="d-flex justify-content-between otherLoginOptions">
              <button type="button" class="btn btn-danger w-48" @click="logout">Google Login</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Sign Up Section -->
      <div class="col-md-6 col-lg-5 mx-auto">
        <div id="register" class="p-4 border rounded shadow-sm">
          <h2 class="text-center">Sign Up</h2>
          <form @submit.prevent="handleSignUp" class="mt-4">
            <div class="mb-3">
              <input type="text" v-model="username" class="form-control" placeholder="Username" required />
            </div>
            <div class="mb-3">
              <input type="email" v-model="register_email" class="form-control" placeholder="Email" required />
            </div>
            <div class="mb-3">
              <input type="number" v-model="contactNum" class="form-control" placeholder="Contact Number" required />
            </div>
            <div class="mb-3">
              <input type="password" v-model="register_password" class="form-control" placeholder="Password" required />
            </div>
            <div class="mb-3">
              <input type="password" v-model="confirmPassword" class="form-control" placeholder="Confirm Password"
                required />
            </div>
            <button type="submit" class="btn btn-success w-100" @click="registerAcc">Sign Up</button>
            <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// import { auth, firestore } from "../firebase";
// import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth, firestore } from "../firebase";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

export default {

  data() {
    return {
      users: [],
      email: '',
      password: '',
      register_email: '',
      register_password: '',
      error: '',
      username: '',
      gender: '',
      contactNum: '',
      otherSignIn: '',
      user: '',
      isAuthenticated: false,
    };
  },
  firestore() {
    return {
      users: firestore.collection('users'),
    }
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user.uid;
        console.log(this.user)
        this.$router.push("/booking");
      }
    });
  },
  methods: {
    async handleLogin() {
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        // Handle successful login (e.g., redirect)
        console.log("Login successful!");
        this.$router.push("/booking");
      } catch (err) {
        this.error = err.message; // Display error message
        console.error("Error during login:", err);

      }

    },
    async registerAcc() {
      try {
        await createUserWithEmailAndPassword(auth, this.register_email, this.register_password);
        // Initialised a firestore instance, connnect application to database
        const firestore = getFirestore();
        // Calling the collection "users" and interacting with it
        const usersCollection = collection(firestore, 'users');

        const user = {
          email: this.register_email,
          username: this.username,
          gender: this.gender,
          contactNum: this.contactNum,
          otherSignIn: false
        };

        // add data in to database
        const docRef = await addDoc(usersCollection, user);
        console.log("Registration successful!");
        console.log(auth);
        this.isAuthenticated = true;

      } catch (error) {
        // Handle Firebase-specific errors
        if (error.code === "auth/invalid-email") {
          this.errorMessage = "Invalid email format. Please enter a valid email.";
        } else if (error.code === "auth/email-already-in-use") {
          this.errorMessage = "This email is already in use. Try a different one.";
        } else if (error.code === "auth/weak-password") {
          this.errorMessage = "Password should be at least 6 characters.";
        } else {
          this.errorMessage = `Error during registration: ${error.message}`;
        }
        console.error("Error during registration:", error);
      }

      if (this.isAuthenticated) {
        // Redirect to home page after successful login
        this.$router.push("/booking");
      }
    },
    navigateToForgotPassword() {
      this.$router.push('/forgetPw');
    },
    navigateSignUp() {
      this.$router.push('/register');
    },
    googleLogin() {
      // Handle Google login logic here
      console.log('Google Login');
    },
    async logout() {
      try {
        await signOut(auth); // Clear authentication and log out
        this.user = null;    // Clear user data in the component
        this.$router.push("/login"); // Redirect to login page after logout
      } catch (error) {
        console.error("Error logging out:", error);
      }
    },
  }
}
</script>

<style scoped>
/* Include your CSS here */
@import "/src/assets/login.css";
</style>