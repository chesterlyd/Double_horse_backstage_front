<template>
    <div>
        <Form :model="formData" @submit.native.prevent="save" :label-width="80">
            <FormItem label="用户ID"><Select v-model="formData.member_id"><Option v-for="item in member_idList" :value="item.value" :key="item.value">{{ item.label }}</Option></Select></FormItem>
<FormItem label="类型 1-直推奖励 2-市场补贴 3-分润"><Input v-model="formData.type" type="number" /></FormItem>
<FormItem label="收益金额"><Input v-model="formData.money" /></FormItem>
<FormItem label="状态 0-未执行 1-已执行"><Select v-model="formData.status"><Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option></Select></FormItem>

            <FormItem>
                <Button type="primary" html-type="submit" :loading="formLoading">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    import editPage from "../../mixins/editPage";
    export default {
        data() {
            return {
                formData:{"member_id":"","type":"","money":"","status":""},
                formLoading: false,
                editUrl:"/admin/log_income/edit"
            };
        },
        mixins:[editPage]
    };
</script>