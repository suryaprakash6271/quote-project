import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import List from "./components/List";
import Form from "./components/Form";
import About from "./components/About";
import "./App.css";

const defaultQuotes = [ {title: "The Power of Imagination",author: "Albert Einstein",description: "Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world."},
  {title: "Success and Failure",author: "Winston Churchill",description: "Success is not final, failure is not fatal: it is the courage to continue that counts."},
  {title: "Dream Big",author: "Eleanor Roosevelt",description: "The future belongs to those who believe in the beauty of their dreams."},
  {title: "Happiness and Meaning",author: "Dalai Lama",description: "Happiness is not something ready-made. It comes from your own actions."},
  {title: "Change the World",author: "Mahatma Gandhi",description: "Be the change that you wish to see in the world."},
  {title: "Courage Over Fear",author: "Mark Twain",description: "Courage is resistance to fear, mastery of fear—not absence of fear."}
];

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingQuoteIndex, setEditingQuoteIndex] = useState(null); // Track quote being edited

  useEffect(() => {
    const storedQuotes = JSON.parse(localStorage.getItem("quotes"));

    if (storedQuotes && storedQuotes.length > 0) {
      setQuotes(storedQuotes);
    } else {
      setQuotes(defaultQuotes);
      localStorage.setItem("quotes", JSON.stringify(defaultQuotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }, [quotes]);

  const addQuote = (newQuote) => {
    const updatedQuotes = [...quotes, newQuote];
   setQuotes(updatedQuotes);
   localStorage.setItem("quotes", JSON.stringify(updatedQuotes));
  };
  
  const deleteQuote = (index) => {
    const updatedQuotes = quotes.filter((_,i) => i !== index);
    setQuotes(updatedQuotes);
    localStorage.setItem("quotes", JSON.stringify(updatedQuotes));
  };

  const updateQuote = (updatedQuote) => {
    const updatedQuotes = quotes.map((quote, index) => (index === editingQuoteIndex ? updatedQuote : quote));
    setQuotes(updatedQuotes);
    localStorage.setItem("quotes", JSON.stringify(updatedQuotes));
    setEditingQuoteIndex(null); // Reset edit mode
  };

  return (
    <div>
      <Navbar />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <List quotes={quotes} searchTerm={searchTerm} deleteQuote={deleteQuote} setEditingQuote={setEditingQuoteIndex} />
      <Form addQuote={addQuote} editingQuote={editingQuoteIndex !== null ? quotes[editingQuoteIndex] : null} updateQuote={updateQuote} clearEditing={() => setEditingQuoteIndex(null)} />
      <About />
    </div>
  );
};

export default App;
