import Mock from 'mockjs'
import homeApi from './mockServer/home'
import userApi from './mockServer/user'
Mock.mock('/api/home/getData', homeApi.getStatisticalData)
Mock.mock(/api\/user\/getUser/, userApi.getUserList)
Mock.mock('/api/user/create', 'post', userApi.createUser)
Mock.mock('/api/user/delete', 'post', userApi.deleteUser)
Mock.mock('/api/user/update', 'post', userApi.updateUser)
