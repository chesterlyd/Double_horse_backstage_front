<template>
    <div>
        <Form :model="formData" @submit.native.prevent="save" :label-width="80">
            <FormItem label="用户ID"><Select v-model="formData.member_id"><Option v-for="item in member_idList" :value="item.value" :key="item.value">{{ item.label }}</Option></Select></FormItem>
<FormItem label="金额"><Input v-model="formData.money" /></FormItem>
<FormItem label="被操作用户"><Input v-model="formData.transfer_member" type="number" /></FormItem>
<FormItem label="类型 1-转入 2-转出"><Input v-model="formData.type" type="number" /></FormItem>

            <FormItem>
                <Button type="primary" html-type="submit" :loading="formLoading">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    import addPage from "../../mixins/addPage";
    export default {
        data() {
            return {
                formData:{"member_id":"","money":"","transfer_member":"","type":""},
                formLoading: false,
                addUrl: "/admin/log_transfer/add"
            };
        },
        mixins: [addPage],
    };
</script>