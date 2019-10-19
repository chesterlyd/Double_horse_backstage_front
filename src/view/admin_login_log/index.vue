<template>
  <div>
    <Table
      :columns="tableColumns"
      :data="tableData.data"
      :loading="tableLoading"
      style="margin-top:20px;"
    ></Table>
    <Page
      style="text-align:right;margin-top:20px"
      :total="tableData.total"
      :page-size="tableData.per_page"
      :current="tableData.current_page"
      show-total
      @on-change="getData"
    />
  </div>
</template>
<script>
import indexPage from "../../mixins/indexPage";
export default {
  data() {
    return {
      tableColumns: [
        { title: "ID", key: "id" },
        { title: "登录用户", key: "user" },
        { title: "登录ip", key: "ip" },
        { title: "端口", key: "port" },
        { title: "浏览器", key: "browser" },
        { title: "注释", key: "note" },
        { title: "是否成功登录", key: "status" },
        { title: "登录时间", key: "create_time" }
      ],
      tableData: {
        total: 0,
        per_page: 0,
        current_page: 1,
        last_page: 1,
        data: []
      },
      indexUrl: "/admin/admin_login_log/index"
    };
  },
  mixins: [indexPage]
};
</script>
