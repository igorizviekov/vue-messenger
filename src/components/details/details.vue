<template>
  <main>
    <h1>Deatils</h1>
    <card>
      <h3 slot="title">{{ post.title }}</h3>
      <img slot="image" :src="'http://localhost:3000/' + post.imageURL" :alt="post.title" />
      <p slot="content">{{ post.content }}</p>
      <btn slot="buttons" @clicked="goBack">Back</btn>
    </card>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import card from "../ui/card";
import btn from "../ui/button";
export default {
  name: "postDetails",
  components: { card, btn },
  computed: {
    ...mapGetters(["post"])
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
img {
  margin: auto;
  width: 50%;
}
</style>
