export const environment = {
  production: false,
  apiUrlBase: 'http://localhost:8080',  
  authBypass: false,         // <- quando true, ignora senha real << liga o bypass no DEV
  preferBackend: true,     // <- quando true, usa backend real  para autenticação de login   
  devUser: 'dev',
  devPass: '123456',
  devPerfil: 'ADMIN'
  
};
