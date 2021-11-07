import jwtDecode from 'jwt-decode';
import { getAuthData } from 'utils/storage';

/**
 * Possíveis papéis dos usuários do sistema
 */
export type Role = 'ROLE_VISITOR' | 'ROLE_MEMBER';

/**
 * Tipo de objeto para armazenar algumas propriedades de um
 * token decodificado
 */
export type TokenData = {
   exp: number;
   user_name: string;
   authorities: Role[];
};

/**
 * Função que retorna um `TokenData` válido decodificado ou
 * `undefined` quando inválido
 */
export const getTokenData = () => {
   try {
      return jwtDecode(getAuthData().access_token) as TokenData;
   } catch (error) {
      return undefined;
   }
};

/**
 * Função que verifica se um usuário está autenticado com base num
 * token válido não expirado
 */
export const isAuthenticated = (): boolean => {
   const tokenData = getTokenData();
   return tokenData && tokenData.exp * 1000 > Date.now() ? true : false;
};

/**
 * Função que verifica se um usuário tem algum papel dentre os da lista `roles`
 */
export const hasAnyRoles = (roles: Role[]): boolean => {
   if (roles.length === 0) {
      // O recurso é acessível sem considerar papéis
      return true;
   }
   const tokenData = getTokenData();
   if (tokenData !== undefined) {
      for (let i = 0; i < roles.length; i++) {
         if (tokenData.authorities.includes(roles[i])) {
            /* Se pelo menos um dos papéis do usuário logado estão
               incluídos na lista de papéis autorizados, retorna verdadeiro. */
            return true;
         }
      }
   }
   return false;
};
