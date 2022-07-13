<template>
  <div class="discuss-container">
    <el-button style="margin-top: 12px;width: 180px; height: 35px;" type="info">Download Setup Guide</el-button>
    <div class="action">
      <el-button style="margin-top: 12px; width: 180px; height: 35px;" type="info" plain @click="previous">Prev</el-button>
      <el-button style="margin-top: 12px; margin-left: 10px; width: 180px; height: 35px;" type="info" @click="next">Next</el-button>
    </div>
  </div>
</template>

<script src="https://js.pusher.com/7.0/pusher.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
import { fetchMessages, sendMessage } from '@/api/message';
import ChatWindow from 'vue-advanced-chat';
import 'vue-advanced-chat/dist/vue-advanced-chat.css';

export default {
  components: {
    ChatWindow,
  },
  data() {
    return {
      rooms: [
        {
          roomId: 1,
          roomName: 'Discuss',
          avatar: 'assets/imgs/people.png',
          unreadCount: 4,
          lastMessage: {
            content: 'Last message received',
            sender_id: 'user',
            username: 'John Doe',
            timestamp: '10:20',
            date: 123242424,
            saved: true,
            distributed: false,
            seen: false,
            new: true,
          },
          users: [
            {
              _id: 'user',
              username: 'user',
              avatar: 'assets/imgs/doe.png',
              status: {
                state: 'online',
                last_changed: 'today, 14:30',
              },
            },
          ],
        },
      ],
      messageActions: [],
      messages: [],
      currentUserId: 1234,
      currentMessageId: 7891,
    };
  },
  created() {
    this.getMessages();
    this.subscribe();
  },
  computed: {
    userId() {
      return this.$store.state.user.id;
    },
  },
  methods: {
    subscribe() {
      var pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
        cluster: process.env.MIX_PUSHER_APP_CLUSTER
      });
      var channel = pusher.subscribe('chat');
      channel.bind('MessageSent', function(message) {
        if ((message.user_id * 1) === (this.userId * 1 )) {
          const date = message.created_at.split('T')[0];
          const timeStamp = message.created_at.split('T')[1].split('.')[0];
          let sender;
          if (message.sender === 'user') {
            sender = 1234;
          } else {
            sender = message.sender;
          }
          this.messages = [...this.messages, {
            _id: message.id,
            content: message.message,
            sender_id: sender,
            username: 'John Doe',
            date: date,
            timestamp: timeStamp,
            system: false,
            saved: false,
            distributed: false,
            seen: true,
            disable_actions: true,
            disable_reactions: true,
            file: null,
            reactions: {
            },
          }];
        }
      }, this);
    },
    async getMessages() {
      const messages = await fetchMessages();
      messages.map(message => {
        const date = message.created_at.split('T')[0];
        const timeStamp = message.created_at.split('T')[1].split('.')[0];
        let sender;
        if (message.sender === 'user') {
          sender = 1234;
        } else {
          sender = message.sender;
        }
        this.messages = [...this.messages, {
          _id: message.id,
          content: message.message,
          sender_id: sender,
          username: 'John Doe',
          date: date,
          timestamp: timeStamp,
          system: false,
          saved: false,
          distributed: false,
          seen: true,
          disable_actions: true,
          disable_reactions: true,
          file: null,
          reactions: {
          },
        }];
      });
    },
    previous() {
      let currentTabStep = this.$store.state.clientView.setUpEnvironmentStep;
      currentTabStep = currentTabStep - 1;
      const params = {
        user_id: this.userId,
        current_step: currentTabStep,
      };
      axios.post('api/customer/setup-done', params).then(() => {
        this.$store.dispatch('clientView/setEnvironmentSetupStep', currentTabStep);
      });
    },
    next() {
      let currentTabStep = this.$store.state.clientView.setUpEnvironmentStep;
      currentTabStep = currentTabStep + 1;
      const params = {
        user_id: this.userId,
        current_step: currentTabStep,
      };
      axios.post('api/customer/setup-done', params).then(() => {
        this.$store.dispatch('clientView/setEnvironmentSetupStep', currentTabStep);
      });
    },
    async sendMessage({ roomId, content, file, replyMessage }) {
      const response = await sendMessage({ 'message': content, 'sender': 'user' });
    },
    editMessage({ roomId, messageId, newContent, file, replyMessage }) {
      const index = this.messages.findIndex(message => message._id === messageId);
      this.messages[index] = {
        _id: this.messages[index]._id,
        content: newContent,
        sender_id: 1234,
        username: 'John Doe',
        date: this.messages[index].dateString,
        timestamp: this.messages[index].timeStamp,
        system: false,
        saved: true,
        distributed: true,
        seen: true,
        disable_actions: false,
        disable_reactions: true,
        file: file,
        reactions: {
        },
      };
    },
    deleteMessage({ roomId, messageId }) {
      this.messages = this.messages.filter(message => message._id !== messageId);
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .discuss-container {

    padding: 50px 60px 0px;
    .action {
      padding-bottom: 50px;
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
    }
  }
</style>
