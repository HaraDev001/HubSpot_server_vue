<template>
  <div class="payment-container">
    <div class="container">
      <div class="notify">
        <div>
          Please subscribe to the Monthly Payment option
        </div>
        <div>
          Payment 80$/h
        </div>
        <stripe-checkout
          ref="checkoutRef"
          mode="subscription"
          :pk="publishableKey"
          :line-items="lineItems"
          :success-url="successURL"
          :cancel-url="cancelURL"
          @loading="v => loading = v"
        />
        <el-button v-if="status!=1" style="margin-top: 20px;" type="info" @click="submit">Subscribe with Stripe</el-button>
        <el-button v-if="status==1" style="margin-top: 20px;" type="info">You are subscribed</el-button>
      </div>
    </div>
    <div class="footer">
      <el-button style="margin-top: 12px; width: 180px; height: 35px;" type="info" plain @click="previous">Prev</el-button>
      <el-button style="margin-top: 12px; margin-left: 10px; width: 180px; height: 35px;" type="info" @click="next">Next</el-button>
    </div>
  </div>
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import { mapGetters } from 'vuex';
import axios from 'axios';
export default {
  components: {
    StripeCheckout,
  },
  data() {
    this.publishableKey = process.env.MIX_STRIPE_PUBLIC_KEY;
    return {
      loading: false,
      lineItems: [
        {
          price: process.env.MIX_STRIPE_PRICE_ID, // The id of the recurring price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      successURL: this.$route.query.page,
      cancelURL: this.$route.query.page,
      status: '',
    };
  },
  computed: {
    ...mapGetters(['customer']),
    userId() {
      return this.$store.state.user.id;
    },
  },
  created() {
    this.fetch();
  },
  methods: {
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
    submit() {
      // You will be redirected to Stripe's secure checkout page
      const params = {
        user_id: this.userId,
      };
      axios.post('api/customer/create-subscription', params).then((response) => {
        if (response.data.status === 'success'){
          this.fetch();
          this.$refs.checkoutRef.redirectToCheckout();
        }
      });
    },
    fetch() {
      const params = {
        user_id: this.userId,
      };
      axios.post('api/customer/get-subscription', params).then((response) => {
        if (response.data.status === 'success') {
          this.status = response.data.subscribe_status;
        } else {
          this.status = 0;
        }
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .payment-container {
    padding-left: 50px;
    padding-right: 50px;
    .container {
      height: calc(100vh - 270px);
      .notify {
        padding-top: 50px;
        font-size: 14px;
      }
    }
    .footer {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
