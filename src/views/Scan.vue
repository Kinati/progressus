<template>
  <b-container class="py-5">
    <b-row align-h="center" class="w-100">
      <b-img class="productImage mx-2" height="150" :src="item.img" />
      <qrcode-vue id="qrcode" :value="value" :size="size" level="H" />
    </b-row>

    <label for="productName">Product name</label>
    <b-form-input id="productName" v-model="item.productName" readonly />
    <label for="ingredients">Ingredients(s)</label>
    <b-form-input id="ingredients" v-model="item.ingredients" readonly />
    <label for="storage">Storage</label>
    <b-form-input id="storage" v-model="item.storage" readonly />
    <label for="suggestion">Suggestion(s)</label>
    <b-form-input id="suggestion" v-model="item.suggestion" readonly />
    <label for="caution">Caution(s)</label>
    <b-form-input id="caution" v-model="item.caution" readonly />
    <label for="machineId">Machine ID</label>
    <b-form-input id="machineId" v-model="lot.machineId" readonly />
    <label for="manufactDate">Manufacturing date</label>
    <b-form-datepicker
      id="manufactDate"
      v-model="lot.manufactDate"
      type="date"
      readonly
    />
    <label for="expireDate">Expiration date</label>
    <b-form-datepicker
      id="expireDate"
      v-model="lot.expireDate"
      type="date"
      readonly
    />
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      value: window.location.href,
      size: 120,
      download: "",
      lotInfo: "",
    };
  },
  methods: {
    ...mapActions(["getItemInfo", "getLotInfo"]),
  },

  computed: {
    ...mapGetters({ item: "getItem", lot: "getLot" }),
  },
  mounted() {
    this.getItemInfo(this.$route.params.id);
    this.getLotInfo(this.$route.params.lot);
  },
};
</script>

<style scoped>
.productImage {
  height: 150px;
}
</style>