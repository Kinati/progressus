<template>
  <b-row class="body">
    <b-col class="sidebar py-5 px-4" cols="2">
      <h1 class="text-xl mb-5">Progressus</h1>
      <p class="text-start pointer" @click="$router.push('/dashboard')">
        Dashboard
      </p>
      <p class="text-start"><b>About Us</b></p>
      <p class="text-start pointer" @click="$router.push('/profile')">
        Update Profile
      </p>
      <p @click="$router.push('/login')" class="text-start pointer">Logout</p>
    </b-col>
    <b-col cols="2"> </b-col>
    <b-col cols="10" class="py-5 body px-4" align-self="end">
      <h1 class="text-xl mb-4">About Us</h1>

      <p>
        We are product traceability system that allows producer keep records of
        their products, streamline inventory management, continually improve
        their products, make the products more quality, and increase the
        reliability of their products, giving the company more credibility and
        reputation.
      </p>
      <p>
        consumer to track your food production process and origin. And can
        report problem to producer easily via Line Chatbot
      </p>
      <p>Please contact us at hello@aw1.com</p>
    </b-col>
  </b-row>
</template>

<script>
export default {};
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

.dashboardCard img {
  height: 60px;
}
.row {
  --bs-gutter-x: 0;
}
</style>