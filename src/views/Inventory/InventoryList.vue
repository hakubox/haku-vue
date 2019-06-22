<template>
    <div>
        <div class="main-tool-btns">
            <a-button type="primary" icon="plus" @click="add">添加成本</a-button>
        </div>
        <div class="main-content">
            <div class="row">
                <ul class="infos cols2 col4">
                    <li label="商品代码"><a-input v-decorator="['a1']"></a-input></li>
                    <li label="商品名称"><a-input v-decorator="['a2']"></a-input></li>
                </ul>
                <div class="col3">
                    <a-button icon="search" type="primary" @click="onSearch">搜索</a-button>
                </div>
            </div>

            <hr />
            <div class="cost-list">
                <a-table :columns="columns" :dataSource="data" size="small">
                    <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
                    <span slot="customTitle">Name</span>
                    <span slot="a7" slot-scope="item, record">
                        <a-button v-if="record['a7'] == '库存'" :style="{marginRight: '10px'}" type="primary" icon="edit" @click="detail(item)" size="small">库存详情</a-button>
                        <span v-else>{{record['a7']}}</span>
                    </span>
                    <span slot="tags" slot-scope="tags">
                        <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
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
        <a-modal width="1100px" title="库存详情" v-model="quotedpriceVisible" :footer="null">
            <a-divider orientation="left">基本信息</a-divider>
            <div class="form cols3">
                <dl><dt>商品名称</dt><dd>测试商品</dd></dl>
                <dl><dt>剩余库存</dt><dd><strong class="txt-primary">120</strong></dd></dl>
            </div>
            <a-divider class="mt0" orientation="left">入库</a-divider>
            <a-form :form="formInbound" @submit="inbound" layout="inline">
                <a-form-item label="来源" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <a-input v-decorator="[ 'source', {rules: [{ required: true, message: 'Please input your note!' }]} ]" />
                </a-form-item>
                <a-form-item label="入库时间" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                    <a-date-picker v-decorator="[ 'source', {rules: [{ required: true, message: 'Please input your note!' }]} ]" />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                    <a-button type="primary" html-type="submit">入库</a-button>
                </a-form-item>
            </a-form>
            <a-divider orientation="left">出库</a-divider>
            <a-form :form="formOutbound" @submit="outbound" layout="inline">
                <a-form-item label="仓库" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <a-input v-decorator="[ 'source', {rules: [{ required: true, message: 'Please input your note!' }]} ]" />
                </a-form-item>
                <a-form-item label="出库时间" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                    <a-date-picker v-decorator="[ 'source', {rules: [{ required: true, message: 'Please input your note!' }]} ]" />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                    <a-button type="primary" html-type="submit">出库</a-button>
                </a-form-item>
            </a-form>
            <a-divider orientation="left">出入库记录</a-divider>
            <a-table :columns="quotedpriceColumns" :dataSource="quotedpriceData" size="small" />
        </a-modal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

const columns = [
    { title: '商品代码', dataIndex: 'name', key: 'name' },
    { title: '名称', key: 'age' },
    { title: '规格', key: 'a1' },
    { title: '单位', key: 'a3' },
    { title: '品牌', key: 'address' },
    { title: '类别', key: 'a4' },
    { title: '备注', key: 'a5' },
    { title: '船公司', key: 'a6' },
    { title: '供应商', width: '100px', dataIndex: 'a7', key: 'a7', scopedSlots: { customRender: 'a7' } },
];

const data = [{
    key: '1',
    name: 'A00001',
    age: 32,
    address: 'New York No. 1 Lake Park',
    a7: '测试供应商A',
    tags: ['nice', 'developer'],
}, {
    key: '2',
    name: 'A00002',
    age: 42,
    address: 'London No. 1 Lake Park',
    a7: '库存',
    tags: ['loser'],
}, {
    key: '3',
    name: 'A00003',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    a7: '测试供应商B',
    tags: ['cool', 'teacher'],
}];

@Component({
  components: {
  }
})
export default class InventoryList extends Vue {
    isnew:boolean = false;
    visible:boolean = false;
    confirmLoading:boolean = false;
    data:Array<any> = data;
    columns:Array<any> = columns;
    /** 库存弹出框是否显示 */
    quotedpriceVisible:boolean = false;
    /**
     * 编辑成本对象
     */
    editItem = {
        id: ''
    };
    form;
    /** 库存详情表头 */
    quotedpriceColumns:Array<object> = [
        { title: '操作', dataIndex: 'name', key: 'name' },
        { title: '数量', dataIndex: 'balance', key: 'balance' },
        { title: '结余', dataIndex: 'count', key: 'count' },
        { title: '操作人', dataIndex: 'username', key: 'username' },
        { title: '日期', dataIndex: 'updatetime', key: 'updatetime' }
    ]
    quotedpriceData:Array<object> = [
        { name: '入库', count: 100, balance: 300 },
        { name: '出库', count: 200, balance: 200 },
        { name: '入库', count: 150, balance: 400 },
        { name: '出库', count: 50, balance: 250 },
        { name: '入库', count: 300, balance: 300 }
    ]
    formInbound = {

    }
    formOutbound = {

    }
    created() {
        this.$root.setBreadcrumb(['库存管理','库存列表']);
        this.form = this.$form.createForm(this);
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
    /**
     * @method 搜索
     */
    onSearch() {

    }
    use() {

    }
    /**
     * @method 查看库存详情
     */
    detail() {
        this.quotedpriceVisible = true;
    }
    inbound() {

    }
    outbound() {

    }
}
</script>

<style lang="scss" scoped>
</style>