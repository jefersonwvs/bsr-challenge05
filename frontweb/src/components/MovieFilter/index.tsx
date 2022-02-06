import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

import { Genre } from 'types/genre';
import { requestBackend } from 'utils/requests';

import './styles.css';

type MovieFilterData = {
  genre: Genre | null;
};

const MovieFilter = function () {
  //
  const [genres, setGenres] = useState<Genre[]>();

  const { register, handleSubmit, setValue, getValues, control } =
    useForm<MovieFilterData>();

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

  return (
    <div className="base-card movie-filter-container">
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
            />
          )}
        />
      </div>
    </div>
  );
};

export default MovieFilter;
