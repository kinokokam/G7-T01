<template>
    <div>
    <section class="container">
        <a id="questionnaire">Let your Interior Designers know what you are looking for!</a>
        <div class="questionnaire-container">
        <h2 class="form-heading">Interior Design Project Questionnaire</h2>
        <form @submit.prevent="submitForm">
            <!-- Budget Input -->
            <div class="mb-3">
            <label for="budget" class="form-label">What's your budget?</label>
            <input type="number" min="0" v-model="userData.budget" class="form-control" id="budget" placeholder="Enter your budget" required />
            </div>

            <!-- Property Type Dropdown -->
            <div class="mb-3">
            <label for="propertyType" class="form-label">What type of property do you have?</label>
            <select class="form-select" v-model="userData.propertyType" id="propertyType" required>
                <option selected disabled>Select property type</option>
                <option value="hdb">HDB</option>
                <option value="landed">Landed</option>
                <option value="condo">Condominium</option>
                <option value="commercial">Commercial</option>
            </select>
            </div>

            <!-- No. of Rooms Input -->
            <div class="mb-3">
            <label for="rooms" class="form-label">How many rooms does your house have?</label>
            <input type="number" min="0" v-model="userData.rooms" class="form-control" id="rooms" placeholder="Enter number of rooms" required />
            </div>

            <!-- Design Style Dropdown -->
            <div class="mb-3">
            <label for="designStyle" class="form-label">Preferred Design Style</label>
            <select class="form-select" v-model="userData.designStyle" id="designStyle" required>
                <option value="art-deco">Art Deco</option>
                <option value="bohemian">Bohemian</option>
                <option value="classic">Classic Style</option>
                <option value="coastal">Coastal</option>
                <option value="contemporary">Contemporary</option>
                <option value="farmhouse">Farmhouse Style</option>
                <option value="french-country">French Country</option>
                <option value="futuristic">Futuristic Design</option>
                <option value="hollywood-glam">Hollywood Glam</option>
                <option value="industrial">Industrial</option>
                <option value="japandi">Japandi Style</option>
                <option value="luxury">Luxury</option>
                <option value="mediterranean">Mediterranean</option>
                <option value="minimalist">Minimalist</option>
                <option value="modern">Modern</option>
                <option value="modern-luxury">Modern Luxury</option>
                <option value="nordic">Nordic</option>
                <option value="retro">Retro</option>
                <option value="rustic">Rustic Style</option>
                <option value="scandinavian">Scandinavian</option>
                <option value="timeless">Timeless</option>
                <option value="victorian">Victorian</option>
                <option value="white">White Interior</option>
            </select>
            </div>

            <!-- Timeline Input -->
            <div class="mb-3">
            <label for="timeline" class="form-label">Timeline for the project (in months)</label>
            <input type="number" min="0" v-model="userData.timeline" class="form-control" id="timeline" placeholder="Enter timeline in months" required />
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn btn-custom">Submit</button>
        </form>
        </div>
    </section>
    </div>
</template>

<script>
import { db } from '../path/to/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default {
    name: 'Questionnaire',
    data() {
    return {
        userData: {
            budget: '',
            propertyType: '',
            rooms: '',
            designStyle: '',
            timeline: ''
        }
    };
    },
    methods: {
    async submitForm() {
        try {
        // Reference to the 'responses' collection in Firestore
        const docRef = await addDoc(collection(db, 'responses'), {
            budget: this.userData.budget,
            propertyType: this.userData.propertyType,
            rooms: this.userData.rooms,
            designStyle: this.userData.designStyle,
            timeline: this.userData.timeline
        });
        console.log("Document written with ID: ", docRef.id);
        alert("Your response has been submitted!");
        } catch (e) {
        console.error("Error adding document: ", e);
        alert("There was an error submitting your response.");
        }
    }
    }
};
</script>
