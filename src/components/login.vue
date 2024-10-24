<template>
    <div class="container d-flex align-items-center justify-content-center vh-100">
        <div class="row">
            <div class="col-md-6 col-lg-4">
                <div id="login">
                    <h2 class="text-center">Login</h2>
                    <form @submit.prevent="handleLogin" class="mt-4">
                        <div class="mb-3">
                            <input type="text" v-model="username" class="form-control" placeholder="Username" required>
                        </div>
                        <div class="mb-3">
                            <input type="password" v-model="password" class="form-control" placeholder="Password"
                                required>
                        </div>
                        <div class="mb-3">
                            <a href="#" @click.prevent="navigateToForgotPassword">Forget password?</a>
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary w-100">Login</button>
                        </div>
                        <div class="text-center mb-3" id="others">
                            <hr><span>or</span>
                            <hr>
                        </div>
                        <div class="d-flex justify-content-between" id="otherLogin">
                            <button type="button" class="btn btn-danger w-48" @click="googleLogin">Google Login</button>
                            <button type="button" class="btn btn-danger w-48" @click="facebookLogin">Facebook
                                Login</button>
                        </div>
                    </form>
                    <div class="mb-3">
                        <router-link to="/register">Sign Up</router-link>
                        <!-- <a href="#" @click.prevent="navigateSignUp()"></a> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { firestore } from "../firebase";
import { getFirestore, collection, addDoc } from 'firebase/firestore';


export default {

    data() {
        return {
            users: [],
            username: '',
            password: ''
        };
    },
    firestore() {
        return {
            users: firestore.collection('users'),
        }
    },
    methods: {
        async handleLogin() {
            try {
                const firestore = getFirestore();
                const usersCollection = collection(firestore, 'users');

                // Example logic for handling login (usually you'd authenticate users)
                // Replace this with your actual login logic
                const user = {
                    username: this.username,
                    password: this.password // Do not store plain passwords in production!
                };

                // Simulating a login; replace with your login logic
                const docRef = await addDoc(usersCollection, user);

                // Toast.fire({
                //     icon: 'success',
                //     title: 'Login successful'
                // });

                // Redirect or perform other actions after successful login
            } catch (error) {
                console.error("Error logging in: ", error);
                Toast.fire({
                    icon: 'error',
                    title: 'Login failed'
                });
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
</style>