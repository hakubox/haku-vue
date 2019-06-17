<template>
    <div>
        <div class="main-tool-btns">
            <a-button v-if="this.$root.is_manager" type="primary" icon="plus" @click="add">添加成本</a-button>
        </div>
        <a-layout-content class="main-content">
            <div class="row">
                <ul class="infos cols2 col4">
                    <li label="商品代码"><a-input v-model="filter.code"></a-input></li>
                    <li label="商品名称"><a-input v-model="filter.name"></a-input></li>
                </ul>
                <div class="col3">
                    <a-button icon="search" type="primary" @click="search">搜索</a-button>
                </div>
            </div>

            <hr />

            <div class="materiel-list">
                <a-table :pagination="pagination" @change="paginationChange" rowKey="id" :columns="columns" :dataSource="data" size="small">
                    <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
                    <span slot="customTitle">Name</span>
                    <span slot="tags" slot-scope="tags">
                        <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
                    </span>
                    <span slot="price" slot-scope="item, record">
                        <span>{{record['price']}}元</span>
                    </span>
                    <span slot="suppliername" slot-scope="item, record">
                        <span>{{record['suppliername']}}</span>
                    </span>
                    <span slot="action" slot-scope="item, record">
                        <a-button :style="{marginRight: '10px'}" type="primary" icon="edit" @click="edit(record)" size="small">编辑</a-button>
                        <a-popconfirm placement="topRight" title="是否删除成本信息？" @confirm="remove(record.id)">
                            <a-button type="danger" icon="delete" size="small">删除</a-button>
                        </a-popconfirm>
                    </span>
                </a-table>
            </div>
        </a-layout-content>

        <!-- 新增编辑成本 -->
        <a-drawer :title="(productId ? '编辑' : '新增') + '成本'" :width="720" @close="onClose(false)" :visible="visible" :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}">
            <a-form :form="form" layout="horizontal">
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="商品名称(中)" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <a-input v-decorator="['name', { rules: [{ required: true, message: '商品名称（中文）不能为空。' }] }]" placeholder="商品名称（中文）" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="商品名称(英)" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <a-input v-decorator="['enname', { rules: [{ required: true, message: '商品名称（英文）不能为空。' }] }]" placeholder="商品名称（英文）" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="商品代码" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <a-input v-decorator="['code', { rules: [{ required: true, message: '商品代码不能为空。' }] }]" placeholder="商品代码" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="类别" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <a-select v-decorator="['categoryid', { rules: [{ required: true, message: '类别不能为空。' }] }]" placeholder="类别">
                                <a-select-option v-for="item in categoryList" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="规格" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <a-input v-decorator="['norm', { rules: [{ required: true, message: '规格不能为空。' }] }]" placeholder="规格" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="品牌" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <a-select v-decorator="['brandid', { rules: [{ required: true, message: '品牌不能为空。' }] }]" placeholder="品牌">
                                <a-select-option v-for="item in brandList" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="单位" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <a-input v-decorator="['unit', { rules: [{ required: true, message: '规格不能为空。' }] }]" placeholder="规格" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="单价" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <a-input-number :style="{width:'100%'}" :precision="2" v-decorator="['price', { rules: [{ required: true, message: '品牌不能为空。' }] }]" placeholder="品牌" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="系数" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <a-input-number :style="{width:'100%'}" :precision="3" v-decorator="['ratio', { rules: [{ required: true, message: '系数不能为空。' }] }]" placeholder="系数" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="数量" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <a-input-number :style="{width:'100%'}" :precision="0" v-decorator="['number', { rules: [{ required: true, message: '数量不能为空。' }] }]" placeholder="数量" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="供应商" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <a-select v-decorator="['supplierid', { rules: [{ required: true, message: '供应商不能为空。' }] }]" placeholder="供应商">
                                <a-select-option v-for="item in supplierList" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="24">
                        <a-form-item label="备注" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                            <a-textarea v-decorator="['remark']" :rows="3" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
            <div :style="{ position: 'absolute', left: 0, bottom: 0, width: '100%', borderTop: '1px solid #e9e9e9', padding: '10px 16px', background: '#fff', textAlign: 'right', }" >
                <a-button :style="{marginRight: '8px'}" @click="onClose(false)">取消</a-button>
                <a-button @click="onClose(true)" type="primary">提交</a-button>
            </div>
        </a-drawer>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getPagination } from '@/tools/common'

@Component({
  components: {
  }
})
export default class MaterieIList extends Vue {
    isnew = false;
    visible = false;
    confirmLoading = false;
    data:Array<object> = [];
    columns:Array<object> = [];
    /** 成本Id */
    productId? = '';
    /** 供应商列表 */
    supplierList = [];
    /** 分类列表 */
    categoryList = [];
    /** 品牌列表 */
    brandList = [];
    form;
    formInbound;
    formOutbound;
    /** 表格筛选项 */
    filter = {
        code: '',
        name: ''
    };
    pagination;
    created() {
        this.pagination = this.$root.getPagination();
        this.$root.setBreadcrumb(['成本管理','成本列表']);
        this.form = this.$form.createForm(this);
        this.formInbound = this.$form.createForm(this);
        this.formOutbound = this.$form.createForm(this);
        if(this.$route.query.isnew) {
            this.visible = true;
        }

        this.roleChange();
        this.$bus.$on('rolechange', this.roleChange);
        this.search();

        this.$common.get('/api/Product/GetSupplierList').then(d => this.supplierList = d);
        this.$common.get('/api/Product/GetCategoryList').then(d => this.categoryList = d);
        this.$common.get('/api/Product/GetBrandList').then(d => this.brandList = d);
    }
    beforeRouteUpdate(to, from, next) {
        next();
        if(this.$route.query.isnew) {
            this.visible = true;
        }
    }
    paginationChange(pagination, filters, sorter) {
        this.pagination = pagination;
        this.search();
    }
    async search() {
        this.data = await this.$api.product.GetProductList({
            pageNum: this.pagination.current,
            pageSize: this.pagination.defaultPageSize,
            code: this.filter.code,
            name: this.filter.name
        });
    }
    roleChange() {
        if(this.$root.is_manager) {
            this.columns = [
                { title: '商品代码', dataIndex: 'code', key: 'code' },
                { title: '产品名称', dataIndex: 'name', key: 'name' },
                { title: '产品名称（英文）', dataIndex: 'enname', key: 'enname' },
                { title: '规格', dataIndex: 'norm', key: 'norm' },
                { title: '单位', dataIndex: 'unit', key: 'unit' },
                { title: '单价', dataIndex: 'price', key: 'price', scopedSlots: { customRender: 'price' } },
                { title: '品牌', dataIndex: 'brandname', key: 'brandname' },
                { title: '类别', dataIndex: 'categoryname', key: 'categoryname' },
                { title: '备注', dataIndex: 'remark', key: 'remark' },
                { title: '供应商', width: '100px', dataIndex: 'suppliername', key: 'suppliername', scopedSlots: { customRender: 'suppliername' } },
                { title: '操作', width: '200px', key: 'action', scopedSlots: { customRender: 'action' } }
            ];
        } else {
            this.columns = [
                { title: '商品代码', dataIndex: 'code', key: 'code' },
                { title: '产品名称', dataIndex: 'name', key: 'name' },
                { title: '产品名称（英文）', dataIndex: 'enname', key: 'enname' },
                { title: '品牌', dataIndex: 'brandname', key: 'brandname' },
                { title: '规格', dataIndex: 'norm', key: 'norm' },
                { title: '单位', dataIndex: 'unit', key: 'unit' },
                { title: '类别', dataIndex: 'categoryname', key: 'categoryname' },
                { title: '备注', dataIndex: 'remark', key: 'remark' },
                { title: '供应商', width: '100px', dataIndex: 'suppliername', key: 'suppliername', scopedSlots: { customRender: 'suppliername' } },
            ];
            
            //?????
            //this.data = [].filter(i => i.a7 == '库存');
        }
    }
    edit(item) {
        this.productId = item.id;
        this.form.setFieldsValue(item);
        this.visible = true;
    }
    add() {
        this.productId = '';
        this.form.setFieldsValue({});
        this.visible = true;
    }
    /** 删除成本数据 */
    remove(id) {
        this.$common.get('/api/Product/DeleteProduct', { id }).then(d => {
            this.form.clearField();
            this.visible = false;
            this.search();
            this.$message.success(`成本删除成功。`, 10);
        });
    }
    onClose(isConfirm) {
        if(isConfirm) {
            this.form.validateFields((errors, values) => {
                if(!errors) {
                    this.$common.get('/api/Product/AddOrEditProduct', {
                        ...this.form.getFieldsValue(),
                        id: this.productId
                    }).then(d => {
                        this.form.clearField();
                        this.visible = false;
                        this.productId = undefined;
                        this.search();
                        this.$message.success(`成本${this.productId?'编辑':'新增'}成功。`, 10);
                    });
                }
            });
        } else {
            this.visible = false;
        }
    }
    /**
     * @method 出库
     */
    outbound() {

    }
    /**
     * @method 入库
     */
    inbound() {

    }
}
</script>

<style lang="scss" scoped>
</style>