import React from "react";
import Quote from "./Quote";

const List = ({ quotes, searchTerm, deleteQuote, setEditingQuote }) => {
  const filteredQuotes = quotes.filter(
    (quote) =>
      quote.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main">
      {filteredQuotes.map((quote, index) => (
        <Quote key={index} quote={quote} index={index} deleteQuote={deleteQuote} setEditingQuote={setEditingQuote} />
      ))}
    </div>
  );
};

export default List;
