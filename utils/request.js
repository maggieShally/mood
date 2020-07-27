

const request = function ({url, method= 'GET', data, option}){

  const fecthConfig = {
    url: `http://192.168.1.35:3002${url}`,
    method,
    data,
    dataType: 'json',
    responseType: 'text',
    header: {
      authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3QiLCJpYXQiOjE1MjQ1Mzc0MDgsInN1YiI6IntcImNsaWVudElkXCI6XCJYRjAwMDRcIixcImNsaWVudE5hbWVcIjpcIui_kOiQpeWQjuWPsFwifSIsImlzcyI6IlhGMDAwNCIsImV4cCI6MTUyNDYyMzgwOH0.MRmd0LQSFAkIok7XbwgEULmAb3A_8JUfLnYlqv0zVjU',
      sysuserlogincredentials: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3QiLCJpYXQiOjE1MjQ1NTE2MzQsInN1YiI6IjQxOTUiLCJpc3MiOiI0MTk1IiwiZXhwIjoxNTI0NjM4MDM0fQ.nTUHJVvfcbtp6kGKSkkXg340lub_8bjzM2g49QvKFXQ',
    }
  }

  return new Promise((resolve, reject) => {
    return wx.request({
      ...fecthConfig,
      ...option,
      success: function (res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          if (res.data.meta.code === '00000') {
            resolve(res.data.data)
          } else {
            reject(res.data.meta)
          }
        } else {
          throw new Error('222')
        }
      },
      fail: function (res) {
        throw new Error('222')
      },
      complete: function (res) {

      },
    })
  })
}


const ajaxPost = function (url, data) {
  return request(url, {
    method: 'POST',
    data: data,
  })
}


const ajaxGet = function (url, data) {
  return request(url, {
    method: 'GET',
    data: data,
  })
}

// module.exports = {
//   ajaxPost,
//   ajaxGet
// }

export default request