<template>
    <div>
        <Form :model="formData" @submit.native.prevent="save" :label-width="80">
            <FormItem label="客服名"><Input v-model="formData.name" /></FormItem>
<FormItem label="二维码"><Input v-model="formData.qrcode" /></FormItem>

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
                formData:{"name":"","qrcode":""},
                formLoading: false,
                editUrl:"/admin/customer/edit"
            };
        },
        mixins:[editPage]
    };
</script>