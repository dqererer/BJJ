<template>
  <div class="zh-search">
    <div class="search-wrap">
      <el-input
        placeholder="请输入内容"
        v-model="keyword"
        class="input-with-select"
        @keyup.enter.native="goSearch"
      >
        <el-select v-model="filter" slot="prepend" placeholder="请选择">
          <el-option
            v-for="item in filters"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <el-button slot="append" icon="el-icon-search" @click="goSearch"
          >检索</el-button
        >
      </el-input>
    </div>
    <div class="result" v-if="!showNoneMsg">
      <div class="top" v-if="showResultTypeData">
        <el-radio-group v-model="resultType" style="margin-bottom: 30px">
          <el-radio-button
            v-for="(value, key) in resultTypeData"
            v-bind:key="key"
            :label="key"
            >{{ key }}（{{ value[0].count }}）</el-radio-button
          >
        </el-radio-group>
      </div>
      <div class="ul" v-if="curList.length > 0">
        <div
          class="li"
          v-for="item in curList"
          v-bind:key="item.id"
          @click="jump(item)"
        >
          <div class="title" v-html="item.name"></div>
          <div
            v-if="item.attachment"
            class="content"
            v-html="item.attachment.content"
          ></div>
          <div class="content" v-html="item.content"></div>
        </div>
        <div class="page">
          <pagination
            v-show="total > 0"
            :total="total"
            :pageNo.sync="pageNo"
            :limit.sync="pageSize"
            @pagination="goSearch"
          />
        </div>
      </div>
    </div>
    <div v-else class="empty">
      <el-empty v-if="showNoneMsg" description="搜索结果为空"></el-empty>
    </div>
  </div>
</template>

<script>
import { getAllSearchData } from "@/api/support/search";
import { dictListType } from "@/api/styem/dict/type";

export default {
  data() {
    return {
      filter: "all",
      filters: [
        {
          label: "全部",
          value: "all",
        },
      ],
      keyword: "",
      checkList: [],
      filterType: [],
      searchWord: "",
      pageNo: 1,
      pageSize: 10,
      tabList: [],
      resultType: "资料附件",
      resultTypeData: {},
      curList: [],
      total: 0,
      showResultTypeData: false,
      showNoneMsg: false,
    };
  },
  computed: {
    types: function () {
      if (this.filter == "all") {
        let arr = this.filterType.map((i) => {
          return i.value;
        });
        return arr.join(",");
      } else {
        return this.filter;
      }
    },
  },
  watch: {
    resultType: function (newV) {
      this.resultType = newV;
      this.curList = this.resultTypeData[newV][0].list;
      this.total = this.resultTypeData[newV][0].count;
      this.pageNo = 1;
      this.goSearch();
    },
  },
  created() {
    this.getFilterType();
    this.goSearch();
  },
  methods: {
    jump: function (item) {
      let id = item.dataId;
      let path = "";
      switch (this.resultType) {
        case "整改方案":
          path = "/program";
          break;
        case "人员":
          path = "/people";
          break;
        case "督察组":
          path = "/duchazu";
          break;
        case "信访件":
          path = "/xfj";
          break;
        case "会议":
          path = "/hy";
          break;
        case "资料附件":
          path = "/ziliao";
          id = item.id;
          break;
        case "谈话":
          path = "/talk";
          break;
                case "问题":
          path = "/question";
          break;
                case "线索":
          path = "/clue";
          break;
        default:
          //
          break;
      }
      let routeData = this.$router.resolve({ path, query: { id } });
      console.log("routeData", routeData);
      window.open(routeData.href, "_blank");
      // this.$router.push({path , query: {id,}});
    },
    getFilterType: function () {
      dictListType({
        type: "es_env",
      })
        .then((res) => {
          this.filters = this.filters.concat(res.data);
          this.filterType = res.data;
        })
        .catch();
    },
    goSearch: function () {
      getAllSearchData({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        types: this.types,
        searchWord: this.keyword,
      }).then((res) => {
        for (let i in res.data) {
          if (res.data[i][0].count == 0) {
            delete res.data[i];
          }
        }
        let arr = Object.keys(res.data);
        this.resultTypeData = res.data;
        if (arr.length > 0) {
          this.showNoneMsg = false;
          if (arr.indexOf(this.resultType) < 0) {
            this.resultType = arr[0];
          }
          if (this.filter == "all") {
            this.showResultTypeData = true;
          }
          this.curList = this.resultTypeData[this.resultType][0].list;
          this.total = this.resultTypeData[this.resultType][0].count;
        } else {
          this.showNoneMsg = true;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.zh-search {
  width: 100%;
  background: white;
  min-height: 100%;
  padding-bottom: 30px;
  .search-wrap {
    width: 600px;
    margin: 0 auto;
    padding: 30px 0;
    .el-select {
      width: 100px;
    }
    /deep/ .el-input-group__append {
      background: #116ecb;
      color: white;
      border: 1px solid #116ecb;
      width: 120px;
      text-align: center;
    }
  }
  .filter {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    .el-checkbox-group {
      display: inline-block;
    }
  }
  .result {
    .top {
      display: flex;
      justify-content: center;
    }
    .ul {
      background: #f7f7f7;
      margin: 0 110px;
      .li {
        padding: 20px 0;
        margin: 0 50px;
        border-bottom: 1px #116ecb dashed;
        color: #3e3c3c;

        .title {
          font-weight: 500;
          padding-bottom: 10px;
          cursor: pointer;
          color: #116ecb;
        }
        .content {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          cursor: pointer;

          font-size: 14px;
        }
      }
      .page {
        height: 100px;
        padding: 20px 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .empty {
    margin-top: 100px;
  }
}
</style>


