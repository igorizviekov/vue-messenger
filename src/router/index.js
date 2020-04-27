import Vue from "vue";
import VueRouter from "vue-router";
import feed from "../pages/feed";
import newPost from "../pages/newPost";
import edit from "../components/edit/edit";
import details from "../components/details/details";
import auth from "../components/auth/auth";
import login from "../components/auth/login";
import signup from "../components/auth/signup";

Vue.use(VueRouter);

const routes = [
  {
    path: "/auth/:method",
    name: "auth",
    component: auth,
    children: [
      {
        path: "/auth/login",
        name: "login",
        component: login
      },
      {
        path: "/auth/signup",
        name: "signup",
        component: signup
      }
    ]
  },
  {
    path: "/new",
    name: "newPost",
    component: newPost
  },
  {
    path: "/edit",
    name: "edit",
    component: edit
  },
  {
    path: "/details",
    name: "details",
    component: details
  },
  {
    path: "/",
    name: "main",
    component: feed
  },
  {
    path: "/feed",
    name: "feed",
    component: feed
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
