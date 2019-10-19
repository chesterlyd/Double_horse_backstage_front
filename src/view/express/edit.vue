<template>
  <div>
    <Form :model="formData" @submit.native.prevent="save" :label-width="80">
      <FormItem label="快递公司"><Input v-model="formData.com_name"/></FormItem>

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
                formData: {"com_name": ""},
                formLoading: false,
                editUrl: "/admin/express/edit"
            };
        },
        mixins: [editPage]
    };
</script>
