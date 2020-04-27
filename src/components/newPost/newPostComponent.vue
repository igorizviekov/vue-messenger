<template>
  <main>
    <h1>Create new Post</h1>
    <p v-if="error" class="error">Validation failed</p>
    <section v-if="isLoggedIn" class="form">
      <div>
        <label for="title">Title:</label>
        <input type="text" name="title" v-model="post.title" />
        <label for="image">Image:</label>
        <input
          type="file"
          id="file"
          ref="file"
          class="file"
          @change="processFile()"
        />
        <label for="content">Content:</label>
        <textarea
          name="content"
          id="content"
          cols="30"
          rows="10"
          v-model="post.content"
        ></textarea>
        <btn @clicked="add" :disabled="disabled">SUBMIT</btn>
      </div>
    </section>
    <loginCheck v-else />
  </main>
</template>

<script>
import btn from "../ui/button";
import { mapActions, mapGetters } from "vuex";
import loginCheck from "../auth/loginCheck";
export default {
  name: "newPostComponent",
  components: { btn, loginCheck },
  data() {
    return {
      post: {
        title: "",
        content: "",
        image: null
      }
    };
  },
  computed: {
    ...mapGetters(["error", "isLoggedIn"])
  },
  methods: {
    ...mapActions(["addNew"]),
    disabled() {
      if (
        this.post.title.length < 3 ||
        this.post.content.length < 8 ||
        this.post.image === null
      ) {
        return true;
      }
      return false;
    },
    add() {
      this.$store.state.post = this.post;
      this.addNew();
    },
    processFile() {
      this.post.image = this.$refs.file.files[0];
    }
  }
};
</script>

<style lang="scss">
@import "@/Styles/main.scss";
.error {
  color: tomato;
}
.form {
  @include shadow;
  &:hover {
    @include shadow-hover;
  }
  margin: auto;
  margin-bottom: 1em;
  margin-top: 1em;
  background-color: white;
  width: 30%;
  padding: 2em;
  div {
    display: flex;
    flex-flow: column;
    text-align: left;
    .file {
      margin-left: 5%;
      & {
        padding: 1em;
      }
    }
    input,
    textarea {
      outline: none;
      font-size: large;
    }
  }
}
</style>
