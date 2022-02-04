import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';

import { Movie } from 'types/movie';
import MovieCard from 'components/MovieCard';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'utils/requests';

import './styles.css';

const Catalog = function () {
  //
  const [page, setPage] = useState<SpringPage<Movie>>();

  useEffect(() => {
    const config: AxiosRequestConfig = {
      withCredentials: true,
      url: '/movies',
      params: {
        page: 0,
        size: 50,
      },
    };

    requestBackend(config)
      .then((response) => {
        setPage(response.data as SpringPage<Movie>);
      })
      .catch((error) => {
        console.log(error);
      });
    //
  }, []);

  return (
    <div className="catalog-container">
      <div className="catalog-searchbar-container base-card">
        <h1>Searchbar</h1>
      </div>

      <div className="row">
        {page?.content.map((movie) => (
          <div
            className="col-sm-6 col-xl-3 catalog-movie-card-container"
            key={movie.id}
          >
            <Link to={`/movies/${movie.id}`}>
              <MovieCard movie={movie} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
