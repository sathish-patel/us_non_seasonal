# Generated by Django 2.2.10 on 2022-04-20 09:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('planner', '0010_auto_20220420_1459'),
    ]

    operations = [
        migrations.RenameField(
            model_name='subcomment',
            old_name='parent_comment',
            new_name='parent_comment_id',
        ),
    ]
