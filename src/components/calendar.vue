<template>
  <div>
    <h1>{{ currentMonthName }} {{ currentYear }}</h1>
    <div class="calendar">
      <div v-for="day in daysOfWeek" :key="day">{{ day }}</div>
      <div v-for="n in firstDayOffset" :key="'empty-' + n"></div>
      <div v-for="day in daysInMonth" :key="day" 
           :class="{ 'selected': isSelected(day) }" 
           @click="selectDate(day)">
        {{ day }}
      </div>
    </div>
    <div class="carousel-controls">
      <button @click="previousMonth" :disabled="isPreviousDisabled">Previous</button>
      <button @click="nextMonth" :disabled="isNextDisabled">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  props: ['selectedDate'],
  data() {
    return {
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      startMonth: new Date().getMonth(),
      endMonth: (new Date().getMonth() + 3) % 12,
    }
  },
  computed: {
    currentMonthName() {
      return new Date(this.currentYear, this.currentMonth).toLocaleString('default', { month: 'long' });
    },
    daysInMonth() {
      return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    },
    firstDayOffset() {
      return new Date(this.currentYear, this.currentMonth, 1).getDay();
    },
    isPreviousDisabled() {
      return this.currentMonth === this.startMonth && this.currentYear === new Date().getFullYear();
    },
    isNextDisabled() {
      let nextMonth = this.currentMonth + 1;
      let endYear = this.currentYear;
      if (nextMonth > 11) {
        nextMonth = 0;
        endYear += 1;
      }
      return nextMonth === this.endMonth && endYear === new Date().getFullYear();
    }
  },
  methods: {
    selectDate(day) {
      this.$emit('date-selected', new Date(this.currentYear, this.currentMonth, day));
    },
    isSelected(day) {
      return this.selectedDate && 
             this.selectedDate.getDate() === day && 
             this.selectedDate.getMonth() === this.currentMonth && 
             this.selectedDate.getFullYear() === this.currentYear;
    },
    nextMonth() {
      if (!this.isNextDisabled) {
        if (this.currentMonth === 11) {
          this.currentMonth = 0;
          this.currentYear++;
        } else {
          this.currentMonth++;
        }
      }
    },
    previousMonth() {
      if (!this.isPreviousDisabled) {
        if (this.currentMonth === 0) {
          this.currentMonth = 11;
          this.currentYear--;
        } else {
          this.currentMonth--;
        }
      }
    }
  }
}
</script>