# Recuperacao de senha

** RF **

- O usuario deve poder recuperar a sua senha informando o seu e-mail
- O usuario deve receber um e-mail conm instrucoes de recuperacao de senha
- O usuario deve poder resetar sua senha

** RNF **

- Utilizar Mailtrap para testar envios de email em ambiente de dev
- Utilizar Amzon SES para envios em producao
- O envio de e-maiils deve acontecer em segundo plano (background job)

** RN **

- O link enviado por email para resetar a senha, deve expirar em 2h;
- O usuario precisa confirmar a nova senha ao resetar a sua senha (campo de confirmacao)

# Atualizacao do Perfil

** RF **

- o Usuario deve poder atualizar o seu nome, email e senha

** RN **

- O usuario nao pode alterar seu email para um email já utiliazado
- Para atualizar a senha, o usuario deve informar a senha antiga
- Para atualizar a senha, o usario precisa confirmar a nova senha

# Painel do prestador

** RF **

- O usuario deve poder listar seus agendamentos de um dia especifico
- O prestador deve recber uma notificacao sempre que houver um novo agendamento
- O prestador deve poder visualizar as notificacoes nao lidas

** RNF **

- Os agendamentos do prestador no dia deve ser armazenado em cache
- As notificacoes do prestador devem ser armazenadas no mongoDb
- As notificacoes do prestador devem ser enviadas em tempo real utilizando socket.io

** RN **

- a notificacao deve ter um status de lida ou nao-lida

# Agendamentode serviços

** RF **

- O usuario deve poder listar todos prestadores de servico cadastrado
- O usuario deve poder listar os dias de um mes com pelo menos um horario disponivel de um prestador
- O usuario deve poder listar horarios disponiveis de um dia especifico de um prestador
- O uusario deve poder realizar um novo agendamento com um prestador

** RNF **

- A listagem de prestadores deve ser armazenado em cache;

** RN **

- Cada agendamento deve durar 1h exatamentos
- Os agendamentos devem estar disponiveis entre 8h às 18h ( Primeiro às 8, ùltimo as 17h)
- O usuario nao pode agendar em um horario ja ocupado
- O usuario nao pode agendar em um horario que ja passou
- O usuario nao pode agendar servicos cosnigo mesmo
-
