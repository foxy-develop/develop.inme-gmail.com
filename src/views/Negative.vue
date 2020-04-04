<template>
  <div class="main__content">
    <Section :title="'Негативные упоминания'" :navBtn="true">

    </Section>
  </div>
</template>

<script>
  import Section from "../components/layout/Section";
    export default {
      name: "Negative",
      components: {
        Section
      },
      metaInfo: {
        title: "Негативные упоминания",
        titleTemplate: "%s | ArtDock Client Panel"
      }
    }

</script>

<style scoped>

</style>
