<template>
  <b-container class="py-5">
    <b-row align-h="center" class="w-100">
      <b-img class="productImage mx-2" height="150" :src="item.img" />
      <qrcode-vue id="qrcode" :value="value" :size="size" level="H" />
    </b-row>

    <label for="productName">Product name</label>
    <b-form-input id="productName" v-model="item.productName" readonly />
    <label for="machineId">Machine ID</label>
    <b-form-input id="machineId" v-model="item.machineId" readonly />
    <label for="ingredients">Ingredients(s)</label>
    <b-form-input id="ingredients" v-model="item.ingredients" readonly />
    <label for="manufactDate">Manufacturing date</label>
    <b-form-input
      id="manufactDate"
      v-model="item.manufactDate"
      type="date"
      readonly
    />
    <label for="expireDate">Expiration date</label>
    <b-form-input
      id="expireDate"
      v-model="item.expireDate"
      type="date"
      readonly
    />
    <label for="storage">Storage</label>
    <b-form-input id="storage" v-model="item.storage" readonly />
    <label for="suggestion">Suggestion(s)</label>
    <b-form-input id="suggestion" v-model="item.suggestion" readonly />
    <label for="caution">Caution(s)</label>
    <b-form-input id="caution" v-model="item.caution" readonly />
    <b-button class="mt-4" @click="downloadImage"> Download QR</b-button>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { toPng } from "html-to-image";
import QrcodeVue from "qrcode.vue";
import download from "downloadjs";

export default {
  data() {
    return {
      value: window.location.href,
      size: 120,
      download: "",
    };
  },
  components: {
    QrcodeVue,
  },
  methods: {
    ...mapActions(["getItemInfo"]),
    downloadImage() {
      toPng(document.getElementById("qrcode")).then(function (dataUrl) {
        download(dataUrl, "qrcode.png");
      });
    },
  },

  computed: {
    ...mapGetters({ item: "getItem" }),
  },
  mounted() {
    this.getItemInfo(this.$route.params.id);
  },
};
</script>

<style scoped>
.productImage {
  height: 150px;
}
</style>