<template>
  <main>
    <nav-bar></nav-bar>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </main>
</template>

<script>
import navBar from "../components/ui/nav/nav";
export default {
  name: "layout",
  components: { navBar }
};
</script>
<style>
.fade-enter-active {
  animation: fade-in 200ms ease-out forwards;
}
.fade-leave-active {
  animation: fade-out 200ms ease-out forwards;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
