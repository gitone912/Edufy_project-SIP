# signals.py

from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils import timezone
from .models import MonthlyUserProgress, weeklyProgress

@receiver(pre_save, sender=MonthlyUserProgress)
def set_month(sender, instance, **kwargs):
    if not instance.month:
        instance.month = timezone.now().month

@receiver(pre_save, sender=weeklyProgress)
def set_weekday(sender, instance, **kwargs):
    if not instance.weekday:
        instance.weekday = timezone.now().weekday()
