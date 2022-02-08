import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

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
  activePage: number;
  filterData: MovieFilterData;
};

const Catalog = function () {
  /**
   * Página Spring de `movies` carregada a partir do back-end.
   */
  const [page, setPage] = useState<SpringPage<Movie>>();

  /**
   * Dados de controle do componente.
   */
  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { genre: null },
    });

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
      url: '/movies1',
      params: {
        page: controlComponentsData.activePage,
        size: 12,
        genreId: controlComponentsData.filterData.genre?.id,
      },
      withCredentials: true,
    };

    requestBackend(config)
      .then((response) => {
        setPage(response.data as SpringPage<Movie>);
      })
      .catch((error) => {
        toast.error(
          'Não foi possível carregar a listagem de filmes. Por favor, tente recarregar a página.',
          { autoClose: 3000, draggable: false }
        );
      });
    //
  }, [controlComponentsData]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  /**
   * Função que é executada quando novos dados de filtragem são submetidos,
   * para que a listagem de filmes seja atualizada.
   * @param filterData dados de filtragem
   */
  const handleSubmitFilter = function (filterData: MovieFilterData) {
    setControlComponentsData({ activePage: 0, filterData });
  };

  /**
   * Função que é executada quando o usuário clica para trocar o número da
   * página carregada.
   * @param pageNumber número da página a ser carregada
   */
  const handlePageChange = function (pageNumber: number) {
    setControlComponentsData({
      activePage: pageNumber,
      filterData: controlComponentsData.filterData,
    });
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
        <Pagination
          forcePage={page?.number}
          pageCount={page ? page?.totalPages : 0}
          range={3}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Catalog;
