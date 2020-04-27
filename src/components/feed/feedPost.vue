<template>
  <main>
    <h1>Post Feed</h1>
    <div v-if="isLoggedIn">
      <spinner v-if="isLoading" />
      <h4 v-if="!data.length && !error">No Posts yet.</h4>
      <p v-if="error" class="error">Failed to load data.</p>
      <section>
        <card v-for="(item, index) in data" :key="index">
          <h2 slot="title">{{ item.title }}</h2>
          <h4 slot="content">{{ item.content }}</h4>
          <p slot="date">{{ item.createdAt }}</p>
          <div slot="buttons">
            <btn @clicked="details(item)">View</btn>
            <btn v-if="item.creator === userId" @clicked="edit(item)">Edit</btn>
            <btn v-if="item.creator === userId" @clicked="deleteItem(item)">Delete</btn>
          </div>
        </card>
      </section>
      <pagination />
    </div>
    <loginCheck v-else />
  </main>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import card from "../ui/card";
import btn from "../../components/ui/button";
import spinner from "../../components/ui/spinner";
import pagination from "../pagination/pagiation";
import loginCheck from "../auth/loginCheck";
export default {
  name: "feedPost",
  components: { card, btn, spinner, pagination, loginCheck },
  methods: {
    ...mapMutations(["edit"]),
    ...mapActions(["loadData", "deletePost"]),
    deleteItem(item) {
      this.$store.state.post.image = item.imageURL;
      this.$store.state.post._id = item._id;
      this.deletePost();
    },
    details(item) {
      this.$store.state.post = item;
      this.$router.push("/details");
    }
  },
  computed: {
    ...mapGetters(["data", "isLoading", "error", "isLoggedIn", "userId"])
  },
  created() {
    this.loadData();
  }
};
</script>

<style lang="scss" scoped>
@import "@/Styles/main.scss";

section {
  display: flex;
  flex-flow: column;
  h2 {
    margin-top: 3%;
    color: $first-color;
    margin: 0;
    text-align: center;
  }
  p {
    font-size: smaller;
    color: $third-color;
  }
}
</style>
