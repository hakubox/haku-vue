import * as authorize from '@/api/authorize';
import * as order from '@/api/order';
import * as product from '@/api/product';
import * as upload from '@/api/upload';
import * as user from '@/api/user';


export default {

    /** 系统访问授权模块 */
    authorize,

    /** 采购单相关操作模块 */
    order,

    /** 产品信息操作模块 */
    product,

    /** 文件上传控制器 */
    upload,

    /** 用户数据操作模块 */
    user,
}