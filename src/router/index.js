import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard";
import AboutUs from "../views/AboutUs";
import Info from "../views/Info";
import Profile from "../views/Profile";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/aboutus",
    name: "AboutUs",
    component: AboutUs,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/info/:id",
    name: "Info",
    component: Info,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
