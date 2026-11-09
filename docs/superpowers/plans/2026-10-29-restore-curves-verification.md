# Restauração das curvas SVG e prévia por túnel

Pedido: manter as animações de curva existentes e disponibilizar o portfólio para revisão no celular.

- Reintegrado o componente de curva do menu, com viewBox normalizado, sem acesso a window durante renderização e com suporte a movimento reduzido.
- Reintegrado CurvedReveal ao rodapé, com curva SVG ligada ao scroll e limpeza dos listeners. Alterações da preferência de movimento reduzido são atendidas sem recarregar a página.
- Restaurada curva SVG na cortina de transição entre páginas; mantida saída em CSS para que a sobreposição também desapareça sem JavaScript.
- Restaurado botão flutuante de menu no desktop após scroll; mantidos foco, Escape e scroll do menu em telas pequenas.
- Verificação de origem do contato ajustada para usar o host da requisição, permitindo HTTPS no Cloudflare Tunnel sem aceitar requisições de outros hosts.
- Build aprovado. Testes nativos: 10 aprovados. Chromium: 17 aprovados. Biome dos arquivos alterados: aprovado.
- Cloudflared já instalado, usado com quick tunnel HTTP/2 para a produção em 127.0.0.1:3103. Nenhuma alteração na conta ou DNS.
- Túnel temporário; depende dos processos locais. Envio real de e-mail e aparelhos físicos continuam sem validação.
