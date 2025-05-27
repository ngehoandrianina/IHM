from rest_framework import serializers
from .models import Utilisateur, Materiel, DemandePret, SignalementPanne, Maintenance,Salle
from django.contrib.auth.hashers import make_password

class UtilisateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Utilisateur
        fields = ['id', 'username', 'email', 'role','departement']
    
class SalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salle
        fields = '__all__'
class MaterielSerializer(serializers.ModelSerializer):
    salle = SalleSerializer(read_only = True)
    salle_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = Materiel
        fields = '__all__'

class DemandePretSerializer(serializers.ModelSerializer):
    materiel = MaterielSerializer(read_only=True)
    demandeur = UtilisateurSerializer(read_only=True)
    demandeur_id = serializers.IntegerField(write_only=True)
    materiel_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = DemandePret
        fields = '__all__'



class SignalementPanneSerializer(serializers.ModelSerializer):
    utilisateur = UtilisateurSerializer(read_only = True)
    materiel = MaterielSerializer(read_only = True)
    utilisateur_id = serializers.IntegerField(write_only = True)
    materiel_id = serializers.IntegerField(write_only = True)
    class Meta:
        model = SignalementPanne
        fields = '__all__'

class MaintenaceSerializer(serializers.ModelSerializer):
    technicien = UtilisateurSerializer(read_only = True)
    signalement = SignalementPanneSerializer(read_only = True)
    technicien_id = serializers.IntegerField(write_only=True)
    signalement_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = Maintenance
        fields = '__all__'

##creation USer

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = Utilisateur
        fields = ['username', 'password', 'email', 'role', 'departement']
        extra_kwargs = {
            'role': {'required': True},
            'email': {'required': True}
        }
    def validate_role(self, value):
        if value not in dict(Utilisateur.ROLE_CHOICES).keys():
            raise serializers.ValidationError("Rôle invalide")
        return value
    
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        return super().create(validated_data)