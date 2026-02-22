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

<h2>serializer</h2>

<p>
  In Django REST Framework (DRF), Serializers act as the bridge between your complex database objects (QuerySets and model instances) and "wire-friendly" formats like JSON or XML.
  They handle two main directions of data flow:
</p>
<ol>
  <li><strong> Serialization:</strong>strong> Converting Model Instances $\rightarrow$ JSON (for sending to the frontend).</li>
  <li><strong>Deserialization:</strong>strong> Converting JSON $\rightarrow$ Validated Data/Model Instances (for saving to the database).</li>
</ol>





<h1>React</h1>
<ol>
  <li>npm create vite frontend</li>
  <li>npm install react-bootstrap bootstrap</li>
  <li>npm install react-router-dom</li>
</ol>

<h3>How fatch data from backend</h3>

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
```


