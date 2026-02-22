# Django_with_react_CRUD
<h1>Django</h1>
<ol>
  <li>pip install Django</li>
  <li>pip install djangorestframework</li>
  <li>pip install django-cors-headers</li>
</ol>
<h3>In Settings.py</h3>

```
INSTALLED_APPS = [
    ...,
    "corsheaders",
    ...,
]

MIDDLEWARE = [
    ...,
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    ...,
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:8080", # past your frontend url
]

```

<h1>React</h1>
<ol>
  <li>npm create vite frontend</li>
  <li>npm install react-bootstrap bootstrap</li>
  <li>npm install react-router-dom</li>
</ol>


<h2>serializer</h2>

<p>
  In Django REST Framework (DRF), Serializers act as the bridge between your complex database objects (QuerySets and model instances) and "wire-friendly" formats like JSON or XML.
  They handle two main directions of data flow:
</p>
<ol>
  <li><strong> Serialization:</strong>strong> Converting Model Instances $\rightarrow$ JSON (for sending to the frontend).</li>
  <li><strong>Deserialization:</strong>strong> Converting JSON $\rightarrow$ Validated Data/Model Instances (for saving to the database).</li>
</ol>

<h3>How get data from backend to frontend</h3>

**backend**

```
@api_view(['GET'])
def get_books(request):
    books = Book.objects.all()
    serializedData = BookSerializer(books, many=True).data
    return Response(serializedData)

```

**frontend**
```
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
    return (
        <>
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
```
<h3>How add data from frontend to backend</h3>

**backend**

```
@api_view(['POST'])
def create_book(request):
    data = request.data
    serializer = BookSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

```

**frontend**

```
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

```

<h3>How Delete and Update data</h3>

**backend**

```
@api_view(['POST', 'PUT', 'DELETE'])
def book_details(request, id):
    
    try:
        book = Book.objects.get(id=id)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'DELETE':
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    elif request.method == 'PUT':
        data = request.data
        print(data)
        serializer = BookSerializer(book, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
```

**frontend**

```
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
```
