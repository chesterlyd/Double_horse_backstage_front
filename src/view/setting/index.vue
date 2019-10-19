<template>
  <div>
    <Form :model="searchData" inline @submit.native.prevent="getData(1)" :label-width="80">

      <Row>
        <Col span="12">
          <Button icon="ios-add" v-auth to="/setting/add">添加</Button>
        </Col>
        <Col span="12">
          <div style="text-align:right">
            <Button type="primary" icon="ios-search" html-type="submit">搜索</Button>
          </div>
        </Col>
      </Row>
    </Form>
    <Table
      :columns="tableColumns"
      :data="tableData.data"
      :loading="tableLoading"
      style="margin-top:20px;"
    >
      <template slot-scope="{ row }" slot="val">
          <div class="setting_value" @click="valContent(row.val)">
            {{ row.val }}
          </div>
      </template>
      <template slot-scope="{ row }" slot="action">
        <Button
          type="primary"
          size="small"
          v-auth
          :to="'/setting/edit?id='+row.id"
        >编辑
        </Button>
        <Poptip
          v-auth="'setting/delete'"
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
    <Modal v-model="valShow" footer-hide>
      <div slot="close"></div>
      <div class="tip_value">
        {{valueContent}}
      </div>
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
                valueContent: '',
                valShow: !1,
                tableColumns: [
                    {
                        "title": "ID",
                        "key": "id"
                    },
                    {
                        "title": "模块名称",
                        "key": "name"
                    },
                    {
                        "title": "模块组",
                        "key": "module"
                    },
                    {
                        "title": "模块标识",
                        "key": "code"
                    },
                    {
                        "title": "模块值",
                        "key": "val",
                        slot: "val",
                        width: 160
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
                indexUrl: "/admin/setting/index",
                deleteUrl: "/admin/setting/delete",
            };
        },
        methods: {
            valContent(data) {
                this.valueContent = data;
                this.valShow = !0;
            }
        },
        mixins: [indexPage],
    };
</script>
<style>
  .setting_value {
    width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tip_value {
    /*width: 160px;*/
    display: block;
    word-break: break-all;
    word-wrap: break-word;
  }
</style>
