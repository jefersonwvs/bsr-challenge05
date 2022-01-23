import './styles.css';

import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';

import { Review } from 'types/review';
import { requestBackend } from 'utils/requests';
import Star from 'assets/images/star-img.png';
import { hasAnyRoles } from 'utils/auth';
import Button from 'components/Button';

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
   * Hooks de estado para gerenciar lista de reviews do filme
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
    formState: { errors },
  } = useForm<FormData>();

  /**
   * Hook para realizar requisições.
   */
  useEffect(() => {
    /* Parâmetros usados pela biblioteca 'axios' para fazer requisições */
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}/reviews`,
      withCredentials: true, // requisição autorizada
    };

    requestBackend(config).then((response) => {
      setReviews(response.data as Review[]);
    });
  }, [movieId, countReviews]);

  /**
   * onSubmit: função executada ao clicar com o mouse ou ao teclar enter
   * --> requisição de login ao backend
   * */
  const onSubmit = (formData: FormData) => {
    /** Corpo da requisição */
    const body = {
      ...formData, // text
      movieId,
    };

    /** Parâmetros necessários para fazer requisições com a
     * biblioteca 'axios' */
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/reviews',
      withCredentials: true,
      data: body,
    };

    /** Requisição ao backend */
    requestBackend(config)
      .then((response) => {
        // requisição bem sucedida
        console.log(response.data);
        setCountReviews(countReviews + 1);
      })
      .catch((error) => {
        // requisição mal sucedida
        console.log('ERRO! ', error);
      });
  };

  return (
    <div className="movie-reviews">
      <div className="reviews-container">
        <h1 className="reviews-movie">Tela detalhes do filme id: {movieId}</h1>

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
