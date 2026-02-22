import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router';

const ShowBook = () => {
    const [books, setBooks] = useState([]);
    const [updateTitle, setUpdateTitle] = useState("")
    // get books 
    const fetchBooks = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/`);
            const data = await response.json();
            setBooks(data);
            console.log(data)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchBooks();
    }, [])


    // update book title
    const updateBook = async (id, title, year) => {
        const bookData = {
            title: title,
            release_year: year,
        };
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/books/${id}/`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookData)
            });
            const data = await response.json();
            setBooks((prev) =>
                prev.map((book) => {
                    if (book.id === id) {
                        return data;
                    } else {
                        return book;
                    }
                })
            );
        } catch (err) {
            console.log(err)
        }
    }

    // Detele book
    const deleteBook = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/books/${id}/`, {
                method: "DELETE",
            });
            setBooks((prev) => prev.filter((book) => book.id !== id));
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <h1> Book Website </h1>
            <Link className='btn btn-success' to='/add'>Add</Link>
            
            {
                books.map((book) => (
                    <Card className="m-2 rounded shadow-lg products-card-info" style={{ width: '22rem' }}>
                        <Card.Body>
                            <Card.Title>{book.title}</Card.Title>
                            <Card.Text>{book.release_year}</Card.Text>
                        </Card.Body>
                        <button className='btn btn-danger m-2' onClick={() => deleteBook(book.id)}> Delete</button>
                        
                        <Link className='btn btn-warning' to={`/update/${book.id}`}>Update</Link>
                    </Card>


                ))
            }
        </>
    )


}
export default ShowBook