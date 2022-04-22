from django.db import models
from django.utils.translation import pgettext_lazy
from django.utils.timezone import now
import base64
import codecs
import os,sys

from numpy import product

from multiselectfield import MultiSelectField
from django import forms
import datetime



# class PlannerDetail(models.Model):
#     __name__='planner_detail'
#     name              = models.CharField(max_length=255,null=True)
#     zrep              = models.CharField(max_length=255,null=True)
#     season            = models.CharField(max_length=255,null=True)
#     channel           = models.CharField(max_length=255,null=True)
#     rsu_description   = models.CharField(max_length=255,null=True)
#     brand_change      = models.CharField(max_length=255,null=True)
#     piece_change      = models.CharField(max_length=255,null=True)
#     incremental_mac   = models.CharField(max_length=255,null=True)
#     planner_data      = models.TextField()
#     status            = models.BooleanField(default=True)
#     global_access     = models.BooleanField(default=False)
#     created_by        = models.IntegerField(null=True)
#     created_at        = models.DateTimeField(auto_now_add=True )
#     updated_at        = models.DateTimeField(auto_now=True)
#     def __str__(self):
#         return self.name


class PackType(models.Model):
    __name__='packtype'
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=200,default='')
    status=models.BooleanField(default=True)
    sequence=models.IntegerField(default=0)
    def __str__(self):
        return self.name

class PackSize(models.Model):
    __name__='packsize'
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=200,default='')
    status=models.BooleanField(default=True)
    sequence=models.IntegerField(default=0)
    def __str__(self):
        return self.name


class Cta(models.Model):
    __name__='cta'
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=200,default='')
    status=models.BooleanField(default=True)
    sequence=models.IntegerField(default=0)
    def __str__(self):
        return self.name
class Category(models.Model):
    __name__='category'
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=200,default='')
    status=models.BooleanField(default=True)
    sequence=models.IntegerField(default=0)
    def __str__(self):
        return self.name
    
class Channel(models.Model):
    __name__='channel'
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=200,default='')
    status=models.BooleanField(default=True)
    sequence=models.IntegerField(default=0)
    def __str__(self):
        return self.name
class Brand(models.Model):
    __name__='brand'
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=200,default='')
    status=models.BooleanField(default=True)
    sequence=models.IntegerField(default=0)
    def __str__(self):
        return self.name
class SubBrand(models.Model):
    __name__='subbrand'
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=200,default='')
    status=models.BooleanField(default=True)
    sequence=models.IntegerField(default=0)
    def __str__(self):
        return self.name
class Flavour(models.Model):
    __name__='flavour'
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=200,default='')
    status=models.BooleanField(default=True)
    sequence=models.IntegerField(default=0)
    def __str__(self):
        return self.name 

class Consumption(models.Model):
    __name__='consumption'
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=200,default='')
    status=models.BooleanField(default=True)
    sequence=models.IntegerField(default=0)
    def __str__(self):
        return self.name 

class Attribute(models.Model):
    __name__='attribute'
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=200,default='')
    status=models.BooleanField(default=True)
    sequence=models.IntegerField(default=0)
    def __str__(self):
        return self.name
    
class ProductForm(models.Model):
    __name__='productform'
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=200,default='')
    status=models.BooleanField(default=True)
    sequence=models.IntegerField(default=0)
    def __str__(self):
        return self.name
    
class Year(models.Model):
    __name__='year'
    name = models.CharField(max_length=200)
    status=models.BooleanField(default=True)
    sequence=models.IntegerField(default=0)
    def __str__(self):
        return self.name


class MainRetention(models.Model):
    __name__='main_retention'
    upc_num = models.CharField(max_length=200,default='')
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE,related_name="brand_id",null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE,related_name="category_id",null=True)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE,related_name="channel_id",null=True)
    pack_type = models.ForeignKey(PackType, on_delete=models.CASCADE,related_name="packtype_id",null=True)
    year = models.ForeignKey(Year, on_delete=models.CASCADE,related_name="year_id",null=True)
    cta = models.ForeignKey(Cta, on_delete=models.CASCADE,related_name="cta_id",null=True)
    product_form = models.ForeignKey(ProductForm, on_delete=models.CASCADE,related_name="product_form_id",null=True)
    consumption = models.ForeignKey(Consumption, on_delete=models.CASCADE,related_name="consumption_id",null=True)
    pack_size = models.ForeignKey(PackSize, on_delete=models.CASCADE,related_name="packsize_id",null=True)
    sub_brand = models.ForeignKey(SubBrand, on_delete=models.CASCADE,related_name="subbrand_id",null=True)
    flavour = models.ForeignKey(Flavour, on_delete=models.CASCADE,related_name="flavour_id",null=True)
    description = models.CharField(max_length=200,null=True)
    pqa_segment = models.CharField(max_length=200,null=True)
    portfolio_segment = models.CharField(max_length=200,null=True)
    total_units=models.FloatField(default=0)
    unit_share = models.FloatField(default=0)
    total_sales = models.FloatField(default=0)
    retention = models.FloatField(default=0)
    upc_retention_units = models.FloatField(default=0)
    average_acv = models.FloatField(default=0)
    total_acv = models.FloatField(default=0)
    velocity = models.FloatField(default=0)
    acv = models.FloatField(default=0)
    price_bucket = models.CharField(max_length=200,null=True)  #need to check with team
    average_share = models.FloatField(default=0)
    max_share = models.FloatField(default=0)
    def __str__(self):
        return self.upc_num


class UpcTransferenceSummary(models.Model):
    __name__='upc_transference_summary'
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE,related_name="upc_brand_id",null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE,related_name="upc_category_id",null=True)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE,related_name="upc_channel_id",null=True)
    cta = models.ForeignKey(Cta, on_delete=models.CASCADE,related_name="upc_cta_id",null=True)
    consumption = models.ForeignKey(Consumption, on_delete=models.CASCADE,related_name="upc_consumption_id",null=True)
    delisted_upc = models.CharField(max_length=200,default='')
    upc_description = models.CharField(max_length=200,null=True)
    to_upc = models.CharField(max_length=200,default='')
    to_upc_description = models.CharField(max_length=200,null=True)
    retention_percent = models.FloatField(default=0)
    retention_units = models.FloatField(default=0)
    retention_share= models.FloatField(default=0)
    
    def __str__(self):
        return self.delisted_upc
    
class AttributeShare(models.Model):
    __name__='attribute_share'
    category = models.ForeignKey(Category, on_delete=models.CASCADE,related_name="attribute_category_id",null=True)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE,related_name="attribute_channel_id",null=True)
    cta = models.ForeignKey(Cta, on_delete=models.CASCADE,related_name="attribute_cta_id",null=True)
    attribute = models.ForeignKey(Attribute, on_delete=models.CASCADE,related_name="attribute_id",null=True)
    consumption = models.ForeignKey(Consumption, on_delete=models.CASCADE,related_name="attribute_consumption_id",null=True)
    attribute_desc = models.CharField(max_length=200,null=True)
    upcs =models.IntegerField(default=0)
    retention_rate = models.FloatField(default=0)
    mars_sales_contri = models.FloatField(default=0)
    non_mars_sales_contri= models.FloatField(default=0)
    
    def __str__(self):
        return self.attribute
        
class MainFilter(models.Model):
    __name__='main_filter'
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE,related_name="mainfilter_brand_id",null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE,related_name="mainfilter_category_id",null=True)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE,related_name="mainfilter_channel_id",null=True)
    cta = models.ForeignKey(Cta, on_delete=models.CASCADE,related_name="mainfilter_cta_id",null=True)
    consumption = models.ForeignKey(Consumption, on_delete=models.CASCADE,related_name="mainfilter_consumption_id",null=True)
    
    def __str__(self):
        return self.channel
	
class AttributeFilter(models.Model):
    __name__='attribute_filter'
    category = models.ForeignKey(Category, on_delete=models.CASCADE,related_name="attributefilter_category_id",null=True)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE,related_name="attributefilter_channel_id",null=True)
    cta = models.ForeignKey(Cta, on_delete=models.CASCADE,related_name="attributefilter_cta_id",null=True)
    consumption = models.ForeignKey(Consumption, on_delete=models.CASCADE,related_name="attributefilter_consumption_id",null=True)
    attribute = models.ForeignKey(Attribute, on_delete=models.CASCADE,related_name="attributefilter_attribute_id",null=True)
    
    def __str__(self):
        return self.attribute
    


class Comments(models.Model):
    __name__="comments"
    comment_body      = models.TextField()
    status            = models.BooleanField(default=True)
    global_access     = models.BooleanField(default=True)
    created_by        = models.IntegerField(null=True)
    user_name         = models.CharField(max_length=200,null=True)
    created_at        = models.DateTimeField(auto_now_add=True )
    updated_at        = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.commnet_body
    
class SubComment(models.Model):
    parent_comment    = models.ForeignKey(Comments, on_delete=models.CASCADE,related_name="parent_comment_id",null=True)
    sub_comment_body  = models.TextField()
    status            = models.BooleanField(default=True)
    global_access     = models.BooleanField(default=True)
    created_by        = models.IntegerField(null=True)
    user_name         = models.CharField(max_length=200,null=True)
    created_at        = models.DateTimeField(auto_now_add=True )
    updated_at        = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.sub_commnet_body