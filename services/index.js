import request from '../utils/request'

export const getDetailsList = function(data) {
  return request({
    url: '/api/diary/getDiary',
    method: 'POST',
    data
  })
}

export const getToken = function(data) {
  return request({
    url: '/api/commom/getToken',
    method: 'POST',
    data
  })
}

export const getDiaryDetailsById = function(data) {
  return request({
    url: '/api/diary/getDiaryDetails',
    data
  })
}

export const editSubmitDiary = function(data) {
  const url = data.id ? '/api/diary/update' : '/api/diary/add'
  return request({
    url: url,
    method: 'POST',
    data
  })
}

export const delDiaryById = function(data) {
  return request({
    url: '/api/diary/getDiaryDetails/delete',
    method: 'POST',
    data
  })
}