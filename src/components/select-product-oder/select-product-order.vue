<template>
  <Modal :value="show" title="选择订单" @input="handlerInput" :width="80" @on-ok="handlerDone">
    <div style="height:60vh;overflow:auto;">
      <Form :model="searchData" inline @submit.native.prevent="getData(1)" :label-width="80">
        <FormItem label="商品分类">
          <Cascader :data="product_typeList" @on-change="changeCategory" change-on-select></Cascader>
        </FormItem>
        <FormItem label="订单号">
          <Input v-model="searchData.order_sn"/>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="ios-search" html-type="submit">搜索</Button>
        </FormItem>
      </Form>
      <Table :columns="orderColumns" :data="orderData.data" :loading="tableLoading">
        <template
          slot-scope="{ row }"
          slot="status"
        >{{ orderStatus[row.status] }}
        </template>
        <template slot-scope="{ row }" slot="pay_type">{{payList[row.pay_type]}}</template>
        <template slot-scope="{ row }" slot="action">
          <!-- <Button type="primary" size="small" v-auth disabled>编辑</Button> -->
          <Button type="primary" size="small" @click="getGoodsTableData(row.id)">添加</Button>
          <!--          <Button type="success" size="small" v-auth @click="getGoodsTableData(row.id)">查看</Button>-->
          <!--          <Modal v-model="orderInfo" title="订单详情" width="1000" @on-ok="ok" @on-cancel="cancel">-->
          <!--            <Table :columns="goodsTableColumns" :data="goodsTableData.data"></Table>-->
          <!--            <p>商品合计总价：{{ allGoodsTotal }}</p>-->
          <!--          </Modal>-->
        </template>
      </Table>
      <Drawer v-model="selectGoods" title="订单商品" :inner="true" :transfer="false" :width="80" :mask-closable="false">
        <Table :columns="goodsTableColumns" :data="goodsTableData.data">
          <template slot="action" slot-scope="{ row }">
            <Button type="success" @click="showOrder(row)">确定</Button>
          </template>
        </Table>
      </Drawer>
      <p style="margin-top:20px;color:#464c5b;font-size:14px">已选订单</p>
      <Table :columns="goodsTableColumns" :data="selectedData">
        <template slot="action" slot-scope="{ index }">
          <Button type="error" @click="removeSelected(index)">移除</Button>
        </template>
      </Table>
    </div>
  </Modal>
</template>

<script>
    export default {
        name: "SelectProductOrder",
        data() {
            return {
                goodsTableColumns: [
                    {
                        title: "订单",
                        key: "product_order_id"
                    },
                    {
                        title: "商品",
                        key: "product_id"
                    },
                    {
                        title: "属性/规格",
                        key: "sku_id"
                    },
                    {
                        title: "数量",
                        key: "num"
                    },
                    {
                        title: "单价",
                        key: "price"
                    },
                    {
                        title: "总价",
                        key: "total"
                    },
                    {
                        title: "属性/规格",
                        key: "sku_info"
                    },
                    {
                        title: "添加时间",
                        key: "create_time"
                    },
                    {title: "操作", slot: "action", width: 150, align: "center"}
                ],
                goodsTableData: {
                    total: 0,
                    per_page: 0,
                    current_page: 1,
                    last_page: 1,
                    data: []
                },
                product_typeList: [
                    {
                        value: 1,
                        label: "直销订单"
                    },
                    {
                        value: 2,
                        label: "新零售订单"
                    },
                    {
                        value: 3,
                        label: "微商订单"
                    }
                ],
                searchData: {
                    order_sn: ""
                },
                orderColumns: [
                    {title: "订单ID", key: "id", width: 75},
                    {title: "订单号", key: "order_sn", width: 150},
                    {title: "用户id", key: "member_id", width: 75},
                    {title: "订单金额(不含运费)", key: "total"},
                    {title: "运费", key: "carriage", width: 70},
                    {title: "状态", key: "status", slot: "status"},
                    {title: "支付方式", key: "pay_type", slot: "pay_type"},
                    {title: "省", key: "pro_name"},
                    {title: "市", key: "city_name"},
                    {title: "区", key: "area_name"},
                    {title: "客服订单", key: "is_customer_serve_order"},
                    {title: "操作", slot: "action", width: 150, align: "center"}
                ],
                orderStatus: {
                    '-1': '取消订单',
                    1: '待付款(未支付)',
                    2: '待发货(已付款)',
                    3: "待收货(已发货)",
                    4: "待评价(已收货)",
                    5: "已完成(已评价)",
                    6: "已申请售后(退货)",
                },
                customerServeOrder: {
                    1: '是',
                    2: '否'
                },
                orderData: [],
                order_id: '',
                selectedData: [],
                tmpSelect: {},
                tableLoading: false,
                selectGoods: false,
                payList: {},
                payUrl: "/admin/pay_channel/index",
                oderGoodsUrl: "/admin/product_orderdetails/index",
            };
        },
        props: {
            /**
             * 已经选中的数据
             */
            value: {
                type: Array,
                default: () => []
            },
            /**
             * 是否显示
             */
            show: {
                type: Boolean,
                default: false
            }
        },
        created() {
            this.getData();
            this.getPayList();
        },
        methods: {
            getData(page) {
                this.tableLoading = true;
                let data = this.searchData;
                data.page = page;
                this.$axios.get("/admin/product_order/index", data).then(res => {
                    this.tableLoading = false;
                    this.orderData = res.data;
                });
            },
            getGoodsTableData(orderId) {
                this.$axios.get(this.oderGoodsUrl, {product_order_id: orderId}).then(res => {
                    if (res.code == 1) {
                        this.order_id = orderId;
                        this.goodsTableData = res.data;
                        for (let i = 0; i < this.goodsTableData.data.length; i++) {
                            this.allGoodsTotal += Number(this.goodsTableData.data[i]["total"]);
                        }
                        this.selectGoods = true
                    } else {
                        this.$Message.error(res.msg);
                    }
                });
            },
            showOrder(row) {
                if (this.selectedData.length == 1) {
                    this.$Message.error("只能选择一个商品");
                    return;
                }
                row['order_id'] = this.order_id;
                this.selectedData.push(row);
                this.selectGoods = false;
                //   this.temSelect = row;
                //   const orderId = this.tmpSelect.id;
                //   if (this.selectedData.some(item => item.id == skuId)) {
                //     this.$Message.error("此商品已选择");
                //     return;
                //   }
            },
            handlerInput(show) {
                this.$emit("update:show", show);
            },
            handlerDone() {
                this.$emit("input", this.selectedData);
            },
            changeCategory(value) {
                this.searchData.order_type = value[value.length - 1];
            },
            getPayList() {
                this.$axios.get(this.payUrl).then(res => {
                    if (res.code == 1) {
                        // let temp = {};
                        for (let i = 0; i < res.data.data.length; i++) {
                            this.payList[res.data.data[i]["value"]] = res.data.data[i]["label"];
                        }
                        // this.payList = temp
                    } else {
                        this.$Message.error(res.msg);
                    }
                });
            },
            removeSelected(index) {
                this.selectedData.splice(index, 1);
            }
        }
    };
</script>

<style>
</style>
