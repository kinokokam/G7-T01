// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDvJo_HCmN5F97adAZjmIVEJZv0UU6FxZE",
    authDomain: "renovenience.firebaseapp.com",
    projectId: "renovenience",
    storageBucket: "renovenience.appspot.com",
    messagingSenderId: "279886416921",
    appId: "1:279886416921:web:1b41f31c84cdb8ca962e88",
    measurementId: "G-YEQ58X83LB"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to fetch and display cards
async function fetchAndDisplayCards() {
    try {
        // Reference to Firestore collection
        const cardCollection = collection(db, "id-companies"); // Replace with your collection name

        // Fetch documents from the collection
        const querySnapshot = await getDocs(cardCollection);

        // Get the container element
        const cardContainer = document.getElementById("cardContainer");
        cardContainer.innerHTML = ""; // Clear existing content

        // Loop through Firestore documents
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            // Create card HTML
            const cardHTML = `
                <div role="listitem" class="card-item w-dyn-item">
                    <a href="${data.id}" class="card w-inline-block">
                        <div class="card__side--front">
                            <div
                                style="background-image:url(${data.image})"
                                class="card__image"></div>
                            <h1 fs-cmssort-field="designer" class="card__heading text-align-center"
                                style="color: rgba(80, 55, 24, 0.979);">${data.name}</h1>
                            <div class="card__text--wrapper">
                                <div class="card__text" style="color: rgba(80, 55, 24, 0.756); font-family: 'Aboreto', cursive;">
                                    ${data.star} Stars
                                </div>
                                <svg width="10" height="10" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                                style="margin: 0 8px; vertical-align: middle;">
                                <circle cx="10" cy="10" r="8" stroke="#6d6154" stroke-width="2" fill="none" />      </svg>
                                <div class="card__text" style="color: rgba(80, 55, 24, 0.756); font-family: 'Aboreto', cursive;">
                                    ${data.reviews} Reviews
                                </div>
                                <svg width="10" height="10" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                                 style="margin: 0 8px; vertical-align: middle;">
                                <circle cx="10" cy="10" r="8" stroke="#6d6154" stroke-width="2" fill="none" />
                                 </svg>
                                <div class="card__text" style="color: rgba(80, 55, 24, 0.756); font-family: 'Aboreto', cursive;">
                                    ${data.projects} Featured Projects
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`;

            // Append card HTML to the container
            cardContainer.innerHTML += cardHTML;
        });
    } catch (error) {
        console.error("Error fetching cards:", error);
    }
}

// Fetch and display cards on page load
fetchAndDisplayCards();
