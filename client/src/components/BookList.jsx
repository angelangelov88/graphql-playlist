import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';

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

function BookList(props) {
  const displayBooks = (props) => {
    let data = props.data;
    if (data.loading) {
      return (<div>Loading ...</div>)
    } else {
      return data.books.map((book) => {
        return (<li key={book.id}>{ book.name }</li>)
      })
    }
  };
  return (
    <div>
      <ul id="book-list">
        {displayBooks(props)}
      </ul>
      
    </div>
  );
}

export default graphql(getBooksQuery)(BookList);
