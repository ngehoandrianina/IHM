from rest_framework import serializers
from .models import Utilisateur, Materiel, DemandePret, SignalementPanne, Maintenance,Salle

class UtilisateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Utilisateur
        fields = ['id', 'username', 'email', 'role']

class MaterielSerializer(serializers.ModelSerializer):
    class Meta:
        model = Materiel
        fields = '__all__'

class DemandePretSerializer(serializers.ModelSerializer):
    materiel = MaterielSerializer(read_only=True)
    demandeur = UtilisateurSerializer(read_only=True)
    
    class Meta:
        model = DemandePret
        fields = '__all__'

class SalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salle
        fields = '__all__'

class SignalementPanneSerializer(serializers.ModelSerializer):
    class Meta:
        model = SignalementPanne
        fields = '__all__'

class MaintenaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maintenance
        fields = '__all__'