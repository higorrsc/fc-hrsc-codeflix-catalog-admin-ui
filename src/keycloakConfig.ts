import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'react-auth',
  clientId: 'react-auth',
};

export const keycloak = new Keycloak(keycloakConfig);
