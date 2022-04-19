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
const lotsCollection = db.collection("lots");
const reportsCollection = db.collection("reports");

export default new Vuex.Store({
  state: {
    user: {},
    items: [],
    item: {},
    lots: [],
    lot: {},
    reports: [],
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
    SET_LOTS(state, payload) {
      state.lots = payload;
    },
    SET_LOT(state, payload) {
      state.lot = payload;
    },
    SET_REPORTS(state, payload) {
      state.reports = payload;
    },
  },
  getters: {
    getUser: (state) => state.user,
    getItems: (state) => state.items,
    getItem: (state) => state.item,
    getLots: (state) => state.lots,
    getLot: (state) => state.lot,
    getReports: (state) => state.reports,
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
            firstName: form.firstName,
            lastName: form.lastName,
            phone: form.phone,
            address: form.address,
            companyName: form.companyName,
            companyReg: form.companyReg,
          });
          dispatch("login", form);
        })
        .catch((err) => {
          alert(err.message);
          return false;
        });
    },
    async createItem({ dispatch, getters }, form) {
      form.uid = await getters.getUser.id;
      form.email = await getters.getUser.email;
      await itemsCollection.add(form);
      dispatch("getUserItems", form.uid);
    },
    async createLot({ dispatch, getters }, form) {
      form.uid = await getters.getItem.id;
      await lotsCollection.add(form);
      dispatch("getLots");
    },
    async createReports({ dispatch }, form) {
      await reportsCollection.add(form);
      dispatch("getLots");
    },
    async getItems({ commit }) {
      const getItems = await itemsCollection.get();
      const items = [];
      getItems.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
      commit("SET_ITEMS", items);
    },
    async getItemInfo({ commit, dispatch }, id) {
      const item = await itemsCollection.doc(id).get();
      let result = item.data();
      result.id = id;
      commit("SET_ITEM", result);
      dispatch("getLots");
    },
    async getLotInfo({ commit }, id) {
      const item = await lotsCollection.doc(id).get();
      commit("SET_LOT", item.data());
    },
    async getLots({ commit, getters }) {
      const id = await getters.getItem.id;
      const getLots = await lotsCollection.where("uid", "==", id).get();
      const lots = [];
      getLots.forEach((doc) => lots.push({ id: doc.id, ...doc.data() }));
      commit("SET_LOTS", lots);
    },
    async getReportInfo({ commit, getters }) {
      const email = await getters.getUser.email;
      const report = await reportsCollection.where("email", "==", email).get();
      let reports = [];
      report.forEach((doc) => reports.push({ doc_id: doc.id, ...doc.data() }));
      commit("SET_REPORTS", reports);
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
    async deleteLots({ dispatch }, id) {
      lotsCollection.doc(id).delete();
      dispatch("getLots");
    },
  },
});
