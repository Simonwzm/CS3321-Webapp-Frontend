<template>
  <div id="mainp" class="relative min-h-screen flex flex-col justify-between z-0" style="width: 100vw;">
    <header class="flex justify-between items-center p-4  bg-white text-gray-800 z-10 bg-opacity-70">
      <a href="#" class="text-lg font-semibold hover:text-gray-600">Go to main</a>
      <a href="#" class="text-lg font-semibold hover:text-gray-600">login/register</a>
    </header>

    <main class="flex-grow flex items-center justify-center z-0">
      <div class="wrapper1 w-2/3 -mt-32">
        <div class="text-center w-full">
          <!-- <h1 class="text-6xl font-bold mb-6">Course Stack</h1> -->
          <img src="../assets/mainpageup.png" alt="" class="csst w-full">
          <div class="flex justify-center items-center w-full">
            <div class="relative w-full">
              <input class="border-2 border-gray-300 rounded-full py-3 pl-6 pr-12 w-3/5 mt-6" type="search" placeholder="Search"  v-model="message" @keyup.enter="submitValue">
              <button class="absolute right-0 top-0 mt-2 mr-4">
                <i class="fas fa-search text-gray-500"></i>
              </button>
            </div>
          </div>
          <p class="text-gray-600 italic mt-6 font-serif font-bold text-2xl ">— Your Sincere Teaching/Learning Assistant —</p>
        </div>
      </div>
    </main>

    <footer class="p-4">
      <div class="flex justify-end">
        <div class="bg-white p-3 rounded-full shadow-lg text-sm">
          Keep Thinking!
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  // Here you can include your Vue component's data, methods, etc.
    data() {
      return {
        message: ''
      }
    },
    methods: {
      submitValue() {
        console.log(this.message)
        this.$router.push({ name: 'SearchPage', params: { init_message: this.message } });

      }
    }
};
</script>

<style scoped>
body {
  font-family: 'Open Sans', sans-serif;
}

#mainp {
  /* background-image: url('https://placehold.co/1366x768?text=Background+Image+Placeholder'); */
  background-image: url('../assets/mibaibg.png');
  background-size: cover;
  background-position: center;

}
</style>
