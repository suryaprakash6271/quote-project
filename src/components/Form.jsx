import React, { useState, useEffect } from "react";

const Form = ({ addQuote, editingQuote, updateQuote, clearEditing }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [quoteTitle, setQuoteTitle] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("");
  const [quoteDescription, setQuoteDescription] = useState("");

  useEffect(() => {
    if (editingQuote) {
      setQuoteTitle(editingQuote.title);
      setQuoteAuthor(editingQuote.author);
      setQuoteDescription(editingQuote.description);
      setIsPopupOpen(true);
    }
  }, [editingQuote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quoteTitle && quoteAuthor && quoteDescription) {
      const quoteData = { title: quoteTitle, author: quoteAuthor, description: quoteDescription };

      if (editingQuote) {
        updateQuote(quoteData);
      } else {
        addQuote(quoteData);
      }

      handleClose();
    }
  };

  // Function to close the popup and reset states
  const handleClose = () => {
    setQuoteTitle("");
    setQuoteAuthor("");
    setQuoteDescription("");
    setIsPopupOpen(false);
    clearEditing(); // Reset editing state in App.js
  };

  return (
    <>
      {isPopupOpen && (
        <>
          <div className="popup-overlay" onClick={handleClose}></div>
          <div className="popup-box">
            <h2>{editingQuote ? "Edit Quote" : "Add a New Quote"}</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Quote Title" value={quoteTitle} onChange={(e) => setQuoteTitle(e.target.value)} />
              <input type="text" placeholder="Quote Author" value={quoteAuthor} onChange={(e) => setQuoteAuthor(e.target.value)} />
              <textarea placeholder="Description" value={quoteDescription} onChange={(e) => setQuoteDescription(e.target.value)}></textarea>
              <button type="submit">{editingQuote ? "UPDATE" : "ADD"}</button>
              <button type="button" onClick={handleClose}>CANCEL</button>
            </form>
          </div>
        </>
      )}

      <button className="add-button" onClick={() => { handleClose(); setIsPopupOpen(true); }}>+</button>
    </>
  );
};

export default Form;
