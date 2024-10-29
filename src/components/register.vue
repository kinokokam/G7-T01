<template>
    <!-- <div class="container d-flex align-items-center justify-content-center vh-100">
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
                </div>
            </div>
        </div>
    </div> -->
</template>

<script>

import { auth, firestore } from "../firebase";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';


export default {

    data() {
        return {
            email: '',
            username: '',
            password: '',
            gender: '',
            contactNum: '',
            otherSignIn: ''
        };
    },
    firestore() {
        return {
            users: firestore.collection('users'),
        }
    },
    methods: {
        async registerAuth() {
            try {
                await createUserWithEmailAndPassword(auth, this.email, this.password);
                // Initialised a firestore instance, connnect application to database
                const firestore = getFirestore();
                // Calling the collection "users" and interacting with it
                const usersCollection = collection(firestore, 'users');

                // Replace this with your actual login logic
                const user = {
                    email: this.email,
                    username: this.username,
                    gender: this.gender,
                    contactNum: this.contactNum,
                    otherSignIn: false
                };

                // add data in to database
                const docRef = await addDoc(usersCollection, user);
                console.log("Registration successful!");
                console.log(auth);
            } catch (err) {
                this.error = err.message; // Display error message
                console.error("Error during registration:", err);
            }
        },
    }
}
</script>