<template>
  <div class="component-container">
    <div class="header">
      Payment
    </div>
    <div class="action">
      <el-button v-if="subscriptionStatus=='3'" style="margin-left: 15px;" type="info" @click="ReSubscribe">ReSubscribe</el-button>
      <el-button v-if="subscriptionStatus=='2' || subscriptionStatus=='1'" style="margin-left: 15px;" type="info" @click="CancelSubscribe">Cancel Subscribe</el-button>
    </div>
    <div class="paymentHistory">
      <div class="header">
        <p class="text">PAYMENT HISTORY</p>
        <el-button type="info">Download PDF</el-button>
      </div>
      <div class="content">
        <el-table
          :data="tableData"
          style="width: 100%;"
        >
          <el-table-column
            prop="Amount"
            label="Amount"
            width="calc(33.33%)"
          />
          <el-table-column
            prop="Date"
            label="Date"
            width="calc(33.33%)"
          />
          <el-table-column
            prop="Actions"
            label="Actions"
          />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
  name: 'ClientAppSetting',
  data() {
    return {
      tableData: [{
        Amount: '80$',
        Date: 'December 10, 1815',
        Actions: 'Paid',
      }, {
        Amount: '80$',
        Date: 'December 10, 1815',
        Actions: 'Paid',
      }, {
        Amount: '80$',
        Date: 'December 10, 1815',
        Actions: 'Paid',
      }, {
        Amount: '80$',
        Date: 'December 10, 1815',
        Actions: 'Paid',
      }],
      subscriptionStatus: this.subscribeStatus,
    };
  },
  computed: {
    ...mapGetters([
      'userId',
      'subscribeStatus',
    ]),
  },
  created() {
    this.fetch();
  },
  methods: {
    CancelSubscribe(){
      const params = {
        user_id: this.userId,
      };
      axios.post('api/customer/cancel-subscription', params).then((res) => {
        this.subscriptionStatus = res.data.subscribe_status;
      });
    },
    ReSubscribe(){
      const params = {
        user_id: this.userId,
      };
      axios.post('api/customer/re-subscription', params).then((res) => {
        this.subscriptionStatus = res.data.subscribe_status;
      });
    },
    fetch() {
      this.subscriptionStatus = this.subscribeStatus;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .component-container {
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 50px;
    .header {
      padding-bottom: 10px;
      font-size: 20px;
      color: gray;
      border-bottom: 1px solid rgb(229, 229, 229);
    }
    .action {
      margin-top: 50px;
    }
    .paymentHistory {
      margin-top: 20px;
      .header {
        display: flex;
        justify-content: space-between;
        .text {
          font-size: 14px;
          color: rgb(107, 107, 107);
        }
      }
      .content {
        margin-top: 10px;
      }
    }
  }
</style>
