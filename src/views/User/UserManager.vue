<template>
    <div>
        <div class="main-tool-btns">
            <a-button type="primary" icon="plus" @click="edit({})">用户管理</a-button>
        </div>
        <a-layout-content class="main-content">
            <div class="cost-list">
                <a-table :loading="{ tip: '加载中...', spinning: isLoadingData }" :columns="columns" :dataSource="data" size="small">
                    <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
                    <span slot="customTitle">Name</span>
                    <span slot="tags" slot-scope="tags">
                        <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
                    </span>
                    <span slot="action" slot-scope="item, record">
                        <a-button :style="{marginRight: '10px'}" type="primary" icon="edit" @click="edit(record)" size="small">编辑</a-button>
                        <a-popconfirm placement="topRight" title="是否删除用户信息？" @confirm="remove(record.id)">
                            <a-button type="danger" icon="delete" size="small">删除</a-button>
                        </a-popconfirm>
                    </span>
                </a-table>
            </div>
        </a-layout-content>

        <!-- 新增编辑用户 -->
        <a-drawer :title="`${userId?'编辑':'新增'}用户`" :width="720" @close="onClose(false)" :visible="visible" :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}">
            <a-form :form="form" layout="horizontal">
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="用户名" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <a-input v-decorator="['name', { rules: [{ required: true, message: '用户名不能为空。' }, { pattern: /^[0-9a-zA-Z_]{3,16}$/, message: '请使用3~16位字母/数字/下划线的组合' }] }]" placeholder="用户名" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="密码" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <a-input type="password" v-decorator="['password', { rules: [{ required: true, message: '密码不能为空。' }, { pattern: /^[a-zA-Z_][0-9a-zA-Z_]{6,16}$/, message: '请使用6~16位字母/数字/下划线的组合，且首字符不能为数字' }] }]" placeholder="密码" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="角色" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <a-select v-decorator="['rolename', { rules: [{ required: true, message: '角色不能为空。' }], initialValue: 'user' }]">
                                <a-select-option value="admin">管理员</a-select-option>
                                <a-select-option value="user">操作员</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="昵称" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <a-input v-decorator="['nickname', { rules: [] }]" placeholder="昵称" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="手机号码" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <a-input v-decorator="['phone', { rules: [] }]" placeholder="手机号码" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="邮箱地址" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <a-input v-decorator="['email', { rules: [] }]" placeholder="邮箱地址" />
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
import { AddOrEditUserParams } from "@/api/user";

@Component({
    components: {
    }
})
export default class About extends Vue {
    isnew = false;
    visible = false;
    confirmLoading = false;
    /** 是否正在加载主表格数据 */
    isLoadingData = false;
    data:Array<object> = [];
    columns = [
        { title: '姓名', dataIndex: 'nickname', key: 'nickname' },
        { title: '邮箱地址', dataIndex: 'email', key: 'email' },
        { title: '手机号码', dataIndex: 'phone', key: 'phone' },
        { title: '操作', width: '200px', scopedSlots: { customRender: 'action' } }
    ];
    userId:string = '';
    form;

    created() {
        this.form = this.$form.createForm(this);
        this.$root.setBreadcrumb(['用户管理']);
        if(this.$route.query.isnew) {
            this.visible = true;
        }
        this.search();
    }
    beforeRouteUpdate(to, from, next) {
        next();
        if(this.$route.query.isnew) {
            this.visible = true;
        }
    }
    async search() {
        try {
            this.isLoadingData = true;
            this.data = await this.$api.user.GetUserList({
                pageNum: 1,
                pageSize: 10
            });
        } finally {
            this.isLoadingData = false;
        }
    }
    edit(item:any = {}) {
        this.visible = true;
        this.userId = item.id;
        this.$nextTick(() => {
            this.form.resetFields();
            this.form.setFieldsValue(item);
        })
    }
    remove(id) {
        this.$common.get('/api/User/DeleteUser', { id }).then(d => {
            this.form.clearField();
            this.visible = false;
            this.search();
            this.$message.success(`用户删除成功。`, 10);
        });
    }
    // 新增/编辑功能
    onClose(isConfirm) {
        if(isConfirm) {
            this.form.validateFields(async (errors, values) => {
                if(!errors) {
                    await this.$api.user.AddOrEditUser(<AddOrEditUserParams>{
                        ...this.form.getFieldsValue(),
                        Id: this.userId
                    });
                    this.form.clearField();
                    this.visible = false;
                    this.userId = '';
                    this.search();
                    this.$message.success(`用户${this.userId?'编辑':'新增'}成功。`, 10);

                    // this.$common.get(this.userId ? '/api/User/EditUser' : '/api/User/AddUser', {
                    //     ...this.form.getFieldsValue(),
                    //     id: this.userId
                    // }).then(d => {
                    //     this.form.clearField();
                    //     this.visible = false;
                    //     this.userId = '';
                    //     this.search();
                    //     this.$message.success(`用户${this.userId?'编辑':'新增'}成功。`, 10);
                    // });
                }
            });
        } else {
            this.visible = false;
        }
    }
}
</script>

<style lang="scss" scoped>
</style>