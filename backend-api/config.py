# import os
# from dotenv import load_dotenv

# basedir = os.path.abspath(os.path.dirname(__file__))
# load_dotenv(os.path.join(basedir, '.env'))

# class Config:
#     SECRET_KEY = os.getenv('SECRET_KEY', 'a-very-secret-key-for-dev')
#     JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'another-super-secret-jwt-key')
    
#     SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///' + os.path.join(basedir, 'app.db'))
#     SQLALCHEMY_TRACK_MODIFICATIONS = False



import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'a-very-secret-key-for-dev')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'another-super-secret-jwt-key')
    
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///' + os.path.join(basedir, 'app.db'))
    SQLALCHEMY_TRACK_MODIFICATIONS = False







