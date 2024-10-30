<template>
    <div id="explore-section">
        <h2>Explore Companies</h2>

        <!-- Filtering Bar -->
        <div class="row selection-bar">
            <div class="col-md-4">
                <!-- Budget Selector -->
                <label for="budget">Budget Range</label>
                <select class="form-control form-select" id="budget" v-model="selectedBudget" @change="applyFilters">
                    <option value="" disabled selected>Select Budget</option>
                    <option value="below-50k">Below $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="100k-200k">$100,000 - $200,000</option>
                    <option value="above-200k">Above $200,000</option>
                </select>
            </div>

            <div class="col-md-4">
                <!-- Housing Type Selector -->
                <label for="housingType">Property Type</label>
                <select class="form-control form-select" id="housingType" v-model="selectedHousingType" @change="applyFilters">
                    <option value="" disabled selected>Select Property Type</option>
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condominium</option>
                    <option value="landed">Landed House</option>
                    <option value="studio">Studio</option>
                </select>
            </div>

            <div class="col-md-4">
                <!-- Interior Design Style Selector -->
                <label for="designStyle">Design Style</label>
                <select class="form-control form-select" id="designStyle" v-model="selectedDesignStyle" @change="applyFilters">
                    <option value="" disabled selected>Select Design Style</option>
                    <option value="modern">Modern</option>
                    <option value="scandinavian">Scandinavian</option>
                    <option value="industrial">Industrial</option>
                    <option value="minimalist">Minimalist</option>
                </select>
            </div>
        </div>

        <!-- Display Paginated and Filtered Companies -->
        <div id="explore-items" class="row">
            <div v-for="(item, index) in paginatedFilteredItems" :key="index" class="col-md-4 col-sm-4 companybg">
                <img :src="item.img" class="img-fluid" style="width: 100%; height: auto;" />
                <h2><a :href="item.link" @click.prevent="openLink(item.link)">{{ item.name }}</a></h2>
                <p class="description">{{ item.description }}</p>
                <p>
                    <b>Address:</b> {{ item.address }} <br />
                    <b>Email:</b> {{ item.email }} <br />
                    <b>Contact info:</b> {{ item.contact }}
                </p>
                <button @click="saveToFavorites(item)" class="btn btn-primary">Save to Favorites</button>
            </div>
        </div>

        <!-- Pagination Controls -->
        <ul id="pagination" class="pagination">
            <li v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }" class="page-item">
                <a href="#" class="page-link" @click.prevent="changePage(page)">{{ page }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
import { db } from '../path/to/firebase';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default {
    name: 'Explore',
    data() {
        return {
            items: [],
            currentPage: 1,
            itemsPerPage: 6,
            selectedBudget: '',
            selectedHousingType: '',
            selectedDesignStyle: '',
        };
    },
    computed: {
        filteredItems() {
            return this.items.filter(item => {
                const matchesBudget = this.selectedBudget ? this.checkBudget(item.budget) : true;
                const matchesHousingType = this.selectedHousingType ? item.housingType === this.selectedHousingType : true;
                const matchesDesignStyle = this.selectedDesignStyle ? item.designStyle === this.selectedDesignStyle : true;
                return matchesBudget && matchesHousingType && matchesDesignStyle;
            });
        },
        paginatedFilteredItems() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredItems.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.filteredItems.length / this.itemsPerPage);
        }
    },
    methods: {
        async fetchCompanies() {
            const companiesCollection = collection(db, "companies");
            const querySnapshot = await getDocs(companiesCollection);
            this.items = querySnapshot.docs.map(doc => doc.data());
        },
        applyFilters() {
            this.currentPage = 1; // Reset to the first page when filters change
        },
        changePage(page) {
            this.currentPage = page;
        },
        openLink(link) {
            window.open(link, '_blank');
        },
        checkBudget(budget) {
            switch (this.selectedBudget) {
                case 'below-50k':
                    return budget < 50000;
                case '50k-100k':
                    return budget >= 50000 && budget <= 100000;
                case '100k-200k':
                    return budget > 100000 && budget <= 200000;
                case 'above-200k':
                    return budget > 200000;
                default:
                    return true;
            }
        },
        async saveToFavorites(company) {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                alert("Please log in to save favorites.");
                return;
            }

            try {
                const userFavoritesRef = doc(db, "favorites", user.uid);
                await setDoc(userFavoritesRef, {
                    [company.id]: company
                }, { merge: true }); // merge ensures it adds to existing favorites

                alert("Company saved to favorites!");
            } catch (error) {
                console.error("Error saving to favorites: ", error);
                alert("An error occurred. Please try again.");
            }
        }
    },
    mounted() {
        this.fetchCompanies();
    },
};
</script>

<script>
import { db } from '../path/to/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default {
    name: 'Explore',
    data() {
        return {
            items: [],
            currentPage: 1,
            itemsPerPage: 6,
            selectedBudget: '',
            selectedHousingType: '',
            selectedDesignStyle: '',
        };
    },
    computed: {
        filteredItems() {
            return this.items.filter(item => {
                const matchesBudget = this.selectedBudget ? this.checkBudget(item.budget) : true;
                const matchesHousingType = this.selectedHousingType ? item.housingType === this.selectedHousingType : true;
                const matchesDesignStyle = this.selectedDesignStyle ? item.designStyle === this.selectedDesignStyle : true;
                return matchesBudget && matchesHousingType && matchesDesignStyle;
            });
        },
        paginatedFilteredItems() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredItems.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.filteredItems.length / this.itemsPerPage);
        }
    },
    methods: {
        async fetchCompanies() {
            const companiesCollection = collection(db, "companies");
            const querySnapshot = await getDocs(companiesCollection);
            this.items = querySnapshot.docs.map(doc => doc.data());
        },
        changePage(page) {
            this.currentPage = page;
        },
        applyFilters() {
            this.currentPage = 1; // Reset to the first page when filters change
        },
        openLink(link) {
            window.open(link, '_blank');
        },
        checkBudget(budget) {
            switch (this.selectedBudget) {
                case 'below-50k':
                    return budget < 50000;
                case '50k-100k':
                    return budget >= 50000 && budget <= 100000;
                case '100k-200k':
                    return budget > 100000 && budget <= 200000;
                case 'above-200k':
                    return budget > 200000;
                default:
                    return true;
            }
        }
    },
    mounted() {
        this.fetchCompanies();
    }
};
</script>

<style scoped>
/* Add your styling here */
    .companybg {
        background-color: #f8f9fa;
        padding: 20px;
        margin: 10px;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    h2 a {
        color: #4a4a4a;
        text-decoration: none;
    }

    p.description {
        font-style: italic;
        color: #4a4a4a;
    }

    #explore-section {
        min-height: 1000px;
    }

    .pagination .page-item.active .page-link {
        background-color: #007bff;
        color: white;
    }

    .pagination .page-link {
        cursor: pointer;
    }
</style>