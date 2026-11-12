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

- **Painel de controle** — totais calculados a partir do estoque atual
- **Cadastro de produtos** — o produto é salvo e passa a aparecer na listagem,
  nos alertas e nos totais, com código gerado automaticamente
- **Consulta e filtros** — filtro por categoria e por estoque crítico, aplicado
  na própria tela
- **Movimentação** — entradas somam e saídas subtraem do estoque, com histórico
  dos lançamentos
- **Alertas de validade** — classificação automática comparando a validade com a
  data atual, com prejuízo estimado e desconto sugerido
- **Telas de confirmação** — retorno após cada operação
- **Layout responsivo** — menu lateral no computador, barra no topo no celular
- **Restaurar demonstração** — botão na tela Sobre que devolve o sistema aos dez
  produtos originais

## Tecnologias

Desenvolvido com **HTML5**, **CSS3** e **JavaScript**, sem frameworks ou
bibliotecas externas.

| Recurso | Onde foi aplicado |
|---|---|
| HTML semântico | `aside`, `header`, `nav`, `main`, `footer` |
| Validação nativa | `required`, `min`, `max`, `step`, `maxlength` |
| Tag `meter` | Barra de nível comparada com o estoque mínimo do produto |
| `details` / `summary` | Blocos que abrem e fecham |
| Flexbox | Layout de duas colunas, cards, filtros e formulários |
| Media queries | Pontos de quebra em 900px e 540px |
| Pseudo-elemento `::before` | Faixa colorida na lateral dos cards |
| Objeto `Date` | Cálculo de quantos dias faltam para cada produto vencer |
| Manipulação do DOM | Tabelas e totais montados a partir dos dados |
| `localStorage` | Armazenamento dos produtos e das movimentações |
| Eventos de formulário | Cadastro e movimentação tratados no envio |
| Google Fonts | Tipografia Inter, com Arial como alternativa |

Hospedagem em **Cloudflare Workers**, servindo os estáticos de `public/`.

## Estrutura

```
save-estoque/
├── public/
│   ├── index.html                  # painel de controle
│   ├── produtos.html               # listagem com filtros
│   ├── cadastrar.html              # cadastro de produto
│   ├── movimentacao.html           # entrada e saída de mercadoria
│   ├── alertas.html                # alertas de validade
│   ├── sucesso-cadastro.html       # confirmação
│   ├── sucesso-movimentacao.html   # confirmação
│   ├── sobre.html                  # documentação do projeto
│   ├── estilo.css                  # folha de estilo compartilhada
│   └── script.js                   # funções do sistema
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

## Como os dados são guardados

O sistema usa o `localStorage` do navegador. Os produtos cadastrados e as
movimentações ficam gravados na máquina do usuário e continuam lá depois de
fechar e reabrir o navegador.

A limitação é que o armazenamento pertence ao navegador daquele computador. Em
um sistema de produção os dados ficariam em um banco no servidor, acessíveis de
qualquer máquina e por vários usuários ao mesmo tempo.

Para zerar a demonstração, use o botão **Restaurar dados de demonstração** na
tela Sobre.

## Equipe

| Integrante | Responsabilidade |
|---|---|
| Carlos Daniel | Painel de controle, alertas de validade e folha de estilo |
| Henrique Dantas | Consulta de produtos e filtros por categoria |
| Gustavo Nascimento | Cadastro de produtos e movimentação de estoque |

---

Trabalho de Desenvolvimento Web — Ciência da Computação — 2026
