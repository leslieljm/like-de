<template>
  <div class="navbar">
    <!-- <hamburger :is-active="sidebar.opened" class="hamburger-container"  /> -->
    <img src="@/assets/common/logoone.png" alt="" class="logoImg">

    <!-- <breadcrumb class="breadcrumb-container" /> -->

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-row>
            <el-col :span="5" class="avatar">
              <img src="@/assets/common/user.png" class="user-avatar">
            </el-col>
            <el-col :span="14" class="user">
              <span>欢迎您，admin</span>
            </el-col>
            <el-col :span="5" class="logout">
              <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom">
                <div>
                  <span>退出</span>
                  <i class="el-icon-caret-bottom" />
                </div>
              </el-tooltip>
            </el-col>
          </el-row>
        </div>
        <!-- <div class="bottom">
          <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
            <span>退出</span>
            <i class="el-icon-caret-bottom" />
          </el-tooltip>
        </div> -->
        <!-- <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu> -->
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  width: 100%;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  /* background: #fff; */
  background-image: url('~@/assets/common/backgroundone.png');
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .logoImg {
    margin: 10px 0 0 15px;
    width: 88px;
  }

  /* .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  } */

  /* .breadcrumb-container {
    float: left;
  } */

  .right-menu {
    float: right;
    width: 240px;
    height: 100%;
    line-height: 60px;
    margin-right: 24px;
    color: #fff;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      font-size: 16px;
      color: #fff;
      // margin-right: 30px;

      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;

        .avatar {
          width: 48px;
        }

        .user {
          width: 140px;
          height: 60px;
        }

        .logout {
          /* clear: both;
          text-align: center; */
          width: 48px;
          height: 60px;
        }

        .user-avatar {
          cursor: pointer;
          vertical-align: middle;
          width: 35px;
          height: 35px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          font-size: 12px;
        }
      }
    }

    /* .bottom {
      clear: both;
      text-align: center;
    } */

    /* .item {
      margin: 4px;
    } */
  }
}
</style>
