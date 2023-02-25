import React from "react";
import {useState, useEffect } from "react";
import './App.css';
import SearchIcon from './search.svg';

const API_URL='http://www.omdbapi.com?apikey=f924bdab';

const App=()=>{

    const [movies, setMovies]= useState([]);
    const [searchTerm,setSearchTerm]=useState('');

const searchMovies=async(title)=>{
    const response=await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
}

useEffect(()=>{
searchMovies('friends');
},[]);

    return(    
        <div className="app">
            <h1>FilmoVizija</h1>

            <div className="search">
                <input 
                placeholder="Pretrazi filmove/serije"
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
                />
                <img
                src={SearchIcon}
                alt="search"
                onClick={()=>{searchMovies(searchTerm)}}
                />     
            </div>
                 
            {
                    movies?.length>0
                    ? (
                        
                      <div className="container">
                      {
                       movies.map((movie)=>{ 
                        return(
                            <div className="movie" key={movie.imdbID}>
                            <div>
                                <p>{movie.Year}</p>
                            </div>
                            <div>
                                <img src={movie.Poster!=='N/A' ? movie.Poster : 'https://via.placeholder.com/400'} alt={movie.Title}/>
                            </div>
                             
                             <div>
                                <span>{movie.Type}</span>
                                <h3>{movie.Title}</h3>
                             </div>
                        </div>
                        )
                
                    }) 
                      }
                         </div>
                    ):(
                        <div>
                            <h2>No movies found</h2>
                        </div>
                    )
            }


        </div>
    );
}

export default App;