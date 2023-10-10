import request from '@/utils/request'
//得到分类列表
export const getArticleChannel = () => {
  return request.get('/my/cate/list')
}
//发送添加分类请求
export const PostaddArticleChannel = ({ cate_name, cate_alias }) => {
  return request.post('/my/cate/add', { cate_name, cate_alias })
}

//发送删除分类请求
export const PostDeleteArticleChannel = (id) => {
  return request.delete('/my/cate/del', { params: { id } })
}
//发送修改分类请求
export const PutUpdateArticleChannel = ({ id, cate_name, cate_alias }) => {
  return request.put('/my/cate/info', {
    id,
    cate_name,
    cate_alias
  })
}
//得到文章列表请求
export const GetArticleListService = (params) => {
  return request.get('/my/article/list', {
    params
  })
}

//发布文章请求
export const PostArticle = (data) => {
  return request.post('/my/article/add', data)
}

//得到文章详情请求
export const GetArticleDetail = (id) => {
  return request.get('/my/article/info', {
    params: { id }
  })
}

//更新文章
export const PutUpdateArticle = (data) => {
  return request.put('/my/article/info', data)
}

//删除文章
export const DeleteArticle = (id) => {
  return request.delete('/my/article/info', {
    params: { id }
  })
}
