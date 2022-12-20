<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted, nextTick } from "vue";
import "../components/Button/button.scss";
import "@/style/index.scss";
import defaultPhoto from "@/assets/nocard1.png";
import Button from "../components/Button/Button.vue";
import Spiner from "../components/Spiner/Spiner.vue";

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
        <Button text="Users" />
        <Button text="Sign up" />
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
      <Button text="Sign up" class="first__btn" />
    </section>

    <section class="container main">
      <h2 class="main__title">Working with GET request</h2>
      <div class="main__cards">
        <div class="main__card" v-for="user in users">
          <img
            class="main__img"
            :src="user.photo"
            alt=""
            @error="imageUrlAlt"
          />
          <p class="main__name">
            {{ truncate(user.name ?? "Unknown User", 20) }}
          </p>
          <p class="main__job">
            {{ truncate(user.position ?? "No Position", 20) }}
          </p>
          <p class="main__mail">{{ truncate(user.email ?? "No email", 20) }}</p>
          <p class="main__num">{{ truncate(user.phone ?? "No phone", 20) }}</p>
        </div>
      </div>
      <Spiner class="spiner" />
      <Button
        text="Show more"
        class="main__btn"
        @click="onShowMoreTap()"
        v-show="showMore"
      />
    </section>
    <section class="contacts container">
      <div class="contacts__wrapper">
        <h2 class="contacts__title">Working with POST request</h2>

        <Form class="contacts__forms" @submit="onSubmit">
          <div>
            <Field
              class="contacts__inp"
              type="text"
              name="name"
              placeholder="Your name"
              :rules="validateName"
            />
            <ErrorMessage name="name" />
          </div>
          <div>
            <Field
              class="contacts__inp-invalid"
              type="email"
              name="email"
              placeholder="Email"
              :rules="validateEmail"
            />
            <ErrorMessage name="email" />
          </div>
          <div>
            <Field
              class="contacts__inp"
              type="text"
              name="phone"
              placeholder="Phone"
              :rules="validatePhone"
            />
            <label for="phone" class="contacts__forms__num-label"
              >+38 (XXX) XXX - XX - XX</label
            ><br />
            <ErrorMessage name="phone" />
          </div>
          <div class="contacts__radio">
            <p class="contacts__name">Select your position</p>
            <label v-for="position in positions" :key="position">
              <Field
                type="radio"
                :value="position.id"
                class="contacts__inputs-radio"
                :rules="validatePosition"
                name="position"
              />
              {{ position.name }}
            </label>
            <ErrorMessage name="position" />
          </div>
          <div class="contacts__photo">
            <label class="input-file">
              <span class="input-file-btn">Upload</span>
              <span class="input-file-text" type="text">{{ photoText }}</span>
              <ErrorMessage name="photo" />
              <Field type="file" name="photo" :rules="validatePhoto" />
            </label>
          </div>
          <Button text="Sign up" disabled/>
          <!-- <router-link to="/about" class="router"> <Button text="Sign up"/></router-link> -->
          <!-- <img class="spiner" src="../assets/spiner.svg" alt=""> -->
        </Form>
      <div class="about">
    <h1 class="about__title">User successfully registered</h1>
    <img class="about__img" src="../assets/success.png" alt="Success registration">
  </div>
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
    };
  },

  methods: {
    onSubmit(values) {
      Users.postUser(values, localStorage.getItem("token")).then((response) => {
        this.goToSuccess();
      });
    },

    validateName(value) {
      if (!value) {
        return "This field is required";
      }

      if (value.length < 2 || value.length > 60) {
        return "The name must be 2-60 characters long";
      }

      return true;
    },

    validateEmail(value) {
      if (!value) {
        return "This field is required";
      }

      if (value.slice(-3) == ".ru") {
        return "Геть з України, москаль некрасівий!";
      }

      const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
      if (!regex.test(value)) {
        return "This field must be a valid email";
      }

      return true;
    },

    validatePhone(value) {
      if (!value) {
        return "This field is required";
      }

      const regex = /[+]{1}[3]{1}[8]{1}[0]{1}[0-9]{9}/;
      if (!regex.test(value)) {
        return "The phone number should start with the code of Ukraine";
      }

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
        return "This field is required";
      }

      if (!(value.type == "image/jpeg" || value.type == "image/jpg")) {
        return "The photo should be jpg/jpeg image";
      }

      let maxSize = 5242880;
      if (value.size > maxSize) {
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

      if (!this.photoResolutionIsValid) {
        return "The image resolution must be at least 70x70px";
      }
      this.photoText = value.name;

      return true;
    },

    async getUsers() {
      Users.getUsers(this.page, this.count)
        .then((response) => {
          this.users = this.users.concat(response.data.users);
          this.showMore = this.users.length < response.data.total_users;
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
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

    goToSuccess() {
      this.$router.push("/about");
    },

    imageUrlAlt(event) {
      event.target.src = "@/assets/nocard1.png"; // https://prohvost.club/wp-content/uploads/2018/05/britanskaya-shinshilla-700x329.jpg
    },
  },

  async mounted() {
    await this.getUsers();
    await this.getPositions();
    await this.getToken();
  },
};
</script>
