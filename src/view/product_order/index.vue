<template>
  <div>
    <Form :model="searchData" inline @submit.native.prevent="getData(1)" :label-width="80">

<!--      <Row>-->
<!--        <Col span="12">-->
<!--          <Button icon="ios-add" v-auth to="/product_order/add">添加</Button>-->
<!--        </Col>-->
<!--        <Col span="12">-->
<!--          <div style="text-align:right">-->
<!--            <Button type="primary" icon="ios-search" html-type="submit">搜索</Button>-->
<!--          </div>-->
<!--        </Col>-->
<!--      </Row>-->
    </Form>
    <Table
      :columns="tableColumns"
      :data="tableData.data"
      :loading="tableLoading"
      style="margin-top:20px;"
    >
      <template slot-scope="{ row }" slot="product_name">
        {{ row.product.name }}
      </template>
      <template slot-scope="{ row }" slot="order_pay">
        <span>{{ row.orderpay.order_sn }}</span>
      </template>
      <template slot-scope="{ row }" slot="order_type">
        <span>{{ log_type[row.order_type] }}</span>
      </template>
      <template slot-scope="{ row }" slot="address_id">
        <span>{{ row.address.address }}</span>
      </template>
      <template slot-scope="{ row }" slot="member_id">
        <span> {{ row.member.username}}</span>
      </template>
      <template slot-scope="{ row }" slot="status">
        <span> {{ log_status[row.status]}}</span>
      </template>
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" v-if="row.status == 1" @click="shipModalOperational(row.orderpay.order_sn, row.id)">发货</Button>
<!--        <Button-->
<!--          type="primary"-->
<!--          size="small"-->
<!--          v-auth-->
<!--          :to="'/product_order/edit?id='+row.id"-->
<!--        >编辑-->
<!--        </Button>-->
<!--        <Poptip-->
<!--          v-auth="'product_order/delete'"-->
<!--          transfer-->
<!--          confirm-->
<!--          title="您确定要删除这条数据吗？"-->
<!--          @on-ok="remove(row.id)"-->
<!--          style="margin-left:5px"-->
<!--        >-->
<!--          <Button type="error" size="small">删除</Button>-->
<!--        </Poptip>-->
      </template>
    </Table>
    <Modal v-model="shipModal" :title="shipTitle" @on-ok="modalOk">
      <div slot="close"></div>
      <label style="display: block">请选择快递公司</label>
      <Select v-model="formData.logistics_company" style="width:200px">
        <Option v-for="(item) in logisticsCompanyData" :value="item.id" :key="item.id">{{ item.com_name }}</Option>
      </Select>
      <label style="display: block; margin-top: 10px;">请输入快递单号</label>
      <Input placeholder="请输入快递单号" v-model="formData.logistics_receipt"></Input>
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
                shipModal: !1,
                shipTitle: '',
                log_type: {
                    1: "商品订单",
                    2: "升级订单"
                },
                log_status: {
                    0: "失败",
                    1: "待发货",
                    2: "已发货"
                },
                tableColumns: [
                    {
                        "title": "",
                        "key": "id"
                    },
                    {
                        title: "商品名",
                        slot: "product_name"
                    },
                    {
                        "title": "订单号",
                        "key": "order_pay_id",
                        "slot": "order_pay",
                        "align": "center"
                    },
                    {
                        "title": "类型",
                        "key": "order_type",
                        "slot": "order_type",
                        "align": "center"
                    },
                    {
                        title: "订单金额",
                        key: "total"
                    },
                    {
                        "title": "地址",
                        "key": "address_id",
                        "slot": "address_id",
                        "align": "center"
                    },
                    {
                        "title": "商品数量",
                        "key": "product_num",
                        "align": "center"
                    },
                    {
                        "title": "用户",
                        "key": "member_id",
                        "slot": "member_id",
                        "align": "center"
                    },
                    {
                        "title": "状态",
                        "key": "status",
                        "slot": "status",
                        "align": "center"
                    },
                    {
                        "title": "留言",
                        "key": "message",
                        "align": "center"
                    },
                    {
                        "title": "创建时间",
                        "key": "create_time",
                        "align": "center"
                    },
                    {
                        "title": "操作",
                        "slot": "action",
                        "width": 150,
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
                formData: {
                    'id': 0,
                    'logistics_company': '',
                    'logistics_receipt': ''
                },
                logisticsCompanyData: [],
                indexUrl: "/admin/product_order/index?status=1",
                deleteUrl: "/admin/product_order/delete",
                logisticsCompanyUrl: "/admin/express/index",
                sendUrl: "/admin/product_order/send"
            };
        },
        created() {
            this.getLogisticsCompany()
        },
        methods: {
            shipModalOperational(sn, id) {
                this.shipTitle = `${sn} 订单发货操作`;
                this.formData.id = id;
                this.shipModal = true;
            },
            modalOk() {
                if (this.sendUrl.length <= 0) {
                    return;
                }
                this.$axios.post(this.sendUrl, this.formData).then(res => {
                    if (res.code == 1) {
                        this.$Message.info(res.data);
                        this.reload();
                    } else {
                        this.$Message.error(res.msg);
                    }
                });
            },
            getLogisticsCompany() {
                if (this.logisticsCompanyUrl.length <= 0) {
                    return;
                }
                this.$axios.get(this.logisticsCompanyUrl).then(res => {
                    if (res.code == 1) {
                        this.logisticsCompanyData = res.data.data;
                    } else {
                        this.$Message.error(res.msg);
                    }
                });
            },
            reload() {
                let page = Math.ceil(this.tableData.total / this.tableData.per_page);
                if (page >= this.tableData.current_page) {
                    page = this.tableData.current_page;
                }
                this.getData(page);
            },
        },
        mixins: [indexPage],
    };
</script>
