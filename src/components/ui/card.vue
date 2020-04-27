<template>
  <div class="card">
    <slot name="titleLabel"></slot>
    <slot name="title"></slot>
    <slot name="image"></slot>
    <slot name="contentLabel"></slot>
    <slot name="content"></slot>
    <slot name="date"></slot>
    <div class="buttons">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "card"
};
</script>

<style lang="scss" scoped>
@import "@/Styles/main.scss";
.card {
  @include shadow;
  &:hover {
    @include shadow-hover;
  }
  display: flex;
  flex-flow: column;
  margin: auto;
  margin-bottom: 1em;
  background-color: white;
  width: 40%;
  padding-top: 1%;
  .buttons {
    margin: auto;
  }
}
</style>
