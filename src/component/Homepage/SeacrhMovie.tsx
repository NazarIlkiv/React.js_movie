import "./Homepage.scss";

interface SearchMovieProps {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
}

function SearchMovie(props: SearchMovieProps) {
  const { setSearchValue, searchValue } = props;

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  return (
    <form action="" className="movie__Search">
      <input
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Enter movie name..."
        className="movieSearch__input"
      ></input>
    </form>
  );
}

export default SearchMovie;

export {};
