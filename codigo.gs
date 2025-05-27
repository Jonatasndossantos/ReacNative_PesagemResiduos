const HEADERS_REGISTROS = ["id", "data", "categoria", "peso", "atualizado_em"];

// Função principal GET: decide o que retornar com base no parâmetro "tipo"
function doGet(request) {
  const tipo = request.parameter.tipo;

  if (tipo === "categorias") {
    return listarCategoriasAtivas();
  }

  return listarRegistros();
}

// Lista todos os registros da aba "Registros"
function listarRegistros() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Registros");
  const dados = sheet.getDataRange().getValues();
  const resultado = [];

  for (let i = 1; i < dados.length; i++) {
    let objeto = {};
    HEADERS_REGISTROS.forEach((coluna, j) => {
      objeto[coluna] = dados[i][j];
    });
    resultado.push(objeto);
  }

  return ContentService.createTextOutput(JSON.stringify(resultado))
    .setMimeType(ContentService.MimeType.JSON);
}

// Cria um novo registro na aba "Registros" com ID autoincrementado OU atualiza um existente
function doPost(request) {
  const dados = JSON.parse(request.postData.contents);
  
  // Se tem _method: 'put', é uma atualização
  if (dados._method === 'put') {
    return atualizarRegistro(dados);
  }
  
  // Se tem _method: 'delete', é uma exclusão
  if (dados._method === 'delete') {
    return excluirRegistro(dados);
  }
  
  // Caso contrário, é uma criação
  return criarRegistro(dados);
}

// Função para criar novo registro
function criarRegistro(dados) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Registros");
  const linhas = sheet.getDataRange().getValues();

  let novoId = 1;
  if (linhas.length > 1) {
    const ultimosIds = linhas.slice(1).map(l => l[0]);
    novoId = Math.max(...ultimosIds) + 1;
  }

  const agora = new Date().toISOString();

  sheet.appendRow([
    novoId,
    dados.data,
    dados.categoria,
    dados.peso,
    agora
  ]);

  return ContentService.createTextOutput(JSON.stringify({ status: "created", id: novoId }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Função para atualizar registro existente
function atualizarRegistro(dados) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Registros");
  const linhas = sheet.getDataRange().getValues();

  for (let i = 1; i < linhas.length; i++) {
    if (linhas[i][0] == dados.id) {
      const agora = new Date().toISOString();
      sheet.getRange(i + 1, 2, 1, 4).setValues([[
        dados.data,
        dados.categoria,
        dados.peso,
        agora
      ]]);
      return ContentService.createTextOutput(JSON.stringify({ status: "updated", id: dados.id }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService.createTextOutput(JSON.stringify({ status: "not found" }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Função para excluir registro
function excluirRegistro(dados) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Registros");
  const linhas = sheet.getDataRange().getValues();

  for (let i = 1; i < linhas.length; i++) {
    if (linhas[i][0] == dados.id) {
      sheet.deleteRow(i + 1);
      return ContentService.createTextOutput(JSON.stringify({ status: "deleted" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService.createTextOutput(JSON.stringify({ status: "not found" }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Atualiza um registro existente na aba "Registros" (método PUT original)
function doPut(request) {
  const dados = JSON.parse(request.postData.contents);
  return atualizarRegistro(dados);
}

// Exclui um registro da aba "Registros" pelo ID (método DELETE original)
function doDelete(request) {
  const dados = JSON.parse(request.postData.contents);
  return excluirRegistro(dados);
}

// Lista todas as categorias ativas (ativa == 1)
function listarCategoriasAtivas() {
  const catSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Categorias");
  const linhas = catSheet.getDataRange().getValues();
  const resultado = [];

  for (let i = 1; i < linhas.length; i++) {
    if (linhas[i][2] == 1) {
      resultado.push({ id: linhas[i][0], nome: linhas[i][1] });
    }
  }

  return ContentService.createTextOutput(JSON.stringify(resultado))
    .setMimeType(ContentService.MimeType.JSON);
}

// Exclui uma categoria e todos os registros vinculados a ela
function excluirCategoria(request) {
  const dados = JSON.parse(request.postData.contents);
  const categoriaSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Categorias");
  const registroSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Registros");

  const categorias = categoriaSheet.getDataRange().getValues();
  let linhaCategoria = -1;
  let nomeCategoria = "";

  // Localiza a categoria pelo ID
  for (let i = 1; i < categorias.length; i++) {
    if (categorias[i][0] == dados.id) {
      linhaCategoria = i + 1;
      nomeCategoria = categorias[i][1];
      break;
    }
  }

  if (linhaCategoria === -1) {
    return ContentService.createTextOutput(JSON.stringify({ status: "categoria não encontrada" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Exclui a categoria
  categoriaSheet.deleteRow(linhaCategoria);

  // Busca registros a excluir com base na categoria
  const registros = registroSheet.getDataRange().getValues();
  let linhasParaExcluir = [];

  for (let i = 1; i < registros.length; i++) {
    if (registros[i][2] == nomeCategoria) {
      linhasParaExcluir.push(i + 1);
    }
  }

  // Exclui as linhas de baixo para cima para evitar quebra de índices
  linhasParaExcluir.reverse().forEach(i => registroSheet.deleteRow(i));

  return ContentService.createTextOutput(JSON.stringify({
    status: "categoria e registros excluídos",
    categoria: nomeCategoria
  })).setMimeType(ContentService.MimeType.JSON);
}
