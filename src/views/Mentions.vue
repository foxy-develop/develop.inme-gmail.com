<template>
  <div class="main__content">
    <Section :title="'Результаты поиска за сегодня'" :navBtn="true">

    </Section>
  </div>
</template>

<script>
  import Section from "../components/layout/Section";

  export default {
    name: "Mentions",
    components: {
      Section
    },
    metaInfo: {
      title: "Результаты поиска за сегодня",
      titleTemplate: "%s | ArtDock Client Panel"
    },
  }
</script>
