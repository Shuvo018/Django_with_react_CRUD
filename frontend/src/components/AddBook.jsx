import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
    const [title, setTitle] = useState("");
    const [releaseYear, setReleaseYear] = useState(0);
    const navigate = useNavigate();

    //  Add book
    const addBook = async () => {
        const bookData = {
            title,
            release_year: Number(releaseYear)
        };
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/books/create/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(bookData),
            });

            if (response.ok) {
                console.log("ok")
                navigate('/');
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (

        <Card className="m-2 rounded shadow-lg products-card-info" style={{ width: '22rem' }}>
            <Card.Body>
                <Card.Text><input
                    type="text"
                    placeholder="Book Title..."
                    onChange={(e) => setTitle(e.target.value)}
                /></Card.Text>
                <Card.Title><input
                    type="number"
                    placeholder="Release Year..."
                    onChange={(e) => setReleaseYear(e.target.value)}
                /></Card.Title>
                
                <button className='btn btn-success' onClick={addBook}> Add Book </button>
            </Card.Body>
        </Card>
    )
}
export default AddBook