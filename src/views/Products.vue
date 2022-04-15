<template>
  <b-row class="body">
    <b-container>
      <h1 class="my-5">All Products</h1>
      <b-row class="pb-5 w-100">
        <b-input v-model="search" placeholder="Search Products" />
        <b-col
          lg="4"
          md="6"
          xs="12"
          class="my-2 w-100"
          v-for="(item, index) in displayItems"
          :key="index"
          ><div class="pt-2 py-3 dashboardCard h-100 pointer">
            <div class="d-flex justify-content-end w-100"></div>
            <b-img
              class="productImage"
              :src="item.img"
              @click="goToInfo(item.id)"
            />
            <h2>{{ item.productName }}</h2>
          </div>
        </b-col>
      </b-row>

      <!-- End of Modal Section -->
    </b-container>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      displayItems: [],
      search: "",
    };
  },
  watch: {
    search: function (val) {
      this.displayItems = this.items.filter((item) =>
        item.productName.includes(val)
      );
    },
  },
  methods: {
    ...mapActions(["getItems"]),
    async assignedItems() {
      await this.getItems();
      this.displayItems = this.items;
    },
    goToInfo(id) {
      this.$router.push({ name: "Product", params: { id: id } });
    },
  },
  computed: {
    ...mapGetters({ items: "getItems" }),
  },
  mounted() {
    this.assignedItems();
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
}
</style>