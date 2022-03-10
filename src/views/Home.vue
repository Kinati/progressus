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
            />
          </b-row>
          <b-row align-h="center" class="mb-2">
            <b-input
              type="password"
              v-model="form.password"
              class="text-box"
              placeholder="Password"
            />
          </b-row>
          <b-row align-h="center" class="mb-2">
            <b-input
              type="text"
              v-model="form.name"
              class="text-box"
              placeholder="Name"
            />
          </b-row>
          <b-row align-h="center" class="mb-2">
            <b-input
              type="text"
              v-model="form.companyName"
              class="text-box"
              placeholder="Company"
            />
          </b-row>
          <b-row align-h="center">
            <b-input
              type="text"
              v-model="form.companyReg"
              class="text-box"
              placeholder="Company Register Number"
            />
          </b-row>
          <b-button type="submit" class="mt-3 px-5">Get Start</b-button>
        </form>
      </b-col>
    </b-row>
  </b-container>
</template>


<script>
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        companyName: "",
        companyReg: "",
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