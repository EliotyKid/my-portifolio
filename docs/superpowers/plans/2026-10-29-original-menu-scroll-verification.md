# Menu próximo da referência e início de página

- Conferida a versão mobile do menu em dennissnellenberg.com no navegador.
- Recuperado o componente LinkItem existente e suas variantes de entrada escalonada. Links simples, ponto ativo à direita, tipografia grande, divisória e fechamento circular azul; mantidos idiomas, acessibilidade e curva SVG.
- Separada a animação da camada escura da animação do painel para que a saída não esconda a curva antecipadamente.
- Scroll global zerado em mudanças de pathname, com behavior instant para sobrepor scroll-behavior smooth. A primeira carga e navegação por âncoras são preservadas; escolha de idioma na mesma página não força retorno ao início.
- O link do menu para a própria página também retorna ao topo.
- Regressão reproduzida antes da correção: voltar à listagem restaurava scrollY=1169; após correção retorna a zero.
- Verificação: build aprovado; TypeScript sem erros; 10 testes nativos e 24 testes Chromium aprovados. Biome dos cinco arquivos verificados sem erros. Inspeção visual de menu em desktop e mobile.
- Túnel temporário existente atualizado. Não validado em aparelho físico ou Safari.
