
from django.urls import path
from .views import get_books, create_book, book_details

urlpatterns =[
    path('', get_books),
    path('books/create/', create_book),
    path('books/<id>/', book_details),
]

