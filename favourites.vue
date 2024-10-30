<template>
    <div>
        <h2>Your Favorite Companies</h2>
        <div v-if="favorites.length">
            <div v-for="(company, index) in favorites" :key="index" class="company">
                <img :src="company.img" alt="Company Image" />
                <h3>{{ company.name }}</h3>
                <p>{{ company.description }}</p>
                <!-- Additional company info as needed -->
            </div>
        </div>
        <p v-else>No favorites saved yet.</p>
    </div>
</template>

<script>
import { db } from '../path/to/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default {
    data() {
        return {
            favorites: []
        };
    },
    async mounted() {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const userFavoritesRef = doc(db, "favorites", user.uid);
            const docSnapshot = await getDoc(userFavoritesRef);

            if (docSnapshot.exists()) {
                this.favorites = Object.values(docSnapshot.data());
            }
        } else {
            alert("Please log in to view your favorites.");
        }
    }
};
</script>