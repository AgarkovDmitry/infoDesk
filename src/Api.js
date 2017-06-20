let headers = {
  'Content-type': 'application/json'
}

function Url(collection, params = {}){
  let res = ''
  for(let key in params)
    res = res + key + '=' + JSON.stringify(params[key]) + '&'

  res = res + 'apiKey' + '=' + '6MDIRROixYnQs2FBPC75DTpO_dCoKfET'

  return `https://api.mlab.com/api/1/databases/infodesk/collections/${collection}?${res}`
}

export function getUsers(){
  let params = { f: { 'login': 0, 'password': 0 } }
  return fetch(Url('users', params))
}

export function getStudents(){
  let params = {
    f: { 'login': 0, 'password': 0, 'role': 0  },
    q: { 'role': 'Student' }
  }
  return fetch(Url('users', params))
}

export function getActivities(type){
  let params = {
    f: { 'description': 0, 'warning': 0 },
  }
  return fetch(Url(type, params))
}

export function getActivitiesPages(type){
  let params = {
    f: { 'title': 1, 'ids': 1  },
  }
  return fetch(Url(type, params))
}

export function getMenu(type){
  let params = { f: { 'title': 1, 'ids': 1 } }
  return fetch(Url(type, params))
}

export function getActivity(type, title){
  let params = { q: { 'title': title } }
  return fetch(Url(type, params))
}

export function getRole(role){
  let params = { q: { 'title': role }, f: { 'title': 0 } }
  return fetch(Url('roles', params))
}

export function getSubscriberById(id){
  let params = {
    q: { '_id': id, role: 'Student' },
    f: {
      'name': 1,
      'surname': 1,
      'birthday': 1,
      'country': 1,
      'english': 1,
      'file_url': 1,
    }
  }
  return fetch(Url('users', params))
}

export function getUserByLogin(login, pass){
  let params = { q: { 'email': login } }
  return fetch(Url('users', params))
}

export function send(type, message, item){
  if(item == undefined)
    return fetch(Url(type), {
      method: 'post',
      headers: headers,
      body: JSON.stringify(message)
    })
  else
    return fetch(Url(type, { q: { _id: item._id } }), {
      method: 'put',
      headers: headers,
      body: JSON.stringify({ '$set': message })
    })
    //return put(Url(type, { q: { _id: item._id } }), message)
}

export function remove(type, id){
  return fetch(Url(type, { q: { _id: id } }), {
    method: 'put',
    headers: headers,
    body: JSON.stringify([])
  })
}
