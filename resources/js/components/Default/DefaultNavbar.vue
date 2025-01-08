<template>
  <div class="flex flex-col justify-start items-center w-full dark:bg-slate-800">
    <div class="container mx-auto flex flex-wrap items-center justify-between">
      <div class="left flex items-center">
        <router-link to="/">
          <img
            width="80"
            height="auto"
            src="https://archintel.com/wp-content/uploads/2019/10/archintel-logo.gif"
            class="header_logo header-logo"
            alt="ArchIntel™"
        /></router-link>
        <MainNav />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
