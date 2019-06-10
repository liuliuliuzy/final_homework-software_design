<template>
  <div class="reg-div"> 
    <div class="register-wrapper"> 
      <div id="register">
        <p class="title">注册界面</p>
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="0"
          class="demo-ruleForm"
        >
        <!-- <p class="tips">选择头像</p> -->
        <el-form-item prop="file">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form-item>

          <el-form-item prop="username">
            <el-input v-model="ruleForm2.username" auto-complete="off" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <!-- <el-form-item prop="email" class="code">
            <el-input v-model="ruleForm2.email" placeholder="请输入邮箱"></el-input>
          </el-form-item> -->
          <el-form-item prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')" style="width:100%;">注册</el-button>
            <p class="login" @click="gotoLogin">已有账号？立即登录</p>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script> 
import axios from "axios"
export default {
  name: "Register", 
  data() {
    // <!--验证用户名是否合法-->
    let checkName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空'))
      // } else if (!this.checkMobile(value)) {
      //   callback(new Error('手机号码不合法'))
      } else {
        callback()
      }
    }
    //  <!--邮箱地址是否合法-->
    // let checkEmail = (rule, value, callback) => {
    //   if(value === '') {
    //     callback(new Error('请输入邮箱地址'))
    //   }
    //   else if (!this.checkEmail(value)) {
    //     callback(new Error('请输入合法的邮箱地址'))
    //   } else {
    //     callback()
    //   }
    // }
    // <!--验证密码-->
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback()
      }
    }
    // <!--二次验证密码-->
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    }
    // 验证头像
    let checkAvatar = (file, callback) => {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        callback(new Error('上传头像图片只能是 JPG 格式!'));
      }
      if (!isLt2M) {
        callback(new Error('上传头像图片大小不能超过 2MB!'));
      }
    };
    return {
      ruleForm2: {
        pass: "",
        checkPass: "",
        file: "",
        email: "",
        username: "",
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        // email: [{ validator: checkEmail, trigger: 'change' }],
        username: [{ validator: checkName, trigger: 'change' }],
        //file: [{ validator: checkAvatar, trigger: 'blur'}],
      },
      imageUrl:"",
      imgw:0,
      imgh:0,
    }
  }, 
  methods: {
      handleAvatarSuccess(res, file) {
        //alert('handle avatar success');
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        console.log(file)
        this.ruleForm2.file = file
        // var img = new Image()
        //this.ruleForm2.file = file.name;
        //this.ruleForm2.file = new blob(file.raw, 'jpg');
        this.imageUrl = URL.createObjectURL(file);
        // img.src = this.imageUrl;
        // img.onload = func(){
        //   this.imgw = img.width
        //   this.imgh = img.height
        // }
        // console.log('width:'+img.width+' height:'+img.height)
        alert('头像上传成功');
        return false;
        //阻止图片上传，等到所有内容填写完成之后一起上传
      },
    // <!--发送验证码-->
    // sendCode () {
    //   let tel = this.ruleForm2.tel
    //   if (this.checkMobile(tel)) {
    //     console.log(tel)
    //     let time = 60
    //     this.buttonText = '已发送'
    //     this.isDisabled = true
    //     if (this.flag) {
    //       this.flag = false;
    //       let timer = setInterval(() => {
    //         time--;
    //         this.buttonText = time + ' 秒'
    //         if (time === 0) {
    //           clearInterval(timer);
    //           this.buttonText = '重新获取'
    //           this.isDisabled = false
    //           this.flag = true;
    //         }
    //       }, 1000)
    //     }
    //   }
    // },
    // <!--提交注册-->
    submitForm(formName) {
      // alert('success!')
      // console.log('submit')

      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // })
      let params = new FormData();
      params.append("image", this.ruleForm2.file)
      // params.append("file", 'yes')
      params.append("user", this.ruleForm2.username)
      //params.append("email", this.ruleForm2.email)
      params.append("pass", this.ruleForm2.pass)
      axios.post("http://127.0.0.1:5000/api/user/register", params).then(function(res){
        alert(res.data.status)
        // '\n'+res.data.email
      })
    },
    // <!--进入登录页-->
    gotoLogin() {
      this.$router.push({
        path: "/login"
      });
    },
    // 验证手机号
    checkMobile(str) {
      let re = /^1\d{10}$/
      if (re.test(str)) {
        return true;
      } else {
        return false;
      }
    },

    checkEmail(str) {
      //let re = /^1\d{10}$/
      let re = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      if (re.test(str)) {
        return true;
      } else {
        return false;
      }
    },
  }
};
</script>

<style scoped>
.reg-div{
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgb(5, 20, 34);
}
/* .avatar-uploader  */
.el-upload {
  border: 2px dashed #da2c2c;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  border: 2px dashed #8c939d;
  border-radius: 6px;
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar-uploader-icon:hover{
  border-color: #409EFF
}
.avatar {
  /* width: 120px; */
  height: 180px;
  display: block;
}
.loading-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #aedff8;
  display: flex;
  align-items: center;
  justify-content: center;
}
.register-wrapper img {
  position: relative;
  z-index: 1;
}
.register-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
#register {
  max-width: 340px;
  margin: 10px auto;
  background: #fff;
  padding: 20px 40px;
  border-radius: 10px;
  position: relative;
  z-index: 9;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  font-size: 26px;
  line-height: 50px;
  font-weight: bold;
  margin: 10px;
  text-align: center;
}
.tips{
  font-size: 15px;
  line-height: 20px;
  font-weight: bold;
  margin: 10px;
  text-align: left;
  float: left;
}
.el-form-item {
  text-align: center;
}
.login {
  margin-top: 10px;
  font-size: 14px;
  line-height: 22px;
  color: #1ab2ff;
  cursor: pointer;
  text-align: left;
  text-indent: 8px;
  width: 160px;
}
.login:hover {
  color: #2c2fd6;
}
.code >>> .el-form-item__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.code button {
  margin-left: 20px;
  width: 140px;
  text-align: center;
}
.el-button--primary:focus {
  background: #409EFF;
  border-color: #409EFF;
  color: #fff;
}
</style>
