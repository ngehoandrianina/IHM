from django.contrib import admin

from Materielle.models import Personne

class DetailsPersonne(admin.ModelAdmin):
    pass
admin.site.register(Personne,DetailsPersonne)