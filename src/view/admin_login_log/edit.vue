<template>
    <div>
        <Form :model="formData" @submit.native.prevent="save" :label-width="80">
            
            <FormItem>
                <Button type="primary" html-type="submit" :loading="formLoading">保存</Button>
                <Button @click="$router.go(-1);" style="margin-left:10px;">返回</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    import editPage from "../../mixins/editPage";
    export default {
        data() {
            return {
                formData:{},
                formLoading: false,
                editUrl:"/admin/admin_login_log/edit"
            };
        },
        mixins:[editPage]
    };
</script>