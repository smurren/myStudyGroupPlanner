import json

from rest_framework import permissions, viewsets
from rest_framework import generics
from rest_framework.decorators import api_view
from authentication.models import Account
from authentication.permissions import IsAccountOwner
from authentication.serializers import AccountSerializer

from django.contrib.auth import authenticate, login, logout

from rest_framework import status, views
from rest_framework.response import Response


class AccountViewSet(viewsets.ModelViewSet):
    lookup_field = 'username'
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(), IsAccountOwner(),)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            Account.objects.create_user(**serializer.validated_data)

            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return Response({
            'status': 'Bad request',
            'message': 'Account could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)


class LoginView(views.APIView):
    def post(self, request, format=None):
        data = json.loads(request.body)

        email = data.get('email', None)
        password = data.get('password', None)

        account = authenticate(email=email, password=password)

        if account is not None:
            if account.is_active:
                login(request, account)

                serialized = AccountSerializer(account)

                return Response(serialized.data)
            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'This account has been disabled.'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': 'Unauthorized',
                'message': 'Username/password combination invalid.'
            }, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        logout(request)

        return Response({}, status=status.HTTP_204_NO_CONTENT)

# class AccountList(generics.ListAPIView):
#     serializer_class = AccountSerializer
#     queryset = Account.objects.all()
#     def get_queryset(self):
#         username = self.request.query_params.get('username', None)
#         if username is not None:
#             queryset = queryset.filter(username_id=username)
#         return queryset

# class AccountListView(generics.ListAPIView):
#     queryset = Account.objects.all()
#     serializer = AccountSerializer
#     filter_backends = (filters.SearchFilter,)
