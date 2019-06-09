<template>
<el-container>
  <el-header>
<!--    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router="true">-->
<!--      <el-menu-item index="/">首页</el-menu-item>-->
<!--      <el-menu-item index="/view">查看图片</el-menu-item>-->
<!--      <el-menu-item index="4">关于我们</el-menu-item>-->
<!--    </el-menu>-->
    <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" router="true">
      <el-menu-item v-if="isLogout" index="/login"><i class="el-icon-share"></i>用户登录</el-menu-item>
      <el-submenu v-if="isLogin">
        <template slot="title"><span class="submenu-title"><i class="el-icon-user-solid"></i>{{username}}</span></template>
        <el-menu-item  @click="Logout">退出</el-menu-item>
      </el-submenu>
      <el-menu-item index="/view"><i class="el-icon-edit"></i>预览图片</el-menu-item>
      <el-menu-item index="/"><i class="el-icon-delete"></i>项目介绍</el-menu-item>
      <!-- <el-button @click="func">点击</el-button> -->
    </el-menu>
  </el-header>
  <el-main>
      <router-view/>
  </el-main>
</el-container>
</template>


<script>
import $backend from '../backend'
import axios from 'axios'
import { constants } from 'fs';
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      isLogin: false,
      isLogout: true,
      username: '',
    }
  },
  methods: {
    Logout(){
      const that = this
      const path="http://127.0.0.1:5000/api/user/logout"
      axios.get(path).then(function (response) {
        if(response.data.status === 'Success'){
          that.$router.push({path: '/'})
        }
      })
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    getLoginInfo () {
      $backend.getLoginInfo()
        .then(res => {
          this.isLogin = res['isLogin']
          this.isLogout = !this.isLogin
          // console.log(this.isLogin)
          if(this.isLogin){
            this.username = "Hello,"+res['user']
          }
          else{
            this.username = "用户登录"
          }
          // console.log(this.username)
        })
    },
    getdata () {
      if(this.isLogin){
        $backend.getLoginInfo()
          .then(res => {
            this.username = "Hello," + res['user']
          })
      }
      else{
        this.username = '用户登录'
      }
    },
  },
  mounted () {
    this.getLoginInfo()
    // this.getdata()
    // console.log(this.isLogin)
  },
}
</script>

<style scoped>
.el-header{
  background-color:rgb(20, 20, 71);
  opacity: 1;
}
.el-menu{
  background-color: rgb(20, 20, 71);
  width: 100%;
  opacity: 1;
}
.el-menu-item{
  color: aliceblue;
  font-size: 1.2em;
  float: right;
}
.el-submenu{
  color: aliceblue;
  font-size: 1.2em;
  float: right;
}
.submenu-title{
  display: block;
  width: 100%;
  height: 100%;
  color: aliceblue;
  font-size: 1.3em;
}
.submenu-title:hover{
  color: black
}
.el-main{
  padding: 0px;
}
</style>
