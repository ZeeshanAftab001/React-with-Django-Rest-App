from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet,LoginAPI,RegisterAPI
from rest_framework.authtoken import views

# Create a router
router = DefaultRouter()
router.register(r'books', BookViewSet, basename='book')

# Define URL patterns
urlpatterns = [
    path('', include(router.urls)),
    path('login/',LoginAPI.as_view()),
    path('register/',RegisterAPI.as_view()),
    path('api-token-auth/', views.obtain_auth_token),
]
