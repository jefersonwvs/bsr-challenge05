import { Movie } from 'types/movie';

import './styles.css';

type Props = {
  movie: Movie;
};

const MovieCard = function (props: Props) {
  //
  const { movie } = props;

  return (
    <div className="base-card movie-card">
      <div className="movie-card-img-container">
        <img src={movie.imgUrl} alt={movie.title} />
      </div>
      <div className="movie-card-info-container">
        <h1 className="movie-card-info-title">{movie.title}</h1>
        <h2 className="movie-card-info-year">{movie.year}</h2>
        <h3 className="movie-card-info-subtitle">{movie.subTitle}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
