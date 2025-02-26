from rest_framework import viewsets, status, filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from .models import Book, Author
from .serializers import (
    BookSerializer,
    AuthorSerializer,
    LoginUserSerializer,
    RegisterUserSerializer,
)
from .permissions import IsAccountAdminOrReadOnly

class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()
    permission_classes = [IsAccountAdminOrReadOnly]
    authentication_classes = [TokenAuthentication]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'author__name']


class RegisterAPI(APIView):
    permission_classes = [AllowAny]  # Allow anyone to register

    def post(self, request):
        print(request.data)
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # Remove old token if exists
            Token.objects.filter(user=user).delete()
            
            # Create a new token
            token = Token.objects.create(user=user)
            
            return Response({"status": True, "token": token.key}, status=status.HTTP_201_CREATED)
        
        return Response({"status": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class LoginAPI(APIView):
    permission_classes = [AllowAny]  # Allow anyone to login
    
    def post(self, request):
        print(request.data)
        serializer = LoginUserSerializer(data=request.data)
        
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]
            user = authenticate(username=username, password=password)

            if user:
                # Remove old token and create a new one
                Token.objects.filter(user=user).delete()
                token = Token.objects.create(user=user)

                return Response({"status": True, "token": token.key}, status=status.HTTP_200_OK)

        return Response({"status": False, "message": "Invalid username or password"}, status=status.HTTP_400_BAD_REQUEST)
