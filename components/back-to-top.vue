<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isVisible = ref(false);

const checkScroll = () => {
  if (typeof window !== 'undefined') {
    isVisible.value = window.scrollY > 300;
  }
};

const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>

<template>
  <Transition name="fade-slide">
    <button
      v-if="isVisible"
      type="button"
      class="back-to-top-btn"
      aria-label="Back to top"
      title="Back to top"
      @click="scrollToTop"
    >
      <svg
        class="arrow-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.back-to-top-btn {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 999;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #f9ba00;
  color: #ffffff;
  border: 2px solid #ffffff;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0;
}

.back-to-top-btn:hover {
  background-color: #717070;
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.back-to-top-btn:active {
  transform: translateY(-1px);
}

.back-to-top-btn:focus-visible {
  outline: 3px solid #f9ba00;
  outline-offset: 3px;
}

.arrow-icon {
  width: 24px;
  height: 24px;
  display: block;
}

/* Transition animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(16px);
}

@media (max-width: 768px) {
  .back-to-top-btn {
    bottom: 20px;
    right: 20px;
    width: 44px;
    height: 44px;
  }

  .arrow-icon {
    width: 22px;
    height: 22px;
  }
}
</style>
