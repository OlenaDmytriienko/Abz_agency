<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted, nextTick } from 'vue';
import '../components/Button/button.scss'
import '@/style/index.scss'
import Button from '../components/Button/Button.vue'
</script>

<template>
<div class="page__wrapper">
<header class="header">
<div class="header__logo">
  <img src="@/assets/logo.svg" alt="">
  <img src="@/assets/logo1.png" alt="">
</div>
<div class="header__btns">
 <Button text="Users" />
 <Button text="Sign up" />
</div>
</header>

<section class="first"> 
<div class="box">
<h1 class="box__title">Test assignment for front-end developer</h1>
<p class="box__text">What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
</div>
<Button text="Sign up" class="first__btn"/>
</section>

<section class="container main">
<h2 class="main__title">Working with GET request</h2>
<div class="main__cards">
<div class="main__card" v-for="n in users?.length ?? 0">
  <img class="main__img" :src="users[n-1].photo ?? ''" alt="">
  <p class="main__name">{{truncate(users[n-1].name ?? '', 20 )}}</p>
  <p class="main__job">{{truncate(users[n-1].position ?? '', 20 )}}</p>
  <p class="main__mail">{{truncate(users[n-1].email ?? '', 20 )}}</p>
  <p class="main__num">{{truncate(users[n-1].phone ?? '', 20 )}}</p>
</div>

</div>
<Button text="Show more" class="main__btn" @click="onShowMoreTap()" v-show="showMore"/>
</section>
<section class="contacts container">
<div class="contacts__wrapper">
<h2 class="contacts__title">Working with POST request</h2>
<form class="contacts__forms ">
<div>
    <input class="contacts__inp" type="text" placeholder="Your name">
    </div>
  <div>
    <input class="contacts__inp" type="text" placeholder="Email">
    </div>
   <div class="contacts__forms__num">
    <input id="number" class="contacts__inp" type="number" placeholder="Phone">
    <label for="number" class="contacts__forms__num-label">+38 (XXX) XXX - XX - XX</label>
    </div>
            <div class="contacts__radio">
          <p class="contacts__name">Select your position</p>
          <div class="contacts__inputs">
            <label><input class="contacts__inputs-radio" type="radio" name="radio1"> Frontend developer</label>
            <label><input class="contacts__inputs-radio" type="radio" name="radio1" > Backend developer</label>
            <label><input class="contacts__inputs-radio" type="radio" name="radio1"> Designer</label>
            <label><input class="contacts__inputs-radio" type="radio" name="radio1"> QA</label>
        </div></div>


<div class="contacts__photo">
  	<label class="input-file">
       	<span class="input-file-btn">Upload</span>
      	<span class="input-file-text" type="text">Upload your photo</span>
        <input type="file" name="file"> 
 	</label>
  <!-- <label for=""><span>Upload</span><input class="contacts__photo__upload" type="file" placeholder="Upload" name="photo"></label>
  <input class="contacts__photo__upload-disabled" type="text" placeholder="Upload your photo"> -->

</div>
</form>

<Button text="Sign up" disabled/>
        </div>
</section>
</div>
</template>

<script>
export default {
  name: 'App',
 data () {
    return {
        api: 'https://frontend-test-assignment-api.abz.agency/api/v1',
        headers: {'Content-Type': 'application/json', 'access_token':'wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu'},
        users: [],
        token: "eyJpdiI6Im9mV1NTMlFZQTlJeWlLQ3liVks1MGc9PSIsInZhbHVlIjoiRTJBbUR4dHp1dWJ3ekQ4bG85WVZya3ZpRGlMQ0g5ZHk4M05UNUY4Rmd3eFM3czc2UDRBR0E4SDR5WXlVTG5DUDdSRTJTMU1KQ2lUQmVZYXZZOHJJUVE9PSIsIm1hYyI6ImE5YmNiODljZjMzMTdmMDc4NjEwN2RjZTVkNzBmMWI0ZDQyN2YzODI5YjQxMzE4MWY0MmY0ZTQ1OGY4NTkyNWQifQ==",
        tokenString: '&token',
        page: 1,
        pageString: '&page=',
        count: 6,
        countString: '&count=',
        showMore: true,
    }
  },
  methods: {
       async requestTo(api, keepObjects) {
      try {
        const response = await fetch(api, {
          method: 'GET',
          // headers: this.headers,
        }).then(this.checkStatus)
            .then(this.parseJSON);
            console.log(response);
          if (keepObjects == true){
            this.users = this.users.concat(response.users)
          } else {
            this.users = response.users
          } 
            this.showMore = this.users.length < response.total_users
            console.log(this.users.length);
            console.log(response);
      }
       catch (error) {
        this.error = error
      }
    },
     checkStatus: function (resp) {
      if (resp.status >= 200 && resp.status < 300) {
        return resp;
      }
      return this.parseJSON(resp).then((resp) => {
        throw resp;
      });
    },
    parseJSON: function (resp) {
      return (resp.json ? resp.json() : resp);
    },
    checkStatus: function (resp) {
      if (resp.status >= 200 && resp.status < 300) {
        return resp;
      }
      return this.parseJSON(resp).then((resp) => {
        throw resp;
      });
    },
async onShowMoreTap(){
  this.page++
  let apiRequest = this.api + '/users?' + this.pageString + this.page + this.countString + this.count
  await this.requestTo(apiRequest, true) // + this.pageString + this.page.toString())
},
truncate(content, length){
      return content.length > length ? content.slice(0, length) + '...' : content;
}
  },

  async mounted () {
    let apiRequest = this.api + '/users?' + this.pageString + this.page + this.countString + this.count
    await this.requestTo(apiRequest, false)
  },
  
  goToAbout(){
    this.$router.push('/about')
  }
}
</script>
