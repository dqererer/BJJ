<template>
  <div class="title">
    {{ text }}
  </div>
</template>
<script>
import { getAllSearchData } from "@/api/support/search";
import { dictListType } from "@/api/styem/dict/type";
export default {
  name: "ComTitle",
  data(){
    return {};
  },
  props: {
    text: String,
  },
  created(){},
  methods: {},
};
</script>

<style lang="scss" scoped>
.title {
  padding: 0 20px 10px 10px;
  border-bottom: #2196f3 4px solid;
  display: inline-block;
  margin-bottom: 20px;
}
</style>


