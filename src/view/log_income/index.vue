<template>
  <div>
    <Form :model="searchData" inline @submit.native.prevent="getData(1)" :label-width="80">
      <Row>
        <Col span="12">
          <div>
            <DatePicker v-model="dividedValue" @on-ok="ObtainDate" confirm type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker>
            <Button type="primary" icon="md-flame" @click="sumdl">计算分润</Button>
          </div>
        </Col>
<!--        <Col span="12">-->
<!--          <div style="text-align:right">-->
<!--            <Button type="primary" icon="ios-search" html-type="submit">搜索</Button>-->
<!--          </div>-->
<!--        </Col>-->
      </Row>
    </Form>
    <Table
      :columns="tableColumns"
      :data="tableData.data"
      :loading="tableLoading"
      style="margin-top:20px;"
    >
      <template slot-scope="{ row }" slot="member">
        <span>{{ row.memberinfo.username }}</span>
      </template>
      <template slot-scope="{ row }" slot="type">
        <span>{{ log_type[row.type] }}</span>
      </template>
      <template slot-scope="{ row }" slot="status">
        <span>{{ log_status[row.status] }}</span>
      </template>
    </Table>
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
                dividedValue: '',
                log_type: {
                    1: "直推奖励",
                    2: "市场补贴",
                    3: "分润",
                },
                log_status: {
                    0: "未执行",
                    1: "已执行"
                },
                tableColumns: [
                    {
                        "title": "",
                        "key": "id"
                    },
                    {
                        "title": "用户ID",
                        "key": "memberinfo",
                        "slot": "member",
                        "align": "center"
                    },
                    {
                        "title": "类型",
                        "key": "type",
                        "slot": "type",
                        "align": "center"
                    },
                    {
                        "title": "收益金额",
                        "key": "money",
                        "align": "center"
                    },
                    {
                        "title": "状态",
                        "key": "status",
                        "slot": "status",
                        "align": "center"
                    },
                    {
                        "title": "创建时间",
                        "key": "create_time",
                        "align": "center"
                    }
                ],
                tableData: {
                    total: 0,
                    per_page: 0,
                    current_page: 1,
                    last_page: 1,
                    data: []
                },
                formData: {},
                indexUrl: "/admin/log_income/index",
                deleteUrl: "/admin/log_income/delete",
                dividedUrl: "/admin/log_income/sumDivide"
            };
        },
        methods: {
            ObtainDate() {
                let start_time = new Date(this.dividedValue[0]);
                let end_time = new Date(this.dividedValue[1]);
                this.formData.start_time = start_time;
                this.formData.end_time = end_time;
            },
            sumdl() {
                if (this.dividedUrl.length < 0) {
                    return;
                }
                this.$axios.post(this.dividedUrl, this.formData).then(res => {
                    if (res.code == 1) {
                        this.$Message.info(res.data)
                    }
                })
            }
        },
        mixins: [indexPage],
    };
</script>
