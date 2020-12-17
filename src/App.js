import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import Recipe from './Recipe.js'

function App() {

  const APP_ID = '4dbe9c5a'
  const APP_KEY = '02f2588dc9571bf842ef12f46aaac650'

  // useEffect(() => {
  //   console.log('effect has been run')
  //   // an empty array means that this will render once upon page load 
  //   // if you add a variable into the array, it will render everytime that variable's value changes 
  // }, [])

  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('chicken')

  useEffect (() => {
    getRecipes()
  }, [query])

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json()
    setRecipes(data.hits)
  } 

  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input type="text" className="search-bar" value={search} onChange={updateSearch}></input>        
        <button type="submit" className="search-btn">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
          />
      ))}
      </div>
    </div>
  );
}

export default App;
