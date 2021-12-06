<template>
  <div class="forget-inner">
    <el-steps :active="active" align-center finish-status="success">
      <el-step title="输入验证码"></el-step>
      <el-step title="设置新密码"></el-step>
      <el-step title="设置成功"></el-step>
    </el-steps>
    <el-form
      ref="form"
      v-show="active === 0"
      :model="form"
      :rules="rules"
      class="forget-form"
    >
      <el-form-item prop="loginName">
        <el-input
          v-model="form.loginName"
          placeholder="请输入您的用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="emailAddr">
        <el-input
          v-model="form.emailAddr"
          placeholder="请输入您的邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item prop="captcha" class="forget-code">
        <el-input
          v-model="form.captcha"
          placeholder="请输入您的验证码"
        ></el-input>
        <el-button
          type="primary"
          @click="sendEmailCode"
          :disabled="send.timer > 0"
          >{{ sendText }}</el-button
        >
      </el-form-item>
      <el-form-item class="forget-line">
        <el-button type="primary" @click="checkCaptchaClick">下一步</el-button>
        <el-button type="primary" @click="checkCaptchaBackClick">返回</el-button>
      </el-form-item>
    </el-form>
    <el-form
      ref="forgetForm"
      v-show="active === 1"
      :model="forgetForm"
      :rules="forgetRules"
      class="forget-form"
    >
      <el-form-item prop="newPwd">
        <el-input
          v-model="forgetForm.newPwd"
          type="password"
          show-password
          placeholder="请输入您的新密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="oldPwd">
        <el-input
          v-model="forgetForm.oldPwd"
          type="password"
          show-password
          placeholder="请再次输入新密码"
        ></el-input>
      </el-form-item>
      <el-form-item class="forget-line">
        <el-button type="primary" @click="changePwdClick">下一步</el-button>
        <el-button type="primary" @click="changePwdClickBackClick">>返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { forgetPwd, checkCaptcha, changePwd } from "@/api/login";
import { Notification } from "element-ui";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.forgetForm.oldPwd !== "") {
          this.$refs.forgetForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.forgetForm.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      active: 0,
      send: {
        timer: 0
      },
      form: {
        loginName: undefined,
        emailAddr: undefined,
        captcha: undefined
      },
      captcha_uuid: undefined,
      forgetForm: {
        newPwd: undefined,
        oldPwd: undefined,
        token: "403b15cd22e04ad8aa279941a0c424a8"
      },
      rules: {
        loginName: { required: true, message: "请输入用户名" },
        emailAddr: [
          { required: true, message: "请输入邮箱" },
          { type: "email", message: "请输入正确的邮箱格式" }
        ],
        captcha: { required: true, message: "请输入邮箱验证码" }
      },
      forgetRules: {
        newPwd: [{ validator: validatePass, trigger: "blur" },
        {pattern: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[~!@#$%^&*()])[\da-zA-Z!@#$%^&*()]{6,20}$/, message: '密码必须包含数字、大小写字母、特殊符号且长度在6到20之间'}],
        oldPwd: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    async sendEmailCode() {
      if (!this.form.loginName && !this.form.emailAddr) {
        this.$refs.form.validateField("loginName");
        this.$refs.form.validateField("emailAddr");
        return;
      }
      const { data } = await forgetPwd(this.form);
      this.captcha_uuid = data.captcha_uuid;
      this.send.timer = 10;
      this.timer = setInterval(() => {
        this.send.timer -= 1;
        if (this.send.timer === 0) {
          clearInterval(this.timer);
        }
      }, 1000);
    },
    checkCaptchaClick() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const { data } = await checkCaptcha({
            captcha_uuid: this.captcha_uuid,
            captcha: this.form.captcha
          });
          this.forgetForm.token = data.token;
          this.active = 1;
        }
      });
    },
    changePwdClick() {
      this.$refs.forgetForm.validate(async valid=>{
        if(valid){
          const { data } = await changePwd(this.forgetForm);
          this.active = 2;
        }
      })
    },
    checkCaptchaBackClick(){
      this.$router.push({
        path:'/login'
      })
    },
    changePwdClickBackClick(){
      this.active = 0
    }
  },
  computed: {
    sendText() {
      if (this.send.timer <= 0) {
        return "发送验证码";
      }
      return `${this.send.timer}s后发送`;
    }
  }
};
</script>

<style lang="scss" scoped>
.forget-inner {
  width: 800px;
  margin: 20px auto;
  .forget-form {
    width: 360px;
    margin: 20px auto;
    .forget-code {
      .el-input {
        width: 248px;
        /deep/.el-input__inner {
          border-radius: 4px 0 0 4px;
        }
      }
      /deep/.el-button {
        border-radius: 0px 4px 4px 0;
      }
      .el-button {
        width: 110px;
      }
    }
    .forget-line {
      margin-top: 20px;
      text-align: center;
    }
  }
}
</style>