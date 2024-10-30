<template>
    <div class="navbar navbar-inverse">
      <div class="container">
        <div class="navbar-header">
          <!-- Button for smallest screens -->
          <button
            type="button"
            class="navbar-toggle"
            @click="toggleNavbar"
          >
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
  
          <router-link class="navbar-brand" to="/homepage">
            <img
              src="/src/assets/images/logo.png"
              style="width: 300px; height: auto; display: block; margin-top: -50px; margin-left: -120px;"
              alt="Logo"
            />
          </router-link>
        </div>
  
        <div :class="['navbar-collapse', { collapse: !isNavbarOpen }]">
          <ul class="nav navbar-nav pull-right mainNav">
            <li class="active">
              <router-link to="/homepage" style="font-size: 13px;">Home</router-link>
            </li>
            <li>
              <router-link to="/about" style="font-size: 13px;">About</router-link>
            </li>
            <li>
              <router-link to="/services" style="font-size: 13px;">Services</router-link>
            </li>
            <li>
              <router-link to="/price" style="font-size: 13px;">Price</router-link>
            </li>
            <li>
              <router-link to="/projects" style="font-size: 13px;">Projects</router-link>
            </li>
            <li class="dropdown">
              <a
                href="#"
                class="dropdown-toggle"
                @click.prevent="toggleDropdown"
                style="font-size: 13px;"
              >
                Pages <b class="caret"></b>
              </a>
              <ul v-if="isDropdownOpen" class="dropdown-menu">
                <li><router-link to="/sidebar-right">Right Sidebar</router-link></li>
                <li><a href="#">Dummy Link1</a></li>
                <li><a href="#">Dummy Link2</a></li>
                <li><a href="#">Dummy Link3</a></li>
              </ul>
            </li>
            <li>
              <router-link to="/contact" style="font-size: 13px;">Contact</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isNavbarOpen: false,
        isDropdownOpen: false,
      };
    },
    methods: {
      toggleNavbar() {
        this.isNavbarOpen = !this.isNavbarOpen;
      },
      toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
      },
    },
  };
  </script>
  
  <style>
  /* You can import your global styles or add component-specific styles here */
  @import "/src/assets/css/bootstrap.min.css";
  @import "/src/assets/css/bootstrap-theme.css";
  @import "/src/assets/style.css";

  
  </style>