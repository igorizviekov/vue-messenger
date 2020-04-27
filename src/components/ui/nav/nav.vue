<template>
  <nav>
    <ul>
      <router-link to="/" class="link" active-class="active">MAIN</router-link>
      <router-link to="/new" class="link" active-class="active">WRITE</router-link>
      <button v-if="isLoggedIn" class="logout" @click="logout">LOGOUT</button>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "navBar",
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      location.reload();
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/Styles/main.scss";
nav {
  @include shadow;
}
.logout {
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16pt;
  &:hover {
    color: $first-color;
  }
}
nav,
ul {
  position: fixed;
  top: 0;
  width: 100%;
  height: 2em;
  padding: 0;
  margin: 0;
  background-color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  a {
    color: $text-color;
    text-decoration: none;
    &:hover {
      color: $first-color;
    }
  }
}
</style>
