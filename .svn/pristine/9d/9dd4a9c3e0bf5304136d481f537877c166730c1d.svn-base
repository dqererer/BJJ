<template>
  <div class="amend-content tab-list-content">
    <div class="business-add" v-if="businessAdd">
      <el-form label-width="120px">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="表名：">
              <el-select v-model="genTableName">
                <el-option
                  v-for="item in genTableAddData"
                  :key="item.name"
                  :label="item.nameAndComments"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item class="tab-list-state">
            <el-button type="primary" @click="onHandleNext">下一步</el-button>
            <el-button @click="handleBackClick">返回</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div class="business-info" v-else>
      <el-form ref="userManageform" :model="form" label-width="120px">
        <h1 class="business-title">基本信息</h1>
        <el-row>
          <el-col :span="12">
            <el-form-item label="表名：">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="说明：">
              <el-input v-model="form.comments"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="类名：">
              <el-input v-model="form.className"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="父表表名：">
              <el-select v-model="form.parentTable">
                <el-option label="无" value=""></el-option>
                <el-option
                  v-for="item in genTableAddData"
                  :key="item.name"
                  :label="item.nameAndComments"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="当前表外键：">
              <el-select v-model="form.parentTableFk">
                <el-option label="无" value=""></el-option>
                <el-option
                  v-for="item in nameTempArry"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="固定表头：">
              <el-select v-model="form.isFixedHeader">
                <el-option label="否" value="0"></el-option>
                <el-option label="是" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <h1 class="business-title">字段列表</h1>
        <el-table
          :data="form.columnList"
          v-loading="loading"
          border
          style="width: 100%"
        >
          <el-table-column min-width="160" prop="name" label="列名">
          </el-table-column>
          <el-table-column label="说明" min-width="160">
            <template v-slot="scope">
              <el-input
                v-model="form.columnList[scope.$index].comments"
                placeholder=""
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="jdbcType"
            label="物理类型"
            width="120"
          ></el-table-column>
          <el-table-column label="java类型" width="160">
            <template v-slot="scope">
              <el-select v-model="form.columnList[scope.$index].javaType">
                <el-option
                  v-for="item in javaTypeListArry"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="java属性名称" width="160">
            <template v-slot="scope">
              <el-input
                v-model="form.columnList[scope.$index].javaField"
                placeholder=""
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="主键" width="50">
            <template v-slot="scope">
              <el-checkbox
                v-model="form.columnList[scope.$index].isPk"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="可空" width="50">
            <template v-slot="scope">
              <el-checkbox
                v-model="form.columnList[scope.$index].isNull"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="插入" width="50">
            <template v-slot="scope">
              <el-checkbox
                v-model="form.columnList[scope.$index].isInsert"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="编辑" width="50">
            <template v-slot="scope">
              <el-checkbox
                v-model="form.columnList[scope.$index].isEdit"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="列表" width="50">
            <template v-slot="scope">
              <el-checkbox
                v-model="form.columnList[scope.$index].isList"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="固定列" width="70">
            <template v-slot="scope">
              <el-checkbox
                v-model="form.columnList[scope.$index].isFixedColumn"
                :disabled="
                  form.columnList[scope.$index].isList == true ? false : true
                "
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="查询" width="50">
            <template v-slot="scope">
              <el-checkbox
                v-model="form.columnList[scope.$index].isQuery"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="查询匹配方式" width="160">
            <template v-slot="scope">
              <el-select v-model="form.columnList[scope.$index].queryType">
                <el-option
                  v-for="item in queryTypeListArry"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="显示表单类型" width="160">
            <template v-slot="scope">
              <el-select v-model="form.columnList[scope.$index].showType">
                <el-option
                  v-for="item in showTypeListArry"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="字典类型" width="160">
            <template v-slot="scope">
              <el-input
                v-model="form.columnList[scope.$index].dictType"
                placeholder=""
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="排序">
            <template v-slot="scope">
              <el-input
                v-model="form.columnList[scope.$index].sort"
                placeholder=""
              ></el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-form-item class="tab-list-state">
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="handleBackClick">返回</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  genTableAdd,
  genTableByName,
  genTableConfig,
  genTableById,
  genTableSave
} from "@/api/styem/develop";
import Bus from "@/utils/vueBus";
import axios from "axios";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      genTableName: "",
      columnListData: undefined,
      businessAdd: true,
      form: {
        id: undefined,
        className: undefined,
        columnList: [
          {
            comments: undefined,
            dictType: undefined,
            genTableId: undefined,
            isEdit: undefined,
            isFixedColumn: undefined,
            isInsert: undefined,
            isList: undefined,
            isNull: undefined,
            isPk: undefined,
            isQuery: undefined,
            javaField: undefined,
            javaType: undefined,
            jdbcType: undefined,
            name: undefined,
            queryType: undefined,
            showType: undefined,
            sort: 0
          }
        ],
        comments: undefined,
        isFixedHeader: "0",
        name: undefined,
        parentTable: "",
        parentTableFk: ""
      },
      genTableAddData: undefined,
      nameTempArry: undefined,
      loading: true,
      showTypeListArry: undefined,
      queryTypeListArry: undefined,
      javaTypeListArry: undefined,
      categoryListArry: undefined
    };
  },
  created() {
    Bus.$off("outComeId");
    this.getGenTableAdd();
    this.getGenTableConfig();
  },
  mounted() {
    Bus.$on("outComeId", id => {
      if (id == "" || id == undefined) {
        this.form.id = undefined;
        this.businessAdd = true;
      } else {
        this.businessAdd = false;
        this.form.id = id;
        this.getGenTableById(id);
      }
    });
  },
  methods: {
    async getGenTableAdd() {
      const reponse = await genTableAdd();
      this.genTableAddData = reponse.data;
      this.genTableName = reponse.data[0].name
    },
    async onHandleNext() {
      const reponse = await genTableAdd({ genTableName: this.genTableName });
      if (reponse.code === 500) {
        this.businessAdd = true;
      } else {
        this.businessAdd = false;
        this.getGenTableByName(this.genTableName);
      }
    },

    //修改
    async getGenTableById(id) {
      const reponse = await genTableById({ id });
      this.getGenTableDataChange(reponse.data);
      this.loading = false;
    },

    async getGenTableConfig() {
      const reponse = await genTableConfig();
      const subject = reponse.data;
      this.showTypeListArry = subject.showTypeList;
      this.queryTypeListArry = subject.queryTypeList;
      this.javaTypeListArry = subject.javaTypeList;
      this.categoryListArry = subject.categoryList;
    },
    async getGenTableByName(tableName) {
      const reponse = await genTableByName({ tableName });
      const subject = reponse.data;
      this.getGenTableDataChange(subject);
      this.loading = false;
    },
    getGenTableDataChange(subject) {
      let nameTemp = [];
      for (let index in subject.columnList) {
        nameTemp.push({
          name: subject.columnList[index].name
        });
      }
      this.nameTempArry = nameTemp;
      this.form.id = subject.id || undefined;
      this.form.name = subject.name;
      this.form.comments = subject.comments;
      this.form.className = subject.className;
      this.form.parentTable = subject.parentTable||'';
      this.form.parentTableFk = subject.parentTableFk||'';
      subject.columnList.map(item => {
        item.isPk = item.isPk === "1" ? true : false;
        item.isNull = item.isNull === "1" ? true : false;
        item.isInsert = item.isInsert === "1" ? true : false;
        item.isEdit = item.isEdit === "1" ? true : false;
        item.isList = item.isList === "1" ? true : false;
        item.isFixedColumn = item.isFixedColumn === "1" ? true : false;
        item.isQuery = item.isQuery === "1" ? true : false;
        item.queryType = item.queryType === undefined ? "=" : item.queryType;
        item.showType = item.showType === undefined ? "input" : item.showType;
      });
      const columnListArry = [];
      for (let index in subject.columnList) {
        const colum = subject.columnList[index];
        const temp = {
          id : colum.id || undefined,
          comments: colum.comments,
          dictType: colum.dictType,
          genTableId: colum.genTableId,
          isEdit: colum.isEdit,
          isFixedColumn: colum.isFixedColumn,
          isInsert: colum.isInsert,
          isList: colum.isList,
          isNull: colum.isNull,
          isPk: colum.isPk,
          isQuery: colum.isQuery,
          javaField: colum.javaField,
          javaType: colum.javaType,
          jdbcType: colum.jdbcType,
          name: colum.name,
          queryType: colum.queryType,
          showType: colum.showType,
          sort: colum.sort
        };
        columnListArry.push(temp);
      }
      this.form.columnList = columnListArry;
    },
    onSubmit() {
      this.form.columnList.map(item => {
        item.isPk = item.isPk === true ? "1" : "0";
        item.isNull = item.isNull === true ? "1" : "0";
        item.isInsert = item.isInsert === true ? "1" : "0";
        item.isEdit = item.isEdit === true ? "1" : "0";
        item.isList = item.isList === true ? "1" : "0";
        item.isFixedColumn = item.isFixedColumn === true ? "1" : "0";
        item.isQuery = item.isQuery === true ? "1" : "0";
      });
      const data = JSON.stringify(this.form);
      const url = process.env.VUE_APP_BASE_API + "/center/gen/genTable/save";
      axios({
        url: url,
        method: "post",
        data: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken()
        }
      }).then(reponse => {
        if (reponse.data.code == 200) {
          this.$emit("backHandle", "update");
        }
      });
    },
    handleBackClick() {
      this.$emit("backHandle", "back");
    }
  }
};
</script>

<style lang="scss" scoped>
.input-required {
  color: #f56c6c;
  margin-right: 4px;
}
.business-title {
  font-size: 20px;
  color: #0088cc;
  border-bottom: 1px solid #e5e5e5;
  line-height: 40px;
  margin-bottom: 10px;
}
</style>