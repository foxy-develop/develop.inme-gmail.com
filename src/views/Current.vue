<template>
  <div class="main__content">
    <Section :title="currentType + ' упоминания за ' + currentDate" :navBtn="true">

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
      methods: {

      },
      computed: {
        currentType: function() {
          return this.$route.params.type === "negative"
            ? "Негативные"
            : "Приемлимые";
        },
        getType: function() {
          return "total-result--" + this.$route.params.type;
        },
        currentDate: function() {
          const date = this.$route.params.date;
          if (date.includes(":")) {
            return (
              parseFloat(date) +
              ":00 - " +
              (parseFloat(date) + 1) +
              ":00 " +
              " сегодня"
            );
          }
          return date;
        }
      }
    }
</script>

<style scoped>

</style>
