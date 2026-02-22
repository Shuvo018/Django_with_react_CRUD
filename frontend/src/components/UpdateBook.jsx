import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Form, Button, Container } from 'react-bootstrap';


const UpdateBook = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const [book, setBook] = useState({
        title: '',
        release_year: ''
    });

    // Get Book
    useEffect(() => {
        const fetchBookForUpdate = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/books/${id}/`, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch book details");
                }
                // console.log('response only')
                // console.log(response)
                const data = await response.json();
                console.log('response data')
                // console.log(data)
                setBook(data);
            } catch (err) {
                console.error("Error:", err);
            }
        };

        fetchBookForUpdate();
    }, [id]);


    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    // Handle the PUT request
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://127.0.0.1:8000/api/books/${id}/`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(book)
            });
            navigate('/');
        } catch (err) {
            console.log("Error updating:", err);
        }
    };


    return (
        <Container className="mt-5">
            <h2>Update Book</h2>
            <Form onSubmit={handleUpdate}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Release Year</Form.Label>
                    <Form.Control
                        type="number"
                        name="release_year"
                        value={book.release_year}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Save Changes</Button>
            </Form>
        </Container>
    )
}
export default UpdateBook