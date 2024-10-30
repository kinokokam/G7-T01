<template>
    <div class="container d-flex align-items-center justify-content-center vh-100">
        <div class="row">
            <div class="col-md-6 col-lg-4">
                <div id="login">
                    <h2 class="text-center">Login</h2>
                    <form @submit.prevent="handleLogin" class="mt-4">
                        <div class="mb-3">
                            <input type="text" v-model="email" class="form-control" placeholder="Username" required>
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

import { auth, firestore } from "../firebase";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
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

            // // Initialised a firestore instance, connnect application to database
            // const firestore = getFirestore();
            // // Calling the collection "users" and interacting with it
            // const usersCollection = collection(firestore, 'users');
            // const userList = await getDocs(usersCollection);
            // // Transforms the fetched documents into an array of user objects, including their IDs
            // const users = userList.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // console.log(users); // Array of user objects

            // const user = {
            //     username: this.username,
            //     password: this.password // Do not store plain passwords in production!
            // };

            // Toast.fire({
            //     icon: 'success',
            //     title: 'Login successful'
            // });

            // Redirect or perform other actions after successful login
            // } catch (error) {
            //     console.error("Error logging in: ", error);
            //     Toast.fire({
            //         icon: 'error',
            //         title: 'Login failed'
            //     });
            // }
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