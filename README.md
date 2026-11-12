# SAVE — Sistema de Análise de Validade e Estoque

Sistema web para controle de estoque de supermercado com foco em **validade de
produtos perecíveis**.

🔗 **Sistema no ar:** https://save-estoque.setaisst.workers.dev

---

## O problema

Supermercados perdem dinheiro todos os meses com produtos que vencem na prateleira
sem serem vendidos. O prejuízo é duplo: o valor pago ao fornecedor é perdido e o
espaço da gôndola fica ocupado por mercadoria que não vai gerar receita.

Em estabelecimentos pequenos esse controle costuma ser feito no papel, o que faz o
problema só ser percebido quando o produto já está vencido.

O SAVE coloca a data de validade no centro do controle de estoque: classifica cada
produto por proximidade do vencimento e avisa com antecedência quais itens precisam
ir para promoção, permitindo recuperar parte do valor antes da perda.

## Funcionalidades

- **Painel de controle** — total de produtos, itens em estoque, vencidos e vencendo
- **Consulta de produtos** — nível de estoque, validade e situação de cada item
- **Filtros por categoria** — Laticínios, Açougue, Frios e Estoque crítico
- **Cadastro de produtos** — com validação nativa de formulário
- **Movimentação** — entrada e saída por reposição, venda, descarte ou devolução
- **Alertas de validade** — vencidos e vencendo em até 7 dias, com estimativa de
  prejuízo e desconto sugerido
- **Telas de confirmação** — retorno após cada operação
- **Layout responsivo** — menu lateral no desktop, barra no topo no celular

## Tecnologias

Desenvolvido exclusivamente com **HTML5 e CSS3**, sem JavaScript, frameworks ou
bibliotecas externas — restrição definida pelo enunciado do trabalho.

| Recurso | Onde foi aplicado |
|---|---|
| HTML semântico | `aside`, `header`, `nav`, `main`, `footer` |
| Validação nativa | `required`, `min`, `max`, `step`, `maxlength` |
| Tag `meter` | Barra de nível de estoque, colorida pelo navegador |
| `details` / `summary` | Blocos que abrem e fecham sem JavaScript |
| Flexbox | Layout de duas colunas, cards, filtros e formulários |
| Media queries | Pontos de quebra em 900px e 540px |
| Pseudo-elemento `::before` | Faixa colorida na lateral dos cards |
| Google Fonts | Tipografia Inter, com Arial como alternativa |

Hospedagem em **Cloudflare Workers**, servindo os estáticos de `public/`.

## Estrutura

```
save-estoque/
├── public/
│   ├── index.html                      # painel de controle
│   ├── produtos.html                   # listagem completa
│   ├── produtos-laticinios.html        # filtro por categoria
│   ├── produtos-acougue.html           # filtro por categoria
│   ├── produtos-frios.html             # filtro por categoria
│   ├── produtos-estoque-critico.html   # filtro por reposição
│   ├── cadastrar.html                  # cadastro de produto
│   ├── movimentacao.html               # entrada e saída
│   ├── alertas.html                    # alertas de validade
│   ├── sucesso-cadastro.html           # confirmação
│   ├── sucesso-movimentacao.html       # confirmação
│   ├── sobre.html                      # documentação do projeto
│   └── estilo.css                      # folha de estilo compartilhada
├── DEPLOY.md
├── package.json
└── wrangler.toml
```

## Como executar

Sem instalar nada, basta abrir `public/index.html` no navegador — o sistema não
depende de servidor.

Para rodar com o ambiente de publicação:

```bash
npm install
npm run dev      # http://localhost:8787
npm run deploy   # publica no Cloudflare Workers
```

Os passos completos de publicação estão em [DEPLOY.md](DEPLOY.md).

## Limitações da versão atual

- Os dados são fixos no HTML, para demonstrar o funcionamento das telas
- Não há persistência entre sessões, o que exigiria banco de dados e linguagem no
  servidor
- Os formulários validam e confirmam o envio, mas não gravam o registro
- A persistência poderia ser implementada em uma próxima etapa com PHP e MySQL,
  aproveitando a mesma interface

## Equipe

| Integrante | Responsabilidade |
|---|---|
| Carlos Daniel | Painel de controle, alertas de validade e folha de estilo |
| Henrique Dantas | Consulta de produtos e filtros por categoria |
| Gustavo Nascimento | Cadastro de produtos e movimentação de estoque |

---

Trabalho de Desenvolvimento Web — Ciência da Computação — 2026
