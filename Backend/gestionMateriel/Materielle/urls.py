from django.urls import path, include
from rest_framework import routers
from . import views
from rest_framework_simplejwt.views import TokenRefreshView
from .views import LoginView, UserInfoView,UserRegistrationView

router = routers.DefaultRouter()
router.register(r'materiels', views.MaterielViewSet)
router.register(r'demandes-pret', views.DemandePretViewSet)
router.register(r'salle', views.SalleViewSet)
router.register(r'utilisateur', views.UtilisateurViewSet)
router.register(r'signalement-panne', views.SignalementPanneViewSet)
router.register(r'maintenance', views.MaintenanceViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/auth/login/', LoginView.as_view(), name='login'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/user/', UserInfoView.as_view(), name='user_info'),
    path('api/auth/register/', UserRegistrationView.as_view(), name='register'),
]
