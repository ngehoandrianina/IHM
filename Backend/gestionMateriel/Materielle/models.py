# models.py

from django.db import models
from django.contrib.auth.models import AbstractUser,Permission,Group
from django.utils.translation import gettext_lazy as _

class Utilisateur(AbstractUser):
    ROLE_CHOICES = [
        ('Administrateur', 'Administrateur'),
        ('Technicien', 'Technicien'),
        ('Enseignant', 'Enseignant'),
        ('Etudiant', 'Etudiant'),
        ('ResponsableDep', 'Responsable Département'),
    ]
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    departement = models.CharField(max_length=100, blank=True, null=True)
    
    # On retire les champs inutiles d'AbstractUser
    first_name = None
    last_name = None
    groups = models.ManyToManyField(
        Group,
        verbose_name=_('groups'),
        blank=True,
        related_name='materielle_utilisateur_groups',  # Unique
        related_query_name='materielle_utilisateur',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_('user permissions'),
        blank=True,
        related_name='materielle_utilisateur_permissions',  # Unique
        related_query_name='materielle_utilisateur',
    )
    
    class Meta:
        verbose_name = "Utilisateur"
        verbose_name_plural = "Utilisateurs"
    def __str__(self):
        return f"{self.username} ({self.role})"

class Salle(models.Model):
    nom = models.CharField(max_length=100)
    batiment = models.CharField(max_length=100)
    etage = models.CharField(max_length=20)
    
    def __str__(self):
        return f"{self.nom} ({self.batiment} - {self.etage})"

class Materiel(models.Model):
    ETAT_CHOICES = [
        ('Disponible', 'Disponible'),
        ('En pret', 'En prêt'),
        ('En panne', 'En panne'),
        ('Réparé', 'Réparé'),
        ('Hors service', 'Hors service'),
    ]
    
    nom = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    marque = models.CharField(max_length=100)
    modele = models.CharField(max_length=100)
    numero_serie = models.CharField(max_length=100, unique=True)
    etat = models.CharField(max_length=20, choices=ETAT_CHOICES, default='Disponible')
    date_acquisition = models.DateField()
    salle = models.ForeignKey(Salle, on_delete=models.SET_NULL, null=True, blank=True)
    departement = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.nom} ({self.marque} {self.modele})"

class DemandePret(models.Model):
    ETAT_CHOICES = [
        ('En attente', 'En attente'),
        ('Validé', 'Validé'),
        ('Refusé', 'Refusé'),
        ('Terminé', 'Terminé'),
    ]
    
    demandeur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE)
    materiel = models.ForeignKey(Materiel, on_delete=models.CASCADE)
    date_demande = models.DateTimeField(auto_now_add=True)
    date_debut = models.DateField()
    date_fin = models.DateField()
    etat = models.CharField(max_length=20, choices=ETAT_CHOICES, default='En attente')
    
    class Meta:
        verbose_name = "Demande de prêt"
        verbose_name_plural = "Demandes de prêt"
    
    def __str__(self):
        return f"Demande #{self.id} - {self.materiel}"

class SignalementPanne(models.Model):
    ETAT_CHOICES = [
        ('Non traité', 'Non traité'),
        ('En cours', 'En cours'),
        ('Résolu', 'Résolu'),
    ]
    
    materiel = models.ForeignKey(Materiel, on_delete=models.CASCADE)
    utilisateur = models.ForeignKey(Utilisateur, on_delete=models.SET_NULL, null=True)
    date_signalement = models.DateTimeField(auto_now_add=True)
    description = models.TextField()
    etat = models.CharField(max_length=20, choices=ETAT_CHOICES, default='Non traité')
    
    class Meta:
        verbose_name = "Signalement de panne"
        verbose_name_plural = "Signalements de panne"
    
    def __str__(self):
        return f"Panne #{self.id} - {self.materiel}"

class Maintenance(models.Model):
    signalement = models.ForeignKey(SignalementPanne, on_delete=models.CASCADE)
    technicien = models.ForeignKey(Utilisateur, on_delete=models.SET_NULL, null=True, limit_choices_to={'role': 'Technicien'})
    date_intervention = models.DateField()
    description = models.TextField()
    
    class Meta:
        verbose_name = "Maintenance"
        verbose_name_plural = "Maintenances"
    
    def __str__(self):
        return f"Maintenance #{self.id} - {self.signalement.materiel}"