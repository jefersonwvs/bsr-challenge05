import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

import { Genre } from 'types/genre';
import { requestBackend } from 'utils/requests';

import './styles.css';

/**
 * Tipo de dados de filtragem.
 */
export type MovieFilterData = {
  genre: Genre | null;
};

/**
 * Tipo de dados dos parâmetros do componente `MovieFilter`.
 */
type Props = {
  onSubmitFilter: (data: MovieFilterData) => void;
};

const MovieFilter = function (props: Props) {
  /**
   * Função `handleSubmitFilter` que será executada para
   * atualizar os dados de controle referentes a filtragem,
   * ou seja, `controlComponentsData.filterData.genre`.
   */
  const { onSubmitFilter } = props;

  /**
   * Gêneros de filmes cadastrados no BD que serão usados
   * na filtragem por gênero.
   */
  const [genres, setGenres] = useState<Genre[]>();

  /**
   * Dados de configuração de formulário de acordo com
   * o hook `react-hook-form`.
   */
  const { handleSubmit, setValue, getValues, control } =
    useForm<MovieFilterData>();

  /**
   * Hook que recupera do BD os gêneros dos filmes usados
   * para listá-los.
   */
  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/genres',
      withCredentials: true,
    };

    requestBackend(config)
      .then((response) => {
        setGenres(response.data as Genre[]);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  /**
   * Função que é executada quando um evento de submissão de formulário
   * é disparado. Isto é, quando um enter ou botão do formulário é pressionado,
   * os dados do formulário formam o argumento para a execução da
   * `handleSubmitFilter`.
   * @param formData dados que serão submetidos a partir do formulário.
   */
  const onSubmit = function (formData: MovieFilterData) {
    onSubmitFilter(formData);
  };

  /**
   * Função que trata a mudança de gênero do filme.
   * @param value gênero selecionado
   */
  const handleChangeGenre = function (value: Genre) {
    setValue('genre', value);

    const formData: MovieFilterData = {
      genre: getValues('genre'),
    };

    onSubmitFilter(formData);
  };

  return (
    <div className="base-card movie-filter-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="movie-filter-genre">
          <Controller
            name="genre"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                classNamePrefix="movie-filter-genre"
                options={genres}
                placeholder="Gênero"
                getOptionLabel={(genre: Genre) => genre.name}
                getOptionValue={(genre: Genre) => genre.id + ''}
                isClearable
                onChange={(value) => handleChangeGenre(value as Genre)}
              />
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default MovieFilter;
