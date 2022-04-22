"""Seasonal Scenario Planner"""
import copy
import json
import os
import warnings
from xml.etree.ElementTree import Comment

import numpy as np
import openpyxl
import pandas as pd
import pdfkit
from azure.identity import ClientSecretCredential
from azure.storage.blob import __version__
from azure.storage.filedatalake import DataLakeServiceClient
from django.db import connection
from django.http import HttpResponse
from django.http.response import JsonResponse
from django.template.loader import render_to_string
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser

# from app_dir.planner.models import PlannerDetail
from configurations.settings import (
    BASE_DIR,
)

from app_dir.planner.models import Comments,SubComment
from .serializers import CommentsSerializer, SubCommentSerializer

# import pyarrow
# import fastparq


# pd.options.mode.use_inf_as_na = True
warnings.filterwarnings("ignore", category=DeprecationWarning)
pd.options.mode.chained_assignment = None  # default='warn'


# cursor to dictionary
def dictfetchall(cursor):
    """cursor to dictionary"""
    columns = [col[0] for col in cursor.description]
    rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
    return rows


#################


@api_view(["GET"])
def get_base_filters(request):
    """
    Description   :: This API fetch RSU base filters

    Method        :: GET.

    Returns       :: RSU base filters

    """
    try:
        response = {}
        with connection.cursor() as cursor:
            cursor.execute(
                f"""SELECT  id,name,code as value ,sequence FROM planner_brand ORDER BY sequence ASC"""
            )
            response["brand"] = dictfetchall(cursor)
            cursor.execute(
                f"""SELECT id,name,code as value ,sequence FROM .planner_category ORDER BY sequence ASC"""
            )
            response["category"] = dictfetchall(cursor)
            cursor.execute(
                f"""SELECT id,name,code as value ,sequence FROM planner_channel ORDER BY sequence ASC"""
            )
            response["channel"] = dictfetchall(cursor)
            cursor.execute(
                f"""SELECT id,name,code as value ,sequence FROM planner_cta ORDER BY sequence ASC"""
            )
            response["cta"] = dictfetchall(cursor)
            cursor.execute(
                f"""SELECT id,name,code as value ,sequence FROM planner_attribute ORDER BY sequence ASC"""
            )
            response["attribute"] = dictfetchall(cursor)
            cursor.execute(
                f"""SELECT id,name FROM planner_consumption ORDER BY sequence ASC"""
            )
            response["cosumption"] = dictfetchall(cursor)
            cursor.execute(
                f"""SELECT id,name FROM planner_packtype ORDER BY sequence ASC"""
            )
            response["packtype"] = dictfetchall(cursor)
            cursor.execute(
                f"""SELECT id,name FROM planner_subbrand ORDER BY sequence ASC"""
            )
            response["subbrand"] = dictfetchall(cursor)
            cursor.execute(
                f"""SELECT id,name FROM planner_year ORDER BY sequence ASC"""
            )
            response["year"] = dictfetchall(cursor)
            cursor.execute(
                f"""SELECT id,name FROM planner_packsize ORDER BY sequence ASC"""
            )
            response["packsize"] = dictfetchall(cursor)
            cursor.execute(
                f"""SELECT id,name FROM planner_productform ORDER BY sequence ASC"""
            )
            response["productform"] = dictfetchall(cursor)
            cursor.execute(
                f"""SELECT id,name FROM planner_flavour ORDER BY sequence ASC"""
            )
            response["flavour"] = dictfetchall(cursor)
            cursor.execute(
                f"""SELECT  distinct portfolio_segment  FROM planner_mainretention """
            )
            response["portfolio_segmentation"] = dictfetchall(cursor)
        return JsonResponse(
            {
                "code": 200,
                "status": "success",
                "data": response,
            }
        )
    except Exception as error:
            return JsonResponse({"code": 400, "status": "Failed", "data": str(error)})


@api_view(["GET"])
def get_main_filters(request):
    """
    Description   :: This API fetch RSU base filters

    Method        :: GET.

    Returns       :: RSU base filters

    """
    try:
        response = {}
        with connection.cursor() as cursor:
            query=f"""select pm.*,
                pb.name as brand,
                pc.name as category,
                pc2.name as channel,
                pc3.name as consumption,
                pc4.name as cta 
                from planner_mainfilter pm  
                left join planner_brand pb   on pb.id= pm.brand_id  
                left join planner_category pc on pc.id=pm.category_id
                left join planner_channel pc2 on pc2.id =pm.channel_id
                left join planner_consumption pc3 on pc3.id = pm.consumption_id
                left join planner_cta pc4 on pc4.id = pm.cta_id"""
            cursor.execute(query)
            response["main_filters"] = dictfetchall(cursor)
        return JsonResponse(
            {
                "code": 200,
                "status": "success",
                "data": response,
            }
        )
    except Exception as error:
            return JsonResponse({"code": 400, "status": "Failed", "data": str(error)})

@api_view(["GET"])
def get_attribute_filters(request):
    """
    Description   :: This API fetch RSU base filters

    Method        :: GET.

    Returns       :: RSU base filters

    """
    try:
        response = {}
        with connection.cursor() as cursor:
            query=f"""select pa.*,
                pa2.name as attribute,
                pc.name as category,
                pc2.name as channel,
                pc3.name as consumption,
                pc4.name as cta 
                from planner_attributefilter pa
                left join planner_attribute pa2  on pa2.id= pa.attribute_id 
                left join planner_category pc on pc.id=pa.category_id
                left join planner_channel pc2 on pc2.id =pa.channel_id
                left join planner_consumption pc3 on pc3.id = pa.consumption_id
                left join planner_cta pc4 on pc4.id = pa.cta_id"""
            cursor.execute(query)
            response["attribute_filters"] = dictfetchall(cursor)
        return JsonResponse(
            {
                "code": 200,
                "status": "success",
                "data": response,
            }
        )
    except Exception as error:
            return JsonResponse({"code": 400, "status": "Failed", "data": str(error)})


@api_view(["POST"])
def performance_summary(request):
    """
    Description   :: This API fetch portfolio_segmentation

    Method        :: POST.

    Returns       :: portfolio_segmentation

    """
    try:
        data = request.data.get("params")
        response = {}
        with connection.cursor() as cursor:
            query=f"""select count(distinct upc_num) as upc_nums,sum(total_sales) as total_sales 
            from planner_mainretention
            where 1=1 """
            if data["channel_id"]:
                query += f""" and channel_id={data['channel_id']}"""
            if data["cta_id"]:
                query += f""" and cta_id={data['cta_id']}"""
            if data["consumption_id"]:
                query += f""" and consumption_id={data['consumption_id']}"""
            if data["category_id"]:
                query += f""" and category_id={data['category_id']}"""
            if data["brand_id"] != "Select ALL":
                query += f""" and brand_id={data['brand_id']}"""
            cursor.execute(query)
            response["upc_details"] = dictfetchall(cursor)
            #Query for 
            query=f"""select portfolio_segment,count(distinct upc_num) as upc_num,sum(total_sales) as total_sales  
            from planner_mainretention
            where portfolio_segment != 'Null' """
            if data["channel_id"]:
                query += f""" and channel_id={data['channel_id']}"""
            if data["cta_id"]:
                query += f""" and cta_id={data['cta_id']}"""
            if data["consumption_id"]:
                query += f""" and consumption_id={data['consumption_id']}"""
            if data["category_id"]:
                query += f""" and category_id={data['category_id']}"""
            if data["brand_id"] != "Select ALL":
                query += f""" and brand_id={data['brand_id']}"""
            query += f""" group by portfolio_segment"""
            cursor.execute(query)
            res_data = dictfetchall(cursor)
            data_frame = pd.DataFrame(res_data) 
            data_frame['contribution'] = (data_frame['total_sales'] / 
                  data_frame['total_sales'].sum()) * 100
            response["portfolio_segmentation"] = data_frame.to_dict(orient='records')
        return JsonResponse(
            {
                "code": 200,
                "status": "success",
                "data": response,
            }
        )
    except Exception as error:
            return JsonResponse({"code": 400, "status": "Failed", "data": str(error)})
        
@api_view(["POST"])
def performance_pqa_summary(request):
    """
    Description   :: This API fetch portfolio_segmentation

    Method        :: POST.

    Returns       :: portfolio_segmentation

    """
    try:
        data = request.data.get("params")
        response = {}
        with connection.cursor() as cursor:
            query=f"""select pqa_segment,count(distinct upc_num) as upc_num,sum(total_sales) as total_sales  
            from planner_mainretention
            where pqa_segment != 'Null' """
            if data["channel_id"]:
                query += f""" and channel_id={data['channel_id']}"""
            if data["cta_id"]:
                query += f""" and cta_id={data['cta_id']}"""
            if data["consumption_id"]:
                query += f""" and consumption_id={data['consumption_id']}"""
            if data["category_id"]:
                query += f""" and category_id={data['category_id']}"""
            if data["brand_id"] != "Select ALL":
                query += f""" and brand_id={data['brand_id']}"""
            if data["portfolio_segment"] != "Select ALL":
                query += f""" and portfolio_segment={data['portfolio_segment']}"""
            query += f""" group by pqa_segment"""
            cursor.execute(query)
            res_data = dictfetchall(cursor)
            data_frame = pd.DataFrame(res_data) 
            data_frame['contribution'] = (data_frame['total_sales'] / 
                  data_frame['total_sales'].sum()) * 100
            response["pqa_segmentation"] = data_frame.to_dict(orient='records')
        return JsonResponse(
            {
                "code": 200,
                "status": "success",
                "data": response,
            }
        )
    except Exception as error:
            return JsonResponse({"code": 400, "status": "Failed", "data": str(error)})
        
        

@api_view(["POST", "GET"])
def commets(request):
    """
    Description   :: comment

    Method        :: GET,POST.

    Returns       :: comment

    """

    if request.method == "POST":
        try:
            json_data = request.data.get("params")
            if json_data['comment'] != {}:
                intercept = json_data['comment']
                intercept["created_by"] = request.user.id
                intercept["user_name"] = request.user.username
                serializer = CommentsSerializer(data=intercept)
                if serializer.is_valid(raise_exception=True):
                    try:
                        instance = serializer.create(serializer.validated_data)
                        data = CommentsSerializer(instance)
                        json_outuput_data = data.data
                        return JsonResponse(
                            {"code": 201, "status": "success", "data": json_outuput_data}
                        )
                    except Exception as error:
                        return JsonResponse({"code": 400, "status": "Failed", "data": []})
            if json_data['sub_comment'] != {}:
                intercept = json_data['sub_comment']
                intercept["created_by"] = request.user.id
                intercept["user_name"] = request.user.username
                serializer = SubCommentSerializer(data=intercept)
                if serializer.is_valid(raise_exception=True):
                    try:
                        instance = serializer.create(serializer.validated_data)
                        data = SubCommentSerializer(instance)
                        json_outuput_data = data.data
                        return JsonResponse(
                            {"code": 201, "status": "success", "data": json_outuput_data}
                        )
                    except Exception as error:
                        return JsonResponse({"code": 400, "status": "Failed", "data": []})
        except Exception as error:
            return JsonResponse({"code": 400, "status": "Failed", "data": str(error)})

    if request.method == "GET":
        try:
            json_outuput_data={}
            data = Comments.objects.all().filter(status=1).filter(global_access=1)
            comments = CommentsSerializer(data, many=True).data
            comments = pd.DataFrame(comments)
            parent_ids = comments['id'].astype(str).unique()
            json_outuput_data["comments"] =comments.to_dict(orient='records')
            sub_comment = SubComment.objects.all().filter(status=1).filter(global_access=1)
            sub_comment =  SubCommentSerializer(sub_comment, many=True).data
            sub_comment = pd.DataFrame(sub_comment)
            sub_comment=sub_comment.to_dict(orient='records')
            sub_comments={}
            for parent_id in parent_ids:
                sub_comments[parent_id]=[]
                for sub_com in sub_comment:
                    if parent_id in sub_comments.keys():
                        if parent_id == str(sub_com['parent_comment']):
                            sub_comments[parent_id].append(sub_com)
                   
                    
            json_outuput_data["sub_comment"]=sub_comments
            return JsonResponse({"code": 200, "status": "success", "data": json_outuput_data})
        except Exception as error:
            return JsonResponse({"code": 400, "status": "Failed", "data": str(error)})
        
@api_view(["POST"])
def edit_commets(request):
    """
    Description   :: comment

    Method        :: POST.

    Returns       :: comment

    """

    if request.method == "POST":
        try:
            json_data = request.data.get("params")
            if json_data['comment'] != {}:
                intercept = json_data['comment']
                intercept["created_by"] = request.user.id
                intercept["user_name"] = request.user.username
                try:
                    Comments.objects.filter(id=intercept["id"]).update(comment_body=intercept["comment_body"])
                    instance = Comments.objects.get(id=intercept["id"])
                    data = CommentsSerializer(instance)
                    json_outuput_data = data.data
                    return JsonResponse(
                        {"code": 200, "status": "success", "data": json_outuput_data}
                    )
                except Exception as error:
                    return JsonResponse({"code": 400, "status": "Failed", "data": [],"message":str(error)})
            if json_data['sub_comment'] != {}:
                intercept = json_data['sub_comment']
                intercept["created_by"] = request.user.id
                intercept["user_name"] = request.user.username
                try:
                    SubComment.objects.filter(id=intercept["id"]).update(sub_comment_body=intercept["sub_comment_body"])
                    instance = SubComment.objects.get(id=intercept["id"])
                    data = SubCommentSerializer(instance)
                    json_outuput_data = data.data
                    return JsonResponse(
                        {"code": 200, "status": "success", "data": json_outuput_data}
                    )
                except Exception as error:
                    return JsonResponse({"code": 400, "status": "Failed", "data": [],"message":str(error)})
        except Exception as error:
            return JsonResponse({"code": 400, "status": "Failed", "data": str(error)})

@api_view(["POST"])
def delete_comments(request):
    """
    Description   :: comment

    Method        :: POST.

    Returns       :: comment

    """

    if request.method == "POST":
        try:
            json_data = request.data.get("params")
            if json_data['comment'] != {}:
                intercept = json_data['comment']
                intercept["created_by"] = request.user.id
                intercept["user_name"] = request.user.username
                try:
                    Comments.objects.filter(id=intercept["id"]).update(status=0)
                    instance = Comments.objects.get(id=intercept["id"])
                    data = CommentsSerializer(instance)
                    json_outuput_data = data.data
                    return JsonResponse(
                        {"code": 200, "status": "success", "data": json_outuput_data}
                    )
                except Exception as error:
                    return JsonResponse({"code": 400, "status": "Failed", "data": [],"message":str(error)})
            if json_data['sub_comment'] != {}:
                intercept = json_data['sub_comment']
                intercept["created_by"] = request.user.id
                intercept["user_name"] = request.user.username
                try:
                    SubComment.objects.filter(id=intercept["id"]).update(status=0)
                    instance = SubComment.objects.get(id=intercept["id"])
                    data = SubCommentSerializer(instance)
                    json_outuput_data = data.data
                    return JsonResponse(
                        {"code": 200, "status": "success", "data": json_outuput_data}
                    )
                except Exception as error:
                    return JsonResponse({"code": 400, "status": "Failed", "data": [],"message":str(error)})
        except Exception as error:
            return JsonResponse({"code": 400, "status": "Failed", "data": str(error)})
        
        
        
@api_view(["POST"])
def attribute_summary(request):
    """
    Description   :: This API fetch portfolio_segmentation

    Method        :: POST.

    Returns       :: portfolio_segmentation

    """
    try:
        data = request.data.get("params")
        response = {}
        with connection.cursor() as cursor:
            filter_query=f""" """
            if data["channel_id"]:
                filter_query += f""" and channel_id={data['channel_id']}"""
            if data["cta_id"]:
                filter_query += f""" and cta_id={data['cta_id']}"""
            if data["consumption_id"]:
                filter_query += f""" and consumption_id={data['consumption_id']}"""
            if data["category_id"]:
                filter_query += f""" and category_id={data['category_id']}"""
            
            query = f"""select attribute_desc,upcs,retention_rate,mars_sales_contri  
                    from planner_attributeshare where attribute_id=1 """ + filter_query
            cursor.execute(query)
            response['brand']=dictfetchall(cursor)
            query = f"""select attribute_desc,upcs,retention_rate,mars_sales_contri ,non_mars_sales_contri 
                     from  planner_attributeshare where attribute_id=2 """ + filter_query
            cursor.execute(query)
            response['flavour']=dictfetchall(cursor)
            query = f"""select attribute_desc,upcs,retention_rate,mars_sales_contri ,non_mars_sales_contri 
                    from planner_attributeshare where attribute_id=3 """ + filter_query
            cursor.execute(query)
            response['pack_size']=dictfetchall(cursor)
            query = f"""select attribute_desc,upcs,retention_rate,mars_sales_contri ,non_mars_sales_contri 
                    from planner_attributeshare where attribute_id=4 """ + filter_query
            cursor.execute(query)
            response['pack_type']=dictfetchall(cursor)
            query = f"""select attribute_desc,upcs,retention_rate,mars_sales_contri ,non_mars_sales_contri 
                    from planner_attributeshare where attribute_id=5 """ + filter_query
            cursor.execute(query)
            response['product_form']=dictfetchall(cursor)
            
        return JsonResponse(
            {
                "code": 200,
                "status": "success",
                "data": response,
            }
        )
    except Exception as error:
            return JsonResponse({"code": 400, "status": "Failed", "data": str(error)})
        