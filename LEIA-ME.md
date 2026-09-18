# Villa Caluí — Página de links

Réplica da página do Beacons (`beacons.ai/villacalui`) no sistema visual da landing page
da Villa Caluí.

```
index.html      estrutura, conteúdo e os textos legais dos modais
style.css       estilos
main.js         modais e ano do rodapé
assets/         logos
```

Tudo na raiz, sem build e sem dependências. Basta subir a pasta em qualquer hospedagem.

## Identidade

Preto e branco apenas. Títulos em **GFS Didot**, corpo em **Inter** (Google Fonts).

Ícones: **Phosphor Icons**, peso *regular*, licença MIT, embutidos no HTML sem CDN
(`fork-knife`, `calendar-check`, `whatsapp-logo`, `map-pin` e `arrow-right`). O do WhatsApp
é a marca do próprio app, como no Beacons. São desenhos em preenchimento, não em traço:
quem controla a espessura aparente é o tamanho do glifo (`.link__ico svg`), não um
`stroke-width`. Para trocar o peso, pegue o mesmo nome na pasta `light`, `bold` etc. de
`@phosphor-icons/core` e substitua o `d` do path.

Contornos das pílulas, do selo e dos círculos de ícone: 2px em `--linha-clara`.

O logo usado é o `assets/logo-villa-calui.png` (marca branca). O arquivo é um **PNG opaco de
150×150**, sem transparência: por isso o selo redondo o recorta em disco (`overflow:hidden`),
deixando visível apenas o anel. Se chegar o arquivo vetorial da marca, substitua mantendo o nome.

## O fundo

A mesma foto do hero da landing page: `assets/fundohero-fundo.jpg`, o salão à noite. Ela já vem
reduzida e com o desfoque **assado no arquivo** — nada de `filter:blur()`, que numa área do
tamanho da tela custa pintura a cada quadro. Para trocar a foto ou o grau de desfoque, o
comando do ImageMagick está no LEIA-ME da landing page, e o arquivo é o mesmo nos dois projetos:
se mudar lá, copie para cá.

Entra como `body::before`, com três detalhes que não são decoração:

- **`position:fixed`** — a página não rola, então a foto fica presa à janela;
- **`pointer-events:none`** — sem isso a camada roubaria o clique dos links que ficam por cima;
- **`opacity:.18`** — é o botão de volume da foto, e é o mesmo valor da landing page. Mais
  baixa, a foto se dissolve no preto do `body`; mais alta, ela aparece.

O `.tela` ganhou `position:relative;z-index:1` para ficar acima dela. Os modais já estavam em
`z-index:100` e continuam por cima de tudo.

## Página única, sem rolagem

A tela toda cabe em `100dvh` e nada rola. Isso é sustentado por duas decisões:

- o ritmo vertical (tamanhos de fonte, alturas e espaçamentos) é medido em **vh**, não em px
  fixos, então o bloco encolhe junto com a janela em vez de transbordar;
- em telas deitadas e baixas (`max-height:430px` e `min-width:700px`) o layout vira duas
  colunas: marca à esquerda, links à direita.

Medido sem rolagem em 1440×900, 1280×720, 820×1180, 390×844, 360×640 e 844×390.

O `.palco` tem `overflow-y:auto` com a barra escondida apenas como **válvula de segurança**:
em uma janela absurdamente baixa o conteúdo desliza em vez de ser cortado. No uso normal não
há o que rolar.

## Animação de entrada

Cascata de cima para baixo, **100% em CSS** (`@keyframes entra`), com atrasos por seletor em
`style.css`. Termina em cerca de 0,8s. Nada depende do `main.js`: se ele não carregar, o
conteúdo aparece do mesmo jeito. Sem JavaScript algum, a classe `.anim` nunca entra no `<html>`
e tudo nasce visível. Com `prefers-reduced-motion: reduce` a animação é desligada.

## Links

| Botão | Destino |
|---|---|
| Cardápio digital | `pedido.anota.ai/loja/villacaluipizzaria` |
| Reservas | `reservation.getin.app/GPo2mvkE` |
| Eventos e orçamentos | WhatsApp `55 17 99751-1141` |
| Como chegar | ficha da casa no Google Maps |

Todos abrem em nova aba, com `rel="noopener"`.

## Política de Privacidade e Termos de Uso

Ficam dentro do próprio `index.html` e abrem em **modal sobre a página**: sem nova aba, sem URL
nova, sem recarregar. Fecham no `X`, no `Esc` e no clique fora; o foco vai para o texto ao abrir,
fica preso no modal enquanto ele estiver aberto e volta para o link de origem ao fechar; o texto
rola dentro da caixa. No mobile o modal vira uma folha que sobe pela base da tela.

Os textos foram escritos a partir do que a página realmente faz: ela **não tem formulário, não
coleta nem armazena dado nenhum e não tem cookies próprios, Pixel ou Analytics**. O que existe é
o encaminhamento para Anota AI, Get In, WhatsApp e Google Maps, mais o Google Fonts no
carregamento. Nada além disso foi afirmado.

> Atenção: se um dia entrar Pixel, Google Analytics ou qualquer tag nesta página, os itens 4 e 5
> da Política deixam de ser verdadeiros. Atualize o texto e implemente o aviso de cookies.

### Placeholders a preencher antes de publicar

Todos aparecem destacados em cinza dentro dos modais, em `index.html`:

`[INSERIR DATA]` (nos dois modais) · `[RAZÃO SOCIAL]` · `[CNPJ]` · `[ENDEREÇO COMPLETO]` ·
`[PROVEDOR DE HOSPEDAGEM]` · `[NOME DO ENCARREGADO / "não designado"]` · `[CIDADE/UF]`

O e-mail e o WhatsApp já estão preenchidos, com os dados do rodapé da landing page
(`contato@villacalui.com.br` e `(17) 99751-1141`), e entram como links — `mailto:` e `wa.me`.
As duas páginas usam os mesmos: se um deles mudar, mude nas duas.

Para achar todos de uma vez: `grep -n "marcador" index.html`.

## Rodapé

Política de Privacidade · Termos de Uso, e a assinatura **Desenvolvido por AZX Performance**,
que leva a `https://azxperformance.com.br/lp4/` em nova aba. O ano do copyright é preenchido
pelo `main.js`.
