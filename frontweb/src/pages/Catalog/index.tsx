import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';

import { Movie } from 'types/movie';
import MovieCard from 'components/MovieCard';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'utils/requests';
import MovieFilter, { MovieFilterData } from 'components/MovieFilter';
import Pagination from 'components/Pagination';

import './styles.css';

/**
 * Tipo de dados que controlam o resultado renderizado pelo componente.
 * Isto é, a depender da paginação e dos dados de filtragem, os
 * resultados renderizados serão diferentes.
 */
type ControlComponentsData = {
  filterData: MovieFilterData;
};

const Catalog = function () {
  /**
   * Página Spring de `movie` carregada a partir do back-end.
   */
  const [page, setPage] = useState<SpringPage<Movie>>();

  /**
   * Dados de controle do componente.
   */
  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({ filterData: { genre: null } });

  /**
   * Função que, por fazer uso de um `hook`, está restrita ao
   * funcionamento do ciclo de vida da aplicação `react`.
   * A saber, `useCallback` faz com que uma única referẽncia
   * de função seja armazenada.
   */
  const getMovies = useCallback(() => {
    //
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      params: {
        page: 0,
        size: 50, // CHANGE later
        genreId: controlComponentsData.filterData.genre?.id,
      },
      withCredentials: true,
    };

    requestBackend(config)
      .then((response) => {
        setPage(response.data as SpringPage<Movie>);
      })
      .catch((error) => {
        console.log(error); // CHANGE later
      });
    //
  }, [controlComponentsData]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  /**
   * Função que é executada novos dados de filtragem são submetidos,
   * para que a listagem de filmes seja atualizada.
   * @param filterData dados de filtragem
   */
  const handleSubmitFilter = function (filterData: MovieFilterData) {
    setControlComponentsData({ filterData });
  };

  return (
    <div className="catalog-container">
      <MovieFilter onSubmitFilter={handleSubmitFilter} />

      <div className="row">
        {page?.content.map((movie) => (
          <div className="col-sm-6 col-xl-3" key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <MovieCard movie={movie} />
            </Link>
          </div>
        ))}
      </div>

      <div className="pagination-container">
        <Pagination />
      </div>
    </div>
  );
};

export default Catalog;
