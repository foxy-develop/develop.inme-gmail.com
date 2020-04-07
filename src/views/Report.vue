<template>
  <div class="main__content">
    <Section :title="'Отчет о работе №' + this.$route.params.id" navBtn :to="'/reports'">

    </Section>
  </div>
</template>

<script>
  import Section from "../components/layout/Section";
  import { mapActions, mapGetters } from "vuex";
  import {NOTIFICATIONS_READ} from "../store/actions/notifications";

  export default {
    name: "Current",
    components: {
      Section
    },
    metaInfo: {
      title: "Упоминания за период",
      titleTemplate: "%s | ArtDock Client Panel"
    },
    methods: {
      ...mapActions(['NOTIFICATIONS_CURRENT_REQUEST', 'NOTIFICATIONS_READ'])
    },
    async created() {
      const r = await this.NOTIFICATIONS_CURRENT_REQUEST({ notification_id: this.$route.params.id});
      this.NOTIFICATIONS_READ(this.$route.params.id);
    }
  }
</script>

<style scoped>

</style>
