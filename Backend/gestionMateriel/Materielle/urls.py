from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'materiels', views.MaterielViewSet)
router.register(r'demandes-pret', views.DemandePretViewSet)
router.register(r'salle', views.SalleViewSet)
router.register(r'utilisateur', views.UtilisateurViewSet)
router.register(r'signalement-panne', views.SignalementPanneViewSet)
router.register(r'maintenance', views.MaintenanceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
