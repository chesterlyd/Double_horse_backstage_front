<template>
    <div>
        <Form :model="formData" @submit.native.prevent="save" :label-width="80">
            <FormItem label="用户ID"><Select v-model="formData.member_id"><Option v-for="item in member_idList" :value="item.value" :key="item.value">{{ item.label }}</Option></Select></FormItem>
<FormItem label="提现金额"><Input v-model="formData.money" /></FormItem>
<FormItem label="内容"><Input v-model="formData.details" /></FormItem>
<FormItem label="驳回理由"><editor ref="editor" v-model="formData.content" :uploadImgServer="path+'/admin/tool/editorUpload'" /></FormItem>
<FormItem label="状态 0-待审核 1-已通过 -1-已驳回"><Select v-model="formData.status"><Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option></Select></FormItem>
<FormItem label="类型 1-微信、支付宝 2-银行卡"><Input v-model="formData.type" type="number" /></FormItem>

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
                formData:{"member_id":"","money":"","details":"","content":"","status":"","type":""},
                formLoading: false,
                addUrl: "/admin/log_withdraw/add"
            };
        },
        mixins: [addPage],
    };
</script>