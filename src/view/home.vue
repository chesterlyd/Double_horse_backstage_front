<!--<template>-->
<!--  <div>-->
<!--    <Row :gutter="20">-->
<!--      <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">-->
<!--        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">-->
<!--          <count-to :end="infor.count" count-class="count-style"/>-->
<!--          <p>{{ infor.title }}</p>-->
<!--        </infor-card>-->
<!--      </i-col>-->
<!--    </Row>-->
<!--    <Row :gutter="20" style="margin-top: 10px;">-->
<!--      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">-->
<!--        <Card shadow>-->
<!--          <chart-pie style="height: 300px;" :value="pieData" text="用户访问来源"></chart-pie>-->
<!--        </Card>-->
<!--      </i-col>-->
<!--      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">-->
<!--        <Card shadow>-->
<!--          <chart-bar style="height: 300px;" :value="barData" text="每周用户活跃量"/>-->
<!--        </Card>-->
<!--      </i-col>-->
<!--    </Row>-->
<!--    <Row>-->
<!--      <Card shadow>-->
<!--        <example style="height: 310px;"/>-->
<!--      </Card>-->
<!--    </Row>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import InforCard from '_c/info-card'-->
<!--import CountTo from '_c/count-to'-->
<!--import { ChartPie, ChartBar } from '_c/charts'-->
<!--import Example from './example.vue'-->
<!--export default {-->
<!--  name: 'home',-->
<!--  components: {-->
<!--    InforCard,-->
<!--    CountTo,-->
<!--    ChartPie,-->
<!--    ChartBar,-->
<!--    Example-->
<!--  },-->
<!--  data () {-->
<!--    return {-->
<!--      inforCardData: [-->
<!--        { title: '新增用户', icon: 'md-person-add', count: 803, color: '#2d8cf0' },-->
<!--        { title: '累计点击', icon: 'md-locate', count: 232, color: '#19be6b' },-->
<!--        { title: '新增问答', icon: 'md-help-circle', count: 142, color: '#ff9900' },-->
<!--        { title: '分享统计', icon: 'md-share', count: 657, color: '#ed3f14' },-->
<!--        { title: '新增互动', icon: 'md-chatbubbles', count: 12, color: '#E46CBB' },-->
<!--        { title: '新增页面', icon: 'md-map', count: 14, color: '#9A66E4' }-->
<!--      ],-->
<!--      pieData: [-->
<!--        { value: 335, name: '直接访问' },-->
<!--        { value: 310, name: '邮件营销' },-->
<!--        { value: 234, name: '联盟广告' },-->
<!--        { value: 135, name: '视频广告' },-->
<!--        { value: 1548, name: '搜索引擎' }-->
<!--      ],-->
<!--      barData: {-->
<!--        Mon: 13253,-->
<!--        Tue: 34235,-->
<!--        Wed: 26321,-->
<!--        Thu: 12340,-->
<!--        Fri: 24643,-->
<!--        Sat: 1322,-->
<!--        Sun: 1324-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  mounted () {-->
<!--    //-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style lang="less">-->
<!--.count-style{-->
<!--  font-size: 50px;-->
<!--}-->
<!--</style>-->

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
    import indexPage from "../mixins/indexPage";

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

