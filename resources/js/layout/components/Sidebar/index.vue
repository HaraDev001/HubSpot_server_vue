<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        mode="vertical"
      >
        <template
          v-for="route in routes"
        >
          <template v-if="route.path=='/client'">
            <sidebar-item
              v-if="current_step<5"
              :key="route.path"
              :item="route"
              :base-path="route.path"
            />
          </template>
          <template v-else-if="route.path=='/admin'">
            <sidebar-item
              v-if="current_step<5"
              :key="route.path"
              :item="route"
              :base-path="route.path"
            />
          </template>
          <template v-else>
            <sidebar-item
              v-if="current_step>4"
              :key="route.path"
              :item="route"
              :base-path="route.path"
            />
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';
import Logo from './Logo';
import variables from '@/styles/variables.scss';
import checkRole from '@/utils/role';

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(['customer', 'sidebar', 'permission_routers']),
    routes() {
      let routes = this.$store.state.permission.routes;
      routes = routes.filter(route => {
        if (this.checkRole(['admin']) === true && route.path === '/client') {
          return false;
        }
        if (this.checkRole(['client']) === true && route.path === '/admin') {
          return false;
        }
        return true;
      });
      // return this.$store.state.permission.routes;
      return routes;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
    current_step() {
      return this.$store.state.clientView.setUpEnvironmentStep || (this.customer && this.customer.current_step || 0);
    },
  },
  watch: {
    current_step(){
      console.log(this.current_step);
    },
  },
  methods: {
    checkRole,
  },
};
</script>
