<template>
  <n-layout-footer>
    <n-p>
     Made with ♥ by <n-a href="https://github.com/fatimacangialosi/dashboard-fearless">Fatima Cangialosi</n-a>
      the
    </n-p>
    <n-p>&copy; {{ new Date().getFullYear() }} All rights reserved.</n-p>
  </n-layout-footer>
</template>

<style scoped>
.n-layout-footer {
  opacity: 0.6;
  padding: 20px;
  text-align: center;
}
.n-a {
  text-decoration: none;
}
</style>
