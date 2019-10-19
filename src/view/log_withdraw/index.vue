<template>
  <div>
    <Form :model="searchData" inline @submit.native.prevent="getData(1)" :label-width="80">

      <Row>
<!--        <Col span="12">-->
<!--          <Button icon="ios-add" v-auth to="/log_withdraw/add">添加</Button>-->
<!--        </Col>-->
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
      <template slot-scope="{ row }" slot="details">
        <Button type="primary" size="small" @click="seeDetails(row.id, row.details)">查看内容</Button>
      </template>
      <template slot-scope="{ row }" slot="status">
        {{ row.status == 0 ? "待审核" : (row.status == 1 ? "已通过" : (row.status == -1 ? "已驳回" : "异常"))}}
      </template>
      <template slot-scope="{ row }" slot="type">
        {{ row.type == 1 ? "支付宝" : "银行卡"}}
      </template>
      <template slot-scope="{ row }" slot="action">
        <Poptip
          transfer
          confirm
          title="您确定要通过提现申请吗？"
          @on-ok="reject(row.id, 1)"
          style="margin-left:5px"
        >
          <Button type="primary" size="small">通过</Button>
        </Poptip>
        <Button type="error" size="small" @click="rejectModel(row.id, 0, row.details)">驳回</Button>
      </template>
    </Table>
    <Modal
      v-model="detailsStatus"
      :title="detailsID"
      footer-hide>
      <div slot="close"></div>
    </Modal>
    <Modal
      v-model="reasonStatus"
      title="驳回理由"
      @on-ok="reject(reasonArray['id'], reasonArray['status'], reasonArray['details'])">
      <div slot="close"></div>
      <Input v-model="reason" placeholder="请输入驳回理由" clearable/>
    </Modal>
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
                detailsStatus: !1,
                detailsID: '',
                detailsValue: '',
                reason: '',
                reasonArray: [],
                reasonStatus: !1,
                tableColumns: [
                    {
                        "title": "",
                        "key": "id"
                    },
                    {
                        "title": "用户ID",
                        "key": "member_id"
                    },
                    {
                        "title": "提现金额",
                        "key": "money"
                    },
                    {
                        "title": "内容",
                        "key": "details",
                        slot: "details"
                    },
                    {
                        "title": "驳回理由",
                        "key": "content"
                    },
                    {
                        "title": "状态",
                        "key": "status",
                        slot: "status"
                    },
                    {
                        "title": "类型",
                        "key": "type",
                        slot: "type"
                    },
                    {
                        "title": "创建时间",
                        "key": "create_time"
                    },
                    {
                        "title": "操作",
                        "slot": "action",
                        "width": 150,
                        "align": "center"
                    }],
                tableData: {
                    total: 0,
                    per_page: 0,
                    current_page: 1,
                    last_page: 1,
                    data: []
                },
                indexUrl: "/admin/log_withdraw/index",
                deleteUrl: "/admin/log_withdraw/delete",
                reviewUrl: "/admin/log_withdraw/reviewWithdraw"
            };
        },
        methods: {
            seeDetails(id, details) {
                this.detailsID = `查看记录ID：${id} 的内容`;
                this.detailsValue = details;
                this.detailsStatus = !0;
            },
            rejectModel(id, status, details) {
                this.reasonStatus = !0;
                this.reason ='';
                this.reasonArray = {
                    'id': id,
                    'status': status,
                    'details': details
                };
            },
            reject(id, status, details = '') {
                if (this.reviewUrl.length <= 0) {
                    return;
                }
                this.$axios.post(this.reviewUrl, {
                    id: id,
                    reason: this.reason,
                    status: status
                }).then(res => {
                    this.$Modal.remove();
                    if (res.code == 1) {
                        this.$Message.info(res.data);
                        this.tableData.total--;
                        this.reload();
                    } else {
                        this.$Message.error(res.msg);
                    }
                });
                if (status == 0) {
                    this.detailsID = `查看记录ID：${id} 的内容`;
                    this.detailsValue = details;
                    this.detailsStatus = !0;
                }
            }
        },
        mixins: [indexPage],
    };
</script>
