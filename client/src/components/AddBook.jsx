import React from 'react';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
import {flowRight as compose} from 'lodash';

const getAuthorsQuery = gql`
  {
   authors{
      name
      id
    } 
  }
`;

const getBooksQuery = gql`
  {
   books{
      name
      genre
      id
      author{
        name
        age
      }
    } 
  }
`;

const addBookMutation = gql`
  mutation($name:String!, $genre:String!, $authorId:String!) {
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
      id
    }
  }
`;

const AddBook = (props) => {
  const [book, setBook] = React.useState({
    name: '',
    genre: '',
    authorId: '',
  });

  const displayAuthors = (props) => {
    let data = props.getAuthorsQuery;
    if (data.loading){
      return (<option disabled>Loading Authors...</option>)
    } else {
      return data.authors.map((author) => {
        return (<option key={author.id} value={author.id}>{ author.name }</option>)
      })
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log(book);
    console.log(props);
    props.addBookMutation({
      variables: {
        name: book.name,
        genre: book.genre,
        authorId: book.authorId,
      },
      refetchQueries: [{ query: getBooksQuery}]
    });

  };

  return ( 
    <form id="add-book" onSubmit={(e) => submitForm(e)}>

    <div className="field">
      <label>Book name:</label>
      <input type="text" onChange={(e) => setBook({...book, name: e.target.value})} />
    </div>

    <div className="field">
      <label>Genre:</label>
      <input type="text" onChange={(e) => setBook({...book, genre: e.target.value})} />
    </div>

    <div className="field">
      <label>Author:</label>
      <select onChange={(e) => setBook({...book, authorId: e.target.value})}>
        <option>Select Author</option>
        { displayAuthors(props) }
      </select>
    </div>

    <button>+</button>

    </form>
  );
}
 
export default compose (
  graphql(getAuthorsQuery, { name: "getAuthorsQuery"}),
  graphql(addBookMutation, { name: "addBookMutation"}),
)(AddBook);