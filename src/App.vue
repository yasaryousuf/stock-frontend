<template>
  <v-app id="inspire">
    <custom-nav :drawer="drawer" />
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <transition name="slide-fade">
        <router-view></router-view>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import CustomNav from "./components/nav/CustomNav";
export default {
  components: {
    CustomNav,
  },
  data: () => ({
    drawer: null,
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard" },
      { title: "Photos", icon: "mdi-image" },
      { title: "About", icon: "mdi-help-box" },
    ],
    right: null,
  }),
};
</script>


<style>
/* .slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
} */
.slide-fade-enter-active {
  transition: transform 0.3s cubic-bezier(1, 0.5, 0.8, 1),
    color 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-leave-active {
  transition: transform 1s cubic-bezier(1, 0.5, 0.8, 1),
    color 1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter {
  color: mediumblue;
  transform: translateY(20px);
}
.slide-fade-leave-to {
  transform: translateX(100px);
  color: cyan;
}
</style>