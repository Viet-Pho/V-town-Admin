import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {useDispatch} from 'react-redux';
import jwtAxios, {setAuthToken} from './index';
import {AuthUser} from '../../../../types/models/AuthUser';
import {fetchError, fetchStart, fetchSuccess} from '../../../../redux/actions';

interface JWTAuthContextProps {
  user: AuthUser | null | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface SignUpProps {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  age: number;
  phone_number: string;
  address: string;
}

interface SignInProps {
  email: string;
  password: string;
}

interface JWTAuthActionsProps {
  signUpUser: (data: SignUpProps) => void;
  signInUser: (data: SignInProps) => void;
  logout: () => void;
}

const JWTAuthContext = createContext<JWTAuthContextProps>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
});
const JWTAuthActionsContext = createContext<JWTAuthActionsProps>({
  signUpUser: () => {},
  signInUser: () => {},
  logout: () => {},
});

export const useJWTAuth = () => useContext(JWTAuthContext);

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

interface JWTAuthAuthProviderProps {
  children: ReactNode;
}

const JWTAuthAuthProvider: React.FC<JWTAuthAuthProviderProps> = ({
  children,
}) => {
  const [firebaseData, setJWTAuthData] = useState<JWTAuthContextProps>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const dispatch = useDispatch();

  const retriveUserInfo = async () => {
    const {data: userInfo} = await jwtAxios.post('/auth').catch((err) => {
      return {data: null};
    });
    return userInfo;
  };

  useEffect(() => {
    const getAuthUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setJWTAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }

      setAuthToken(token);

      const userInfo = await retriveUserInfo();

      if (!userInfo) {
        setJWTAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }
      if (userInfo) {
        setJWTAuthData({
          user: userInfo as Object,
          isLoading: false,
          isAuthenticated: true,
        });
      }
    };

    getAuthUser();
  }, []);

  const signInUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    dispatch(fetchStart());
    try {
      const {data} = await jwtAxios.post('/logIn', {
        email,
        password,
      });

      localStorage.setItem('token', data.token);
      setAuthToken(data.token);

      setJWTAuthData({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      dispatch(fetchSuccess());
    } catch (error: any) {
      console.log(error?.response?.data?.message);
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      dispatch(fetchError(`Error: ${error?.response?.data?.message}`));
    }
  };

  const signUpUser = async ({
    username,
    email,
    password,
    first_name,
    last_name,
    age,
    phone_number,
    address,
  }: {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    age: number;
    phone_number: string;
    address: string;
  }) => {
    dispatch(fetchStart());
    try {
      const {data} = await jwtAxios.post('signUp', {
        username,
        email,
        password,
        first_name,
        last_name,
        age,
        phone_number,
        address,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setAuthToken(data.token);
      setJWTAuthData({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      dispatch(fetchSuccess());
    } catch (err: any) {
      console.log(err.response.data.message);
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });

      dispatch(fetchError(`Error: ${err?.response?.data?.message}`));
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setAuthToken();
    setJWTAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return (
    <JWTAuthContext.Provider
      value={{
        ...firebaseData,
      }}
    >
      <JWTAuthActionsContext.Provider
        value={{
          signUpUser,
          signInUser,
          logout,
        }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};
export default JWTAuthAuthProvider;
