import { useState, useEffect } from "react";
import SearchMovie from "./SeacrhMovie";
import Modal from "../Modal/Modal";
import "./Homepage.scss";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

export interface MovieDetails {
  Title: string;
  Year: string;
  imdbRating: string;
  Released: string;
  Genre: string;
  Actors: string;
  Plot: string;
  Poster: string;
}

function Homepage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favourites, setFavourites] = useState<Movie[]>([]);
  const [searchValue, setSearchValue] = useState<string>("avengers");
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState<
    MovieDetails[] | null
  >(null);

  async function fetchMovies(searchValue: string) {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${searchValue}&apikey=e0c87a5f`
    );
    const data = await response.json();
    const searchResponse = data as SearchResponse;
    if (searchResponse.Search) {
      setMovies(searchResponse.Search);
    }
  }

  useEffect(() => {
    fetchMovies(searchValue);
  }, [searchValue]);

  const addFavouriteMovie = (movie: Movie) => {
    const isMovieInFavorites = favourites.find(
      (favMovie) => favMovie.imdbID === movie.imdbID
    );
    if (!isMovieInFavorites) {
      const newFavouriteList = [...favourites, movie];
      setFavourites(newFavouriteList);
    }
  };

  const removeFavouriteMovie = (movie: Movie) => {
    const newFavouriteList = favourites.filter(
      (favMovie) => favMovie.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
  };

  const openModal = async (movie: Movie) => {
    setModalActive(true);
    const response = await fetch(
      `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=e0c87a5f`
    );
    const data = await response.json();
    const movieDetails = data as MovieDetails;
    setSelectedMovieDetails([movieDetails]);
  };

  return (
    <>
      <div className="wrapper">
        <SearchMovie
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <section className="movie__container">
          {movies.map((movie) => (
            <article className="movie-item">
              <div key={movie.imdbID}>
                <a
                  onClick={() => openModal(movie)}
                  className="movie__image _ibg"
                  href="#"
                >
                  <img src={movie.Poster} alt={movie.Title} />
                </a>
                <div className="movie__body">
                  <div className="movie__title">{movie.Title}</div>
                  <div className="movie__title">Release: {movie.Year}</div>
                  <div className="action__button">
                    <button
                      className="movie__button button"
                      onClick={() => addFavouriteMovie(movie)}
                    >
                      Add to favourite
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
        <div className="favourites-title__container">
          <h2 className="favourites__title">Favourites movies</h2>
        </div>
        <section className="movie__container">
          {favourites.map((movie) => (
            <article className="movie-item favourite__item">
              <div key={movie.imdbID}>
                <a
                  onClick={() => openModal(movie)}
                  className="movie__image _ibg"
                  href="#"
                >
                  <img src={movie.Poster} alt={movie.Title} />
                </a>
                <div className="movie__body">
                  <div className="movie__title">{movie.Title}</div>
                  <div className="action__button">
                    <button
                      className="movie__button button"
                      onClick={() => removeFavouriteMovie(movie)}
                    >
                      Remove from favourite
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
      <Modal
        modalActive={modalActive}
        setModalActive={setModalActive}
        selectedMovieDetails={selectedMovieDetails}
      />
    </>
  );
}

export default Homepage;

export {};
