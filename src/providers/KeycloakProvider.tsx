import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  setAuthenticated,
  setToken,
  setUserDetails,
} from '../features/auth/authSlice';
import { keycloak } from '../keycloakConfig';

export const KeycloakProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const updateToken = (refresh = false) => {
      if (refresh) {
        keycloak
          .updateToken(70)
          .then((refreshed) => {
            if (refreshed) {
              dispatch(setToken(keycloak.token));
            } else {
              dispatch(setAuthenticated(false));
              dispatch(setToken(''));
            }
          })
          .catch(() => {
            dispatch(setAuthenticated(false));
            dispatch(setToken(''));
          });
      }
    };

    keycloak.onTokenExpired = () => {
      updateToken(true);
    };

    const initKeycloak = async () => {
      try {
        const authenticated = await keycloak.init({
          onLoad: 'login-required',
          flow: 'implicit',
        });
        console.log(authenticated);
        if (authenticated) {
          dispatch(setAuthenticated(true));
          dispatch(setToken(keycloak.token));
          const userInfo = await keycloak.loadUserInfo();
          dispatch(setUserDetails(userInfo));
        } else {
          dispatch(setAuthenticated(false));
          dispatch(setToken(''));
        }
      } catch (error) {
        console.log('Keycloak initialization error: ', error);
        dispatch(setAuthenticated(false));
        dispatch(setToken(''));
      }
    };

    initKeycloak();
  }, [dispatch]);

  return <>{children}</>;
};
