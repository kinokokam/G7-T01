// Import Firebase services from the CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";



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


// Fetch Data from Firebase and Populate HTML
async function fetchAndPopulate() {
    try {

        const projectsCollection = collection(db, "explore-projects");

        // Query for documents with IDs between '21ID-P1' and '21ID-P6'
        const q = query(
            projectsCollection,
            where("__name__", ">=", "UltraSD-P1"),
            where("__name__", "<=", "UltraSD-P6")
        );

        // Fetch the documents matching the query
        const querySnapshot = await getDocs(q);

        // Select the container element
        const container = document.querySelector("#projectsId");
          

        querySnapshot.forEach(doc => {
            const data = doc.data();

            const itemHTML = `
            <div role="listitem" class="collection-item-6 w-dyn-item">
              <div class="div-block-86">
                <div class="div-block-85">
                  <!-- Bootstrap Carousel -->
                  <div id="carousel-${data.id}" class="carousel slide" data-bs-ride="carousel">
                    <!-- Carousel Inner -->
                    <div class="carousel-inner">
                      ${data.images.map((image, index) => `
                        <div class="carousel-item ${index === 0 ? "active" : ""}">
                          <img src="${image}" class="d-block w-100 image-71" alt="Project Image ${index + 1}">
                        </div>
                      `).join("")}
                    </div>
          
                    <!-- Carousel Controls -->
                    <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${data.id}" data-bs-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carousel-${data.id}" data-bs-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
                
                <!-- Project Details -->
                <div class="div-block-89">
                  <h4 class="projectheading">${data.name}</h4>
                  <div class="div-block-88">
                    <div class="div-block-87">
                      <div class="projecthighlights">${data.propertyType} ${data.rooms} Bed</div>
                    </div>
                    <div class="div-block-87">
                      <div class="projecthighlights">${data.size} sqm</div>
                    </div>
                    <div class="div-block-87">
                      <div class="projecthighlights">${data.timeline} months</div>
                    </div>
                    <div class="div-block-87">
                      <div class="projecthighlights">$${data.priceStr}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
          

      data.images.map((image, index) => {
        console.log(index); // This gives you 0, 1, 2, ..., based on the array's order.
      });
      

            container.innerHTML += itemHTML;
        });
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

// Call Function to Fetch Data and Populate HTML
fetchAndPopulate();
