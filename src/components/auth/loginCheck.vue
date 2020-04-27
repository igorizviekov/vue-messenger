<template>
  <div>
    <h4>Please Log-in</h4>
    <router-link to="/auth/login" class="check">HERE</router-link>
  </div>
</template>

<script>
export default { name: "loginCheck" };
</script>

<style lang="scss">
@import "@/Styles/main.scss";

.check {
  text-decoration: none;
  font-weight: bold;
  color: $first-color;
  margin: 1em;
  transition: 200ms;
  &:hover {
    color: darken($first-color, 5);
  }
}
.router-link-active {
  color: $second-color;
}
</style>
