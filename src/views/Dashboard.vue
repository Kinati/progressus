<template>
  <b-row class="body">
    <b-col class="sidebar py-5 px-4" cols="2">
      <h1 class="text-xl mb-5">Progressus</h1>
      <p class="text-start"><b>Dashboard</b></p>
      <p @click="$router.push('/aboutUs')" class="text-start pointer">
        About Us
      </p>
      <p class="text-start pointer" @click="$router.push('/profile')">
        Update Profile
      </p>
      <p @click="$router.push('/login')" class="text-start pointer">Logout</p>
    </b-col>
    <b-col cols="2"> </b-col>
    <b-col cols="10" class="py-5 body" align-self="end">
      <h1 class="text-xl">Welcome {{ user.firstName }} {{ user.lastName }}</h1>

      <b-row class="pb-5 px-2 w-100">
        <b-col
          lg="4"
          md="6"
          xs="12"
          class="px-2 my-2"
          v-for="(item, index) in items"
          :key="index"
          ><div class="pt-2 py-3 dashboardCard h-100 pointer">
            <div class="d-flex justify-content-end w-100">
              <b-dropdown
                size="lg"
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
              >
                <template #button-content>
                  <b-img
                    class="more"
                    :src="require('@/assets/Dashboard/more.png')"
                  />
                </template>
                <b-dropdown-item @click="edit(item)">Edit</b-dropdown-item>
                <b-dropdown-item @click="remove(item.id)"
                  >Delete</b-dropdown-item
                >
              </b-dropdown>
            </div>
            <b-img
              class="productImage"
              :src="item.img"
              @click="goToInfo(item.id)"
            />
            <h2>{{ item.productName }}</h2>
          </div>
        </b-col>
        <b-col lg="4" md="6" xs="12" @click="addModal = true" class="px-2 my-2">
          <div class="p-4 my-auto dashboardCard pointer h-100">
            <b-img
              class="productImage"
              fluid
              :src="require('@/assets/Dashboard/add.png')"
            />
            <h2>Add Product</h2>
          </div>
        </b-col>
      </b-row>

      <!-- Start of Modal Section -->

      <b-modal v-model="addModal" hide-footer hide-header centered @hide="hide">
        <h1>{{ isEdit ? "Edit Item" : "Add Item" }}</h1>
        <form @submit.prevent="submit">
          <label for="productName">Product name</label>
          <b-form-input id="productName" v-model="form.productName" required />
          <label for="ingredients">Ingredients(s)</label>
          <b-form-input id="ingredients" v-model="form.ingredients" required />
          <label for="storage">Storage</label>
          <b-form-input id="storage" v-model="form.storage" required />
          <label for="suggestion">Suggestion(s)</label>
          <b-form-input id="suggestion" v-model="form.suggestion" />
          <label for="caution">Caution(s)</label>
          <b-form-input id="caution" v-model="form.caution" />
          <b-form-group label="Image:" class="mt-3" label-cols-sm="2">
            <b-form-file
              id="file-default"
              @change="onUpload"
              required
            ></b-form-file>
          </b-form-group>
          <b-button type="submit" class="btn btn-primary mt-4">{{
            isEdit ? "Save" : "Add item"
          }}</b-button>
        </form>
      </b-modal>

      <!-- End of Modal Section -->
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import firebase from "firebase";

export default {
  data() {
    return {
      img: null,
      addModal: false,
      form: {
        productName: "",
        machineId: "",
        ingredients: "",
        manufactDate: "",
        expireDate: "",
        storage: "",
        suggestion: "",
        caution: "",
        img: "",
      },
      isEdit: false,
    };
  },
  methods: {
    ...mapActions(["getUserItems", "updateItem", "deleteItem"]),
    edit(form) {
      this.form = { ...form };
      this.addModal = true;
      this.isEdit = true;
    },
    hide() {
      this.form = {
        productName: "",
        machineId: "",
        ingredients: "",
        manufactDate: "",
        expireDate: "",
        storage: "",
        suggestion: "",
        caution: "",
      };

      this.isEdit = false;
    },
    goToInfo(id) {
      this.$router.push({ name: "Info", params: { id: id } });
    },
    onUpload(event) {
      const imageData = event.target.files[0];
      const storageRef = firebase
        .storage()
        .ref(`${imageData.name}`)
        .put(imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          alert(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.form.img = url;
          });
        }
      );
    },
    async remove(id) {
      await this.deleteItem(id);
    },
    async submit() {
      if (this.isEdit) {
        await this.updateItem(this.form);
        alert("Product has been updated successfully");
        this.addModal = false;
      } else {
        await this.$store.dispatch("createItem", this.form);
        this.addModal = false;
      }
    },
  },
  computed: {
    ...mapGetters({ items: "getItems", user: "getUser" }),
  },
  mounted() {
    this.getUserItems();
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