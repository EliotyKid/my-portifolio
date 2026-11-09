# Galeria de projetos

## Intenção
Facilitar a exploração dos projetos no celular e dar controle de visualização em `/work`, com uma troca de prévia mais fluida.

## Escopo
- Prévia desktop: ao trocar o item ativo, a imagem anterior sai para cima e a nova entra de baixo para cima.
- Celular: projetos em grid, sem depender de hover.
- `/work` em desktop: seletor acessível entre lista e grid; lista é o padrão.
- Home em desktop mantém lista. A preferência de movimento reduzido continua respeitada.

## Abordagens
1. Grid automático em telas de toque e seletor apenas em `/work` desktop. Mantém a home focada na lista e não mostra controles onde hover não existe. **Escolhida.**
2. Seletor lista/grid em todas as telas. Dá escolha no celular, mas duplica controles onde a grade já é a apresentação pedida.

## Limites
Reutilizar `Projects` e os dados/capas atuais. Não alterar rotas, conteúdo, filtros ou serviços de email. Validar estados desktop/mobile e transição no navegador; executar as verificações pertinentes ao projeto.
