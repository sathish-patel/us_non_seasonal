# from django.contrib.postgres import fields
# from django.db import models
from rest_framework import serializers
from app_dir.planner.models import Comments,SubComment

# # TABLE = get_model('planner', 'Planner')
# # APP = 'module_api'
# # fields = ('name', 'description')
 

class CommentsSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        return Comments.objects.create(**validated_data)

    class Meta:
        model = Comments
        fields = '__all__'
class SubCommentSerializer(serializers.ModelSerializer):
    
    def create(self, validated_data):
        return SubComment.objects.create(**validated_data)

    class Meta:
        model = SubComment
        fields = '__all__'
