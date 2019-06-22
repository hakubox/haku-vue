<template>
    <div>
        <div class="main-tool-btns"></div>
        <div class="main-content">
            <template v-if="isImport">
                <a-button :loading="isLoadingData" icon="download" type="primary" @click="download">下载文档</a-button>
                <hr />
                <a-table 
                    :loading="{ tip: '加载中...', spinning: isLoadingData }" 
                    :pagination="{ defaultPageSize: 1000, hideOnSinglePage: true }" 
                    :columns="columns" :dataSource="data" size="small" :rowClassName="getRowClass">
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
                            <a-button v-show="item.isCheck === false" @click="check()" type="primary" icon="file-search" size="small" >
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
                                    v-decorator="['ratio', { rules: [{ required: true, message: '系数不能为空。' }] }]"
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
                                        'region',
                                        { rules: [{ required: true, message: 'Please select your gender!' }] }
                                    ]"
                                    @change="handleSelectChange"
                                >
                                    <a-select-option value="国内">国内</a-select-option>
                                    <a-select-option value="国外">国外</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16">
                        <a-col :span="24">
                            <a-form-item label="采购单" :label-col="{ span: 2 }" :wrapper-col="{ span: 10 }">
                                <a-upload
                                    v-decorator="['upload', { valuePropName: 'fileList', getValueFromEvent: normFile }]"
                                    name="file" :action="`${$config.INTERFACE}/api/Upload/UploadFile`" 
                                    :fileList="fileList" 
                                    :beforeUpload="beforeUpload"
                                    :remove="handleRemove">
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
    { title: '商品代码', dataIndex: 'code', key: 'code', width: 200 },
    { title: '名称', dataIndex: 'name', width: 200 },
    { title: '规格', dataIndex: 'norm', width: 100 },
    { title: '单位', dataIndex: 'unit', width: 100 },
    { title: '数量', dataIndex: 'number', width: 100 },
    { title: '单价', dataIndex: 'unitcost', customHeaderCell: column => { column.title[0].data.style = { color: '#e26b0a' }; } },
    { title: '金额', dataIndex: 'totalcost', customHeaderCell: column => { column.title[0].data.style = { color: '#e26b0a' }; } },
    { title: '单价', dataIndex: 'unitprice', customHeaderCell: column => { column.title[0].data.style = { color: '#0000FF' }; } },
    { title: '总价', dataIndex: 'totalprice',
        customHeaderCell: column => {
            column.title[0].data.style = { color: '#0000FF' };
        } },
    { title: '利润', dataIndex: 'profit',
        customHeaderCell: column => {
            column.title[0].data.style = { color: '#FF0000' };
        }
    },
    { title: '成本单位', dataIndex: 'costunit',
        customHeaderCell: column => {
            column.title[0].data.style = { color: '#FF0000' };
        }
    },
    { title: '成本名称', dataIndex: 'costname',
        customHeaderCell: column => {
            column.title[0].data.style = { color: '#FF0000' };
        }
    },
    { title: '备注', dataIndex: 'remark' },
    { title: '品牌', dataIndex: 'brand' },
    { title: '供应商', dataIndex: 'supplier' }
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
@Component({
  components: {}
})
export default class QuotedpriceList extends Vue {
    /** 手动匹配框是否显示 */
    checkVisible:boolean = false;
    confirmLoading:boolean = false;
    /** 是否正在加载 */
    isLoadingData = false;
    data = [];
    columns:Array<any> = columns;
    columns2:Array<any> = columns2;
    /** 编辑成本对象 */
    editItem = {
        id: ''
    };
    /** 上传文件列表 */
    fileList:Array<Blob> = [];
    /** 是否开始上传 */
    uploading = false;
    /** 是否已导入 */
    isImport:boolean = false;
    form;

    created() {
        this.form = this.$form.createForm(this);
        this.$root.setBreadcrumb(['报价信息管理', '报价信息计算']);
    }
    beforeCreate() {
        
    }
    beforeUpload(file) {
        this.fileList = [...this.fileList, file];
        return false;
    }
    handleRemove(file) {
        const index = this.fileList.indexOf(file);
        const newFileList = this.fileList.slice();
        newFileList.splice(index, 1);
        this.fileList = newFileList;
    }
    uploadSuccess(isOK) {
        this.form.validateFields(async (errors, values) => {
            if (!errors) {
                if(isOK) {
                    try {
                        this.isLoadingData = true;
                        const formData = new FormData();
                        formData.append('file', this.fileList[0]);
                        // formData.append('file', );
                        this.uploading = true;

                        const fileid = await this.$common.post(`api/Upload/UploadFile`, formData, {
                            headers: { "Content-Type": "multipart/form-data" }
                        });

                        this.$message.success('已成功提交报价信息。');
                        this.columns.push(
                            { title: '是否精准', width: '100px', key: 'action', scopedSlots: { customRender: 'action' } }
                        );
                        this.isImport = true;
                        this.data = Object.freeze((await this.$api.order.GetOrderDetail({
                            fileid,
                            ratio: values.ratio,
                            region: values.region
                        })).map(i => ({ ...i, isCheck: !!i.unitprice })));
                    } finally {
                        this.isLoadingData = false;
                    }
                }
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
