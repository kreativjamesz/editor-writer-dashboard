<template>
  <nav class="w-full bg-white dark:bg-zinc-900 border-gray-200 px-2 sm:px-4 py-2.5">
    <div class="container mx-auto flex flex-wrap items-center justify-between">
      <router-link to="/"> <Logo class="header-logo" /></router-link>
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
    </div>
  </nav>
</template>

<script setup></script>

<style lang="scss" scoped></style>
