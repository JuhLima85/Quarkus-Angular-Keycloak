🧩 Aplicação Frontend (Angular)

O frontend foi desenvolvido em Angular 15, seguindo o modelo standalone conforme o desafio.
Como a base do projeto foi reaproveitada de uma aplicação já existente, a estrutura final ficou híbrida,
com os novos componentes criados no formato standalone e os módulos originais mantidos no padrão tradicional do Angular.

A aplicação foi organizada para refletir os diferentes perfis de acesso:

👩‍💼 Administrador – gerencia usuários.

🎓 Coordenador – administra semestres, cursos, disciplinas e monta a matriz curricular.

👨‍🏫 Professor e 👩‍🎓 Aluno – possuem acesso de visualização da matriz curricular.

A interface é responsiva e se integra à API desenvolvida em Quarkus (Java),
com controle de autenticação e autorização via Keycloak.


## Comandos
```bash
## Instalação de Dependências
npm install

## Iniciar o Servidor 
ng serve
````
## Login
<img width="1823" height="760" alt="Image" src="https://github.com/user-attachments/assets/103c6a74-b6d3-4d32-a90e-b14b96e894bc" />

## Perfil Administrador
<img width="1895" height="1008" alt="Image" src="https://github.com/user-attachments/assets/474e6bb7-e2d8-4e8c-9738-08dece61dc86" />

## Perfil Coordenador
<img width="1917" height="976" alt="Image" src="https://github.com/user-attachments/assets/29b5fabc-53ea-4e48-83c9-ddc75cc70565" />

## Perfis Professor e Aluno
<img width="1912" height="962" alt="Image" src="https://github.com/user-attachments/assets/7af2d4c0-be59-439e-8b79-78013b38d046" />