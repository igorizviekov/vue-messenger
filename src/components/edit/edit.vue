<template>
  <main>
    <h1>Edit</h1>
    <p v-if="error" class="error">Validation failed.</p>
    <card>
      <label for="title" slot="titleLabel">Title:</label>
      <input
        type="text"
        v-model="updatedPost.title"
        slot="title"
        name="title"
      />
      <label for="content" slot="contentLabel">Content:</label>
      <input
        type="text"
        v-model="updatedPost.content"
        slot="content"
        name="content"
      />
      <input
        slot="image"
        type="file"
        id="file"
        ref="file"
        class="file"
        @change="processFile()"
      />
      <div slot="buttons">
        <btn @clicked="goBack">Back</btn>
        <btn @clicked="update({ updatedPost, image })" :disabled="disabled"
          >Update</btn
        >
      </div>
    </card>
  </main>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import card from "../ui/card";
import btn from "../../components/ui/button";
export default {
  name: "edit",
  components: { card, btn },
  data() {
    return {
      image: null,
      updatedPost: {}
    };
  },
  methods: {
    ...mapMutations(["update"]),
    goBack() {
      this.$router.push("/");
    },
    processFile() {
      this.image = this.$refs.file.files[0];
    },
    disabled() {
      if (
        this.updatedPost.title.length < 3 ||
        this.updatedPost.content.length < 8
      ) {
        return true;
      }
      return false;
    }
  },
  computed: { ...mapGetters(["post", "error"]) },
  created() {
    this.updatedPost = this.post;
  }
};
</script>

<style scoped>
input {
  outline: none;
  font-size: large;
  width: 70%;
  margin: auto;
  margin-bottom: 1em;
}
</style>
