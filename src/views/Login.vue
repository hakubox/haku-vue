<template>
    <div class="login-page">
        <div class="login-page-form">
            <!-- Logo标题 -->
            <h1 class="login-page-form-title" @click="test">船舶物料系统</h1>
            <!-- 登录表单 -->
            <a-form :form="form" @submit="login">
                <a-form-item :wrapper-col="{ span: 24 }" :validate-status="userNameError() ? 'error' : ''" :help="userNameError() || ''">
                    <a-input size="large" v-decorator="['name', {rules: [{ required: true, message: '请输入用户名！' }]} ]" placeholder="用户名" >
                        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                    </a-input>
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 24 }" :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
                    <a-input size="large" v-decorator="['password', {rules: [{ required: true, message: '请输入密码！' }]} ]" type="password" placeholder="密码" >
                        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
                    </a-input>
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 24 }">
                    <a-button :loading="isLoading" block size="large" type="primary" html-type="submit">登录系统</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { get, post } from '@/tools/common';

@Component({
  components: {
  }
})
export default class UserManager extends Vue {
    isLoading:boolean = false;
    form;
    created() {
        this.form = this.$form.createForm(this);
    }
    mounted() {
        this.$root.setBreadcrumb(['登录']);
        this.$nextTick(() => {
            this.form && this.form.validateFields();
        });
    }
    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    userNameError () {
        if(!this.form) return false;
        const { getFieldError, isFieldTouched } = this.form;
        return isFieldTouched('userName') && getFieldError('userName');
    }
    passwordError () {
        if(!this.form) return false;
        const { getFieldError, isFieldTouched } = this.form;
        return isFieldTouched('password') && getFieldError('password');
    }
    test() {
        post(`/api/Test`, {
            userid: 100,
            username: 'test_user_name'
        });
    }
    login(e) {
        e.preventDefault();
        this.form && this.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    this.isLoading = true;
                    const token = await this.$api.authorize.GetToken({
                        name: values.name,
                        password: values.password
                    });

                    localStorage.setItem('Authorization', 'Bearer ' + token);
                    this.$root.userInfo = await this.$api.user.GetUser();

                    let permissions = await this.$api.funcation.GetFuncationListByUserId();
                    this.$store.commit('setPermissions', permissions);

                    this.$bus.$emit('routerchange', { name: 'quotedprice', path: '/front/quotedprice', query: {}});
                    this.$router.push('/front/quotedprice');
                } finally {
                    this.isLoading = false;
                }
            }
        })
    }
}
</script>

<style lang="scss">

.login-page {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: white;
    background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%;
    
    .ant-col-offset-2.ant-form-item-control-wrapper {
        margin-top: 10px;
    }

    .login-page-form-title {
        display: block;
        text-align: center;
        margin-bottom: 60px;
    }

    .ant-row.ant-form-item {
        margin-bottom: 30px;
    }

    .login-page-form {
        position: fixed;
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 400px;
        max-width: 80%;
        top: 30%;
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>
