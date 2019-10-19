<template>
  <div>
    <Form :model="searchData" inline @submit.native.prevent="getData(1)" :label-width="80">

      <Row>
        <Col span="12">
          <Button icon="ios-add" v-auth to="/product/add">添加</Button>
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
      <template slot-scope="{ row }" slot="type">
        {{ product_type[row.type] }}
      </template>
      <template slot-scope="{ row }" slot="main_picture">
        <Poptip placement="right" width="400" trigger="hover" transfer>
          <img :src="path+row.main_picture" alt style="max-width:100%;"/>
          <img :src="path+row.main_picture" alt style="max-width:100%" slot="content"/>
        </Poptip>
      </template>
      <template slot-scope="{ row }" slot="status">
        {{ product_status[row.status] }}
      </template>
      <template slot-scope="{ row }" slot="action">
        <Button
          type="primary"
          size="small"
          v-auth
          :to="'/product/edit?id='+row.id"
        >编辑
        </Button>
        <Poptip
          v-auth="'product/delete'"
          transfer
          confirm
          title="您确定要删除这条数据吗？"
          @on-ok="remove(row.id)"
          style="margin-left:5px"
        >
          <Button type="error" size="small">删除</Button>
        </Poptip>
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
                product_type: {
                    1: "普通商品",
                    2: "升级商品"
                },
                product_status: {
                    0: "下架",
                    1: "上架"
                },
                tableColumns: [
                    {
                        "title": "",
                        "key": "id"
                    },
                    {
                        "title": "商品名称",
                        "key": "name"
                    },
                    {
                        "title": "类型",
                        "key": "type",
                        "slot": "type",
                        "align": "center"
                    },
                    {
                        "title": "价格",
                        "key": "price"
                    },
                    {
                        "title": "主图",
                        "key": "main_picture",
                        "slot": "main_picture",
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
                        "key": "create_time"
                    },
                    {
                        "title": "等级",
                        "key": "lev"
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
                indexUrl: "/admin/product/index",
                deleteUrl: "/admin/product/delete",
            };
        },
        mixins: [indexPage],
    };
</script>
