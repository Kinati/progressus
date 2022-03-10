<template>
  <b-container>
    <b-row class="vh-100 text-center" align-v="center">
      <b-col>
        <form @submit.prevent="submit">
          <b-img fluid :src="require('@/assets/Login/login.png')" />
          <b-row align-h="center" class="mt-5 mb-2">
            <b-input
              type="email"
              v-model="form.email"
              id="email"
              class="text-box"
              placeholder="Email"
            />
          </b-row>
          <b-row align-h="center">
            <b-input
              type="password"
              v-model="form.password"
              id="password"
              class="text-box"
              placeholder="Password"
            />
          </b-row>
          <b-button type="submit" class="mt-3 px-5">Login</b-button>
        </form>
        <p class="mt-4 pointer" @click="$router.push('/')">Register</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    async submit() {
      await this.$store.dispatch("login", this.form);
    },
  },
};
</script>

<style  scoped>
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