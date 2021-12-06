<template>
  <div class="pagination-body">
    <el-pagination
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true
    },
    pageNo: {
      type: Number,
      dafault: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 15, 25, 35, 45];
      }
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.pageNo;
      },
      set(val) {
        this.$emit("update:pageNo", val);
      }
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("pagination", { pageNo: this.currentPage, pageSize: val });
    },
    handleCurrentChange(val) {
      this.$emit("pagination", { pageNo: val, pageSize: this.pageSize });
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination-body {
  padding: 20px 0;
  float: right;
}
</style>