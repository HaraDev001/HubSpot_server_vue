<template>
  <div class="component-container">
    <div class="header">
      PAYMENT
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

export default {
  name: 'AdminAppSetting',
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
    };
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
