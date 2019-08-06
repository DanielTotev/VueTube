const messageStyles = {
  error: 'alert alert-danger',
  success: 'alert alert-success'
};


export const messagingSetUp = {
  data() {
    return {
      message: {
        text: null,
        style: null
      }
    }
  },
  methods: {
    clearMessageState() {
      setTimeout(() => {
        this.message.text = null;
        this.message.style = null;
      }, 3000);
    },
    handleMessageShow({ type, text }) {
      console.log(text);
      console.log(type);
      this.message.text = text;
      this.message.style = messageStyles[type];
      this.clearMessageState();
    },
  }
};

export const notify = {
  methods: {
    showNotification(type, text) {
      this.$emit('message-show', { text: text, type: type });
    }
  }
}