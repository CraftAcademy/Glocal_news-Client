import axios from 'axios'

const getCategories = async () => {
  try {
    let response = await axios.get('/api/v1/categories')
    return response.data
  } catch (error) {
    return {error}
  }

}

const getCategoryPaths = async () => {
  try {
    let response = await axios.get('/api/v1/categories');

    let news = {id: null, name: 'News'}
    response.data.unshift(news)
    let paths = response.data.map(category => {
      return `/${category.name.toLowerCase()}`
    })
    return paths
  } catch (error) {
    return {error}
  }
}

const getCategoryNames = async () => {
  try {
    let response = await axios.get('/api/v1/categories');

    let news = {id: null, name: 'News'}
    response.data.unshift(news)
    let colorIndex = [
      'red',
      'blue',
      'pink',
      'teal',
      'grey',
      'olive',
      'black',
      'purple',
      'brown',
      'orange',
      'violet',
      'green',
      'yellow'
    ]

    colorIndex.forEach((color, index) => {
      response.data.forEach((category, categoryIndex) => {
        if (index === categoryIndex) {
          category["color"] = color	
        }
      })
    })
    return response.data
  } catch (error) {
    return {error}
  }
}
export { getCategories, getCategoryPaths, getCategoryNames }  