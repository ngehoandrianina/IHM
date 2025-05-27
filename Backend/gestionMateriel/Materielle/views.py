from rest_framework import viewsets,generics,permissions, status
from .models import Utilisateur, Materiel, DemandePret, SignalementPanne, Maintenance,Salle
from .serializers import MaterielSerializer, DemandePretSerializer,UtilisateurSerializer,SalleSerializer,MaintenaceSerializer,SignalementPanneSerializer,UserRegistrationSerializer
from django.http import JsonResponse
from rest_framework.response import Response
from collections import defaultdict
from rest_framework.decorators import action
from django.db import transaction
from rest_framework.decorators import api_view
from django.utils import timezone

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
    
    @action(detail=False, methods=['post'], url_path='terminer-tous/(?P<user_id>[^/.]+)')
    def terminer_tous_les_prets(self, request, user_id=None):
        try:
            utilisateur = Utilisateur.objects.get(pk=user_id)
            
            with transaction.atomic():
                # Récupérer toutes les demandes actives de l'utilisateur
                demandes_actives = DemandePret.objects.filter(
                    demandeur=utilisateur,
                    etat='En cours'   # ou tout autre état qui signifie "prêt en cours"
                )
                # Mettre à jour chaque demande et chaque matériel
                for demande in demandes_actives:
                    demande.etat = 'Rendu'
                    demande.save()
                    
                    materiel = demande.materiel
                    materiel.etat = 'Disponible'
                    materiel.save()
                
                count = demandes_actives.count()
                return Response({
                    'status': f'{count} prêt(s) terminé(s)',
                    'materiels_liberes': count
                }, status=status.HTTP_200_OK)
                
        except Utilisateur.DoesNotExist:
            return Response(
                {'error': 'Utilisateur non trouvé'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    @action(detail=False, methods=['post'], url_path='terminer-tous-retard/(?P<user_id>[^/.]+)')
    def terminer_tous_les_prets(self, request, user_id=None):
        try:
            utilisateur = Utilisateur.objects.get(pk=user_id)
            
            with transaction.atomic():
                # Récupérer toutes les demandes actives de l'utilisateur
                demandes_actives = DemandePret.objects.filter(
                    demandeur=utilisateur,
                    etat='En retard'   # ou tout autre état qui signifie "prêt en cours"
                )
                # Mettre à jour chaque demande et chaque matériel
                for demande in demandes_actives:
                    demande.etat = 'Rendu'
                    demande.save()
                    
                    materiel = demande.materiel
                    materiel.etat = 'Disponible'
                    materiel.save()
                
                count = demandes_actives.count()
                return Response({
                    'status': f'{count} prêt(s) terminé(s)',
                    'materiels_liberes': count
                }, status=status.HTTP_200_OK)
                
        except Utilisateur.DoesNotExist:
            return Response(
                {'error': 'Utilisateur non trouvé'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

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

def mettre_a_jour_etats():
    demandes = DemandePret.objects.filter(etat='En cours', date_fin__lt=timezone.now())
    demandes.update(etat='En retard')

@api_view(['POST'])
def maj_demandes_etat(request):
    mettre_a_jour_etats()
    return Response({"message": "Mise à jour terminée."})
