import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import router from "../router";
import "firebase/firestore";
import "firebase/auth";

Vue.use(Vuex);

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyBUWSnzuEKiLw_vr6bd1cMk94Qlrcc-xZ4",
  authDomain: "progressus-417d2.firebaseapp.com",
  databaseURL:
    "https://progressus-417d2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "progressus-417d2",
  storageBucket: "progressus-417d2.appspot.com",
  messagingSenderId: "192083547619",
  appId: "1:192083547619:web:1f761522cbdbff112d7cd6",
  measurementId: "G-R0NEBVKGZC",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const usersCollection = db.collection("users");
const itemsCollection = db.collection("items");

export default new Vuex.Store({
  state: {
    user: {},
    items: [],
    item: {},
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_ITEMS(state, payload) {
      state.items = payload;
    },
    SET_ITEM(state, payload) {
      state.item = payload;
    },
  },
  getters: {
    getUser: (state) => state.user,
    getItems: (state) => state.items,
    getItem: (state) => state.item,
  },
  actions: {
    login({ dispatch }, form) {
      firebase
        .auth()
        .signInWithEmailAndPassword(form.email, form.password)
        .then(async () => {
          await dispatch("getUserInfo", form.email);
          router.push("/dashboard");
        })
        .catch((err) => {
          alert(err.message);
        });
    },
    register({ dispatch }, form) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(form.email, form.password)
        .then(async (res) => {
          usersCollection.add({
            email: res.email,
            id: res.uid,
            name: form.name,
            companyName: form.companyName,
            companyReg: form.companyReg,
          });
          dispatch("login", form);
        })
        .catch((err) => {
          alert(err.message)
          return false;
        });
    },
    async createItem({ dispatch, getters }, form) {
      form.uid = await getters.getUser.id;
      await itemsCollection.add(form);
      dispatch("getUserItems", form.uid);
    },
    async getItemInfo({ commit }, id) {
      const item = await itemsCollection.doc(id).get();
      commit("SET_ITEM", item.data());
    },
    async getUserInfo({ commit }, email) {
      const user = await usersCollection.where("email", "==", email).get();
      let users = [];
      user.forEach((doc) => users.push({ doc_id: doc.id, ...doc.data() }));
      commit("SET_USER", users[0]);
    },
    async getUserItems({ commit, getters }) {
      const id = await getters.getUser.id;
      const getItems = await itemsCollection.where("uid", "==", id).get();
      const items = [];
      getItems.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
      commit("SET_ITEMS", items);
    },
    async updateItem({ dispatch, getters }, form) {
      itemsCollection.doc(form.id).update(form);
      const uid = await getters.getUser.uid;
      dispatch("getUserItems", uid);
    },
    async updateUser({ dispatch }, form) {
      usersCollection.doc(form.doc_id).update(form);
      dispatch("getUserInfo", form.email);
    },
    async deleteItem({ dispatch, getters }, id) {
      itemsCollection.doc(id).delete();
      const uid = await getters.getUser.uid;
      dispatch("getUserItems", uid);
    },
  },
});
