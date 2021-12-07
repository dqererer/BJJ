<template>
  <div class="login-body">
    <h1 class="login-logo">
      <img src="../assets/images/login-logo.png" />
    </h1>
    <div class="login-content">
      <div class="login-box">
        <h1 class="login-title">用户登录</h1>
        <el-form
          ref="loginFrom"
          :rules="rules"
          class="login-form"
          :model="form"
        >
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入账号"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              placeholder="请输入密码"
              show-password
              prefix-icon="el-icon-lock"
            ></el-input>
          </el-form-item>
          <el-form-item prop="code" class="formCode">
            <el-input
              v-model="form.code"
              placeholder="请输入验证码"
              prefix-icon="el-icon-key"
            ></el-input>
            <img
              @click="validateCodeLoad"
              class="codeImg"
              :src="'data:image/jpeg;base64,' + codeImg"
              alt
            />
          </el-form-item>
          <el-form-item>
            <el-button @click="loginClick('loginFrom')" type="primary"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Notification } from "element-ui";
import {
  validateCode,
  checkValidateCode,
  getUser,
  getToken
} from "@/api/login";
import { setToken, setName } from "@/utils/auth";
export default {
  name: "Login",
  data() {
    var validateCode = (rule, value, callback) => {
      if (value === "" || value === undefined) {
        callback(new Error("请输入验证码"));
      } else if (value.length != 4) {
        callback(new Error("请输入4位验证码"));
      } else {
        const codeData = {
          code: this.form.code,
          uuid: this.form.uuid
        };
        checkValidateCode(codeData).then(res => {
          if (res.code == 500) {
            callback(new Error(res.msg));
          } else {
            callback();
          }
        });
      }
    };
    return {
      form: {
        username: undefined,
        password: undefined,
        code: undefined,
        uuid: undefined
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "click" }]
      },
      codeImg: ""
    };
  },
  methods: {
    ...mapActions(["Login"]),
    loginClick(forName) {
      this.$refs[forName].validate(valid => {
        if (valid) {
          this.Login(this.form)
            .then(res => {
              const pathUrl = this.$route.query.redirect || "/index";
              this.$router.push({ path: pathUrl });
            })
            .catch(err => {
              this.validateCodeLoad();
              this.$notify({
                title: "登录失败",
                message: err.msg
              });
            });
        } else {
          return false;
        }
      });
    },
    validateCodeLoad() {
      validateCode({ height: "40", width: "100" }).then(res => {
        this.codeImg = res.img;
        this.form.uuid = res.uuid;
      });
    }
  },
  created() {
    this.validateCodeLoad();
    const _self = this;
    let ids = null;
    document.onkeydown = function(e) {
      const key = window.event.keyCode;
      if (key == 13 || key == 100) {
        _self.loginClick("loginFrom");
      }
    };
  }
};
</script>

<style lang="scss">
.login-body {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: url("../assets/images/bgd-img_6.jpg") no-repeat center center /
    cover;
  .login-logo {
    text-align: center;
    margin: 4% auto 3% auto;
  }
  .login-img {
    width: 50%;
    margin-left: 6%;
    float: left;
    img {
      width: 100%;
    }
  }
  .login-box {
    width: 360px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 1px 1px 10px #0a48ad;
    margin: 0 auto;
    overflow: hidden;
    .login-title {
      text-align: center;
      font-size: 22px;
      color: #3a6fca;
      padding-top: 30px;
      margin: 0px;
    }
    .login-form {
      width: 78%;
      margin: 20px auto 0 auto;
    }
    .el-button {
      width: 100%;
      border-radius: 30px;
      background-color: #3a6fca;
      color: #fff;
      font-size: 18px;
    }
    .formCode {
      display: flex;
      flex-direction: row;
      .el-form-item__content {
        display: flex;
        flex-direction: row;
        width: 100%;
        .el-input {
          width: 60%;
        }
        .codeImg {
          flex: 1;
          height: 100%;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
