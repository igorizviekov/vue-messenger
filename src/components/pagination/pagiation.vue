<template>
  <div class="pagination">
    <router-link v-on:click.native="prevPage" to="/feed" class="pagination">Prev</router-link>
    <router-link to="/feed">{{page}}</router-link>
    <router-link v-on:click.native="nextPage" to="/feed">Next</router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "pagination",
  computed: {
    ...mapGetters(["totalPosts", "itemsPerPage", "page"])
  },
  methods: {
    ...mapActions(["loadData"]),
    nextPage() {
      if (this.page * this.itemsPerPage < this.totalPosts) {
        this.$store.state.page++;
        this.$store.state.page = this.page;
        return this.loadData();
      }
      return null;
    },
    prevPage() {
      if (this.page > 1) {
        this.$store.state.page--;
        this.$store.state.page = this.page;
        return this.loadData();
      }
      return null;
    }
  }
};
</script>

<style scoped>
.pagination a {
  color: #000;
  text-decoration: none;
  background-color: white;
  margin: 0.2em;
  padding: 0.2em 0.5em;
  border: 1px solid lightgrey;
}

.pagination a:active,
.pagination a:hover,
.pagination a.active {
  color: white;
  background-color: rgb(180, 180, 180);
}
</style>