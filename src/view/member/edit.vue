<template>
    <div>
        <Form :model="formData" @submit.native.prevent="save" :label-width="80">
            <FormItem label="用户名"><Input v-model="formData.username" /></FormItem>
<FormItem label="邀请码"><Input v-model="formData.invite_code" /></FormItem>
<FormItem label="密码"><Input v-model="formData.password" /></FormItem>
<FormItem label="支付密码"><Input v-model="formData.pay_password" /></FormItem>
<FormItem label="余额"><Input v-model="formData.balance" /></FormItem>
<FormItem label="状态  0-禁用 1-启用"><Select v-model="formData.status"><Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option></Select></FormItem>
<FormItem label="等级 0-游客"><Input v-model="formData.lev" type="number" /></FormItem>

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
                formData:{"username":"","invite_code":"","password":"","pay_password":"","balance":"","status":"","lev":""},
                formLoading: false,
                editUrl:"/admin/member/edit"
            };
        },
        mixins:[editPage]
    };
</script>