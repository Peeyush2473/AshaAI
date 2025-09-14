# from flask import Blueprint, request, jsonify
# from app import db, bcrypt
# from app.models.user_model import UserModel
# from app.services.auth_service import hash_password
# from flask_jwt_extended import create_access_token

# auth_bp = Blueprint('auth_bp', __name__)

# @auth_bp.route('/register', methods=['POST'])
# def register():
#     data = request.get_json()
#     if not all(key in data for key in ['name', 'phone_number', 'password']):
#         return jsonify({'message': 'Missing required fields'}), 400

#     if UserModel.query.filter_by(phone_number=data['phone_number']).first():
#         return jsonify({'message': 'Phone number already registered'}), 409

#     hashed_password = hash_password(data['password'])
    
#     new_user = UserModel(
#         name=data['name'],
#         phone_number=data['phone_number'],
#         password_hash=hashed_password,
#         ward_id=data.get('ward_id')
#     )

#     db.session.add(new_user)
#     db.session.commit()

#     access_token = create_access_token(identity=new_user.worker_id)
    
#     return jsonify({
#         'message': 'User registered successfully',
#         'token': access_token,
#         'user': new_user.to_dict()
#     }), 201

# @auth_bp.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     if not all(key in data for key in ['phone_number', 'password']):
#         return jsonify({'message': 'Missing phone number or password'}), 400

#     user = UserModel.query.filter_by(phone_number=data['phone_number']).first()

#     if user and bcrypt.check_password_hash(user.password_hash, data['password']):
#         access_token = create_access_token(identity=user.worker_id)
#         return jsonify({
#             'message': 'Login successful',
#             'token': access_token,
#             'user': user.to_dict()
#         }), 200
    
#     return jsonify({'message': 'Invalid phone number or password'}), 401


























# app/routes/auth_routes.py (Enhanced)
from flask import Blueprint, request, jsonify
from app import db, bcrypt
from app.models.user_model import UserModel
from app.models.location_models import WardModel
from app.services.auth_service import hash_password
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
import logging
import re

logger = logging.getLogger(__name__)
auth_bp = Blueprint('auth_bp', __name__)

def validate_phone_number(phone):
    """Validate phone number format"""
    pattern = r'^[+]?[1-9]\d{9,14}
    return re.match(pattern, phone) is not None

def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}
    return re.match(pattern, email) is not None

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    required_fields = ['name', 'phone_number', 'password', 'ward_id']
    missing_fields = [field for field in required_fields if not data.get(field)]
    if missing_fields:
        return jsonify({'message': f'Missing required fields: {", ".join(missing_fields)}'}), 400

    # Validate phone number
    if not validate_phone_number(data['phone_number']):
        return jsonify({'message': 'Invalid phone number format'}), 400

    # Validate email if provided
    if data.get('email') and not validate_email(data['email']):
        return jsonify({'message': 'Invalid email format'}), 400

    # Check if phone number already exists
    if UserModel.query.filter_by(phone_number=data['phone_number']).first():
        return jsonify({'message': 'Phone number already registered'}), 409

    # Check if email already exists
    if data.get('email') and UserModel.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already registered'}), 409

    # Validate ward exists
    ward = WardModel.query.get(data['ward_id'])
    if not ward:
        return jsonify({'message': 'Invalid ward ID'}), 400

    # Validate password strength
    password = data['password']
    if len(password) < 6:
        return jsonify({'message': 'Password must be at least 6 characters long'}), 400

    try:
        hashed_password = hash_password(password)
        
        new_user = UserModel(
            name=data['name'].strip(),
            phone_number=data['phone_number'],
            email=data.get('email', '').strip() if data.get('email') else None,
            password_hash=hashed_password,
            ward_id=data['ward_id'],
            worker_type=data.get('worker_type', 'ASHA'),
            qualification=data.get('qualification', '').strip() if data.get('qualification') else None,
            experience_years=data.get('experience_years', 0) if data.get('experience_years') else None
        )

        db.session.add(new_user)
        db.session.commit()

        access_token = create_access_token(identity=new_user.worker_id)
        
        logger.info(f"New user registered: {new_user.worker_id} - {new_user.name}")
        
        return jsonify({
            'message': 'User registered successfully',
            'token': access_token,
            'user': new_user.to_dict(include_location=True)
        }), 201

    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        db.session.rollback()
        return jsonify({'message': 'Registration failed'}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not all(key in data for key in ['phone_number', 'password']):
        return jsonify({'message': 'Phone number and password are required'}), 400

    try:
        user = UserModel.query.filter_by(phone_number=data['phone_number']).first()

        if not user:
            return jsonify({'message': 'Invalid phone number or password'}), 401

        if not user.is_active:
            return jsonify({'message': 'Account is deactivated'}), 401

        if user and bcrypt.check_password_hash(user.password_hash, data['password']):
            # Update last login
            user.last_login = datetime.utcnow()
            db.session.commit()
            
            access_token = create_access_token(identity=user.worker_id)
            
            logger.info(f"User logged in: {user.worker_id} - {user.name}")
            
            return jsonify({
                'message': 'Login successful',
                'token': access_token,
                'user': user.to_dict(include_location=True)
            }), 200
        
        return jsonify({'message': 'Invalid phone number or password'}), 401

    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        return jsonify({'message': 'Login failed'}), 500

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """Get current user's profile"""
    try:
        current_user_id = get_jwt_identity()
        user = UserModel.query.get(current_user_id)
        
        if not user:
            return jsonify({'message': 'User not found'}), 404
            
        return jsonify({'user': user.to_dict(include_location=True)}), 200
    except Exception as e:
        logger.error(f"Profile fetch error: {str(e)}")
        return jsonify({'message': 'Failed to fetch profile'}), 500

@auth_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    """Update user profile"""
    try:
        current_user_id = get_jwt_identity()
        user = UserModel.query.get(current_user_id)
        
        if not user:
            return jsonify({'message': 'User not found'}), 404
            
        data = request.get_json()
        
        # Update allowed fields
        if 'name' in data:
            user.name = data['name'].strip()
        if 'email' in data:
            if data['email'] and not validate_email(data['email']):
                return jsonify({'message': 'Invalid email format'}), 400
            user.email = data['email'].strip() if data['email'] else None
        if 'qualification' in data:
            user.qualification = data['qualification'].strip() if data['qualification'] else None
        if 'experience_years' in data:
            user.experience_years = data['experience_years'] if data['experience_years'] else None
            
        user.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Profile updated successfully',
            'user': user.to_dict(include_location=True)
        }), 200
        
    except Exception as e:
        logger.error(f"Profile update error: {str(e)}")
        db.session.rollback()
        return jsonify({'message': 'Failed to update profile'}), 500
