# Generated by Django 3.2.25 on 2024-06-07 18:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rockwellbank', '0007_auto_20240405_0819'),
    ]

    operations = [
        migrations.AddField(
            model_name='portfolio',
            name='checkings',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='portfolio',
            name='loan_balance',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
