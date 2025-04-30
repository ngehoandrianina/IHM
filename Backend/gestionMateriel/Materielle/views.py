from rest_framework import viewsets
from .models import Utilisateur, Materiel, DemandePret, SignalementPanne, Maintenance,Salle
from .serializers import MaterielSerializer, DemandePretSerializer,UtilisateurSerializer,SalleSerializer,MaintenaceSerializer,SignalementPanneSerializer
from django.http import JsonResponse

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


