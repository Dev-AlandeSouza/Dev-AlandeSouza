class Aresta {
    constructor(destino, peso) {
      this.destino = destino;
      this.peso = peso;
      this.visitada = false;
    }
  }
  
  class Vertice {
    constructor(distancia, anterior) {
      this.anterior = anterior;
      this.visitado = false;
      this.arestas = [];
    }
  }
  
  function adicionarAresta(vertice, origem, destino, peso) {
    vertice[origem].arestas.push(new Aresta(destino, peso));
    vertice[origem].visitado = false;
    vertice[origem].anterior = origem - 1;
  }
  
  function obterMenorDistancia(distancias, visitados) {
    let menorDistancia = Infinity;
    let indiceMenorDistancia = -1;
  
    for (let i = 0; i < distancias.length; i++) {
      if (!visitados[i] && distancias[i] < menorDistancia) {
        menorDistancia = distancias[i];
        indiceMenorDistancia = i;
      }
    }
  
    return indiceMenorDistancia;
  }
  
  function obterCaminhoMaisCurto(caminhos, destino) {
    const caminho = [];
    let atual = destino;
  
    while (atual !== -1) {
      caminho.unshift(atual);
      atual = caminhos[atual];
    }
  
    return caminho;
  }
  
  function dijkstra(g, origem, final) {
    const numVertices = g.length;
    const distancias = new Array(numVertices).fill(Infinity);
    const visitados = new Array(numVertices).fill(false);
    const caminhos = new Array(numVertices).fill(-1);
  
    distancias[origem] = 0;
  
    for (let i = 0; i < numVertices - 1; i++) {
      const verticeAtual = obterMenorDistancia(distancias, visitados);
      visitados[verticeAtual] = true;
  
      for (const aresta of g[verticeAtual].arestas) {
        const verticeDestino = aresta.destino;
        const pesoAresta = aresta.peso;
        const distanciaTotal = distancias[verticeAtual] + pesoAresta;
  
        if (distanciaTotal < distancias[verticeDestino]) {
          distancias[verticeDestino] = distanciaTotal;
          caminhos[verticeDestino] = verticeAtual;
        }
      }
    }
  
    const caminhoMaisCurto = obterCaminhoMaisCurto(caminhos, final);
    return caminhoMaisCurto;
  }
  
  const numVertices = 4;
  const g = [];
  for (let i = 0; i < numVertices; i++) {
    g.push(new Vertice(0, 0));
  }
  
  const letras = ['a', 'b', 'c', 'd', 'e', 'f'];
  
  adicionarAresta(g, 0, 1, 1);
  adicionarAresta(g, 0, 2, 3);
  adicionarAresta(g, 1, 2, 2);
  adicionarAresta(g, 2, 3, 4);
  adicionarAresta(g, 3, 3, 5);
  
  const resultado = dijkstra(g, 0, 3);
  
  console.log("Caminho mais curto:", resultado.map(vertice => letras[vertice]).join(" -> "));