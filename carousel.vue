<template>
    <div v-if="slides.length > 0" id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
        <ol class="carousel-indicators">
            <li 
                v-for="(slide, index) in slides" 
                :key="index" 
                :data-bs-target="'#carouselExampleIndicators'" 
                :data-bs-slide-to="index" 
                :class="{ active: index === 0 }">
            </li>
        </ol>

        <div class="carousel-inner">
            <div 
                v-for="(slide, index) in slides" 
                :key="index" 
                :class="['carousel-item', { active: index === 0 }]">
                <img :src="slide.image" class="d-block w-100" :alt="slide.altText">
                <div v-if="slide.caption" class="carousel-caption d-none d-md-block">
                    <h5>{{ slide.title }}</h5>
                    <p>{{ slide.caption }}</p>
                </div>
            </div>
        </div>

        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
</template>

<script>
import { db } from '../path/to/firebase'; // Adjust the path to your Firebase configuration
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

export default {
    name: 'Carousel',
    data() {
        return {
            slides: []
        };
    },
    async created() {
        await this.fetchTopCompanies();
    },
    methods: {
        async fetchTopCompanies() {
            try {
                // Query to get the top 3 companies sorted by popularity
                const companiesCollection = collection(db, "companies");
                const topCompaniesQuery = query(companiesCollection, orderBy("popularity", "desc"), limit(3));
                
                const querySnapshot = await getDocs(topCompaniesQuery);
                this.slides = querySnapshot.docs.map(doc => ({
                    image: doc.data().image || 'default.jpg',  // Adjust if you have a placeholder
                    altText: doc.data().name || 'Company Image',
                    title: doc.data().name || 'Company Name',
                    caption: doc.data().description || ''
                }));
            } catch (error) {
                console.error("Error fetching top companies:", error);
            }
        }
    }
};
</script>

<style scoped>
.carousel-inner img {
    height: auto;
}
</style>