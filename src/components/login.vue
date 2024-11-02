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
              <hr /><span>or</span><hr />
            </div>
            <div class="d-flex justify-content-between otherLoginOptions">
              <button type="button" class="btn btn-danger w-48" @click="googleLogin">Google Login</button>
              <button type="button" class="btn btn-primary w-48" @click="facebookLogin">Facebook Login</button>
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
              <input type="text" v-model="name" class="form-control" placeholder="Username" required />
            </div>
            <div class="mb-3">
              <input type="email" v-model="email" class="form-control" placeholder="Email" required />
            </div>
            <div class="mb-3">
              <input type="number" v-model="number" class="form-control" placeholder="Contact Number" required />
            </div>
            <div class="mb-3">
              <input type="password" v-model="password" class="form-control" placeholder="Password" required />
            </div>
            <div class="mb-3">
              <input type="password" v-model="confirmPassword" class="form-control" placeholder="Confirm Password" required />
            </div>
            <button type="submit" class="btn btn-success w-100">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { auth, firestore } from "../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';

export default {

    data() {
        return {
            users: [],
            email: '',
            password: '',
            error: ''
        };
    },
    firestore() {
        return {
            users: firestore.collection('users').get(),
        }
    },
    methods: {
        async handleLogin() {
            try {
                await signInWithEmailAndPassword(auth, this.email, this.password);
                // Handle successful login (e.g., redirect)
                console.log("Login successful!");
            } catch (err) {
                this.error = err.message; // Display error message
                console.error("Error during login:", err);
            
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
        facebookLogin() {
            // Handle Facebook login logic here
            console.log('Facebook Login');
        }
    }
}
</script>

<style scoped>
/* Include your CSS here */
@import "/src/assets/login.css";
</style>