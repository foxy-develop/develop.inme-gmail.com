<template>
<ul>
  <li v-for="notification in getNotifications"  :key="notification.notification_id">
    <h3>{{ notification.title }} </h3>
    <p> {{ notification.text }} </p>
  </li>
</ul>
</template>
<!--TODO-->
<!--1. Новые / Все / Избранные -->
<!--2. Фильтр по дате -->
<!--3. Количество отображаемых на странице -->
<script>
import { mapGetters } from "vuex";
  export default {
    name: "ReportsList",
    computed: {
      ...mapGetters(['getNotifications'])
    }
  }
</script>

<style scoped>

</style>
