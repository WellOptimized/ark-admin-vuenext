import { defHttp } from '/@/utils/http/axios'
import type { Menu } from '/@/router/typing'
// 默认前缀是'/api/admin'
const Api = {
  login: '/user/login',
  captcha: '/user/login/captcha',
  info: '/user/info',
  permmenu: '/user/permmenu',
  logout: '/user/logout',
  profile: '/user/profile/info',
  avatar: '/user/avatar/generate',
  update: '/user/profile/update',
  passwd: '/user/password/update',
}

interface CaptchaImgParams {
  width?: number
  height?: number
}
interface CaptchaImgResult {
  verifyCode: string
  captchaId: string
}
export function getImageCaptcha(params?: CaptchaImgParams) {
  // console.log('我正在测试验证码请求接口111')
  return defHttp.get<CaptchaImgResult>({ url: Api.captcha, params },{ errorMessageMode: 'message' })
}

// export async function getImageCaptcha(params?: CaptchaImgParams) {
//   try {
//     const response = await defHttp.get<CaptchaImgResult>({ url: Api.captcha, params });
//     return response;
//   } catch (error) {
//     console.error('Error fetching image captcha:', error);
//     throw error; // re-throw the error if you want it to propagate
//   }
// }


interface UserLoginParams {
  account: string
  password: string
  captchaId: string
  verifyCode: string
}
interface UserLoginResult {
  token: string
}
export function userLogin(data: UserLoginParams): Promise<Nullable<UserLoginResult>> {
  return defHttp.post<Nullable<UserLoginResult>>(
    { url: Api.login, data },
    { errorMessageMode: 'message' }
  )
}

interface UserInfoResult {
  username: string
  avatar: string
}
export function getUserInfo(): Promise<UserInfoResult> {
  return defHttp.get<UserInfoResult>({ url: Api.info })
}

interface PermMenuResult {
  perms: string[]
  menus: Menu[]
}
export function getPermAndMenu(): Promise<PermMenuResult> {
  return defHttp.get<PermMenuResult>({ url: Api.permmenu })
}

export function userLogout(): Promise<void> {
  return defHttp.post<void>({ url: Api.logout })
}

interface UserProfileInfoResult {
  avatar: string
  email: string
  gender: number
  mobile: string
  nickname: string
  remark: string
  username: string
}
export function getUserProfileInfo(): Promise<UserProfileInfoResult> {
  return defHttp.get<UserProfileInfoResult>({ url: Api.profile })
}

export function generateAvatar(): Promise<{ avatarUrl: string }> {
  return defHttp.get({ url: Api.avatar })
}

export function updateUserProfile(data: UserProfileInfoResult) {
  return defHttp.post({ url: Api.update, data })
}

export function updateUserPasswd(data: { oldPassword: string; newPassword: string }) {
  return defHttp.post({ url: Api.passwd, data })
}
