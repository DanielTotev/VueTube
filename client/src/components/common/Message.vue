<template>
    <div v-if="text" :class="messageStyle">
      {{ text }}
    </div>
</template>

<script>
export default {
  name: 'message',
  props: {
    text: {
      type: String,
    },
    messageStyle: {
      type: String,
    }
  }
}
</script>

<style scoped>
  div {
    text-align: center;
  }
</style>
