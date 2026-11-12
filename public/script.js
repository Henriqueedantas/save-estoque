/* ===================================================
   SAVE - Sistema de Análise de Validade e Estoque
   Funções do sistema
   =================================================== */

/* Lista inicial de produtos.
   A validade é guardada em dias a partir de hoje, para que
   a demonstração sempre tenha produtos vencidos e vencendo. */
var produtosIniciais = [
    { codigo: "P001", nome: "Leite Integral 1L",    categoria: "Laticínios", quantidade: 48, unidade: "un", minimo: 15, custo: 4.20,  dias: 6 },
    { codigo: "P002", nome: "Iogurte Natural 170g", categoria: "Laticínios", quantidade: 60, unidade: "un", minimo: 20, custo: 2.10,  dias: 13 },
    { codigo: "P003", nome: "Peito de Frango",      categoria: "Açougue",    quantidade: 15, unidade: "kg", minimo: 12, custo: 18.90, dias: 2 },
    { codigo: "P004", nome: "Pão de Forma 500g",    categoria: "Padaria",    quantidade: 22, unidade: "un", minimo: 10, custo: 7.95,  dias: -2 },
    { codigo: "P005", nome: "Queijo Mussarela",     categoria: "Frios",      quantidade: 8,  unidade: "kg", minimo: 10, custo: 42.00, dias: 4 },
    { codigo: "P006", nome: "Presunto Fatiado",     categoria: "Frios",      quantidade: 5,  unidade: "kg", minimo: 8,  custo: 34.90, dias: -3 },
    { codigo: "P007", nome: "Manteiga 200g",        categoria: "Laticínios", quantidade: 34, unidade: "un", minimo: 12, custo: 9.80,  dias: 38 },
    { codigo: "P008", nome: "Ovos Dúzia",           categoria: "Mercearia",  quantidade: 70, unidade: "un", minimo: 25, custo: 11.50, dias: 23 },
    { codigo: "P009", nome: "Linguiça Toscana",     categoria: "Açougue",    quantidade: 12, unidade: "kg", minimo: 10, custo: 22.40, dias: 5 },
    { codigo: "P010", nome: "Requeijão 200g",       categoria: "Laticínios", quantidade: 28, unidade: "un", minimo: 12, custo: 6.30,  dias: 64 }
];


/* Soma dias na data de hoje e devolve no formato aaaa-mm-dd */
function dataComDiferenca(dias) {
    var data = new Date();
    data.setDate(data.getDate() + dias);

    var mes = data.getMonth() + 1;
    var dia = data.getDate();

    if (mes < 10) { mes = "0" + mes; }
    if (dia < 10) { dia = "0" + dia; }

    return data.getFullYear() + "-" + mes + "-" + dia;
}


/* Converte aaaa-mm-dd para dd/mm/aaaa */
function dataParaTexto(validade) {
    var partes = validade.split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
}


/* Quantos dias faltam para o produto vencer */
function diasParaVencer(validade) {
    var hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    var dataValidade = new Date(validade + "T00:00:00");
    var umDia = 1000 * 60 * 60 * 24;

    return Math.round((dataValidade - hoje) / umDia);
}


/* Descobre a situação do produto pela validade */
function situacaoDoProduto(produto) {
    var dias = diasParaVencer(produto.validade);

    if (dias < 0) {
        return { classe: "vencido", texto: "Vencido", dias: dias };
    }
    if (dias === 0) {
        return { classe: "vencido", texto: "Vence hoje", dias: dias };
    }
    if (dias <= 7) {
        return { classe: "alerta", texto: dias + " dias", dias: dias };
    }
    return { classe: "ok", texto: "Normal", dias: dias };
}


/* Busca os produtos guardados no navegador.
   Na primeira vez, monta a lista inicial. */
function carregarProdutos() {
    var salvos = localStorage.getItem("save_produtos");

    if (salvos) {
        return JSON.parse(salvos);
    }

    var lista = [];

    for (var i = 0; i < produtosIniciais.length; i++) {
        var item = produtosIniciais[i];
        lista.push({
            codigo: item.codigo,
            nome: item.nome,
            categoria: item.categoria,
            quantidade: item.quantidade,
            unidade: item.unidade,
            minimo: item.minimo,
            custo: item.custo,
            validade: dataComDiferenca(item.dias)
        });
    }

    salvarProdutos(lista);
    return lista;
}


/* Guarda os produtos no navegador */
function salvarProdutos(lista) {
    localStorage.setItem("save_produtos", JSON.stringify(lista));
}


/* Monta o código do próximo produto: P011, P012... */
function proximoCodigo(lista) {
    var maior = 0;

    for (var i = 0; i < lista.length; i++) {
        var numero = parseInt(lista[i].codigo.replace("P", ""));
        if (numero > maior) {
            maior = numero;
        }
    }

    var proximo = maior + 1;
    if (proximo < 10) { return "P00" + proximo; }
    if (proximo < 100) { return "P0" + proximo; }
    return "P" + proximo;
}


/* Histórico de entradas e saídas */
function carregarMovimentacoes() {
    var salvas = localStorage.getItem("save_movimentacoes");

    if (salvas) {
        return JSON.parse(salvas);
    }
    return [];
}


function registrarMovimentacao(movimentacao) {
    var lista = carregarMovimentacoes();
    lista.unshift(movimentacao);
    localStorage.setItem("save_movimentacoes", JSON.stringify(lista));
}


/* Escreve um número como dinheiro: 349.4 vira R$ 349,40 */
function emReais(valor) {
    return "R$ " + valor.toFixed(2).replace(".", ",");
}


/* Volta o sistema para os dados de demonstração */
function restaurarDados() {
    localStorage.removeItem("save_produtos");
    localStorage.removeItem("save_movimentacoes");
    alert("Dados de demonstração restaurados.");
    window.location.href = "index.html";
}
