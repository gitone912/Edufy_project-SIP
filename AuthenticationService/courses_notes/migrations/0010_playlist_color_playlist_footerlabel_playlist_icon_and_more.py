# Generated by Django 4.1.10 on 2023-07-22 09:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("courses_notes", "0009_alter_playlist_description"),
    ]

    operations = [
        migrations.AddField(
            model_name="playlist",
            name="color",
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name="playlist",
            name="footerLabel",
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name="playlist",
            name="icon",
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name="playlist",
            name="total_hours_playlist",
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]