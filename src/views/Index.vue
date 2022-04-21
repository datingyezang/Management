<template>
  <div id="index">
    <el-container>
      <el-aside>
        <div class="logo">
          <img src="../assets/logo.png" alt="">
          <span>后台管理</span>
        </div>

        <el-menu v-for="item in menuData" :key="item.path" :default-active="menuIndex" @select="handleSelect" :collapse="isCollapse">
          <el-menu-item :index="item.path + ''" v-if="item.children.length === 0">
            <i v-show="item.path == menuIndex" class="activeBar"></i>
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
          <el-submenu v-if="item.children.length > 0" :index="item.path + ''">
            <template slot="title">
              <i v-show="item.path == menuIndex" class="activeBar"></i>
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <el-menu-item-group>

              <el-menu-item v-for="it in item.children" :key="it.id" :index="it.path + ''">
                <i v-show="it.path == menuIndex" class="activeBar"></i>
                <i :class="it.icon"></i>
                <span slot="title">{{it.name}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data(){
    return {
      isCollapse: false,     //折叠
      menuIndex: '/HomePage/Home', //路径
      menuData: [
        {
          id: 1,
          name: '首页',
          index: '1',
          icon: 'el-icon-house',
          path: '/HomePage/Home',
          children: []
        },
        {
          id: 2,
          name: '系统管理',
          index: '2',
          icon: 'el-icon-setting',
          children: [
            {
              id: 3,
              name: '用户管理',
              index: '3',
              icon: 'el-icon-user',
              path: '/HomePage/User'
            },
            {
              id: 4,
              name: '角色管理',
              index: '4',
              icon: 'el-icon-film',
              path: '/HomePage/Role'
            }
          ]
        }
      ],//侧边栏数据
    }
  }
}
</script>
<style lang="scss">
#index{
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0px;
  .el-container{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 0;
    margin: 0px;
    .el-aside{
      width: 293px;
      height: 100%;
      background-color: #ffffff;
      box-shadow: 3px 4px 10px 0px
      rgba(213, 225, 239, 0.5);

      .logo{
        margin-top: 18px;
        img{
          width:91px;
          height: 91px;
          background-color: #e6edf5;
          border-radius: 50px 50px;
        }
        span{
          display: block;
          font-family: FZLTZHK--GBK1-0;
          font-size: 20px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 2px;
          color: #232549;
        }
      }
    }
    .el-header{
      height:115px;
      background-color: #3ca0ec;
    }
  }
}
</style>
