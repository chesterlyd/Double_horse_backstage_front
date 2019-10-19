<template>
  <div>
    <Form :model="formData" @submit.native.prevent="save" :label-width="80">
      <FormItem label="客服名"><Input v-model="formData.name"/></FormItem>
      <FormItem label="二维码">
        <Row>
          <Col span="24">
            <singleImage
              :uploadAction="path+'/admin/tool/uploadImage'"
              v-model="formData.qrcode"
              :maxFileCounts="1"
            ></singleImage>
          </Col>
        </Row>
      </FormItem>

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
                formData: {
                    "name": "",
                    "qrcode": ""
                },
                formLoading: false,
                addUrl: "/admin/customer/add"
            };
        },
        mixins: [addPage],
    };
</script>
