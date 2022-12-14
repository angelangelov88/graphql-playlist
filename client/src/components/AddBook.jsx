import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';

const getAuthorsQuery = gql`
  {
   authors{
      name
      id
    } 
  }
`;

const AddBook = (props) => {
  const displayAuthors = (props) => {
    let data = props.data;
    if (data.loading){
      return (<option disabled>Loading Authors...</option>)
    } else {
      return data.authors.map((author) => {
        return (<option key={author.id} value={author.id}>{ author.name }</option>)
      })
    }
  };

  return ( 
    <form id="add-book">

    <div className="field">
      <label>Book name:</label>
      <input type="text"/>
    </div>

    <div className="field">
      <label>Genre:</label>
      <input type="text"/>
    </div>

    <div className="field">
      <label>Author:</label>
      <select>
        <option>Select Author</option>
        { displayAuthors(props) }
      </select>
    </div>

    <button>+</button>

    </form>
  );
}
 
export default graphql(getAuthorsQuery)(AddBook);