<template>
  <nav class="w-full bg-white dark:bg-slate-900 border-gray-200 px-2 sm:px-4 py-2.5">
    <div class="container mx-auto flex flex-wrap items-center justify-between">
      <router-link to="/">
        <img
          width="80"
          height="auto"
          src="https://archintel.com/wp-content/uploads/2019/10/archintel-logo.gif"
          class="header_logo header-logo"
          alt="ArchIntel™"
      /></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-mobile" id="navbarNav">
        <ul class="navbar-nav flex flex-row items-center justify-between gap-2">
          <li class="nav-item">
            <router-link class="nav-link active:bg-red-500" active-class="active" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active:bg-red-500" active-class="active" to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active:bg-red-500" active-class="active" to="/register">Register</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup></script>

<style lang="scss" scoped></style>
