<template>
    <div>
        <div class="main-tool-btns">
            <a-button type="primary" icon="plus" @click="add">添加成本</a-button>
        </div>
        <div class="main-content">
            <div class="row">
                <ul class="infos cols1 col4">
                    <li label="查询商品"><a-input v-model="filter.searchText" placeholder="搜索商品名称或代码" ></a-input></li>
                </ul>
                <div class="col3">
                    <a-button :loading="isLoadingData" icon="search" type="primary" @click="search">搜索</a-button>
                </div>
            </div>

            <hr />
            <div class="cost-list">
                <!-- <a-table :columns="columns" :dataSource="data" size="small">
                    <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
                    <span slot="customTitle">Name</span>
                    <span slot="a7" slot-scope="item, record">
                        <a-button v-if="record['a7'] == '库存'" :style="{marginRight: '10px'}" type="primary" icon="edit" @click="detail(item)" size="small">库存详情</a-button>
                        <span v-else>{{record['a7']}}</span>
                    </span>
                    <span slot="tags" slot-scope="tags">
                        <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
                    </span>
                </a-table> -->

                <a-table :loading="{ tip: '加载中...', spinning: isLoadingData }" :pagination="pagination" @change="paginationChange" rowKey="id" :columns="columns" :dataSource="data" size="small">
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
                        <a-button v-if="record['suppliername'] == '库存'" :style="{marginRight: '10px'}" type="primary" icon="edit" @click="detail(record)" size="small">库存详情</a-button>
                        <span v-else>{{record['suppliername']}}</span>
                    </span>
                </a-table>
            </div>
        </div>

        <!-- 新增编辑成本 -->
        <a-drawer :title="(editItem.id ? '编辑' : '新增') + '成本'" :width="720" @close="onClose(false)" :visible="visible" :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}">
            <a-form :form="form" layout="horizontal">
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="商品代码" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <a-input v-decorator="['name', { rules: [{ required: true, message: '商品代码不能为空。' }] }]" placeholder="商品代码" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="商品名称" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <a-input v-decorator="['name2', { rules: [{ required: true, message: '商品名称不能为空。' }] }]" placeholder="商品名称" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="品牌" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <a-input v-decorator="['name3', { rules: [{ required: true, message: '品牌不能为空。' }] }]" placeholder="品牌" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="规格" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <a-input v-decorator="['name4', { rules: [{ required: true, message: '规格不能为空。' }] }]" placeholder="规格" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="24">
                        <a-form-item label="备注" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
                            <a-textarea v-decorator="['description']" :rows="3" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
            <div :style="{ position: 'absolute', left: 0, bottom: 0, width: '100%', borderTop: '1px solid #e9e9e9', padding: '10px 16px', background: '#fff', textAlign: 'right', }" >
                <a-button :style="{marginRight: '8px'}" @click="onClose(false)">取消</a-button>
                <a-button @click="onClose(true)" type="primary">提交</a-button>
            </div>
        </a-drawer>

        <!-- 库存详情 -->
        <a-modal :maskClosable="false" width="1100px" title="库存详情" v-model="quotedpriceVisible" :footer="null">
            <a-divider orientation="left">基本信息</a-divider>
            <div class="form cols3">
                <dl><dt>商品名称</dt><dd>{{editItem.name}}</dd></dl>
                <dl><dt>剩余库存</dt><dd><strong class="txt-primary">{{editItem.number}}</strong></dd></dl>
            </div>
            <a-divider class="mt0" orientation="left">入库</a-divider>
            <a-form :form="formInbound" @submit.prevent="inbound" layout="inline">
                <a-form-item label="来源" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <a-input v-decorator="[ 'marking', {rules: [{ required: true, message: '请输入来源。' }]} ]" />
                </a-form-item>
                <a-form-item label="入库时间" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                    <a-date-picker v-decorator="[ 'runtime', {rules: [{ type: 'object', required: true, message: '请输入入库时间。' }]} ]" />
                </a-form-item>
                <a-form-item label="数量" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                    <a-input-number v-decorator="[ 'number', {rules: [{ required: true, message: '请输入入库数量。' }]} ]" />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                    <a-button :loading="isBoundLoading" type="primary" html-type="submit">入库</a-button>
                </a-form-item>
            </a-form>
            <a-divider orientation="left">出库</a-divider>
            <a-form :form="formOutbound" @submit.prevent="outbound" layout="inline">
                <a-form-item label="仓库" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <a-input v-decorator="[ 'marking', {rules: [{ required: true, message: '请输入仓库。' }]} ]" />
                </a-form-item>
                <a-form-item label="出库时间" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                    <a-date-picker v-decorator="[ 'runtime', {rules: [{ type: 'object', required: true, message: '请输入出库时间。' }]} ]" />
                </a-form-item>
                <a-form-item label="数量" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                    <a-input-number v-decorator="[ 'number', {rules: [{ required: true, message: '请输入入库数量。' }]} ]" />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                    <a-button :loading="isBoundLoading" type="primary" html-type="submit">出库</a-button>
                </a-form-item>
            </a-form>
            <a-divider orientation="left">出入库记录</a-divider>
            <a-table :loading="{ tip: '加载中...', spinning: isBoundLoading }" :columns="quotedpriceColumns" :dataSource="boundHistory" size="small" />
        </a-modal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

const columns = [
    { title: '商品代码', dataIndex: 'code', key: 'code' },
    { title: '产品名称', dataIndex: 'name' },
    { title: '产品名称（英文）', dataIndex: 'enname' },
    { title: '规格', dataIndex: 'norm' },
    { title: '单位', dataIndex: 'price' },
    { title: '品牌', dataIndex: 'brandname' },
    { title: '类别', dataIndex: 'categoryname' },
    { title: '备注', dataIndex: 'remark' },
    // { title: '船公司', dataIndex: 'a6' },
    { title: '供应商', dataIndex: 'suppliername', width: 100, scopedSlots: { customRender: 'action' } },
];

@Component({
  components: {
  }
})
export default class InventoryList extends Vue {
    isnew:boolean = false;
    visible:boolean = false;
    confirmLoading:boolean = false;
    data:Array<any> = [];
    columns:Array<any> = columns;
    /** 库存弹出框是否显示 */
    quotedpriceVisible:boolean = false;
    isLoadingData = false;
    /** 出入库加载中 */
    isBoundLoading = false;
    filter = {
        searchText: ''
    }
    /** 库存信息 */
    inventoryItem = {};
    /** 库存日志 */
    boundHistory:Array<any> = [];
    /** 编辑成本对象 */
    editItem:any = {};
    /** 库存详情表头 */
    quotedpriceColumns:Array<object> = [
        { title: '操作', dataIndex: 'action', key: 'action' },
        { title: '来源/仓库', dataIndex: 'marking' },
        { title: '数量', dataIndex: 'number' },
        { title: '结余', dataIndex: 'surplus' },
        { title: '操作人', dataIndex: 'username' },
        { title: '日期', dataIndex: 'operatingtime' }
    ]
    form;
    formInbound;
    formOutbound;
    pagination = this.$root.getPagination();
    created() {
        this.form = this.$form.createForm(this);
        this.formInbound = this.$form.createForm(this);
        this.formOutbound = this.$form.createForm(this);
        this.search();
    }
    changeDate() {

    }
    paginationChange(pagination, filters, sorter) {
        this.pagination = pagination;
        this.search();
    }
    edit(item) {
        this.form.setFieldsValue(item);
        this.visible = true;
    }
    add() {
        this.form.setFieldsValue({});
        this.visible = true;
    }
    /** 删除成本数据 */
    onDelete() {

    }
    onClose(isConfirm) {
        if(isConfirm) {
            this.form.validateFields((errors, values) => {
                if(!errors) {
                    this.visible = false;
                    //this.$message.success(`成本${this.editItem.id?'编辑':'新增'}成功。`);
                }
            });
        } else {
            this.visible = false;
        }
    }
    async search() {
        try {
            this.isLoadingData = true;
            let data = await this.$api.product.GetProductList({
                pageNum: this.pagination.current,
                pageSize: this.pagination.defaultPageSize,
                searchText: this.filter.searchText
            })
            this.data = Object.freeze(data.list);
            this.pagination.total = data.total;
        } finally {
            this.isLoadingData = false;
        }
    }
    use() {

    }
    /**
     * @method 查看库存详情
     */
    detail(item) {
        this.editItem = Object.assign({}, item);
        this.searchBoundHistory();
        // this.form.setFieldsValue(inventoryItem);
        this.quotedpriceVisible = true;
    }
    async searchBoundHistory() {
        this.boundHistory = await this.$api.product.GetInventorylogList({
            productid: this.editItem.id
        });
    }
    inbound() {
        this.formInbound.validateFields(async (errors, values) => {
            if(!errors) {
                try {
                    this.isBoundLoading = true;
                    let history = await this.$api.product.AddInventorylog({
                        operatingtime: values.runtime.format('YYYY-MM-DD'),
                        productid: this.editItem.id,
                        action: '入库',
                        number: values.number,
                        marking: values.marking
                    });
                    this.formInbound.resetFields();
                    await this.searchBoundHistory();
                } finally {
                    this.isBoundLoading = false;
                }
            }
        });
    }
    outbound() {
        this.formOutbound.validateFields(async (errors, values) => {
            if(!errors) {
                try {
                    this.isBoundLoading = true;
                    let history = await this.$api.product.AddInventorylog({
                        operatingtime: values.runtime.format('YYYY-MM-DD'),
                        productid: this.editItem.id,
                        action: '出库',
                        number: values.number,
                        marking: values.marking
                    });
                    this.formOutbound.resetFields();
                    await this.searchBoundHistory();
                } finally {
                    this.isBoundLoading = false;
                }
            }
        });
    }
}
</script>

<style lang="scss" scoped>
</style>