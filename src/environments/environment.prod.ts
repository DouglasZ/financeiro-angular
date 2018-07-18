export const environment = {
  production: true,
  apiUrl: 'https://projeto-financeiro.herokuapp.com',
  // apiUrl: 'http://localhost:8080'

  tokenWhitelistedDomains: [new RegExp('projeto-financeiro.herokuapp.com')],
  tokenBlacklistedRoutes: [new RegExp('\/oauth\/toekn')]
};
