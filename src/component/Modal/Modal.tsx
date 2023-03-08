import "./Modal.scss";

interface MovieDetails {
  Title: string;
  Year: string;
  imdbRating: string;
  Released: string;
  Genre: string;
  Actors: string;
  Plot: string;
  Poster: string;
}

interface ModalWindowProps {
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  modalActive: boolean;
  selectedMovieDetails: MovieDetails[] | null;
}

function ModalWindow(props: ModalWindowProps) {
  const { setModalActive, modalActive, selectedMovieDetails } = props;

  return (
    <>
      <div
        className={modalActive ? "modal active" : "modal"}
        onClick={() => setModalActive(false)}
      >
        <div className="modal__content" onClick={(e) => e.stopPropagation()}>
          {selectedMovieDetails?.map((details: MovieDetails) => (
            <div className="details__wrapper">
              <div className="movie-image__body">
                <img
                  className="movie__image"
                  src={details.Poster}
                  alt={details.Title}
                ></img>
              </div>
              <div className="details__body">
                <div className="movie__title details-title">
                  {details.Title}
                </div>
                <div className="details__text">
                  Rating: {details.imdbRating}
                </div>
                <div className="details__text">
                  Data of release: {details.Released}
                </div>
                <div className="details__text">Genre: {details.Genre}</div>
                <div className="details__text">Actors: {details.Actors}</div>
                <div className="details__text">Plot: {details.Plot}</div>
                <div className="details-action__button">
                  <button
                    className="movie__button details__button button"
                    onClick={() => setModalActive(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ModalWindow;

export {};
