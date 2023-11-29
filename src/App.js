import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [book, setBook] = useState({ id: '', informacoes: '', comentario: '', classificacao: '' });
  const [books, setBooks] = useState([]);
  const [backendURL, setBackendURL] = useState('https://iefvk2kwe8.execute-api.us-east-1.amazonaws.com/dev');

  // useEffect(() => {
  //   obterLivros()
  // }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };


  const handleURLChange = (event) => {
    setBackendURL(event.target.value);
  };

  const obterLivros = async () => {
      const response = await axios.get(`${backendURL}/feedback`, {
        headers: {
            'x-api-key': 'uG4hIQXjcG1LfgzVO1J8z7A7G9hcWZxv8z8UBsyI'
        }
    });
      setBooks(response.data);
  }

  const cadastrar = async () => {
    try {
      const response = await axios.post(`${backendURL}/feedback`, book, {
        headers: {
            'x-api-key': 'uG4hIQXjcG1LfgzVO1J8z7A7G9hcWZxv8z8UBsyI'
        }
    });
      console.log(response.status)

      if (response.status === 200 || response.status === 201) {
        // Atualize a lista local de livros após o cadastro
        setBooks([...books, response.data]);
        // Limpe o estado do livro atual
        setBook({ id: '', informacoes: '', comentario: '', classificacao: '' });
      } else {
        // Trate outros códigos de status conforme necessário
        console.error("Erro ao cadastrar o feedback", response.data);
      }

    }
    catch (error) {
      console.error("Erro ao conectar com o back-end", error);
    }
  };

  const atualizar = async (id) => {

  };

  const remover = async (id) => {
    const newBooks = books.filter(b => b.id !== id);
    setBooks(newBooks);


  };

  return (
    <div className="App">
      <form>
        <input
          name="informacoes"
          placeholder="Informações"
          value={book.informacoes}
          onChange={handleInputChange}
        />
        <input
          name="comentario"
          placeholder="Comentário"
          value={book.comentario}
          onChange={handleInputChange}
        />
        <input
          name="classificacao"
          placeholder="Classificação"
          value={book.classificacao}
          onChange={handleInputChange}
        />
        <button type="button" onClick={cadastrar}>Cadastrar</button>
        <button type="button" onClick={() => obterLivros()}>Obter todos</button>
      </form>
      <input
        className="backend-url-input"
        type="text"
        placeholder="URL do Backend"
        value={backendURL}
        onChange={handleURLChange}
      />
      <ul>
    {books.map(b => (
      <li key={b.id}>
        <div className="book-box">
          <div className="titulo">{b.informacoes}</div>
          <div className="autor">{b.comentario}</div>
          <div className="autor">{b.classificacao}</div>
        </div>
      </li>
    ))}
</ul>

    </div>
  );
}

export default App;
