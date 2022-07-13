<template>
  <div class="discuss-container">
    <div class="header">
      MIGUEL PEREIRA
    </div>
    <div class="status">
      STATUS: ON STEP 4 - PAYMENT SETTING UP
    </div>
    <div class="content">
      <div class="discuss">
        <chat-window
          :current-user-id="currentUserId"
          :rooms="rooms"
          :messages="messages"
          :single-room="false"
          :messages-loaded="messagesLoaded"
          :loading-rooms="loadingRooms"
          :rooms-loaded="true"
          :message-actions="messageActions"
          :show-audio="false"
          :show-files="false"
          :show-add-room="false"
          @typing-message="typingMessage"
          @fetch-messages="fetchMessages"
          @send-message="sendMessage"
          @edit-message="editMessage"
          @delete-message="deleteMessage"
        />
      </div>
      <div class="action">
        <div>
          <el-button style="margin-top: 12px; width: 180px; height: 50px;" type="info">Send Guide</el-button>
        </div>
        <div>
          <el-button style="margin-top: 12px; width: 180px; height: 50px; text-align: middle;" type="info">Send CloudFormation<br>File</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="https://js.pusher.com/7.0/pusher.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
import ChatWindow from 'vue-advanced-chat';
import 'vue-advanced-chat/dist/vue-advanced-chat.css';
import { fetchMessagesByUserId, sendMessageToUser, getAllClients, setToReadedMessage, getNumberOfUnreadedMessages } from '@/api/message';
import Pusher from 'pusher-js';

export default {
  name: 'migel',
  e1: '#app',
  components: {
    ChatWindow,
  },
  data() {
    return {
      rooms: [],
      messageActions: [],
      messages: [],
      currentUserId: 1234,
      currentMessageId: 7891,
      messagesLoaded: true,
      roomId: 1,
      loadingRooms: false,
    };
  },
  created() {
    // this.getMessages();
    this.getUsers();
    this.subscribe();
  },
  methods: {
    subscribe() {
      var pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
        cluster: process.env.MIX_PUSHER_APP_CLUSTER
      });
      var channel = pusher.subscribe('chat');
      channel.bind('MessageSent', async function(message) {
        const date = message.created_at.split('T')[0];
        const timeStamp = message.created_at.split('T')[1].split('.')[0];
        let sender;
        if (message.sender === 'admin') {
          sender = 1234;
        } else {
          sender = message.sender;
          // increase number of unreaded messages.
          const index = this.rooms.findIndex(room => room.roomId == message.user_id);
          if (index > 0) {
            const updatedRoom = {...this.rooms[index], unreadCount: (this.rooms[index].unreadCount + 1)};
            this.rooms = this.rooms.map((room, i) => {
              if (i == index) {
                return updatedRoom;
              } else {
                return room;
              }
            })
          } else {
            //add new room if user is not registered
            const lastMessage = {
              content: message.message,
              sender_id: sender,
              username: message.sender,
              timestamp: timeStamp,
              date: date,
              saved: false,
              distributed: false,
              seen: false,
              new: true,
            };
            const users = await getAllClients();
            const index = users.findIndex(user => user.id === message.user_id)
            this.rooms = [...this.rooms, {
              roomId: message.user_id,
              roomName: users[index].name,
              avatar: 'assets/imgs/people.png',
              unreadCount: 1,
              lastMessage: lastMessage,
              users: [
                {
                  _id: 1234,
                  username: 'admin',
                  avatar: 'assets/imgs/doe.png',
                },
                {
                  _id: 4321,
                  username: 'user',
                  avatar: 'assets/imgs/snow.png',
                },
              ],
            }]
          }
        }
        if (message.user_id == this.roomId) {
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

        // update last message
        const lastMessage = {
          content: message.message,
          sender_id: sender,
          username: message.sender,
          timestamp: timeStamp,
          date: date,
          saved: false,
          distributed: false,
          seen: false,
          new: true,
        };
        const index = this.rooms.findIndex(room => room.roomId == message.user_id);
        const updatedRoom = {...this.rooms[index], lastMessage: lastMessage};
        this.rooms = this.rooms.map((room, i) => {
          if (i == index) {
            return updatedRoom;
          } else {
            return room;
          }
        })
      }, this);
    },
    async getUsers() {
      this.loadingRooms = true;
      const users = await getAllClients();
      this.rooms = [];
      users.map(async(user, index) => {
        const numberOfUnreadedMessages = await getNumberOfUnreadedMessages({'type': 'admin', 'room_id': user.id});
        const messages = await fetchMessagesByUserId({ 'user_id': user.id });
        let lastMessage = {};
        if(messages.length > 0) {
          const date = messages[messages.length - 1].created_at.split('T')[0];
          const timeStamp = messages[messages.length - 1].created_at.split('T')[1].split('.')[0];
          lastMessage = {
            content: messages[messages.length - 1].message,
            sender_id: messages[messages.length - 1].user_id,
            username: messages[messages.length - 1].user_id,
            timestamp: timeStamp,
            date: date,
            saved: false,
            distributed: false,
            seen: false,
            new: true,
          };
          this.rooms = [...this.rooms, {
            roomId: user.id,
            roomName: user.name,
            avatar: 'assets/imgs/people.png',
            unreadCount: numberOfUnreadedMessages,
            lastMessage: lastMessage,
            users: [
              {
                _id: 1234,
                username: 'admin',
                avatar: 'assets/imgs/doe.png',
              },
              {
                _id: 4321,
                username: 'user',
                avatar: 'assets/imgs/snow.png',
              },
            ],
          }];
        }
      })
      setTimeout(() => {
        this.loadingRooms = false;
      }, 1000)
    },
    async getMessages() {
      this.messagesLoaded = false;
      const messages = await fetchMessagesByUserId({ 'user_id': this.roomId });
      this.messages = [];
      messages.map(message => {
        const date = message.created_at.split('T')[0];
        const timeStamp = message.created_at.split('T')[1].split('.')[0];
        let sender;
        if (message.sender === 'admin') {
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
        this.messagesLoaded = true;
      });
    },
    fetchMessages(room, options) {
      this.roomId = room.room.roomId;
      this.getMessages();
      this.messagesLoaded = true;
    },
    typingMessage(message, roomId) {
      this.setToReadedMessage(this.roomId);
    },
    setToReadedMessage(roomId) {
      const roomIndex = this.rooms.findIndex(room => room.roomId == roomId);
      if(roomIndex >= 0 && this.rooms[roomIndex].unreadCount !== 0) {
        // set to readed on server
        setToReadedMessage({ 'room_id': roomId, 'type': 'admin' });
        //set to unreaded on frontend
        const index = this.rooms.findIndex(room => room.roomId == roomId);
        const updatedRoom = {...this.rooms[index], unreadCount: 0};
        this.rooms = this.rooms.map((room, i) => {
          if (i == index) {
            return updatedRoom;
          } else {
            return room;
          }
        })
      }
    },
    async sendMessage({ roomId, content, file, replyMessage }) {
      const response = await sendMessageToUser({ 'message': content, 'user_id': this.roomId, 'sender': 'admin' });
      this.setToReadedMessage(roomId);
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
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 50px;
    .header {
      padding-bottom: 10px;
      font-size: 20px;
      color: gray;
      border-bottom: 1px solid rgb(229, 229, 229);
    }
    .status {
      margin-top: 10px;
      margin-bottom: 20px;
      font-size: 18px;
      color: gray;
    }
    .content {
      display: flex;
      margin-bottom: 20px;
      .discuss {
        width: 80%;
      }
      .action {
        width: 20%;
        margin-top: 50px;
        margin-left: 50px;
      }
    }
  }
</style>
