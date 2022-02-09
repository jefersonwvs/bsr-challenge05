import './styles.css';

import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Review } from 'types/review';
import { requestBackend } from 'utils/requests';
import Star from 'assets/images/star-img.png';
import { hasAnyRoles } from 'utils/auth';
import Button from 'components/Button';
import { Movie } from 'types/movie';
import history from 'utils/history';

/**
 * Tipo de dados para armazenar parâmetros de URL.
 */
type UrlParams = {
  movieId: string;
};

/**
 * Tipo de dados para armzenar dados de formulário.
 */
type FormData = {
  text: string;
};

const MovieDetails = function () {
  /**
   * Identificador do filme acessado.
   */
  const { movieId } = useParams<UrlParams>();

  /**
   * Hook de estado para armazenar filme a ser carregado na página,
   * o qual eventualmente será avaliado.
   */
  const [movie, setMovie] = useState<Movie>();

  /**
   * Hooks de estado para armazenar lista de reviews do filme
   * acessado.
   */
  const [reviews, setReviews] = useState<Review[]>([]);
  const [countReviews, setCountReviews] = useState<number>(0);

  /**
   * Hook para gerenciar formulário.
   */
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  /**
   * Hook de efeito para requisitar do back-end o filme
   * a ser avaliado.
   */
  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}`,
      withCredentials: true, // requisição autorizada
    };

    requestBackend(config)
      .then((response) => {
        setMovie(response.data as Movie);
      })
      .catch((error) => {
        history.push('/movies');
        toast.error(`Filme (id ${movieId}) não está cadastrado!`, {
          autoClose: 3000,
          draggable: false,
        });
      });
  }, [movieId]);

  /**
   * Hook de efeito para requisitar ao back-end as avaliações já
   * cadastradas do filme carregado.
   */
  useEffect(() => {
    /* Parâmetros usados pela biblioteca 'axios' para fazer requisições */
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}/reviews`,
      withCredentials: true, // requisição autorizada
    };

    requestBackend(config)
      .then((response) => {
        setReviews(response.data as Review[]);
      })
      .catch(() => {
        toast.error(`Não foi possível carregar as avaliações deste filme! 😟`, {
          autoClose: 3000,
          draggable: false,
        });
      });
  }, [movieId, countReviews]);

  /**
   * onSubmit: função executada ao clicar com o mouse ou ao teclar enter
   */
  const onSubmit = (formData: FormData) => {
    /** Corpo da requisição */
    const body = {
      ...formData, // text
      movieId,
    };

    // limpeza do formulário
    setValue('text', '');

    /**
     * Parâmetros necessários para fazer requisições com a
     * biblioteca 'axios'
     * */
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/reviews',
      withCredentials: true,
      data: body,
    };

    /** Requisição ao backend */
    requestBackend(config)
      .then((response) => {
        setCountReviews(countReviews + 1);
        toast.success('Avaliação cadastrada com sucesso!', {
          autoClose: 2000,
          draggable: false,
        });
      })
      .catch((error) => {
        toast.error('Não foi possível cadastrar sua avaliação!', {
          autoClose: 3000,
          draggable: false,
        });
      });
  };

  return (
    <div className="movie-details-container">
      <div className="base-card movie-details-card">
        <div className="movie-details-card-img-container">
          <img src={movie?.imgUrl} alt={movie?.title} />
        </div>
        <div className="movie-details-card-content-container">
          <h1 className="movie-details-title">{movie?.title}</h1>
          <h2 className="movie-details-year">{movie?.year}</h2>
          <h3 className="movie-details-subtitle">{movie?.subTitle}</h3>
          <p className="movie-details-synopsis">{movie?.synopsis}</p>
        </div>
      </div>

      <div className="reviews-container">
        {hasAnyRoles(['ROLE_MEMBER']) && (
          <form className="review-form-card" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                {...register('text', {
                  required: 'Campo vazio',
                })}
                type="text"
                className={`form-control base-input review-text ${
                  errors.text ? 'is-invalid' : ''
                }`}
                placeholder="Deixe sua avaliação aqui"
                name="text"
              />
              <div className="invalid-feedback d-block">
                {errors.text?.message}
              </div>
            </div>
            <div className="btn-review-submit">
              <Button text="Salvar publicação" />
            </div>
          </form>
        )}

        {reviews?.length > 0 && (
          <div className="reviews-card">
            {reviews?.map((review) => {
              return (
                <div className="review" key={review.id}>
                  <div className="review-header">
                    <img src={Star} alt="star-img" />
                    <h1>{review.user.name}</h1>
                  </div>
                  <p>{review?.text}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
