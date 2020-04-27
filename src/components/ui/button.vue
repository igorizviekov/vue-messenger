<template>
  <button type="submit" class="button" @click="onClick" :disabled="disabled()">
    <slot />
  </button>
</template>
<script>
export default {
  name: "btn",
  props: {
    disabled: {
      type: Function,
      default: () => false
    }
  },
  methods: {
    onClick(event) {
      this.$emit("clicked", event);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/Styles/main.scss";
.button {
  font-size: large;
  margin: 1em;
  padding: 0 1em;
  border: none;
  cursor: pointer;
  background-color: white;
  transition: 0.3s;
  outline: none;
  &:hover {
    color: $second-color;
    @include shadow;
  }
  &:disabled {
    cursor: not-allowed;
    &:hover {
      color: lightgrey;
      box-shadow: none;
    }
  }
}
</style>
