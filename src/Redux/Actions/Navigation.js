import { getActivitiesPages } from './../../Api'

function updatePages(locations) { return { type: 'CHANGE_PAGE', ...locations } }

export function setLocations(location, role) {
  return dispatch => {
    let prevPage
    let nextPage
    let parentPage
    let addClub
    let addTour

    const mainPages = [
      '/home',
      '/clubs',
      '/tours',
      '/extras',
      '/admin'
    ]

    let locationParts = location.split('/').filter(item => !!item).map(item => '/' + item)

    if(locationParts.length == 1){
      prevPage = mainPages[mainPages.indexOf(locationParts[0]) - 1]
      nextPage = mainPages[mainPages.indexOf(locationParts[0]) + 1]
      if(nextPage == '/admin' && !role.editUsers) nextPage = undefined
      if(locationParts[0] == '/clubs' && role.editActivities) addClub = true
      if(locationParts[0] == '/tours' && role.editActivities) addTour = true
      if(locationParts[0] == '/extras' && role.editActivities) addTour = true

      dispatch(updatePages({ prevPage, nextPage, addClub, addTour }))
    }
    else{
      getActivitiesPages(locationParts[0])
      .then(responce => responce.json())
      .then(res => {
        let pages = res.sort((a, b) => (a.ids.length < b.ids.length) ? 1 : (a.ids.length > b.ids.length) ? -1 : 0 ).map(item => item.title).map(item => '/' + item)
        prevPage = locationParts[0] + pages[(pages.indexOf(locationParts[1]) - 1 + pages.length)%pages.length]
        nextPage = locationParts[0] + pages[(pages.indexOf(locationParts[1]) + 1 + pages.length)%pages.length]
        parentPage = locationParts[0]

        dispatch(updatePages({ prevPage, nextPage, parentPage }))
      })
    }
  }
}
