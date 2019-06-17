<template>
    <div>
        <div class="main-tool-btns"></div>
        <div class="main-content">
            <template v-if="isImport">
                <a-button icon="download" type="primary" @click="download">下载文档</a-button>
                <hr />
                <a-table :columns="columns" :dataSource="data" size="small" :rowClassName="getRowClass">
                    <!-- <a-table-column-group>
                        <span slot="title" style="color: #1890ff">名称</span>
                        <a-table-column dataIndex="a5" key="a5" title="a5">
                            <span slot="title" style="color: #1890ff">名称</span>
                        </a-table-column>
                    </a-table-column-group> -->
                    <a slot="name" slot-scope="text" href="javascript:;">{{ text }}</a>
                    <span slot="customTitle">Name</span>
                    <span slot="tags" slot-scope="tags">
                        <a-tag v-for="tag in tags" color="blue" :key="tag">{{ tag }}</a-tag>
                    </span>
                    <span slot="action" slot-scope="item">
                        <a-tooltip placement="bottom">
                            <template slot="title">
                                <span>点击匹配</span>
                            </template>
                            <a-button
                                v-show="item.isCheck === false"
                                @click="check()"
                                type="primary"
                                icon="file-search"
                                size="small"
                            >
                                手动匹配
                            </a-button>
                        </a-tooltip>
                        <a-tag v-show="item.isCheck === true" color="green">已匹配</a-tag>
                    </span>
                </a-table>
            </template>
            <template v-else>
                <a-form :form="form" layout="horizontal" hideRequiredMark>
                    <a-row :gutter="16">
                        <a-col :span="24">
                            <a-form-item label="系数" :label-col="{ span: 2 }" :wrapper-col="{ span: 10 }">
                                <a-input-number
                                    style="width:100%;"
                                    v-decorator="['name', { rules: [{ required: true, message: '系数不能为空。' }] }]"
                                    :min="0"
                                    :max="1000"
                                    :step="0.1"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="区域" :label-col="{ span: 2 }" :wrapper-col="{ span: 10 }">
                                <a-select
                                    v-decorator="[
                                        'gender',
                                        { rules: [{ required: true, message: 'Please select your gender!' }] }
                                    ]"
                                    @change="handleSelectChange"
                                >
                                    <a-select-option value="1">国内</a-select-option>
                                    <a-select-option value="2">国外</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16">
                        <a-col :span="24">
                            <a-form-item label="采购单" :label-col="{ span: 2 }" :wrapper-col="{ span: 10 }">
                                <a-upload
                                    v-decorator="['upload', { valuePropName: 'fileList', getValueFromEvent: normFile }]"
                                    name="logo"
                                    action="/upload.do"
                                    list-type="picture"
                                >
                                    <a-button>
                                        <a-icon type="upload" />
                                        上传采购单
                                    </a-button>
                                </a-upload>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16">
                        <a-col :span="24">
                            <a-form-item :wrapper-col="{ span: 10, offset: 2 }">
                                <a-button @click="uploadSuccess(true)" type="primary">完成上传并提交</a-button>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </template>
        </div>

        <!-- 手动匹配框 -->
        <a-modal width="1100px" title="数据匹配" v-model="checkVisible" :footer="null">
            <a-input-search placeholder="商品名称或编号" @search="onCheckListSearch" enterButton="查询" />
            <hr />
            <a-table :columns="columns2" :dataSource="data" size="small">
                <a slot="name" slot-scope="item" href="javascript:;">{{ item }}</a>
                <span slot="customTitle">Name</span>
                <span slot="item" slot-scope="item">
                    <a-tag v-for="tag in item" color="blue" :key="tag">{{ tag }}</a-tag>
                </span>
                <span slot="action" slot-scope="item, record">
                    <a-button @click="check()" type="default" icon="file-search" size="small">选择</a-button>
                </span>
            </a-table>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { debug, debuglog } from 'util';
import { Component, Prop, Vue } from 'vue-property-decorator';

const columns = [
    { title: '商品代码', dataIndex: 'name', key: 'name' },
    { title: '名称', key: 'age' },
    { title: '规格', key: 'address' },
    { title: '单位', key: 'a1' },
    { title: '数量', key: 'a2' },
    {
        title: '单价',
        key: 'a3',
        customHeaderCell: column => {
            column.title[0].data.style = { color: '#e26b0a' };
        }
    },
    {
        title: '金额',
        key: 'a4',
        customHeaderCell: column => {
            column.title[0].data.style = { color: '#e26b0a' };
        }
    },
    {
        title: '单价',
        dataIndex: 'a5',
        key: 'a5',
        customHeaderCell: column => {
            column.title[0].data.style = { color: '#0000FF' };
        }
    },
    {
        title: '总价',
        key: 'a6',
        customHeaderCell: column => {
            column.title[0].data.style = { color: '#0000FF' };
        }
    },
    {
        title: '利润',
        key: 'a7',
        customHeaderCell: column => {
            column.title[0].data.style = { color: '#FF0000' };
        }
    },
    {
        title: '成本单位',
        key: 'a8',
        customHeaderCell: column => {
            column.title[0].data.style = { color: '#FF0000' };
        }
    },
    {
        title: '成本名称',
        key: 'a9',
        customHeaderCell: column => {
            column.title[0].data.style = { color: '#FF0000' };
        }
    },
    { title: '备注', key: 'a10' },
    { title: '品牌', key: 'a11' },
    { title: '供应商', key: 'a12' }
];

const columns2 = [
    { title: '编码', dataIndex: 'name', key: 'name' },
    { title: '名称', key: 'age' },
    { title: '规格', key: 'a1' },
    { title: '单价', key: 'a2' },
    { title: '单位', key: 'a3' },
    { title: '品牌', key: 'a5' },
    { title: '类别', key: 'a4' },
    { title: '备注', key: 'a10' },
    { title: '品牌', key: 'address' },
    { title: '船公司', key: 'a12' },
    { title: '选择', width: '100px', key: 'action', scopedSlots: { customRender: 'action' } }
];

const data = [
    {
        key: '1',
        name: 'A00001',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer']
    },
    {
        key: '2',
        name: 'A00002',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser']
    },
    {
        key: '3',
        name: 'A00003',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher']
    }
];
@Component({
  components: {}
})
export default class QuotedpriceList extends Vue {
    /** 手动匹配框是否显示 */
    checkVisible:boolean = false;
    confirmLoading:boolean = false;
    data = data;
    columns:Array<any> = columns;
    columns2:Array<any> = columns2;
    /** 编辑成本对象 */
    editItem = {
        id: ''
    };
    /** 是否已导入 */
    isImport:boolean = false;
    form;

    created() {
        this.$root.setBreadcrumb(['报价信息管理', '报价信息计算']);
    }
    beforeCreate() {
        // this.form = this.$form.createForm(this);
    }
    uploadSuccess() {
        this.form.validateFields((errors, values) => {
            if (!errors) {
                this.$message.success('已成功提交报价信息。');
                this.columns.push(
                    { title: '是否精准', width: '100px', key: 'action', scopedSlots: { customRender: 'action' } }
                );
                this.isImport = true;
                this.data = this.data
                    .map(i => ({ ...i, isCheck: Math.random() > 0.5 }))
                    .sort(i => (i.isCheck ? 1 : -1));
            }
        });
    }
    /**
     * @method 搜索
     */
    search() {}
    use() {}
    normFile(e) {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
    check() {
        this.checkVisible = true;
    }
    onCheckListSearch() {}
    /**
     * 手动匹配完成，关闭匹配框
     */
    checkComplete(isCancel: boolean) {
        if (isCancel) {
            this.checkVisible = false;
        }
    }
    /**
     * 下载Excel表格
     */
    download() {}
    /**
     * 获取行样式（未匹配高亮）
     */
    getRowClass(record: any, index: number) {
        if (record.isCheck === false) {
            return 'row-not-check';
        }
    }
    handleSelectChange() {}
}
</script>

<style lang="scss">
.row-not-check {
    background-color: #fff1f0;
}
</style>
