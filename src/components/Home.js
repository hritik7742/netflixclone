import React, { useEffect, useState } from 'react'
import "./Home.scss";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiPlay } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"


const REACT_APP_MOVIE_API_KEY="e8fbbd07ed13048044599ff54e92af4c"
const api = REACT_APP_MOVIE_API_KEY;

// const api = "e8fbbd07ed13048044599ff54e92af4c"
const url ="https://api.themoviedb.org/3"
const upcoming ='upcoming'
const imgurl="https://image.tmdb.org/t/p/original"
const nowplaying="now_playing"
const popular="popular"
const topRated="top_rated"

const Card =({img})=>(
  <img src={img} className='card' alt="cover"/>
)

const Row = ({title,arr=[

]})=>(
  <div className='row'>
    <h2>{title}</h2>

    <div>

    {
      arr.map((item,index)=>(
        <Card  key={index} img={`${imgurl}/${item.poster_path}`}/>

      ))
    }

   
    </div>

  </div>
)

const Home = () => {
  const [upcomingmovies,setupcomingmovies]=useState([]);
  const [nowplayingmovies,setnowplayingmovies]=useState([]);
  const [popularmovies,setpopularmovies]=useState([]);
  const [topratedmovies,settopratedmovies]=useState([]);
  const [genremovies,setgenremovies]=useState([]);
  


  useEffect(()=>{
    const fetchUpcoming=async () =>{
      const {data: {results},} = await axios.get(`${url}/movie/${upcoming}?api_key=${api}`);
      setupcomingmovies(results)
    };

    fetchUpcoming();

    const fetchNowPlaying=async () =>{
      const {data: {results},} = await axios.get(`${url}/movie/${nowplaying}?api_key=${api}`);
      setnowplayingmovies(results)
    };

    fetchNowPlaying();

     const fetchpPopular=async () =>{
      const {data: {results},} = await axios.get(`${url}/movie/${popular}?api_key=${api}`);
      setpopularmovies(results)
    };

    fetchpPopular();

    const fetchTopRated=async () =>{
      const {data: {results},} = await axios.get(`${url}/movie/${topRated}?api_key=${api}`);
     settopratedmovies(results)
    };

    fetchTopRated();

    const getallgenre=async () =>{
      const {data: {genres},} = await axios.get(`${url}/genre/movie/list?api_key=${api}`);
    setgenremovies(genres)
    };

    getallgenre();


  },[])
  return (
    <section className='home'>
        <div className='banner' style={{
          backgroundImage:popularmovies[0] ? `url(${`${imgurl}/${popularmovies[0].poster_path}`})`
          : "rgb(16, 16, 16)",
        }}>
            {popularmovies[0] && <h1>{popularmovies[0].original_title}</h1>}
                {popularmovies[0] && <p>{popularmovies[0].overview}</p>}
                

                <div>
                    <button><BiPlay /> Play  </button>
                    <button>My List <AiOutlinePlus /> </button>
                </div>


        </div>
        <Row title={"Upcoming "} arr={upcomingmovies}/>
        <Row title={"Now Playing"} arr={nowplayingmovies}/>
        <Row title={"Popular"} arr={popularmovies}/>
        <Row title={"Top Rated"} arr={topratedmovies}/>
       
       

       
        <div className="genreBox">
                {genremovies.map((item) => (
                    <Link key={item.id} to={`/genre/${item.id}`}>
                        {item.name}
                    </Link>
                ))}
            </div>
       

    </section>
  )
}

export default Home