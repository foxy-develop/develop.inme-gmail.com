<template>
  <div class="main__content">
    <Section :title="'Отчеты о работе'" :navBtn="true">

    </Section>
  </div>
</template>

<script>
  import Section from "../components/layout/Section";

  export default {
    name: "Reports",
    components: {
      Section
    },
    metaInfo: {
      title: "Отчеты",
      titleTemplate: "%s | ArtDock Client Panel"
    }
  }
</script>

<style scoped>

</style>
