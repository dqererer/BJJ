<template>
  <div class="amend-content">
    <el-form ref="userManageform" :model="form" :rules="rules" label-width="120px">
      <el-input v-model="form.password" class="manageHidden"></el-input>
      <el-row :gutter="24">
        <el-col :span="12" class="branch-name">
          <el-form-item label="归属单位：" prop="companyId">
            <treeselect
              v-model="form.companyId"
              :options="companyOptions"
              :disable-branch-nodes="true"
              :normalizer="normalizer"
              noChildrenText="无"
              @close="deptClose"
              placeholder="请选择归属单位"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" class="branch-name">
          <el-form-item label="归属部门：" prop="officeId">
            <treeselect
              v-model="form.officeId"
              :options="branchOptions"
              :normalizer="normalizer"
              :disableBranchNodes="false"
              noChildrenText="无"
              placeholder="请选择归属部门"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="登录名：" prop="loginName">
            <span slot="label">
              <i class="input-required">*</i>登录名：
            </span>
            <el-input v-model="form.loginName" :disabled="curStatus == 'view'"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item prop="newPassword">
            <span slot="label">
              <i class="input-required">*</i>密码：
            </span>
            <el-input v-model="form.newPassword" auto-complete="new-password" show-password></el-input>
            <input type="password"  style="position: absolute;z-index: -999">
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="affirmPassword">
            <span slot="label">
              <i class="input-required">*</i>确认密码：
            </span>
            <el-input v-model="form.affirmPassword" show-password></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="邮箱：" prop="email">
            <span slot="label">
              <i class="input-required">*</i>邮箱：
            </span>
            <el-input v-model="form.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话：">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="手机：" prop="mobile">
            <span slot="label">
              <i class="input-required">*</i>手机：
            </span>
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户类型：" prop="userType">
            <el-select v-model="form.userType" placeholder="请选择">
              <el-option
                v-for="val in userTypeData"
                :key="val.value"
                :label="val.label"
                :value="val.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="是否允许登录：" prop="loginFlag">
            <el-select v-model="form.loginFlag">
              <el-option
                v-for="val in LoginYesNoData"
                :key="val.value"
                :label="val.label"
                :value="val.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item label="用户角色：" prop="roleIds">
            <el-checkbox-group v-model="form.roleIds">
              <el-checkbox
                v-for="item in roleListData"
                :key="item.id"
                :label="item.id"
              >{{ item.name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item class="tab-list-state">
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button @click="handleBackClick">返回</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { dictListType } from "@/api/styem/dict/type";
import { roleList } from "@/api/styem/role";
import {
  userSave,
  userCheckLoginName,
  userCheckEmail,
  userSee
} from "@/api/styem/user";
import { isPasword, isEmail, isMobile } from "@/utils/validate";
import { officeTreeData } from "@/api/styem/dept";
import Bus from "@/utils/vueBus";
export default {
  props: {
    deptOptions: {
      type: Array,
      default: null
    }
  },
  data() {
    const validatorLoginName = (rule, value, callback) => {
      if (value === "" || value == undefined) {
        callback(new Error("登录名不能为空"));
      } else {
        const loginNameCode = {
          oldLoginName: this.form.oldLoginName,
          loginName: value
        };

        userCheckLoginName(loginNameCode).then(reponse => {
          if (reponse.data === false) {
            callback(new Error("登录名已存在"));
          } else {
            callback();
          }
        });
      }
    };

    const validatorNewPassworld = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!isPasword(value)) {
        callback(
          new Error("密码必须包含数字、大小写字母、特殊符号且长度在6到20")
        );
      } else {
        this.$refs.userManageform.validateField("affirmPassword");
        callback();
      }
    };

    const validatorAffirmPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.newPassword) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };

    const validatorEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!isEmail(value)) {
        callback(new Error("请输入正确邮箱"));
      } else {
        const emailCode = {
          oldEmail: this.form.oldEmail,
          email: value
        };
        userCheckEmail(emailCode).then(reponse => {
          if (reponse.data === false) {
            callback(new Error("邮箱已存在"));
          }
          callback();
        });
      }
    };

    const validatorMobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!isMobile(value)) {
        callback(new Error("请输入正确手机号"));
      } else {
        callback();
      }
    };

    return {
      curStatus: "",
      form: {
        id: undefined,
        companyId: null,
        officeId: null,
        userType: undefined,
        name: undefined,
        oldLoginName: undefined,
        loginName: undefined,
        password: undefined,
        newPassword: undefined,
        affirmPassword: undefined,
        oldEmail: undefined,
        email: undefined,
        phone: undefined,
        mobile: undefined,
        loginFlag: "1",
        roleIds: [],
        remarks: undefined
      },
      rules: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        userType: [
          { required: true, message: "用户类型不能为空", trigger: "blur" }
        ],
        loginName: [{ validator: validatorLoginName, trigger: "blur" }],
        newPassword: [{ validator: validatorNewPassworld, trigger: "blur" }],
        affirmPassword: [
          { validator: validatorAffirmPassword, trigger: "blur" }
        ],
        email: [{ validator: validatorEmail, trigger: "blur" }],
        mobile: [{ validator: validatorMobile, trigger: "blur" }],
        loginFlag: [
          { required: true, message: "是否允许登录不能为空", trigger: "change" }
        ],
        roleIds: [
          { required: true, message: "用户角色不能为空", trigger: "change" }
        ]
      },
      userTypeData: [],
      LoginYesNoData: [],
      roleListData: [],
      companyOptions: [],
      branchOptions: [],
      normalizer(node) {
        return {
          label: node.name
        };
      }
    };
  },
  created() {
    Bus.$off("outUserComeId");
    this.getdictUserType();
    this.getdictLoginYesNo();
  },
  watch: {
    deptOptions: {
      handler(newVal) {
        const newVObj = JSON.parse(JSON.stringify(newVal));
        for (const key in newVObj) {
          delete newVObj[key].children;
          this.companyOptions.push(newVObj[key]);
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    Bus.$on("outUserComeId", id => {
      this.handleReset();
      this.getroleList();
      if (id == "" || id == undefined) {
        this.form.id = undefined;
        this.curStatus = "new";
      } else {
        this.curStatus = "view";
        this.form.id = id;
        this.getuserSee(id);
        this.rules["newPassword"] = [
          {
            validator: this.validatoroldPassworld,
            trigger: "blur"
          }
        ];
        this.rules["affirmPassword"] = [
          {
            validator: this.validatoroldTruePassworld,
            trigger: "blur"
          }
        ];
      }
    });
  },
  methods: {
    deptClose(companyId) {
      if (companyId == undefined) {
        this.branchOptions = [];
        return;
      }
      this.getOfficeTreeData(companyId);
    },
    getOfficeTreeData(companyId) {
      officeTreeData({ companyId, tyep: 2 }).then(reponse => {
        const menu = this.handleTree(
          reponse.data,
          "id",
          "pId",
          "children",
          companyId
        );
        this.branchOptions = menu;
      });
    },
    validatoroldPassworld(rule, value, callback) {
      if (value === "" || value == null) {
        callback();
      } else if (!isPasword(value)) {
        callback(
          new Error("密码必须包含数字、大小写字母、特殊符号且长度在6到20")
        );
      } else {
        callback();
      }
    },
    validatoroldTruePassworld(rule, value, callback) {
      if (value === "" || value == this.form.newPassword) {
        callback();
      } else if (value !== this.form.newPassword) {
        callback(new Error("两次输入密码不一致"));
      }
    },
    async getdictUserType() {
      const reponse = await dictListType({ type: "sys_user_type" });
      this.userTypeData = reponse.data;
    },
    async getdictLoginYesNo() {
      const reponse = await dictListType({ type: "yes_no" });
      this.LoginYesNoData = reponse.data;
    },
    async getroleList() {
      const reponse = await roleList();
      const roleListData = [];
      for (const item in reponse.data) {
        const subject = reponse.data[item];
        if (
          subject.name === "系统管理员" ||
          subject.name === "市督察办" ||
          subject.name === "省督察办" ||
          subject.name === "默认角色"
        ) {
          roleListData.push(subject);
        }
      }
      this.roleListData = roleListData;
    },
    getuserSee(id) {
      const userSeeData = { id };
      userSee(userSeeData).then(reponse => {
        const temp = reponse.data;
        this.form.companyId = temp.companyId;
        this.form.officeId = temp.officeId;
        this.form.userType = temp.userType;
        this.form.name = temp.name;
        this.form.loginName = temp.loginName;
        this.form.oldLoginName = temp.loginName;
        this.form.password = temp.psw;
        this.form.newPassword = undefined;
        this.form.affirmPassword = undefined;
        this.form.email = temp.email;
        this.form.oldEmail = temp.email;
        this.form.phone = temp.phone;
        this.form.mobile = temp.mobile;
        this.form.loginFlag = temp.loginFlag;
        this.form.roleIds = temp.roleIds.split(",");
        this.form.remarks = temp.remarks;
        this.getOfficeTreeData(temp.companyId);
      });
    },
    submitForm() {
      this.$refs.userManageform.validate(async valid => {
        if (valid) {
          if (this.form.roleIds.length > 0) {
            this.form.roleIds = this.form.roleIds.join(",");
          }
          const loading = this.$loading({
            lock: true,
            text: "正在保存提交，请稍等...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.1)"
          });
          userSave(this.form).then(reponse => {
            if (reponse.code == 200) {
              this.$emit("backHandle", "update");
            } else {
              this.$notify({
                title: "系统提示",
                message: "保存失败",
                showClose: false
              });
            }
          });
          loading.close();
        } else {
          return false;
        }
      });
    },
    handleBackClick() {
      this.$emit("backHandle", "back");
    },

    handleReset() {
      this.form.companyId = null;
      this.form.officeId = null;
      this.form.loginFlag = "1";
      this.form.remarks = undefined;
      this.form.loginName = undefined;
      this.form.newPassword = undefined;
      this.form.affirmPassword = undefined;
      this.handleformClear("userManageform");
    },
    handleformClear(formName) {
      this.$nextTick(() => {
        this.resetFieldsTap(formName);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.input-required {
  color: #f56c6c;
  margin-right: 4px;
}
</style>