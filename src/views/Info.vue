<template>
  <b-container class="py-5">
    <b-row align-h="center" class="w-100">
      <b-img class="productImage mx-2" height="150" :src="item.img" />
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
    <b-row align-h="end">
      <b-button class="my-4" @click="addModal = true"> Add Lots</b-button>
    </b-row>

    <b-table :items="lots" :fields="fields" caption-top>
      <template #cell(actions)="row">
        <b-button size="sm" @click="deleteLots(row.item.id)" class="mr-1">
          Delete
        </b-button>
        <b-button size="sm" class="mr-1" @click="goToLot(row.item.id)">
          Show Details
        </b-button>
        <b-button size="sm" @click="downloadImage(row.item.id)">
          Download QR</b-button
        >
      </template>
    </b-table>
    <b-modal v-model="addModal" hide-footer hide-header centered @hide="hide">
      <h1>{{ isEdit ? "Edit Item" : "Add Item" }}</h1>
      <form @submit.prevent="submit">
        <label for="machineId">Machine ID</label>
        <b-form-input id="machineId" v-model="form.machineId" required />
        <label for="manufactDate">Manufacturing date</label>
        <b-form-datepicker
          id="manufactDate"
          v-model="form.manufactDate"
          type="date"
          required
        />
        <label for="expireDate">Expiration date</label>
        <b-form-datepicker
          id="expireDate"
          v-model="form.expireDate"
          type="date"
          required
        />
        <b-button type="submit" class="btn btn-primary mt-4">{{
          isEdit ? "Save" : "Add item"
        }}</b-button>
      </form>
    </b-modal>
    <h3 class="my-5">Qr Code Example</h3>
    <qrcode-vue id="qrcode" :value="value" :size="size" level="H" />
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { toSvg } from "html-to-image";
import QrcodeVue from "qrcode.vue";
import download from "downloadjs";

export default {
  data() {
    return {
      value: "",
      size: 120,
      download: "",
      addModal: false,
      form: {
        expireDate: "",
        machineId: "",
        manufactDate: "",
      },
      fields: [
        "id",
        "machineId",
        "expireDate",
        "machineId",
        { key: "actions", label: "Actions" },
      ],
      items: [
        {
          id: "",
          expireDate: "",
          machineId: "",
          manufactDate: "",
        },
      ],
    };
  },
  components: {
    QrcodeVue,
  },
  methods: {
    ...mapActions(["getItemInfo", "createLot", "getLots", "deleteLots"]),
    downloadImage(id) {
      this.value = window.location.href + "/" + id;
      toSvg(document.getElementById("qrcode")).then(function (dataUrl) {
        download(dataUrl, "qrcode.svg");
      });
    },
    async submit() {
      if (this.isEdit) {
        // await this.updateItem(this.form);
        this.addModal = false;
      } else {
        await this.createLot(this.form);
        this.addModal = false;
      }
    },
    goToLot(id) {
      this.$router.push({
        name: "Lot",
        params: { id: this.$route.params.id, lot: id },
      });
    },
  },

  computed: {
    ...mapGetters({ item: "getItem", lots: "getLots" }),
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