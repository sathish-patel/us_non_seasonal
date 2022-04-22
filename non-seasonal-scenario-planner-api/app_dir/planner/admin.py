from django.contrib import admin
# from app_dir.planner.models import Cta, Season,Rsu_list
# from .models import DonorList, ExcelTemplates,DatabricksConfigurations,Category,Brand,Description, PackType, SubBrand,Year
# from .models import Retailer,ViewList

admin.site.site_header='MW Scenario Planner(Admin Panel)'


# class ProductAdmin(admin.ModelAdmin):
#     list_display=('name','retailer','pack_type','unit_price')
#     list_per_page=10
#     search_fields = ['name']
#     list_filter =['retailer']

# class PeroidAdmin(admin.ModelAdmin):
#     list_display=('name','retailer')
#     list_per_page=10
#     search_fields = ['name']
#     list_filter =['retailer']
# class DonorListAdmin(admin.ModelAdmin):
#     fields = (
#         'name',
#         ('weight_per_piece','description_id'),
#         ('cost_per_piece','pack_size'),
#         ('brand','sub_brand','pack_type'),
#         ('status', 'sequence'),
#     )
# class DatabricksAdmin(admin.ModelAdmin):
#     list_display=('job_id','planner_type')
#     list_per_page=10

# class RSUAdmin(admin.ModelAdmin):
#     list_display=('zrep','description','season','brand')
#     fields = (
#         ('zrep',),
#         'description',
#         ('season', 'cta', 'brand',),
#         ('category','packtype','year'),
#         ('units_sold', 'sales', ),
#         ('aup', 'lsp', ),
#         ('tr', 'cost',),
#         'sequence',
#         'donor'          
#     )
#     filter_horizontal=('donor',)
    #inlines = [DonerInline]
# class ActivationConfig(admin.ModelAdmin):
#     list_display=('name','activation_type')
#     list_per_page=10
#     list_filter =['activation_type']

# class SystemAdmin(admin.ModelAdmin):
#     filter_horizontal = ('activationlist','pack_type') 
# admin.site.register(Product,ProductAdmin)
# admin.site.register(Product_Pack_Type)
# admin.site.register(ExcelTemplates)
# admin.site.register(PeroidList,PeroidAdmin)
# admin.site.register(ViewList)
# admin.site.register(ActivationList,ActivationConfig)

# admin.site.register(Category)
# admin.site.register(Brand)
# admin.site.register(Description)
# admin.site.register(Season)
# admin.site.register(Cta)
# admin.site.register(Year)
# admin.site.register(PackType)
# admin.site.register(SubBrand)
# admin.site.register(Rsu_list,RSUAdmin)
# admin.site.register(DonorList,DonorListAdmin)
# admin.site.register(DatabricksConfigurations,DatabricksAdmin)
# # admin.site.register(Product_Pack_Sub_Type)
# admin.site.register(Retailer,SystemAdmin)