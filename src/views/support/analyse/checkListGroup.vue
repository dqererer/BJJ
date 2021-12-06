<template>
  <div class="resource">
    <span>{{ title }}：</span>
    <div class="group">
      <el-checkbox-group
        v-model="checkList"
        @change="handleCheckboxGroupChange"
      >
        <el-checkbox
          :label="item"
          v-for="item in arr"
          v-bind:key="item"
        ></el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>
<script>
export default {
  name: "checkListGroup",
  data() {
    return {
      checkList: [],
    };
  },
  props: {
    completeArr: Array,
    type: String,
    title: String,
  },
  computed: {
    arr: function () {
      let arr = this.completeArr.map((item) => {
        return item.label;
      });
      return arr;
    },
  },
  created() {},
  methods: {
    handleCheckboxGroupChange: function (list) {
      let arr = [];
      this.completeArr.forEach((item) => {
        if (list.indexOf(item.label) > -1) {
          arr.push(item.value);
        }
      });
      let str = arr.join(",");
      this.$emit("handleCheckChange", this.type, str);
    },
  },
};
</script>

<style lang="scss" scoped>
.resource {
  display: flex;
  span {
    padding-right: 10px;
    width: 100px;
    font-size: 14px;
  }
  .group {
    flex: 1;
    .el-checkbox {
      font-weight: normal;
    }
  }
}
</style>


