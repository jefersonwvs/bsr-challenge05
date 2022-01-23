import './styles.css';

import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { requestLogin } from 'utils/requests';
import { saveAuthData } from 'utils/storage';
import Button from 'components/Button';
import { useContext, useState } from 'react';
import { AuthContext } from 'AuthContext';
import { getTokenData } from 'utils/auth';

/**
 * Tipo de dados para formulário de login
 */
type FormData = {
  username: string;
  password: string;
};

/**
 * Componente "Login"
 */
const Login = function () {
  /**
   * Hook da dependência `react` para usar o contexto global já criado
   */
  const { setAuthContextData } = useContext(AuthContext);

  /**
   * Hook da dependência `react-hook-form` para trabalhar com formulários
   * */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  /**
   * Hook da dependência `react-router` para trabalhar com redirecionamento de rotas
   */
  const history = useHistory();

  /**
   * Hook para controlar o estado de erro
   */
  const [hasError, setHasError] = useState(false);

  /**
   * onSubmit: função executada ao clicar com o mouse ou ao teclar enter
   * --> requisição de login ao backend
   * */
  const onSubmit = (formData: FormData) => {
    requestLogin(formData)
      .then((response) => {
        setHasError(false);

        /* Salvando os dados de autenticação no localStorage */
        saveAuthData(response.data);

        /* Salvando os dados de autenticação no contexto global da aplicação */
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        });

        /* Login com sucesso: uma nova rota é empilhada */
        history.push('/movies');
      })
      .catch((error) => {
        setHasError(true);
        console.log('ERRO! ', error);
      });
  };

  return (
    <div className="login-card">
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {hasError && (
          <div className="alert alert-danger login-error">
            E-mail ou senha incorretos. Insira credenciais válidas ou
            cadastra-se.
          </div>
        )}
        <div className="mb-4">
          <input
            {...register('username', {
              required: 'Campo obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'E-mail inválido',
              },
            })}
            type="text"
            className={`form-control base-input ${
              errors.username ? 'is-invalid' : ''
            }`}
            placeholder="E-mail"
            name="username"
          />
          <div className="invalid-feedback d-block">
            {errors.username?.message}
          </div>
        </div>
        <div className="mb-2">
          <input
            {...register('password', {
              required: 'Campo obrigatório',
            })}
            type="password"
            className={`form-control base-input ${
              errors.password ? 'is-invalid' : ''
            }`}
            placeholder="Senha"
            name="password"
          />
          <div className="invalid-feedback d-block">
            {errors.password?.message}
          </div>
        </div>

        <div className="login-submit">
          <Button text="Fazer login" />
        </div>
      </form>
    </div>
  );
};

export default Login;
