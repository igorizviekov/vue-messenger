<template>
  <div id="app" class="app">
    <layout />
  </div>
</template>

<script>
import layout from "./layout/layout";
export default { name: "App", components: { layout } };
</script>
<style lang="scss">
@import "./Styles/main.scss";
body {
  margin: 0;
  padding: 0;
  background-color: $back-color;
  @include font;
  .app {
    text-align: center;
    margin-top: 4em;
  }
}
</style>
