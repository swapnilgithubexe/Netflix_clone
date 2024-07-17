import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { PiPlayLight } from "react-icons/pi";
import { MdOutlinePlaylistAdd } from "react-icons/md";

const apikey = "58fb3220feca51eed42f60101280fc46";
const url = "https://api.themoviedb.org/3/movie";
// const upcoming =
//   "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
// const toprated =
//   "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
// const popular =
//   "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
// const latest = "";

//Card
const Card = ({ img }) => <img className="card" src={img} alt="" />;

//Row
const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h2>{title}</h2>
    <div className="cards">
      {arr.map((item, index) => (
        <Card
          key={index}
          img={`https://image.tmdb.org/t/p/w500${item.poster_path}}`}
        />
      ))}
    </div>
  </div>
);

//Home Component
const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topratedMovies, setTopRatedMovies] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [randomIndex, setRandomIndex] = useState(0);
  const myMovies = [
    "/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg",
    "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    "/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg",
    "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
    "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    "/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
    "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    "/4lhR4L2vzzjl68P1zJyCH755Oz4.jpg",
  ];

  useEffect(() => {
    //Upcoming Movies
    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/upcoming?api_key=${apikey}`);

      setUpcomingMovies(results);
    };

    //POpular
    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/popular?api_key=${apikey}`);

      setPopularMovies(results);
    };
    //Top rated
    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/top_rated?api_key=${apikey}`);
      setTopRatedMovies(results);
    };

    const fetchNowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/now_playing?api_key=${apikey}`);
      setNowPlaying(results);
    };

    fetchUpcoming();
    fetchTopRated();
    fetchPopular();
    fetchNowPlaying();

    const interval = setInterval(() => {
      setRandomIndex(Math.floor(Math.random() * myMovies.length));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: `url(${`https://image.tmdb.org/t/p/w500/${myMovies[randomIndex]}`})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 400,
          cursor: "pointer",
        }}
      >
        {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
        {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

        <div>
          <button>
            Play
            <PiPlayLight />
          </button>
          <button>
            My List
            <MdOutlinePlaylistAdd />
          </button>
        </div>
      </div>
      <Row title={"Now Playing"} arr={nowPlaying} />
      <Row title={"Top Rated"} arr={topratedMovies} />
      <Row title={"Upcoming Movies"} arr={upcomingMovies} />
      <Row title={"Popular on Netflix"} arr={popularMovies} />
    </section>
  );
};

export default Home;
