/*
 * @Descripttion: 
 * @Author: WSY
 * @Date: 2019-09-14 16:25:10
 * @LastEditTime: 2019-09-15 11:20:50
 */
import axios from 'axios';
import baseUrl from './config.js'

// 注册
export const register = (data) => {
  return axios({
    url: `${baseUrl}/user/register`,
    method: 'post',
    data
  })
}

export const userIsExist = (username) => {
  return axios({
    url: `${baseUrl}/user/user-exist`,
    method: 'post',
    data: {username: username}
  })
}

export const emailIsExist = (email) => {
  return axios({
    url: `${baseUrl}/user/email-exist`,
    method: 'post',
    data: {email: email}
  })
}

// 发送验证码
export const sendCode = (data) => {
  return axios({
    url: `${baseUrl}/user/sendcode`,
    method: 'post',
    data
  })
}

export const checkEmailcode = (data) => {
  return axios({
    url: `${baseUrl}/user/check-emailcode`,
    method: 'post',
    data
  })
}

export const updatePassword = (data) => {
  return axios({
    url: `${baseUrl}/user/update-password`,
    method: 'post',
    data
  })
}

// 登陆
export const login = (data) => {
  return axios({
    url: `${baseUrl}/user/login`,
    method: 'post',
    data
  })
}

// 送养
export const sendPets = (data) => {
  return axios({
    url: `${baseUrl}/pet/sendpet`,
    method: 'post',
    data
  })
}

// 获取宠物品种的信息
export const retrieveBreed = (data) => {
  return axios({
    url: `${baseUrl}/pet/petbreed`,
    method: 'get',
    data
  })
}

export const findBreed = (category) => {
  return axios({
    url: `${baseUrl}/pet/findbreed?category=${category}`,
    method: 'get'
  })
}

// 获取领养文章的信息
export const retrievePetInfo = (pageNum, pageSize, province, city, county, breed, breedName) => {
  return axios({
    url: `${baseUrl}/pet/petarticle?pageNum=${pageNum}&pageSize=${pageSize}&province=${province}&city=${city}&county=${county}&breed=${breed}&breedName=${breedName}`,
    method: 'get'
  })
}

// 获取领养宠物详情文章
export const retrievePetDetail = (id) => {
  return axios({
    url: `${baseUrl}/pet/detailarticle/${id}`,
    method: 'get'
  })
}

// 发表评论
export const sendPetComment = (data) => {
  return axios({
    url: `${baseUrl}/pet/sendcomment`,
    method: 'post',
    data
  })
}

// 获取评论
export const getPetComment = (id) => {
  return axios({
    url: `${baseUrl}/pet/getcomment/${id}`,
    method: 'get'
  })
}

// 阅读数加一
export const petReadNum = (data) => {
  return axios({
    url: `${baseUrl}/pet/addreadnum`,
    method: 'post',
    data
  })
}

// 点击喜欢
export const petLikeNum = (data) => {
  return axios({
    url: `${baseUrl}/pet/petlike`,
    method: 'post',
    data
  })
}

// 取消喜欢
export const petUnLikeNum = (data) => {
  return axios({
    url: `${baseUrl}/pet/petunlike`,
    method: 'post',
    data
  })
}

// 获取当前文章喜欢数
export const getLikeNum = (id) => {
  return axios({
    url: `${baseUrl}/pet/getlike/${id}`,
    method: 'get'
  })
}

// 获取轮播图
export const getSwiperImg = () => {
  return axios({
    url: `${baseUrl}/pet/getswiper`,
    method: 'get'
  })
}

/*-----------------------------show------------------------------------*/

// 发布宠物秀
export const sendPetShow = (data) => {
  return axios({
    url: `${baseUrl}/show/sendshow`,
    method: 'post',
    data
  })
}

// 获取宠物秀内容
export const retrieveShowInfo = (pageNum, pageSize) => {
  return axios({
    url: `${baseUrl}/show/getshow?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'get'
  })
}

// 获取宠物秀详情
export const getDetailShow = (id) => {
  return axios({
    url: `${baseUrl}/show/getshowdetail/${id}`,
    method: 'get'
  })
}

// 发表评论
export const sendShowComment = (data) => {
  return axios({
    url: `${baseUrl}/show/sendcomment`,
    method: 'post',
    data
  })
}

// 获取评论
export const getShowComment = (id) => {
  return axios({
    url: `${baseUrl}/show/getcomment/${id}`,
    method: 'get'
  })
}


// 获取宠物秀首页评论数
export const getShowIndexComment = () => {
  return axios({
    url: `${baseUrl}/show/getindexcomment`,
    method: 'get'
  })
}


/*-------------------------论坛----------------------*/
// 发布文章
export const sendArticle = (data) => {
  return axios({
    url: `${baseUrl}/bbs/sendarticle`,
    method: 'post',
    data
  })
}

// 获取文章信息
export const getArticle = (category, topic, pageNum, pageSize) => {
  return axios({
    url: `${baseUrl}/bbs/getarticle?category=${category}&topic=${topic}&pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'get'
  })
}

// 获取文章详情
export const getDetailArticle = (id) => {
  return axios({
    url: `${baseUrl}/bbs/getdetailarticle/${id}`,
    method: 'get'
  })
}

// 发表回复
export const sendReply = (data) => {
  return axios({
    url: `${baseUrl}/bbs/sendreply`,
    method: 'post',
    data
  })
}

// 获取回复
export const getArticleReply = (id, pageNum, pageSize) => {
  return axios({
    url: `${baseUrl}/bbs/getreply/${id}?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'get'
  })
}

// 获取论坛首页文章评论数
export const getArticleIndexComment = () => {
  return axios({
    url: `${baseUrl}/bbs/getindexcomment`,
    method: 'get'
  })
}


// 获取网站首页论坛最新文章
export const getLastestArticle = () => {
  return axios({
    url: `${baseUrl}/bbs/getlastestarticle`,
    method: 'get'
  })
}

// 获取网站首页论坛热门文章
export const getHotArticle = () => {
  return axios({
    url: `${baseUrl}/bbs/gethotarticle`,
    method: 'get'
  })
}

// 阅读数加一
export const articleReadNum = (data) => {
  return axios({
    url: `${baseUrl}/bbs/addreadnum`,
    method: 'post',
    data
  })
}

/*------------------个人中心-------------------*/
// 修改个人信息
export const updatePersonal = (data) => {
  return axios({
    url: `${baseUrl}/my/updateinfo`,
    method: 'post',
    data
  })
}

// 获取自己发表的领养信息
export const getMyPets = (username) => {
  return axios({
    url: `${baseUrl}/my/getmypets?username=${username}`,
    method: 'get'
  })
}

// 修改宠物领养状态
export const updatePetStatus = (data) => {
  return axios({
    url: `${baseUrl}/my/updatestatus`,
    method: 'post',
    data
  })
}

// 删除宠物领养信息
export const deletePersonalPet = (data) => {
  return axios({
    url: `${baseUrl}/my/deletepet`,
    method: 'post',
    data
  })
}

// 获取自己喜欢的领养信息
export const getLikePets = (username) => {
  return axios({
    url: `${baseUrl}/my/getmylikepets?username=${username}`,
    method: 'get'
  })
}

// 获取自己发表的论坛文章
export const getPersonalArticle = (username) => {
  return axios({
    url: `${baseUrl}/my/getmyarticle?username=${username}`,
    method: 'get'
  })
}

// 删除论坛文章
export const deletePersonalArticle = (data) => {
  return axios({
    url: `${baseUrl}/my/deletearticle`,
    method: 'post',
    data
  })
}

// ------------提醒功能-----------

export const addNotice = (data) => {
  return axios({
    url: `${baseUrl}/notice/addnotice`,
    method: 'post',
    data
  })
}

export const getNoticeInfo = (username,category) => {
  return axios({
    url: `${baseUrl}/notice/getnotice?username=${username}`,
    method: 'get'
  })
}

// 获取需要提醒的总数
export const getTotalNotice = (username) => {
  return axios({
    url: `${baseUrl}/notice/getallnotice?username=${username}`,
    method: 'get'
  })
}

export const updateNoticeInfo = (data) => {
  return axios({
    url: `${baseUrl}/notice/updetenotice`,
    method: 'post',
    data
  })
}
