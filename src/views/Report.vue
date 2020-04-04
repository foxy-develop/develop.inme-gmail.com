<template>
  <div class="main__content">
    <Section :title="'Отчет о работе №' + this.$route.params.id" navBtn :to="'/reports'">

    </Section>
  </div>
</template>

<script>
  import Section from "../components/layout/Section";

  export default {
    name: "Current",
    components: {
      Section
    },
    metaInfo: {
      title: "Упоминания за период",
      titleTemplate: "%s | ArtDock Client Panel"
    },
    mounted() {
      console.log(this.$route)
    }
  }
</script>

<style scoped>

</style>
