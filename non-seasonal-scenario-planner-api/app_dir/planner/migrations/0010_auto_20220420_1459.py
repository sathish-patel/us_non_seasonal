# Generated by Django 2.2.10 on 2022-04-20 09:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('planner', '0009_auto_20220420_1459'),
    ]

    operations = [
        migrations.RenameField(
            model_name='subcomment',
            old_name='sub_commnet_body',
            new_name='sub_comment_body',
        ),
    ]
