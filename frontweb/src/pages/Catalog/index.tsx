import { Link } from 'react-router-dom';

import { Movie } from 'types/movie';
import MovieCard from 'components/MovieCard';

import './styles.css';

const Catalog = function () {
  //
  const movie: Movie = {
    id: 1,
    title: 'Bob Esponja',
    subTitle: 'O Incrível Resgate',
    year: 2020,
    imgUrl:
      'https://image.tmdb.org/t/p/w533_and_h300_bestv2/wu1uilmhM4TdluKi2ytfz8gidHf.jpg',
    synopsis:
      'Onde está Gary? Segundo Bob Esponja, Gary foi "caracolstrado" pelo temível Rei Poseidon e levado para a cidade perdida de Atlantic City. Junto a Patrick Estrela, ele sai em uma missão de resgate ao querido amigo, e nesta jornada os dois vão conhecer novos personagens e viver inimagináveis aventuras.',
    genre: {
      id: 1,
      name: 'Comédia',
    },
  };

  return (
    <div className="catalog-container">
      <div className="catalog-searchbar-container base-card">
        <h1>Searchbar</h1>
      </div>

      <div className="row">
        <div className="col-sm-6 col-xl-3 catalog-movie-card-container">
          <Link to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        </div>
        <div className="col-sm-6 col-xl-3 catalog-movie-card-container">
          <Link to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        </div>
        <div className="col-sm-6 col-xl-3 catalog-movie-card-container">
          <Link to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        </div>
        <div className="col-sm-6 col-xl-3 catalog-movie-card-container">
          <Link to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        </div>
        <div className="col-sm-6 col-xl-3 catalog-movie-card-container">
          <Link to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        </div>
        <div className="col-sm-6 col-xl-3 catalog-movie-card-container">
          <Link to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        </div>
        <div className="col-sm-6 col-xl-3 catalog-movie-card-container">
          <Link to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        </div>
        <div className="col-sm-6 col-xl-3 catalog-movie-card-container">
          <Link to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
