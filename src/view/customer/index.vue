<template>
    <div>
        <Form :model="searchData" inline @submit.native.prevent="getData(1)" :label-width="80">
            
            <Row>
                <Col span="12">
                <Button icon="ios-add" v-auth to="/customer/add">添加</Button>
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
            <template slot-scope="{ row }" slot="action">
                <Button
                        type="primary"
                        size="small"
                        v-auth
                        :to="'/customer/edit?id='+row.id"
                >编辑</Button>
                <Poptip
                        v-auth="'customer/delete'"
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
                tableColumns:[{"title":"","key":"id"},{"title":"客服名","key":"name"},{"title":"二维码","key":"qrcode"},{"title":"","key":"create_time"},{"title":"操作","slot":"action","width":150,"align":"center"}],
                tableData: {
                    total: 0,
                    per_page: 0,
                    current_page: 1,
                    last_page: 1,
                    data: []
                },
                indexUrl:"/admin/customer/index",
                deleteUrl:"/admin/customer/delete",
            };
        },
        mixins: [indexPage],
    };
</script>