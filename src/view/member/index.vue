<template>
  <div>
    <Form :model="searchData" inline @submit.native.prevent="getData(1)">
      <Row>
        <Col span="12">
          <div>
            <FormItem>
              <Input v-model="searchData.username" placeholder="请输入用户名" clearable/>
            </FormItem>
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
      <template slot-scope="{ row }" slot="parentMember">
        {{ row.tree.parentinfo.username }}
      </template>
      <template slot-scope="{ row }" slot="status">
        <span> {{ member_status[row.status] }}</span>
      </template>
      <template slot-scope="{ row }" slot="lev">
        <span> {{ member_lev[row.lev] }}</span>
      </template>
      <template slot-scope="{ row }" slot="action">
        <Button
          type="primary"
          size="small"
          v-auth
          :to="'/member/recharge?id='+row.id"
        >充值
        </Button>
        <!--        <Button-->
        <!--          type="primary"-->
        <!--          size="small"-->
        <!--          v-auth-->
        <!--          :to="'/member/edit?id='+row.id"-->
        <!--        >编辑-->
        <!--        </Button>-->
        <Poptip
          v-auth="'member/complain'"
          transfer
          confirm
          title="您确定要封禁这这个会员吗？"
          @on-ok="complain(row.id)"
          style="margin-left:5px"
        >
          <Button type="error" size="small">封禁</Button>
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
                member_status: {
                    false: "已封禁",
                    true: "正常"
                },
                member_lev: {
                    0: "游客",
                    1: "会员",
                    2: "加盟商",
                    3: "合伙人"
                },
                tableColumns: [
                    {
                        "title": "",
                        "key": "id"
                    },
                    {
                        "title": "用户名",
                        "key": "username"
                    },
                    {
                        title: '上级用户',
                        slot: 'parentMember'
                    },
                    {
                        "title": "邀请码",
                        "key": "invite_code"
                    },
                    {
                        "title": "余额",
                        "key": "balance"
                    },
                    {
                        "title": "状态",
                        "key": "status",
                        "slot": "status",
                        "align": "center"
                    },
                    {
                        "title": "等级",
                        "key": "lev",
                        "slot": "lev",
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
                indexUrl: "/admin/member/index?status=1",
                deleteUrl: "/admin/member/delete",
                complainUrl: "/admin/member/complain"
            };
        },
        mixins: [indexPage],
        methods: {
            complain(id) {
                if (this.complainUrl.length <= 0) {
                    return;
                }
                this.$axios.post(this.complainUrl, {
                    id: id,
                    status: 0,
                }).then(res => {
                    this.$Modal.remove();
                    if (res.code == 1) {
                        this.$Message.info("封号成功");
                        this.tableData.total--;
                        this.reload();
                    } else {
                        this.$Message.error(res.msg);
                    }
                });
            }
        }
    };
</script>
