from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from .serializers import (
    BookSerializer,
    AuthorSerializer,
    LoginUserSerializer,
    RegisterUserSerializer,
)
from .models import Book, Author
from .permissions import IsAccountAdminOrReadOnly
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework import filters

class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()
    permission_classes = [IsAccountAdminOrReadOnly]
    authentication_classes = [TokenAuthentication]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name','author__name']


class RegisterAPI(APIView):
    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()  # Save user if valid
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"status": True, "token": token.key}, status=status.HTTP_201_CREATED)
        return Response({"status": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class LoginAPI(APIView):
    def post(self, request):
        serializer = LoginUserSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]

            user = authenticate(username=username, password=password)

            if user:
                token, _ = Token.objects.get_or_create(user=user)
                return Response({"status": True, "Token": token.key}, status=status.HTTP_200_OK)

        return Response({"status": False, "message": "Invalid username or password"}, status=status.HTTP_400_BAD_REQUEST)
