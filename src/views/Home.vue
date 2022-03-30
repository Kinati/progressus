<template>
  <b-container>
    <b-row class="vh-100 text-center" align-v="center">
      <b-col>
        <form @submit.prevent="submit">
          <h1>Register</h1>

          <b-img
            fluid
            :src="require('@/assets/Home/register.png')"
            class="my-4"
          />
          <b-row align-h="center" class="mb-2">
            <b-input
              type="email"
              v-model="form.email"
              class="text-box"
              placeholder="Email"
              required
            />
          </b-row>
          <b-row align-h="center" class="mb-2">
            <b-input
              type="password"
              v-model="form.password"
              class="text-box"
              placeholder="Password"
              required
            />
          </b-row>
          <b-row align-h="center" class="mb-2">
            <b-input
              type="text"
              v-model="form.firstName"
              class="text-box"
              placeholder="First name"
              required
            />
          </b-row>
          <b-row align-h="center" class="mb-2">
            <b-input
              type="text"
              v-model="form.lastName"
              class="text-box"
              placeholder="Last name"
              required
            />
          </b-row>
          <b-row align-h="center" class="mb-2">
            <b-input
              type="tel"
              v-model="form.phone"
              class="text-box"
              placeholder="Phone"
              required
            />
          </b-row>
          <b-row align-h="center" class="mb-2">
            <b-input
              type="text"
              v-model="form.address"
              class="text-box"
              placeholder="Address"
              required
            />
          </b-row>
          <b-row align-h="center" class="mb-2">
            <b-input
              type="text"
              v-model="form.companyName"
              class="text-box"
              placeholder="Company"
              required
            />
          </b-row>
          <b-row align-h="center">
            <b-input
              type="text"
              v-model="form.companyReg"
              class="text-box"
              placeholder="Company Register Number"
              required
            />
          </b-row>
          <b-button type="submit" class="mt-3 px-5">Get Start</b-button>
        </form>
        <p class="mt-3 pointer" @click="$router.push('/login')">
          Already have an account
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>


<script>
export default {
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        companyName: "",
        companyReg: "",
        phone: "",
        address: "",
      },
      error: null,
    };
  },
  methods: {
    async submit() {
      await this.$store.dispatch("register", this.form);
    },
  },
};
</script>

<style  scoped>
h1 {
  font-weight: bold;
}
img {
  height: 100px;
  width: auto;
}
.btn-secondary {
  background-color: black;
  border-radius: 10px;
}
.text-box {
  width: 280px;
}
</style>