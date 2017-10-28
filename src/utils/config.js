
/**
 * 公用get请求
 * @param loginUrl       登陆请求
 * @param GetWorkOrderUrl    get 工单请求
 * @param PostWorkOrderUrl   post 工单请求
 * @param PostTracebilityUrl   post 追溯请求
 */
const ip = '192.168.1.252'
const post = '80'

// const ip = '192.168.1.113'
// const post = '80'

// const ip = '192.168.0.99'
// const post = '80'

export const PublicParam = {
  name: 'AntD Admin',
  mock: true,
  loginUrl: `http://${ip}:${post}/JYTrace/API/ApiCheckLogin/`,
  GetWorkOrderUrl: `http://${ip}:${post}/JYTrace/API/APIGetWorkOrder/?LineCode=`,
  PostWorkOrderUrl: `http://${ip}:${post}/JYTrace/API/ApiActivateWorkOrder/`,
  PostTracebilityUrl: `http://${ip}:${post}/JYTrace/API/ApiSetupMaterial/`,
}

