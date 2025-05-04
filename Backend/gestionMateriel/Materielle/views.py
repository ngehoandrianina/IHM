from rest_framework import viewsets,generics,permissions, status
from .models import Utilisateur, Materiel, DemandePret, SignalementPanne, Maintenance,Salle
from .serializers import MaterielSerializer, DemandePretSerializer,UtilisateurSerializer,SalleSerializer,MaintenaceSerializer,SignalementPanneSerializer,UserRegistrationSerializer
from django.http import JsonResponse
from rest_framework.response import Response


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

def accueil(request):
    return JsonResponse({"message": "Bienvenue sur l'API Gestion Matériel 🚀"})

class MaterielViewSet(viewsets.ModelViewSet):
    queryset = Materiel.objects.all()
    serializer_class = MaterielSerializer

class DemandePretViewSet(viewsets.ModelViewSet):
    queryset = DemandePret.objects.all()
    serializer_class = DemandePretSerializer
    def perform_create(self, serializer):
        serializer.save(demandeur=self.request.user)

class UtilisateurViewSet(viewsets.ModelViewSet):
    queryset = Utilisateur.objects.all()
    serializer_class = UtilisateurSerializer

class SalleViewSet(viewsets.ModelViewSet):
    queryset = Salle.objects.all()
    serializer_class = SalleSerializer

class SignalementPanneViewSet(viewsets.ModelViewSet):
    queryset = SignalementPanne.objects.all()
    serializer_class = SignalementPanneSerializer

class MaintenanceViewSet(viewsets.ModelViewSet):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenaceSerializer

#Authentification
    
class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'role': user.role,
                    'departement': user.departement
                }
            })
        return Response({'error': 'Identifiants invalides'}, status=status.HTTP_401_UNAUTHORIZED)

class UserInfoView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return Response({'error': 'Non authentifié'}, status=status.HTTP_401_UNAUTHORIZED)
        
        user = request.user
        return Response({
            'id': user.id,
            'username': user.username,
            'role': user.role,
            'departement': user.departement
        })
#creation User
class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]  # Ou IsAdminUser si seul l'admin peut créer des comptes
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        return Response({
            "message": "Utilisateur créé avec succès",
            "user": {
                "id": user.id,
                "username": user.username,
                "role": user.role
            }
        }, status=status.HTTP_201_CREATED)
