<template>
  <div class="see-content">
    <el-row>
      <el-col :span="24">
        <div class="see-page-box">
          <label class="see-page-label">归属用户：</label>
          <span class="see-page-text">{{ spaceSeeData.user }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="see-page-box">
          <label class="see-page-label">归属部门：</label>
          <span class="see-page-text">{{ spaceSeeData.office }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="see-page-box">
          <label class="see-page-label">归属区域：</label>
          <span class="see-page-text">{{ spaceSeeData.area }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="see-page-box">
          <label class="see-page-label">名称：</label>
          <span class="see-page-text">{{ spaceSeeData.name }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="see-page-box">
          <label class="see-page-label">性别：</label>
          <span class="see-page-text">{{ spaceSeeData.sex }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="see-page-box">
          <label class="see-page-label">加入日期：</label>
          <span class="see-page-text">{{ spaceSeeData.inDate }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="see-page-box">
          <label class="see-page-label">备注信息：</label>
          <span class="see-page-text">{{ spaceSeeData.remarks }}</span>
        </div>
      </el-col>
    </el-row>
    <h1 class="business-title">业务数据子表：</h1>
    <el-table
      border
      :data="spaceSeeData.testDataChildList"
      style="width: 100%"
      :stripe="true"
    >
      <el-table-column label="名称" min-width="180px">
        <template v-slot="scope">
          <span class="see-page-text">{{
            spaceSeeData.testDataChildList[scope.$index].name
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注信息" min-width="180px">
        <template v-slot="scope">
          <span class="see-page-text">{{
            spaceSeeData.testDataChildList[scope.$index].remarks
          }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="out-see-line margin20">
      <el-button @click="handleBackClick">返回</el-button>
    </el-row>
  </div>
</template>

<script>
import { testDataMainSee } from "@/api/case/master";
import Bus from "@/utils/vueBus";
export default {
  data() {
    return {
      spaceSeeData: {
        user: undefined,
        office: undefined,
        area: undefined,
        name: undefined,
        sex: undefined,
        inDate: undefined,
        remarks: undefined,
        testDataChildList: []
      }
    };
  },
  created() {
    Bus.$off("outComeSeeId");
  },
  mounted() {
    Bus.$on("outComeSeeId", id => {
      this.handleReset();
      this.getSpaceSee(id);
    });
  },
  methods: {
    async getSpaceSee(id) {
      const reponse = await testDataMainSee({ id });
      this.spaceSeeData = reponse.data;
      this.spaceSeeData.user = reponse.data.user.name;
      this.spaceSeeData.office = reponse.data.office.name;
      this.spaceSeeData.area = reponse.data.area.name;
    },
    handleBackClick() {
      this.$emit("backHandle", "back");
    },
    handleReset() {
      this.spaceSeeData = {
        user: undefined,
        office: undefined,
        area: undefined,
        name: undefined,
        sex: undefined,
        inDate: undefined,
        remarks: undefined
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.see-content .see-page-box .see-page-label {
  width: 140px;
}
/deep/.el-table th {
  padding: 6px 0;
}
/deep/.el-table td {
  padding: 6px 0;
}
.business-title {
  font-size: 20px;
  color: #0088cc;
  border-bottom: 1px solid #e5e5e5;
  line-height: 40px;
  margin-bottom: 10px;
}
</style>