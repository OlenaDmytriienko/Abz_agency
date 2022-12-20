<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted, nextTick } from "vue";
import "../components/Button/button.scss";
import "@/style/index.scss";
import defaultPhoto from "@/assets/nocard1.png";
import Button from "../components/Button/Button.vue";
import Spiner from "../components/Spiner/Spiner.vue";
import 'floating-vue/dist/style.css'
import Users from "../api/Users.js";
import Positions from "../api/Positions.js";
import { Form, Field, ErrorMessage } from "vee-validate";
// import { ProgressiveImage } from "vue-progressive-image";
import Token from "../api/Token.js";
</script>

<template>
  <div class="page__wrapper">
    <header class="header">
      <div class="header__logo">
        <img src="@/assets/logo.svg" alt="" />
        <img src="@/assets/logo1.png" alt="" />
      </div>
      <div class="header__btns">
        <Button text="Users" @click="scrollToElement({behavior: 'smooth'}, 'main__title')"/>
        <Button text="Sign up" @click="scrollToElement({behavior: 'smooth'}, 'contacts__wrapper')"/>
      </div>
    </header>

    <section class="first">
      <div class="box">
        <h1 class="box__title">Test assignment for front-end developer</h1>
        <p class="box__text">
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
      </div>
      <Button text="Sign up" class="first__btn" @click="scrollToElement({behavior: 'smooth'}, 'contacts__wrapper')"/>
    </section>

    <section class="container main">
      <div class="main__title-wrapper"><h2 class="main__title">Working with GET request</h2></div>
      <div class="main__cards">
        <div class="main__card" v-for="user in users">
          <img
            class="main__img"
            :src="user.photo"
            alt=""
            @error="imageUrlAlt"
          />
          <p class="main__name" v-tooltip="{
            content: user.name,
            theme: 'info-tooltip'
          }" v-if="user.name.length >= 20"> 
            {{ truncate(user.name ?? "Unknown User", 20) }}
          </p>
          <p class="main__name" v-else>{{user.name ?? "Unknown User"}}</p>
          <p class="main__job" v-if="user.position.length >= 20" v-tooltip="user.position">
            {{ truncate(user.position ?? "No Position", 20) }}
          </p>
          <p class="main__job" v-else>
            {{ user.position ?? "No Position" }}
          </p>
          <p class="main__mail" v-if="user.email.length >= 20" v-tooltip="user.email">
            {{ truncate(user.email ?? "No email", 20) }}</p>
          <p class="main__mail" v-else>{{user.email ?? "No email"}}</p>
          <p class="main__num">{{ truncate(user.phone ?? "No phone", 20) }}</p>
        </div>
      </div>
      <Spiner class="spiner" v-show="isLoadingUsers" />
      <Button
        text="Show more"
        class="main__btn"
        @click="onShowMoreTap()"
        v-show="showMore"
      />
    </section>
    <section class="contacts container">
      <div class="contacts__wrapper" v-show="isSignedIn == false">
        <h2 class="contacts__title">Working with POST request</h2>

        <Form class="contacts__forms" @submit="onSubmit">
          <div>
            <Field
              class="contacts__inp"
              type="text"
              name="name"
              placeholder="Your name"
              :rules="validateName"
              :class="{ 'contacts__inp-invalid': errorInputName == true }"
              @blur="checkInputName($event)"
            />
            <ErrorMessage name="name" class="contacts__input-text-invalid" />
          </div>
          <div>
            <Field
              class="contacts__inp"
              type="email"
              name="email"
              placeholder="Email"
              :rules="validateEmail"
              :class="{ 'contacts__inp-invalid': errorInputEmail == true }"
              @blur="checkInputEmail($event)"
            />
            <ErrorMessage name="email" class="contacts__input-text-invalid" />
          </div>
          <div>
            <Field
              class="contacts__inp"
              type="text"
              name="phone"
              placeholder="Phone"
              :rules="validatePhone"
              :class="{ 'contacts__inp-invalid': errorInputPhone == true }"
              @blur="checkInputPhone($event)"
            />
            <label for="phone" class="contacts__forms__num-label"
              >+38 (XXX) XXX - XX - XX</label
            ><br />
            <ErrorMessage name="phone" class="contacts__input-text-invalid" />
          </div>
          <div class="contacts__radio">
            <p class="contacts__name">Select your position</p>
            <label v-for="position in positions" :key="position">
              <Field
                type="radio"
                :value="position.id"
                class="contacts__inputs-radio"
                :rules="validatePosition"
                @click="checkInputPosition($event)"
                name="position"
              />
              {{ position.name }}
            </label>
            <ErrorMessage
              name="position"
              class="contacts__input-text-invalid"
            />
          </div>
          <div class="contacts__photo">
            <label class="input-file">
              <div class="contacts__join">
              <span
                class="input-file-btn"
                :class="{ 'contacts__inp-invalid': errorInputPhoto == true }"
                >Upload</span
              >
              <span
                class="input-file-text"
                type="text"
                :class="{ 'contacts__inp-invalid': errorInputPhoto == true }"
                >{{ photoText }}</span
              ></div> 
              <ErrorMessage name="photo" class="contacts__input-text-invalid" />
              <Field
                type="file"
                name="photo"
                :rules="validatePhoto"
                :class="{ 'contacts__inp-invalid': errorInputPhoto == true }"
              />
            </label>
          </div>
          <Button text="Sign up" v-if="isSignInEnabled" />
          <Button text="Sign up" disabled v-else />
          <!-- <router-link to="/about" class="router"> <Button text="Sign up"/></router-link> -->
          <!-- <img class="spiner" src="../assets/spiner.svg" alt=""> -->
        </Form>
      </div>
      <div class="success" v-show="isSignedIn">
        <h1 class="success__title">User successfully registered</h1>
        <img
          class="success__img"
          src="../assets/success.png"
          alt="Success registration"
        />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  name: "App",
  data() {
    return {
      api: "https://frontend-test-assignment-api.abz.agency/api/v1",
      users: [],
      positions: [],
      page: 1,
      count: 6,
      showMore: true,
      photoResolutionIsValid: true,
      photoText: "Upload your photo",
      isNameFilled: false,
      isPhoneFilled: false,
      isEmailFilled: false,
      isPositionFilled: false,
      isPhotoFilled: false,
      isSignInEnabled: false,
      isSignedIn: false,
      isLoadingUsers: false,
      errorInputName: false,
      errorInputPhone: false,
      errorInputPosition: false,
      errorInputEmail: false,
      errorInputPhoto: false,
    };
  },

  methods: {
    onSubmit(values) {
      Users.postUser(values, localStorage.getItem("token")).then((response) => {
        this.goToSuccess();
      });
    },

    scrollToElement(options, elementClass) {
      const el = this.$el.getElementsByClassName(elementClass)[0];
      
      if (el) {
        el.scrollIntoView(options);
      }
    },

    checkInputName(event) {
      console.log(event.target.value);
      if (event.target.value == "") {
        this.errorInputName = true;
        this.isNameFilled = false;
      } else {
        this.isNameFilled = true;
      }
    },

    checkInputEmail(event) {
      if (event.target.value == "") {
        this.errorInputEmail = true;
        this.isEmailFilled = false;
      } else {
        this.isEmailFilled = true;
      }
    },

    checkInputPhone(event) {
      if (event.target.value == "") {
        this.errorInputPhone = true;
        this.isPhoneFilled = false;
      } else {
        this.isPhoneFilled = true;
      }
    },

    checkInputPosition(event) {
      this.isPositionFilled = true;
    },

    validateName(value) {
      if (!value) {
        // this.errorInputName = true;
        return "This field is required";
      }

      if (value.length < 2 || value.length > 60) {
        this.errorInputName = true;
        return "The name must be 2-60 characters long";
      }
      this.errorInputName = false;
      this.isNameFilled = true;

      return true;
    },

    validateEmail(value) {
      console.log(value);
      if (!value) {
      
        return "This field is required";
      }

      if (value.slice(-3) == ".ru") {
        this.errorInputEmail = true;
        return "Геть з України, москаль некрасівий!";
      }

      const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
      if (!regex.test(value)) {
        this.errorInputEmail = true;
        return "This field must be a valid email";
      }
      this.errorInputEmail = false;
      return true;
    },

    validatePhone(value) {
      if (!value) {
        // this.errorInputPhone = true;
        return "This field is required";
      }

      const regex = /[+]{1}[3]{1}[8]{1}[0]{1}[0-9]{9}/;
      if (!regex.test(value)) {
        this.errorInputPhone = true;
        return "The phone number should start with the code of Ukraine";
      }
      this.errorInputPhone = false;
      return true;
    },

    validatePosition(value) {
      if (!value) {
        return "This field is required";
      }
      return true;
    },

    async validatePhoto(value) {
      if (!value) {
        //this.errorInputPhoto = true;
        return "This field is required";
      }

      if (!(value.type == "image/jpeg" || value.type == "image/jpg")) {
        this.errorInputPhoto = true;
        return "The photo should be jpg/jpeg image";
      }

      let maxSize = 5242880;
      if (value.size > maxSize) {
        this.errorInputPhoto = true;
        return "The image size must not exceed 5MB";
      }

      let global = this;
      let reader = new FileReader();

      reader.readAsDataURL(value);
      reader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function () {
          var height = image.height;
          var width = image.width;
          if (height < 70 || width < 70) {
            global.photoResolutionIsValid = false;
          }
        };
      };

      this.photoText = value.name;
      this.errorInputPhoto = false;
      this.isPhotoFilled = true;

      if (!this.photoResolutionIsValid) {
        this.errorInputPhoto = true;
        return "The image resolution must be at least 70x70px";
      }

      return true;
    },

    async getUsers() {
      this.isLoadingUsers = true;
      Users.getUsers(this.page, this.count)
        .then((response) => {
          this.users = this.users.concat(response.data.users);
          this.showMore = this.users.length < response.data.total_users;
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.isLoadingUsers = false));
    },

    async getPositions() {
      Positions.getPositions()
        .then((response) => {
          this.positions = response.data.positions;
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        });
    },
    async getToken() {
      Token.getToken()
        .then((response) => {
          localStorage.setItem("token", response.data.token);
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        });
    },
    async onShowMoreTap() {
      this.page++;
      await this.getUsers();
    },

    truncate(content, length) {
      return content.length > length
        ? content.slice(0, length) + "..."
        : content;
    },

    async goToSuccess() {
      this.isSignedIn = true;
      this.users = [];
      this.page = 1;
      await this.getUsers();
    },

    updateSignIn() {
      this.isSignInEnabled =
        this.isNameFilled &&
        this.isEmailFilled &&
        this.isPhoneFilled &&
        this.isPositionFilled &&
        this.isPhotoFilled;
    },

    imageUrlAlt(event) {
      event.target.src = "@/assets/nocard1.png"; // https://prohvost.club/wp-content/uploads/2018/05/britanskaya-shinshilla-700x329.jpg
    },
  },

  watch: {
    isNameFilled: function (val) {
      this.updateSignIn();
    },
    isEmailFilled: function (val) {
      this.updateSignIn();
    },
    isPhoneFilled: function (val) {
      this.updateSignIn();
    },
    isPositionFilled: function (val) {
      this.updateSignIn();
    },
    isPhotoFilled: function (val) {
      this.updateSignIn();
    },
  },

  async mounted() {
    await this.getUsers();
    await this.getPositions();
    await this.getToken();

  },
};
</script>
