import React from "react";

const Quote = ({ quote, index, deleteQuote, setEditingQuote }) => {
  return (
    <div className="container">
      <h1>{quote.title}</h1>
      <h5>{quote.author}</h5>
      <p>{quote.description}</p>
      <button onClick={() => deleteQuote(index)}>Delete</button>
      <button onClick={() => setEditingQuote(index)}>Edit</button>
    </div>
  );
};

export default Quote;
