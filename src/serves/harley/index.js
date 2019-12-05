import reqFunc from '../index.js'

// 领取任务
export function getTaskByTaskOrRobotNO(data) {
    return reqFunc.post('/picktask/getTaskByTaskOrRobotNO', data)
}
// 提交任务
export function submitTask(data) {
    return reqFunc.post('/picktaskdetail/pick', data)
}