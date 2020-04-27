<template>
  <main>
    <h1>Auth</h1>
    <router-link to="login" class="check">Login</router-link>
    <router-link to="signup" class="check">Sign Up</router-link>
    <router-view></router-view>
  </main>
</template>

<script>
export default { name: "auth" };
</script>
