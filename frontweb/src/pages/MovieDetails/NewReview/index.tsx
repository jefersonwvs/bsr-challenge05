import './styles.css';

import { useForm } from 'react-hook-form';
import Button from 'components/Button';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'utils/requests';

type Props = {
  movieId: string;
};

type FormData = {
  text: string;
};

const NewReview = function (props: Props) {
  const { movieId } = props;

  /** Hook para gerenciamento do formulário */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

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
      })
      .catch((error) => {
        // requisição mal sucedida
        console.log('ERRO! ', error);
      });
  };

  return (
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
        <div className="invalid-feedback d-block">{errors.text?.message}</div>
      </div>
      <div className="btn-review-submit">
        <Button text="Salvar publicação" />
      </div>
    </form>
  );
};

export default NewReview;
