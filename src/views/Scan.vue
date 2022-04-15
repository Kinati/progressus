<template>
  <b-container class="py-5">
    <b-row align-h="center" class="w-100">
      <b-img class="productImage" height="150" :src="item.img" />
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
    <div v-if="this.$route.params.lot">
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
    </div>
    <b-button size="sm" v-b-modal="'my-modal'" class="mt-3"> Report </b-button>
    <b-modal id="my-modal" hide-footer hide-header centered @hide="hide">
      <form @submit.prevent="submit">
        <label for="contact">Reporter Contact</label>
        <b-form-input v-model="form.contact" id="contact" required />
        <label for="detail">Details</label>
        <b-form-textarea
          id="detail"
          v-model="form.detail"
          placeholder="Report Deatil"
          rows="4"
          required
        />
        <b-button type="submit" class="btn btn-primary mt-4">Report</b-button>
      </form>
    </b-modal>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      size: 120,
      download: "",
      lotInfo: "",
      modal: false,
      form: {
        contact: "",
        productName: "",
        lotId: "",
        email: "",
        detail: "",
      },
    };
  },
  methods: {
    ...mapActions(["getItemInfo", "getLotInfo", "createReports"]),
    async submit() {
      this.form.productName = this.item.productName;
      this.form.lotId = this.$route.params.lot;
      this.form.email = this.item.email;
      console.log(this.$route.params.lot);

      await this.createReports(this.form);
      alert("Your Report has been sent");
      this.$bvModal.hide("my-modal");
    },
    hide() {
      this.form.email = "";
      this.form.detail = "";
    },
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