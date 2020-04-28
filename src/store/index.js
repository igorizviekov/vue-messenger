import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    user: null,
    userId: localStorage.getItem("userId"),
    page: 1,
    totalPosts: 0,
    itemsPerPage: 2,
    error: false,
    data: [],
    post: { title: "", image: null, content: "", _id: null },
    isLoading: false
  },
  getters: {
    isLoggedIn: state => {
      return state.token;
    },
    page: state => {
      return state.page;
    },
    totalPosts: state => {
      return state.totalPosts;
    },
    itemsPerPage: state => {
      return state.itemsPerPage;
    },
    post: state => {
      return state.post;
    },
    data: state => {
      return state.data;
    },
    userId: state => {
      return state.userId;
    },
    isLoading: state => {
      return state.isLoading;
    },
    error: state => {
      return state.error;
    }
  },
  mutations: {
    loadData(state) {
      if (state.token) {
        state.isLoading = true;
        axios
          .get(
            "http://localhost:3000/feed?page=" +
              state.page +
              "&limit=" +
              state.itemsPerPage,
            {
              headers: {
                Authorization: "Bearer " + state.token
              }
            }
          )
          .then(response => {
            state.error = false;
            state.isLoading = false;
            state.totalPosts = response.data.totalNum;
            state.data = response.data.posts;
          })
          .catch(err => {
            state.error = true;
            return console.log(err.message);
          });
      }
      return null;
    },
    addNew(state) {
      let formData = new FormData();
      formData.append("title", state.post.title);
      formData.append("content", state.post.content);
      formData.append("image", state.post.image);

      axios
        .post("http://localhost:3000/new", formData, {
          headers: {
            Authorization: "Bearer " + state.token
          }
        })
        .then(response => {
          state.error = false;
          router.push("/");
          console.log(response.data.message);
        })
        .catch(err => {
          state.error = true;
          return console.log(err.message);
        });
    },
    edit(state, item) {
      state.post.title = item.title;
      state.post.content = item.content;
      state.post._id = item._id;
      router.push("/edit");
    },
    update(state, item) {
      let formData = new FormData();
      formData.append("title", item.updatedPost.title);
      formData.append("content", item.updatedPost.content);
      formData.append("id", item.updatedPost._id);
      formData.append("image", item.image);
      axios
        .put("http://localhost:3000/update", formData, {
          headers: {
            Authorization: "Bearer " + state.token
          }
        })
        .then(response => {
          state.error = false;
          router.push("/");
          console.log(response.data.message);
        })
        .catch(err => {
          state.error = true;
          return console.log(err.message);
        });
    },
    async deletePost(state) {
      const oldImage = state.post.image;
      const oldId = state.post._id;
      if (state.token) {
        const oldPost = state.data.findIndex(i => i._id === oldId);
        state.data.splice(oldPost, 1);
      }
      try {
        const response = await axios.delete("http://localhost:3000/delete", {
          headers: {
            Authorization: "Bearer " + state.token
          },
          data: { id: oldId, image: oldImage }
        });
        console.log(response.data.message);
        location.reload(); //go to main page
      } catch (err) {
        console.log(err.message);
      }
    },
    sendLogin(state) {
      const password = state.user.password;
      const email = state.user.email;
      axios
        .post("http://localhost:3000/auth/login", {
          email: email,
          password: password
        })
        .then(response => {
          state.error = false;
          state.token = response.data.token;
          state.userId = response.data.userId;
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("token", response.data.token); //keeps user logged in after refresh(localStorage.removeItem("token"))
          router.push("/");
          console.log(response.data.message);
        })
        .catch(err => {
          state.error = true;
          return console.log(err.message);
        });
    },
    sendSignUp(state) {
      const password = state.user.password;
      const email = state.user.email;
      const name = state.user.name;
      axios
        .post("http://localhost:3000/auth/signup", {
          email: email,
          password: password,
          name: name
        })
        .then(response => {
          state.error = false;
          router.push("/");
          console.log(response.data.message);
        })
        .catch(err => {
          state.error = true;
          return console.log(err.message);
        });
    }
  },
  actions: {
    sendSignUp({ commit }) {
      commit("sendSignUp");
    },
    sendLogin({ commit }) {
      commit("sendLogin");
    },
    loadData({ commit }) {
      commit("loadData");
    },
    addNew({ commit }) {
      commit("addNew");
    },
    deletePost({ commit }) {
      commit("deletePost");
    }
  },
  modules: {}
});
