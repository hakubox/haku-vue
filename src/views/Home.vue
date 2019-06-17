<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <a-modal width="1100px" title="商品匹配" :visible="visible" @ok="handleOk" :confirmLoading="confirmLoading" @cancel="handleCancel">
        <a-input-search class="mb20" placeholder="请输入商品名称或编号" @search="onSearch" enterButton="搜索" size="large" />
        <br /><br />
        <a-table :columns="columns" :dataSource="data" size="small">
            <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
            <span slot="customTitle">Name</span>
            <span slot="tags" slot-scope="tags">
                <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
            </span>
            <span slot="action" slot-scope="text, record">
                <a-button type="primary" icon="check" @click="use" size="small">使用</a-button>
            </span>
        </a-table>
    </a-modal>
    <a-button type="primary" icon="table" @click="showModal">
        打开弹出框
    </a-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

const columns = [
    { title: '商品代码', dataIndex: 'name', key: 'name' },
    { title: '商品名称', key: 'age' },
    { title: '品牌', key: 'address' },
    { title: '规格', key: 'a1' },
    { title: '单价', key: 'a2' },
    { title: '单位', key: 'a3' },
    { title: '类别', key: 'a4' },
    { title: '备注', key: 'a5' },
    { title: '船公司', key: 'a6' },
    { title: '供应商', key: 'a7' },
    { title: '状态', width: '150px', key: 'tags', dataIndex: 'tags', scopedSlots: { customRender: 'tags' } },
    { title: '操作', width: '100px', key: 'action', scopedSlots: { customRender: 'action' } }
];

const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
}, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
}, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
}];

@Component({
  components: {
  }
})
export default class UserManager extends Vue {
    visible:boolean = false;
    confirmLoading:boolean = false;
    data:Array<object> = data;
    columns:Array<object> = columns;
    
    showModal() {
        this.visible = true
    }
    handleOk(e) {
        this.confirmLoading = true;
        setTimeout(() => {
            this.visible = false;
            this.confirmLoading = false;
        }, 2000);
    }
    handleCancel(e) {
        console.log('Clicked cancel button');
        this.visible = false
    }
    /** 搜索 */
    onSearch() {

    }
    use() {

    }
}
</script>

<style lang="scss" scoped>
</style>
