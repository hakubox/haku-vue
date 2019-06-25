<template>
    <div>
        <div class="main-tool-btns"></div>
        <div class="main-content">
            <template v-if="isImport">
                <a-button :loading="isLoadingData" icon="download" type="primary" @click="download">下载文档</a-button>
                <hr />
                <table class="table" >
                    <thead>
                        <tr>
                            <th :style="column.style" v-for="column in columns" :key="column.dataIndex">{{column.title}}</th>
                            <th>是否精准</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in data" :key="row.index">
                            <td v-for="column in columns" :style="column.style" :key="column.dataIndex">{{row[column.dataIndex]}}</td>
                            <td>
                                <a-button v-show="row.isCheck === false" @click="checkRowIndex = row.index; onCheckListSearch()" type="primary" icon="file-search" size="small" >手动匹配</a-button>
                                <a-tag v-show="row.isCheck === true" :color="row.isUserCheck === true ? 'orange' : 'green'">{{row.isUserCheck === true ? '已人工匹配' : '已匹配'}}</a-tag>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
                                        { rules: [{ required: true, message: '区域不能为空。' }] }
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
                                    v-decorator="['upload', { rules: [{ required: true, message: '请上传采购单。' }] }, { valuePropName: 'fileList', getValueFromEvent: normFile }]"
                                    accept=".xls,.xlsx" name="file" :action="`${$config.INTERFACE}/api/Upload/UploadFile`" 
                                    :fileList="fileList" 
                                    :beforeUpload="beforeUpload"
                                    :remove="handleRemove"
                                    @change="fileUpload">
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
                                <a-button :loading="isLoadingData" @click="uploadSuccess(true)" type="primary">完成上传并提交</a-button>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </template>
        </div>

        <!-- 手动匹配框 -->
        <a-modal width="1100px" :pagination="pagination" title="数据匹配" v-model="checkVisible" :footer="null">
            <a-input-search v-model="filterTxt" placeholder="商品名称或编号" @search="onCheckListSearch" enterButton="查询" />
            <hr />
            <a-table :loading="{ tip: '加载中...', spinning: isLoadingData }" :columns="columns2" :dataSource="checkList" @change="paginationChange" size="small">
                <a slot="name" slot-scope="item" href="javascript:;">{{ item }}</a>
                <span slot="customTitle">Name</span>
                <span slot="item" slot-scope="item">
                    <a-tag v-for="tag in item" color="blue" :key="tag">{{ tag }}</a-tag>
                </span>
                <span slot="action" slot-scope="item, record">
                    <a-button @click="checkComplete(record)" type="default" icon="file-search" size="small">选择</a-button>
                </span>
            </a-table>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { debug, debuglog } from 'util';
import { Component, Prop, Vue } from 'vue-property-decorator';

const columns = [
    { title: '商品代码', dataIndex: 'code', key: 'code', style: { width: '80px' } },
    { title: '名称', dataIndex: 'name', style: { width: '150px' } },
    { title: '规格', dataIndex: 'norm', style: { width: '150px' } },
    { title: '单位', dataIndex: 'unit', style: { width: '50px' } },
    { title: '数量', dataIndex: 'number' },
    { title: '单价', dataIndex: 'unitprice', style: { color: '#e26b0a' } },
    { title: '金额', dataIndex: 'totalprice', style: { color: '#e26b0a' } },
    { title: '单价', dataIndex: 'unitcost', style: { color: '#0000FF' } },
    { title: '总价', dataIndex: 'totalcost', style: { color: '#0000FF' } },
    { title: '利润', dataIndex: 'profit', style: { color: '#FF0000' } },
    { title: '成本单位', dataIndex: 'costunit', style: { color: '#FF0000', width: '50px' } },
    { title: '成本名称', dataIndex: 'costname', style: { color: '#FF0000' } },
    { title: '备注', dataIndex: 'remark' },
    { title: '品牌', dataIndex: 'brand' },
    { title: '供应商', dataIndex: 'supplier' }
];

const columns2 = [
    { title: '编码', dataIndex: 'code', key: 'id' },
    { title: '名称', dataIndex: 'name' },
    { title: '规格', dataIndex: 'norm' },
    { title: '单价', dataIndex: 'unitcost' },
    { title: '单位', dataIndex: 'unit' },
    { title: '品牌', dataIndex: 'brand' },
    { title: '类别', dataIndex: 'categoryname' },
    { title: '备注', dataIndex: 'remark' },
    // { title: '船公司', dataIndex: 'a12' },
    { title: '选择', width: '100px', dataIndex: 'action', scopedSlots: { customRender: 'action' } }
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
    data:Array<any> = [];
    columns:Array<object> = columns;
    columns2:Array<object> = columns2;
    /** 系数 */
    ratio:number = 0;
    /** 区域 */
    region:string = "";
    /** 编辑成本对象 */
    editItem = {
        id: ''
    };
    checkList = [];
    /** 上传文件列表 */
    fileList:Array<Blob> = [];
    /** 是否开始上传 */
    uploading = false;
    fileId: string = '';
    /** 是否已导入 */
    isImport:boolean = false;
    form;
    pagination = this.$root.getPagination();
    filterTxt:string = "";
    checkRowIndex:number = -1;

    created() {
        this.form = this.$form.createForm(this);
    }
    beforeCreate() {
        
    }
    beforeUpload(file) {
        this.fileList = [...this.fileList, file];
        return false;
    }
    paginationChange(pagination, filters, sorter) {
        this.pagination = pagination;
        this.onCheckListSearch();
    }

    async onCheckListSearch() {
        try {
            this.checkVisible = true;
            this.isLoadingData = true;
            let data = await this.$api.product.GetProductList({
                pageNum: this.pagination.current,
                pageSize: this.pagination.defaultPageSize,
                searchText: this.filterTxt
            });
            this.checkList = Object.freeze(data.list);
            this.pagination.total = data.total;
        } finally {
            this.isLoadingData = false;
        }
    }
    
    fileUpload(e) {
        if(this.fileList.length > 1) {
            this.fileList.splice(0, 1);
        }
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
                        this.ratio = values.ratio;
                        this.region = values.region;
                        this.isLoadingData = true;
                        const formData = new FormData();
                        formData.append('file', this.fileList[0]);
                        // formData.append('file', );
                        this.uploading = true;

                        const fileid = await this.$common.post(`api/File/UploadFile`, formData, {
                            headers: { "Content-Type": "multipart/form-data" }
                        });
                        this.fileId = fileid;
                        this.$message.success('已提交报价信息，获取数据中...');
                        this.isImport = true;
                        this.data = (await this.$api.order.GetOrderDetail({
                            fileid,
                            ratio: values.ratio,
                            region: values.region
                        })).map(i => ({ ...i, isCheck: !!i.unitprice }));
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
    /**
     * 手动匹配完成，关闭匹配框
     */
    checkComplete(obj) {
        this.checkVisible = false;
        let index = this.data.findIndex((i:any) => i.index === this.checkRowIndex);
        if(index >= 0) {
            this.$set(this.data, index, {
                ...this.data[index],
                unitprice: obj.price,
                totalprice: (obj.price * this.data[index].number).toFixed(2),
                unitcost: (obj.price * obj.ratio).toFixed(2),
                totalcost: (obj.price * this.data[index].number * obj.ratio).toFixed(2),
                profit: (obj.price * this.data[index].number * obj.ratio - obj.price * this.data[index].number).toFixed(2),
                costunit: obj.unit,
                costname: obj.name,
                remark: obj.remark,
                brand: obj.brandname,
                supplier: obj.suppliername,
                isCheck: true,
                isUserCheck: true
            });
        }

        
        // if (isCancel) {
        //     this.checkVisible = false;
        // }
    }
    /**
     * 下载Excel表格
     */
    async download() {
        try {
            this.isLoadingData = true;
            let fileId = await this.$api.order.ImportOrderDetail({
                fileid: this.fileId,
                orders: this.data
            });

            // let file = await this.$api.file.GetFile({
            //     fileid: fileId
            // }, {
            //     responseType: 'blob'
            // });

            // const blob = new Blob([file], {type: 'application/vnd.ms-excel;charset=utf-8'});
            // let fileName = decodeURI(data.headers['content-disposition'].split(':')[1].split('=')[1]);
            if ('download' in document.createElement('a')) { // 非IE下载
                const elink = document.createElement('a')
                elink.download = '';
                elink.href = 'http://api.taishengsys.gejinet.com/api/File/GetFile?fileid=' + fileId;
                elink.style.display = 'none'
                // elink.href = URL.createObjectURL(blob)
                document.body.appendChild(elink)
                elink.click()
                URL.revokeObjectURL(elink.href) // 释放URL 对象
                document.body.removeChild(elink)
            } else { // IE10+下载
                // navigator.msSaveBlob(blob, fileName)
            }
        } finally {
            this.isLoadingData = false;
        }
    }
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
