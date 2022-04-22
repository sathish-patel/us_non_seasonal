"""
Django settings for configurations project.

Generated by 'django-admin startproject' using Django 2.1.2.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.1/ref/settings/
"""

import os
import datetime
# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

#for local to access .env variables
# from dotenv import load_dotenv
# load_dotenv(os.path.join(BASE_DIR, '.env'))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'v%^q7%_uf+k9@_6zh=z1-0&4%9vagw&yn$m_lad=&yb3(m7o)xz'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
# App_Link = os.getenv('App_Link')
App_Link = ""

ALLOWED_HOSTS = ['*',App_Link, 'localhost', '127.0.0.1']

# Application definition

DEFAULT_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
)

EXTERNAL_APPS = (
    'rest_framework',
    'corsheaders',
    'multiselectfield',
    'rest_framework_swagger',
)

LOCAL_APPS = (
    'app_dir.planner',
)

INSTALLED_APPS = DEFAULT_APPS + EXTERNAL_APPS + LOCAL_APPS

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    #'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'configurations.urls'
CORS_ORIGIN_ALLOW_ALL = True
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates/'),],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'configurations.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     }
# }

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': 'mars_wrigley',
#         'USER':'postgres',
#         'PASSWORD': '123Welcome',
#         'HOST': 'localhost',
#         'PORT':5432,
#     }
# }

# server = os.getenv('DBSERVER') 
# database = os.getenv('DATABASE') 
# username = os.getenv('DBUSER') 
# password = os.getenv('DBPASS')
# engine = os.getenv('ENGINE')
server = 'TIGER01398\MARSSQLSERVER' 
database = 'non_seasonal_scenario_planner' 
username = 'sa'
password = 'Root@123'
engine = 'mssql'


DATABASES = {
        'default': {
            'ENGINE': engine,
            'NAME': database,
            'USER': username,
            'PASSWORD': password,
            'HOST': server,
            'PORT': '',

            'OPTIONS': {
                'driver': 'ODBC Driver 17 for SQL Server',
            },
        },
    }



# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/

STATIC_URL = '/static/'
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
MEDIA_URL='/Templates/'
MEDIA_ROOT=os.path.join(BASE_DIR,"Templates/")
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
}
JWT_AUTH = {
    'JWT_GET_USER_SECRET_KEY': None,
    'JWT_PUBLIC_KEY': None,
    'JWT_PRIVATE_KEY': None,
    'JWT_ALGORITHM': 'HS256',
    'JWT_VERIFY': True,
    'JWT_VERIFY_EXPIRATION': True,
    'JWT_LEEWAY': 0,
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=10),
    'JWT_AUDIENCE': None,
    'JWT_ISSUER': None,

    'JWT_ALLOW_REFRESH': False,
    'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=7),

    'JWT_AUTH_HEADER_PREFIX': 'JWT',
    'JWT_AUTH_COOKIE': None,

}

APP_BASE_URL=""
# DB_SCHEMA_PREFIX = os.getenv('DB_SCHEMA')
# Azure_Storage_Account = os.getenv('Azure_Storage_Account')
# Azure_Tenant_Id = os.getenv('Azure_Tenant_Id')
# Azure_Client_ID = os.getenv('Azure_Client_ID')
# Azure_Client_Secret = os.getenv('Azure_Client_Secret')
# Azure_Account_Url= os.getenv('Azure_Account_Url')



# WKHTMLTOPDF_CMD =  "C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe" #for local
# WKHTMLTOPDF_CMD =  "/usr/local/bin/wkhtmltopdf" #for azure
# WKHTMLTOPDF_CMD = os.getenv('WKHTMLTOPDF_CMD')

WKHTMLTOPDF_CMD_OPTIONS = {
    'quiet': True,
    "enable-local-file-access": None,
}