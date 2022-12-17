<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted, nextTick } from 'vue';
import '../components/Button/button.scss'
import '@/style/index.scss'
import Button from '../components/Button/Button.vue'
</script>

<template>
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
<div class="main__card">
  <img class="main__img" src="@/assets/card1.jpg" alt="">
  <p class="main__name">Salvador Stewart Flynn Thomas...</p>
  <p class="main__job">Frontend Developer Frontend ...</p>
  <p class="main__mail">frontend_develop@gmail.com</p>
  <p class="main__num">+38 (098) 278 44 24</p>
</div>
<div class="main__card">
  <img class="main__img" src="@/assets/card2.jpg" alt="">
  <p class="main__name">Takamaru Ayako Jurrien</p>
  <p class="main__job">FLead Independent Director </p>
  <p class="main__mail">Takamuru@gmail.com</p>
  <p class="main__num">+38 (098) 278 90 24</p>
</div>
<div class="main__card">
  <img class="main__img" src="@/assets/card3.jpg" alt="">
  <p class="main__name">Ilya</p>
  <p class="main__job">Co-Founder and CEO</p>
  <p class="main__mail">Ilya_founder@gmail.com</p>
  <p class="main__num">+38 (098) 235 44 24</p>
</div>
<div class="main__card">
  <img class="main__img" src="@/assets/card1.jpg" alt="">
  <p class="main__name">Salvador Stewart Flynn Thomas...</p>
  <p class="main__job">Frontend Developer Frontend ...</p>
  <p class="main__mail">frontend_develop@gmail.com</p>
  <p class="main__num">+38 (098) 278 44 24</p>
</div>
<div class="main__card">
  <img class="main__img" src="@/assets/card1.jpg" alt="">
  <p class="main__name">Salvador Stewart Flynn Thomas...</p>
  <p class="main__job">Frontend Developer Frontend ...</p>
  <p class="main__mail">frontend_develop@gmail.com</p>
  <p class="main__num">+38 (098) 278 44 24</p>
</div>
<div class="main__card">
  <img class="main__img" src="@/assets/card1.jpg" alt="">
  <p class="main__name">Salvador Stewart Flynn Thomas...</p>
  <p class="main__job">Frontend Developer Frontend ...</p>
  <p class="main__mail">frontend_develop@gmail.com</p>
  <p class="main__num">+38 (098) 278 44 24</p>
</div>

</div>
<Button text="Sign up" class="main__btn"/>
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
</template>


