import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard";
import AboutUs from "../views/AboutUs";
import Info from "../views/Info";
import Profile from "../views/Profile";
import Scan from "../views/Scan";
import Report from "../views/Report";
import Products from "../views/Products";

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
    path: "/info/:id/:lot",
    name: "Lot",
    component: Scan,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/report",
    name: "Report",
    component: Report,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/product/:id",
    name: "Product",
    component: Scan,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
