<template>
  <n-space vertical>
    <n-el>
      <n-progress
        type="multiple-circle"
        :stroke-width="6"
        :circle-gap="0.5"
        :percentage="[
          percentage,
          (percentage + 10) % 100,
          (percentage + 20) % 100,
          (percentage + 30) % 100
        ]"
        :color="[
          'var(--info-color)',
          'var(--success-color)',
          'var(--warning-color)',
          'var(--error-color)'
        ]"
        :rail-style="[
          { stroke: 'var(--info-color)', opacity: 0.3 },
          { stroke: 'var(--success-color)', opacity: 0.3 },
          { stroke: 'var(--warning-color)', opacity: 0.3 },
          { stroke: 'var(--error-color)', opacity: 0.3 }
        ]"
      >
        <div style="text-align: center ;font-weight:bold">
          MongoDB Functioning
        </div>
      </n-progress>
    </n-el>
    <!-- place holder mb-8 -->
    <n-space class="mb-8"> 
      <button ref="autoClickButton" @click="add" style="display: none">
        Add 10%
      </button>
      <n-button @click="minus" style="display: none">
        Minus 10%
      </n-button>
    </n-space>
  </n-space>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount  } from "vue";

export default defineComponent({
  setup() {
    const percentageRef = ref(0);
    const autoClickButton = ref(null);
    let intervalId = null; 

    const setRandomInterval = (callback) => {
      if (intervalId) {
        clearTimeout(intervalId);
      }
      // const randomInterval = Math.random() * 10 + 150; // Random interval between 100ms and 300ms
      const randomInterval =  150; // Random interval between 100ms and 300ms
      intervalId = setTimeout(callback, randomInterval);
    };

    const startAutoClick = () => {
      const clickButton = () => {
        autoClickButton.value.click();
        setRandomInterval(clickButton);
      };
      setRandomInterval(clickButton);
    };

    onMounted(() => {
      startAutoClick();
    });

    onBeforeUnmount(() => {
      clearTimeout(intervalId);
    });
    
    const add = () => {
      percentageRef.value += 10;
      if (percentageRef.value > 100) {
        percentageRef.value = 0;
      }
    };
    
    const minus = () => {
      percentageRef.value -= 10;
      if (percentageRef.value < 0) {
        percentageRef.value = 100;
      }
    };
    
    return {
      percentage: percentageRef,
      add,
      minus,
      autoClickButton,
    };
  }
});
</script>