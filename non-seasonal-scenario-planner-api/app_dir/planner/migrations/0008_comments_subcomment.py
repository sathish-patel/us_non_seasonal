# Generated by Django 2.2.10 on 2022-04-20 08:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('planner', '0007_auto_20220418_1905'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comments',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('commnet_body', models.TextField()),
                ('status', models.BooleanField(default=True)),
                ('global_access', models.BooleanField(default=True)),
                ('created_by', models.IntegerField(null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='SubComment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sub_commnet_body', models.TextField()),
                ('status', models.BooleanField(default=True)),
                ('global_access', models.BooleanField(default=True)),
                ('created_by', models.IntegerField(null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('parent_comment', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='parent_comment_id', to='planner.Comments')),
            ],
        ),
    ]
