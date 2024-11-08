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
                            <input type="password" v-model="password" class="form-control" placeholder="Password"
                                required />
                        </div>
                        <button type="submit" class="btn btn-primary w-100 mb-3">Login</button>
                        <div class="text-center my-3" id="others">
                            <hr /><span>or</span>
                            <hr />
                        </div>
                        <div class="d-flex justify-content-between otherLoginOptions">
                            <button type="button" class="btn btn-danger w-100" @click="googleLogin">Google
                                Login</button>
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
                            <input type="text" v-model="username" class="form-control" placeholder="Username"
                                required />
                        </div>
                        <div class="mb-3">
                            <input type="email" v-model="register_email" class="form-control" placeholder="Email"
                                required />
                        </div>
                        <div class="mb-3">
                            <input type="number" v-model="contactNum" class="form-control" placeholder="Contact Number"
                                required />
                        </div>
                        <div class="mb-3">
                            <input type="password" v-model="register_password" class="form-control"
                                placeholder="Password" required />
                        </div>
                        <div class="mb-3">
                            <input type="password" v-model="confirmPassword" class="form-control"
                                placeholder="Confirm Password" required />
                        </div>
                        <button type="submit" class="btn btn-success w-100" @click="registerAcc">Sign Up</button>
                        <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Login Bootstrap Modal -->
    <div class="modal fade" id="loginSuccessModal" tabindex="-1" aria-labelledby="loginSuccessModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="loginSuccessModalLabel">Login Successful</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p><strong>Welcome back {{ currentUserName }}!</strong></p>
                    <ul>

                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                        @click="refreshPage">Ok</button>
                </div>
            </div>
        </div>
    </div>
    <!-- End of Login Modal -->

    <!-- Register Bootstrap Modal -->
    <div class="modal fade" id="registerSuccessModal" tabindex="-1" aria-labelledby="registerSuccessModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="registerSuccessModalLabel">Register Successful</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p><strong>Welcome {{ username }}!</strong></p>
                    <ul>

                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                        @click="refreshPage">Ok</button>
                </div>
            </div>
        </div>
    </div>
    <!-- End of Register Modal -->

</template>

<script>

// import { auth, firestore } from "../firebase";
// import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth, firestore, provider } from "../firebase";
import { getFirestore, collection, addDoc, getDocs, query, where, setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup } from 'firebase/auth';

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
            currentUserName: '',
        };
    },
    firestore() {
        return {
            users: firestore.collection('users'),
        }
    },
    async created() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
                // this.$router.push("/booking");
            }
        });
    },
    methods: {
        async fetchUserData() {
            // Get User by ID
            try {

            } catch (error) {
                console.error("Error getting document:", error);
            }
        },
        async handleLogin() {
            try {
                await signInWithEmailAndPassword(auth, this.email, this.password);
                // Handle successful login (e.g., redirect)
                console.log("Login successful!");
                // this.$router.push("/booking");
                const firestore = getFirestore();
                const usersCollection = collection(firestore, 'users');
                const q = query(usersCollection, where("__name__", "==", this.user.uid)); // Use `__name__` to query by document ID
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const data = querySnapshot.docs[0].data(); // Get the data from the first document
                    console.log(data)
                    this.currentUserName = data.username;
                    console.log(this.currentUserName)

                    // login successfully, show the success modal
                    const modalElement = new bootstrap.Modal(document.getElementById('loginSuccessModal'));
                    modalElement.show();
                    return data;
                } else {
                    console.log("No such document!");
                    return null;
                }


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
                // Booking successfully created, show the success modal
                const modalElement = new bootstrap.Modal(document.getElementById('registerSuccessModal'));
                modalElement.show();

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

            //   if (this.isAuthenticated) {
            //     // Redirect to home page after successful login
            //     this.$router.push("/booking");
            //   }
        },
        navigateSignUp() {
            this.$router.push('/register');
        },
        async googleLogin() {
            // Handle Google login logic here

            try {
                // Sign in with Google
                const result = await signInWithPopup(auth, provider);
                // The signed-in user info
                this.user = result.user;
                console.log('User Info:', this.user);

                // Initialised a firestore instance, connnect application to database
                const firestore = getFirestore();
                // Calling the collection "users" and interacting with it
                const usersCollection = collection(firestore, 'users');

                const user = {
                    email: this.user.email,
                    username: this.user.displayName,
                    gender: '',
                    contactNum: this.contactNum,
                    otherSignIn: true
                };
                // await addDoc(usersCollection, user, this.user.uid);
                // Use setDoc to set the document ID as the user's UID
                const userRef = doc(firestore, 'users', this.user.uid); // Set document ID as user UID
                await setDoc(userRef, user);  // Store the user data
            } catch (error) {
                console.error('Error during Google sign-in:', error.message);
            }

        },

        // Logout Code
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