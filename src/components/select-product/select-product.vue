<template>
  <Modal :value="show" title="选择商品" @input="handlerInput" :width="80" @on-ok="handlerDone">
    <div style="height:60vh;overflow:auto;">
      <Form :model="searchData" inline @submit.native.prevent="getData(1)" :label-width="80">
        <FormItem label="商品分类">
          <Cascader :data="category_idList" @on-change="changeCategory" change-on-select></Cascader>
        </FormItem>
        <FormItem label="名称">
          <Input v-model="searchData.product_name" />
        </FormItem>
        <FormItem>
          <Button type="primary" icon="ios-search" html-type="submit">搜索</Button>
        </FormItem>
      </Form>
      <Table :columns="productColumns" :data="productData.data" :loading="tableLoading">
        <template slot-scope="{row}" slot="category">
          <Tooltip
            v-if="row.category!=null"
            placement="right"
            :content="row.category.full_name"
            theme="light"
          >{{row.category.cate_name}}</Tooltip>
        </template>
        <template slot-scope="{row}" slot="img">
          <Poptip placement="right" width="400" trigger="hover" transfer>
            <img :src="path+row.img" alt style="max-height:20px;max-width:100%" />
            <img :src="path+row.img" alt style="max-width:100%" slot="content" />
          </Poptip>
        </template>
        <template slot-scope="{row}" slot="product_type">{{product_typeList[row.product_type]}}</template>
        <template slot-scope="{row}" slot="action">
          <Button type="primary" size="small" @click="showSku(row)">添加</Button>
        </template>
      </Table>
      <Page
        style="text-align:right;margin-top:20px"
        :total="productData.total"
        :page-size="productData.per_page"
        :current="productData.current_page"
        show-total
        @on-change="getData"
      />
      <p style="margin-top:20px;color:#464c5b;font-size:14px">已选商品</p>
      <Table :columns="selectedColumns" :data="selected" slot="content">
        <template slot-scope="{row}" slot="category">
          <Tooltip
            v-if="row.category!=null"
            placement="right"
            :content="row.category.full_name"
            theme="light"
          >{{row.category.cate_name}}</Tooltip>
        </template>
        <template slot-scope="{row}" slot="img">
          <Poptip placement="right" width="400" trigger="hover" transfer>
            <img :src="path+row.img" alt style="max-height:20px;max-width:100%" />
            <img :src="path+row.img" alt style="max-width:100%" slot="content" />
          </Poptip>
        </template>
        <template slot-scope="{row}" slot="product_type">{{product_typeList[row.product_type]}}</template>
        <template slot-scope="{index}" slot="num">
          <InputNumber
            :min="0"
            v-model="selected[index].sku_num"
            :max="checkStock?row.stock:Infinity"
          ></InputNumber>
        </template>
        <template slot-scope="{index}" slot="action">
          <Button type="error" size="small" @click="removeSelected(index)">移除</Button>
        </template>
      </Table>
      <Drawer
        title="选择属性"
        v-model="selectAttr"
        :inner="true"
        :transfer="false"
        :mask-closable="false"
      >
        <div v-for="(attr,index) in tmpSku.attr" :key="index">
          <div style="color:#9ea7b4;margin:10px 0 5px;">{{attr.title}}</div>
          <RadioGroup type="button" v-model="attr.selected" @on-change="changeAttr">
            <Radio :label="val.id" v-for="val in attr.val" :key="val.id">{{val.label}}</Radio>
          </RadioGroup>
        </div>
        <div style="color:#9ea7b4;margin:20px 0;" v-if="typeof tmpSelect.stock !=='undefined'">
          已选择：{{tmpSelect.attr_symbol_name}} 库存：{{tmpSelect.stock}} 售价：{{tmpSelect.price}}
          <Form :label-width="40" v-if="showNumber">
            <FormItem label="数量">
              <InputNumber
                :max="checkStock?tmpSelect.stock:Infinity"
                :min="0"
                v-model="tmpSelect.num"
              ></InputNumber>
            </FormItem>
          </Form>
        </div>
        <div class="demo-drawer-footer">
          <Button style="margin-right: 8px" @click="selectAttr = false">取消</Button>
          <Button
            type="primary"
            @click="selectDone"
            :disabled="typeof tmpSelect.stock ==='undefined'"
          >确定</Button>
        </div>
      </Drawer>
    </div>
  </Modal>
</template>
<script>
import { cloneObj } from "../../libs/clone.js";
import { productType as productTypeList } from "@/static-data"
export default {
  name: "SelectProduct",
  data() {
    return {
      selected: [],
      productColumns: [
        { title: "缩略图", key: "img", slot: "img", width: 100 },
        { title: "商品名", key: "product_name" },
        { title: "分类", slot: "category" },
        { title: "商品类型", slot: "product_type" },
        { title: "操作", slot: "action" }
      ],
      productData: {
        total: 0,
        per_page: 0,
        current_page: 1,
        last_page: 1,
        data: []
      },
      selectAttr: false,
      product_typeList: productTypeList,
      tmpSku: [],
      tmpSelect: {},
      searchData: {},
      category_idList: [],
      tableLoading: false
    };
  },
  computed: {
    selectedColumns() {
      let selectedColumns = [
        { title: "缩略图", key: "img", slot: "img", width: 100 },
        { title: "商品名", key: "product_name" },
        { title: "分类", slot: "category" },
        { title: "商品类型", slot: "product_type" }
      ];
      if (this.selectSku) {
        selectedColumns.push({ title: "所选属性", key: "sku_name" });
        selectedColumns.push({ title: "价格", key: "price" });
      }
      if (this.showNumber) {
        selectedColumns.push({ title: "数量", slot: "num" });
      }
      selectedColumns.push({ title: "操作", slot: "action" });
      return selectedColumns;
    }
  },
  props: {
    /**
     * 已经选中的数据
     */
    value: {
      type: Array,
      default: () => []
    },
    /**
     * 是否需要选择数量
     */
    showNumber: {
      type: Boolean,
      default: false
    },
    /**
     * 选择数量时是否检查库存
     */
    checkStock: {
      type: Boolean,
      default: true
    },
    /**
     * 是否显示
     */
    show: {
      type: Boolean,
      default: false
    },
    /**
     * 是否选择sku
     */
    selectSku: {
      type: Boolean,
      default: true
    },
    /**
     * 允许的商品类型，true--全部类型
     */
    productType: {
      type: [Boolean, Array],
      default: true,
      validator: val => {
        if (val === false) {
          // eslint-disable-next-line
          console.error('Invalid prop: "productType" must be true or Array');
          return false;
        }
        return true;
      }
    },
    /**
     * 最多添加几种不同的商品
     */
    maxLength: {
      type: Number,
      default: Infinity
    }
  },
  watch: {
    value(val) {
      if (val.length == 0) {
        this.selected = [];
        return;
      }
      if (typeof val[0].product_name !== "undefined") {
        this.selected = cloneObj(val);
        return;
      }
      this.$axios.get("/admin/product/getSelected", { data: val }).then(res => {
        this.selected = res;
      });
    },
    show(val) {
      if (val && this.category_idList.length < 1) {
        this.getData();
        this.$axios.get("/admin/category/selectData").then(res => {
          if (res.code == 1) {
            this.category_idList = res.data;
          }
        });
      }
    }
  },
  methods: {
    getData(page) {
      this.tableLoading = true;
      let data = this.searchData;
      data.page = page;
      data.isSelect = 1;
      if (this.productType !== true) {
        data.type = this.productType;
      }
      this.$axios.get("/admin/product/index", data).then(res => {
        this.tableLoading = false;
        this.productData = res.data;
      });
    },
    changeCategory(value) {
      this.searchData.category_id = value[value.length - 1];
    },
    handlerInput(show) {
      this.$emit("update:show", show);
    },
    showSku(row) {
      if (!this.selectSku) {
        return this.selectDoneWithoutSku(row);
      }
      let sku = {
        attr: [],
        sku: {}
      };
      row.attr.forEach(attr => {
        let tmp = {
          title: "",
          val: [],
          selected: ""
        };
        tmp.title = attr.name;
        attr.val.forEach(val => {
          tmp.val.push({
            id: val.id,
            label: val.attr_value
          });
        });
        sku.attr.push(tmp);
      });
      row.sku.forEach(item => {
        sku.sku[item.attr_symbol_path] = item;
      });
      this.tmpSku = sku;
      this.tmpSelect = {
        goods_id: row.id
      };
      this.selectAttr = true;
    },
    changeAttr() {
      let path = [];
      this.tmpSku.attr.forEach(item => {
        path.push(item.selected);
      });
      path = path.join(",");
      if (typeof this.tmpSku.sku[path] === "object") {
        this.tmpSku.sku[path].num = 0;
        this.tmpSelect = this.tmpSku.sku[path];
      }
    },
    selectDone() {
      const skuId = this.tmpSelect.id;
      if (this.selected.some(item => item.sku_id == skuId)) {
        this.$Message.error("此商品已选择");
        return;
      }
      if (this.selected.length >= this.maxLength) {
        this.$Message.error("最多选择" + this.maxLength + "件商品");
        return;
      }
      const id = this.tmpSelect.product_id;
      let row = {};
      this.productData.data.every(item => {
        if (item.id == id) {
          row = item;
          return false;
        }
        return true;
      });
      this.selected.push({
        id: id,
        img: row.img,
        product_name: row.product_name,
        category: row.category,
        product_type: row.product_type,
        sku_name: this.tmpSelect.attr_symbol_name,
        sku_num: this.tmpSelect.num,
        sku_id: skuId,
        price: this.tmpSelect.price,
        stock: this.tmpSelect.stock
      });
      this.selectAttr = false;
    },
    selectDoneWithoutSku(row) {
      if (this.selected.some(item => item.id == row.id)) {
        this.$Message.error("此商品已选择");
        return;
      }
      if (this.selected.length >= this.maxLength) {
        this.$Message.error("最多选择" + this.maxLength + "件商品");
        return;
      }
      this.selected.push({
        id: row.id,
        img: row.img,
        product_name: row.product_name,
        category: row.category,
        product_type: row.product_type,
        sku_name: "",
        sku_num: "",
        sku_id: 0,
        price: 0,
        stock: 0
      });
      this.selectAttr = false;
    },
    removeSelected(index) {
      this.selected.splice(index, 1);
    },
    handlerDone() {
      this.$emit("input", this.selected);
    }
  }
};
</script>
<style scoped>
.demo-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>
