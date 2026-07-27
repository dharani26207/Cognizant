import React from 'react';

const BookDetails = () => {
  const books = [
    { id: "BK01", title: "Eloquent JavaScript", author: "Marijn Haverbeke", year: 2018, genre: "Programming" },
    { id: "BK02", title: "You Don't Know JS Yet", author: "Kyle Simpson", year: 2020, genre: "JavaScript" },
    { id: "BK03", title: "Clean Code", author: "Robert C. Martin", year: 2008, genre: "Software Engineering" },
    { id: "BK04", title: "Design Patterns", author: "Erich Gamma et al.", year: 1994, genre: "Computer Science" }
  ];

  return (
    <div className="details-card">
      <div className="details-header font-books">
        <h4>📚 Library Book Details</h4>
        <p>Dynamic lists rendered with unique React key identifiers</p>
      </div>

      <div className="details-grid">
        {books.map((book) => (
          <div key={book.id} className="item-card book-item">
            <div className="item-badge">{book.genre}</div>
            <h5>{book.title}</h5>
            <p className="item-subtitle">By {book.author}</p>
            <div className="item-meta">
              <span>Published: {book.year}</span>
              <span className="code-id">{book.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookDetails;
