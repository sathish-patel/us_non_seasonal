# Generated by Django 2.2.10 on 2022-04-20 09:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('planner', '0008_comments_subcomment'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comments',
            old_name='commnet_body',
            new_name='comment_body',
        ),
    ]