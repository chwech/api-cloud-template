/**
 * API 接口
 * @cache 是否对API接口进行缓存处理，目前仅对get接口有效
 * cache时间统一为一小时
 * 如果此处已经定义了cache为true，但是由于业务逻辑需要强制不走cache，只需要在调用此接口是传入参数 realRequest:true即可，同时会刷新cache
 */
import axios from './http'
let baseURL = axios.defaults.domain
console.log('domain', axios.defaults.domain)
export const getDomain = params => Promise.resolve(baseURL)// 获取api请求根域名
export const area = params => axios.get(`area`, { params, baseURL })// 地区信息
export const jsConfig = params => axios.get(`common/jssdk/patient`, { params, baseURL })
export const picture = params => axios.post(`picture`, params, { baseURL })// 上传图片接口(文件)
export const pictureBase64 = params => axios.post(`picture_base64`, params, { baseURL })// 上传图片接口(文件)
export const pictureWechat = params => axios.get(`picture_wechat`, { params, baseURL })// 上传图片接口(文件)
export const media = params => axios.post('media', params, { baseURL }) // 下载微信语音素材

// 注冊
export const sms = params => axios.post(`common/verify-code`, params, { baseURL })// 发送短信
export const register = params => axios.post(`user`, params, { baseURL })// 注册
export const registerUpdate = (params, id) => axios.put(`user/` + id, params, { baseURL })// 注册更新信息（先扫医生二维码情况下注册）

export const qiniuToken = params => axios.get('qiniu', { params, baseURL })// 获取七牛云token
export const rcloudToken = params => axios.post('rcloud_token', params)// 获取融云token

// 首页
export const adv = params => axios.get(`ad`, { params })// 广告列表
export const statistic = params => axios.get(`index_statistic`, { params })

// 用户
export const login = params => axios.post('auth/token', params, { baseURL })// 用户token
export const user = params => axios.get(`user`, { params })// 用户信息
export const userUpdate = (id, params) => axios.put(`user/${id}`, params)// 修改用户资料
export const userUpdateTell = params => axios.put(`update_mobile`, params)// 手机号码修改
export const messages = params => axios.get(`notifications`, { params })// 我的消息
export const messagesNum = params => axios.get(`notification_count`, params)// 我的消息未读数量
export const messagesDetails = (id, params) => axios.get(`notifications/` + id, { params })// 我的消息详情
export const messagesRead = (id, params) => axios.put(`message/` + id, params)// 我的消息已读更新
export const uploadChatMessage = (id, params) => axios.post(`upload_chat_message/${id}`, params) // 上传对话消息

// 文章
export const articleType = params => axios.get(`new_cate`, { params })// 文章分类
export const articleList = params => axios.get(`new`, { params })// 文章列表
export const articleDetails = (id, params) => axios.get(`new/` + id, { params })// 文章详情
export const articleCollect = params => axios.post(`favorite`, params)// 收藏文章
export const articlePraise = (id, params) => axios.put(`new_praise/` + id, params)// 文章点赞
export const articleCollectList = params => axios.get(`favorite`, { params })// 文章收藏列表

// 评论
export const commentList = params => axios.get(`user_comment`, { params })// 文章或点播评论列表
export const comment = params => axios.post(`user_comment`, params)// 文章或点播添加评论
export const commentPraise = (id, params) => axios.get(`user_comment/` + id + `/praise`, { params })// 文章评论点赞
export const commentDetails = params => axios.get(`get_common_info`, { params })// 文章详情

// 问卷
export const surveyList = params => axios.get(`survey`, { params })// 问卷列表
export const surveyDetails = (id, params) => axios.get(`survey/` + id, { params })// 问卷详情
export const surveySave = params => axios.post(`answer_paper`, params)// 问卷保存

// 医生
export const doctorList = params => axios.get(`doctor`, { params })// 医生列表
export const doctorDetails = (id, params) => axios.get(`doctor/` + id, { params })// 医生详情
export const doctorFeesList = params => axios.get(`doctor_fees`, { params })// 收费医生列表
export const doctorInfo = params => axios.get(`docotor_info`, { params })// 预约医生详情接口

// 订单
export const orderList = params => axios.get(`orders`, { params })// 订单列表
export const orderDetails = (id, params) => axios.get(`orders/` + id, { params })// 订单详情
export const orders = params => axios.post(`orders`, params)// 订单详情
export const ordersCancel = (id, params) => axios.put(`cancel/` + id, params)// 取消订单
export const payment = (id, params) => axios.put(`payment/` + id, params)// 微信支付

// 患者管理
export const patientList = params => axios.get(`patient`, { params })// 患者列表
export const patientDetails = (id, params) => axios.get(`patient/` + id, { params })// 患者详情
export const patientAdd = params => axios.post(`patient`, params)// 患者新增(增加亲属)
export const patientDel = (id, params) => axios.delete(`patient/` + id, params)// 患者删除(删除亲属)
export const patientEdit = (id, params) => axios.put(`patient/` + id, params)// 患者更新(更新亲属)

// 处方订单
export const prescriptionList = params => axios.post(`prescription_order/getOrderList`, params)// 处方列表
export const prescriptionDetail = params => axios.post(`prescription_order/detail`, params)// 处方订单详情
export const prescriptionAddressAdd = (id, params) => axios.post(`prescription_order/address/${id}`, {
  ...params,
  _method: 'put'
}) // 处方订单添加收货地址
export const prescriptionPay = (id, params) => axios.put(`pay_prescription/${id}`, params) // 处方订单微信支付
export const prescriptionChangeToPay = (id, params) => axios.get(`change_to_pay/${id}`, params) // 处方订单模拟支付，测试用

// 收货地址管理
export const addressList = params => axios.get(`address`, { params })// 收货地址列表
export const addressDel = (id, params) => axios.delete(`address/${id}`, { params })// 收货地址删除
export const addressAdd = params => axios.post(`address`, params) // 收货地址新增
export const addressDetail = (id, params) => axios.get(`address/${id}`, { params }) // 收货地址详细
export const addressEdit = (id, params) => axios.put(`address/${id}`, params) // 收货地址编辑

// 我的病历
// 照顾者管理
export const carerList = params => axios.get(`carer`, { params }) // 照顾者列表
export const carerAdd = params => axios.post(`carer`, params) // 照顾者添加
export const carerEdit = (id, params) => axios.put(`carer/${id}`, params) // 照顾者编辑
export const carerDel = (id, params) => axios.delete(`carer/${id}`, params) // 照顾者删除
export const offlineOrder = params => axios.post(`offline_order`, params) // 病历添加
export const patientRecordList = (id, params) => axios.get(`patient/${id}`, { params }) // 病历列表
