import axios from 'axios';
import React, { useState } from "react";
import { connect } from 'react-redux';

function Form(props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const { articleToEdit } = props;

  const clearArticle = () => {
    setTitle('');
    setBody('');
    setAuthor('');
  }

  const handleSubmit = (evt) => {
    const { onSubmit, articleToEdit, onEdit } = props;

    if(!articleToEdit) {
      return axios.post('http://localhost:8000/api/articles', {
        title,
        body,
        author,
      })
        .then((res) => onSubmit(res.data))
        .then(() => clearArticle());
    } else {
      return axios.patch(`http://localhost:8000/api/articles/${articleToEdit._id}`, {
        title,
        body,
        author,
      })
        .then((res) => onEdit(res.data))
        .then(() => clearArticle());
    }
  }

  return (
    <div className="col-12 col-lg-6 offset-lg-3">
      <input
        onChange={e => setTitle(e.target.value)}
        value={title}
        className="form-control my-3"
        placeholder="Article Title"
      />
      <textarea
        onChange={e => setBody(e.target.value)}
        className="form-control my-3"
        placeholder="Article Body"
        value={body}>
      </textarea>
      <input
        onChange={e => setAuthor(e.target.value)}
        value={author}
        className="form-control my-3"
        placeholder="Article Author"
      />
     <button onClick={handleSubmit} className="btn btn-primary float-right">{articleToEdit ? 'Update' : 'Submit'}</button>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({ type: 'SUBMIT_ARTICLE', data }),
  onEdit: data => dispatch({ type: 'EDIT_ARTICLE', data }),
});

const mapStateToProps = state => ({
  articleToEdit: state.home.articleToEdit,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
