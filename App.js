import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

export default class App extends Component {
  // Construtor: inicializa o array de pratos e o estado da aplicação
  constructor(props) {
    super(props);

    // Array com 8 pratos (nome + imagem + link da receita)
    this.pratos = [
      { nome: 'Pizza',      img: require('./src/pizza.jpg'), receita: 'https://www.tudogostoso.com.br/busca?q=pizza' },
      { nome: 'Hambúrguer', img: require('./src/hamburguer.jpg'), receita: 'https://www.tudogostoso.com.br/busca?q=hamburguer+caseiro' },
      { nome: 'Sushi',      img: require('./src/sushi.jpg'), receita: 'https://www.tudogostoso.com.br/busca?q=sushi' },
      { nome: 'Macarrão',   img: require('./src/macarrao.jpg'), receita: 'https://www.tudogostoso.com.br/busca?q=macarrao' },
      { nome: 'Salada',     img: require('./src/salada.jpg'), receita: 'https://www.tudogostoso.com.br/busca?q=salada+completa' },
      { nome: 'Churrasco',  img: require('./src/churras.jpg'), receita: 'https://www.tudogostoso.com.br/busca?q=churrasco' },
      { nome: 'Tacos',      img: require('./src/taco.jpg'), receita: 'https://www.tudogostoso.com.br/busca?q=tacos+mexicanos' },
      { nome: 'Lasanha',    img: require('./src/lasanha.jpg'), receita: 'https://www.tudogostoso.com.br/busca?q=lasanha+de+frango' },
    ];

    // Estado: informações que mudam na tela
    this.state = {
      nome: 'Com o que está com fome?',
      img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400', // imagem inicial
      receita: '',
      contador: 0,
    };
  }

  // Função principal: sorteia um prato (diferente do atual) e atualiza a tela
  sortearPrato = () => {
    let indice;

    // Math.random() gera de 0 a <1; multiplicado pelo tamanho e arredondado com Math.floor().
    // Repete o sorteio se vier o mesmo prato que já está na tela.
    do {
      indice = Math.floor(Math.random() * this.pratos.length);
    } while (this.pratos[indice].nome === this.state.nome);

    const prato = this.pratos[indice];

    // Atualiza o estado e renderiza a tela novamente com o novo prato e imagem
    this.setState({
      nome: prato.nome,
      img: prato.img,
      receita: prato.receita,
      contador: this.state.contador + 1,
    });
  };

  // Abre o link da receita no navegador
  abrirReceita = () => {
    Linking.openURL(this.state.receita).catch(() => {});
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Rangô</Text>
        <Text style={styles.subtitulo}>Não sabe o que comer? Deixa a sorte decidir!</Text>

        {/* Imagem muda após cada interação */}
        <Image source={typeof this.state.img === 'string' ? {uri: this.state.img} :this.state.img} style={styles.imagem}/>

        <Text style={styles.resultado}>{this.state.nome}</Text>

        {/* Link da receita: só aparece depois do primeiro sorteio */}
        {this.state.receita !== '' && (
          <TouchableOpacity onPress={this.abrirReceita}>
            <Text style={styles.linkReceita}>Ver receita completa</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.contador}>Sorteios feitos: {this.state.contador}</Text>

        {/* Botão que dispara o sorteio via onPress */}
        <TouchableOpacity style={styles.botao} onPress={this.sortearPrato}>
          <Text style={styles.textoBotao}>SORTEAR PRATO</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E65100',
  },
  subtitulo: {
    fontSize: 14,
    color: '#6D4C41',
    marginBottom: 20,
    textAlign: 'center',
  },
  imagem: {
    width: 300,
    height: 300,
    borderRadius: 230,
    borderWidth: 5,
    borderColor: '#FB8C00',
    marginBottom: 20,
  },
  resultado: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3E2723',
    textAlign: 'center',
  },
  linkReceita: {
    fontSize: 16,
    color: '#0277BD',
    textDecorationLine: 'underline',
    marginTop: 8,
    fontWeight: '600',
  },
  contador: {
    fontSize: 14,
    color: '#8D6E63',
    marginTop: 6,
    marginBottom: 25,
  },
  botao: {
    backgroundColor: '#E65100',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 4,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});