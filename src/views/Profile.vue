<template>
  <b-row class="body">
    <b-col class="sidebar py-5 px-4" cols="2">
      <h1 class="text-xl mb-5">Progressus</h1>
      <p class="text-start pointer" @click="$router.push('/dashboard')">
        Dashboard
      </p>
      <p @click="$router.push('/aboutUs')" class="text-start pointer">
        About Us
      </p>
      <p class="text-start pointer"><b>My profile</b></p>
      <p @click="$router.push('/login')" class="text-start pointer">Logout</p>
    </b-col>
    <b-col cols="2" class="px-4"> </b-col>
    <b-col cols="10" class="py-5 body px-2" align-self="end">
      <h1 class="text-xl">Profile</h1>

      <b-row class="pb-5 w-100" align-h="center">
        <form class="w-50" @submit.prevent="submit">
          <label for="productName">First name</label>
          <b-form-input id="productName" v-model="form.firstName" />
          <label for="machineId">Last Name</label>
          <b-form-input id="machineId" v-model="form.lastName" />
          <label for="ingredients">Company Register Number</label>
          <b-form-input id="ingredients" v-model="form.companyReg" />
          <label for="phone">Phone</label>
          <b-form-input id="phone" v-model="form.phone" />
          <label for="address">Address</label>
          <b-form-input id="address" v-model="form.address" />
          <b-button type="submit" class="btn btn-primary mt-4"> Edit </b-button>
        </form>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      img: null,
      addModal: false,
      isEdit: false,
      form: {},
    };
  },
  methods: {
    ...mapActions(["updateUser"]),
    async submit() {
      await this.updateUser(this.form);
      alert("Your Profile has been updated");
    },
  },
  computed: {
    ...mapGetters({ user: "getUser" }),
  },
  mounted() {
    this.form = { ...this.user };
  },
};
</script>

<style  scoped>
.sidebar h1 {
  font-weight: bold;
  font-size: 1.75em;
}
.body {
  background-color: #f1f6f8;
  min-height: 100vh;
}
.sidebar {
  background-color: white;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  z-index: 2;
}
.dashboardCard {
  box-sizing: border-box;
  font-size: 18px;
  border-radius: 10px;
  background: #fff;
}

.dashboardCard h2 {
  margin-top: 18px;
  margin-bottom: 0;
}

.productImage {
  height: 150px;
}
.more {
  height: 20px;
  z-index: 99;
}
.row {
  --bs-gutter-x: 0;
  margin-left: 0;
  margin-right: 0;
}
</style>