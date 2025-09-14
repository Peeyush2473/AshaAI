# app/routes/location_routes.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.services.location_service import LocationService, GeoCodingService
from app.models.location_models import CountryModel, StateModel, CityModel, DistrictModel, WardModel
import logging

logger = logging.getLogger(__name__)
location_bp = Blueprint('location_bp', __name__)

@location_bp.route('/hierarchy', methods=['GET'])
@jwt_required()
def get_location_hierarchy():
    """Get complete location hierarchy"""
    try:
        hierarchy = LocationService.get_location_hierarchy()
        return jsonify(hierarchy), 200
    except Exception as e:
        logger.error(f"Error fetching location hierarchy: {str(e)}")
        return jsonify({'message': 'Failed to fetch location hierarchy'}), 500

@location_bp.route('/search', methods=['GET'])
@jwt_required()
def search_locations():
    """Search for locations"""
    query = request.args.get('q', '').strip()
    location_type = request.args.get('type', None)
    
    if not query:
        return jsonify({'message': 'Search query is required'}), 400
    
    try:
        results = LocationService.search_locations(query, location_type)
        return jsonify({'results': results}), 200
    except Exception as e:
        logger.error(f"Error searching locations: {str(e)}")
        return jsonify({'message': 'Search failed'}), 500

@location_bp.route('/nearby', methods=['GET'])
@jwt_required()
def get_nearby_wards():
    """Get wards near specified coordinates"""
    try:
        lat = float(request.args.get('lat'))
        lon = float(request.args.get('lon'))
        radius = float(request.args.get('radius', 10))
    except (TypeError, ValueError):
        return jsonify({'message': 'Invalid coordinates provided'}), 400
    
    try:
        nearby_wards = LocationService.get_nearby_wards(lat, lon, radius)
        return jsonify({'wards': nearby_wards}), 200
    except Exception as e:
        logger.error(f"Error finding nearby wards: {str(e)}")
        return jsonify({'message': 'Failed to find nearby wards'}), 500

@location_bp.route('/geocode', methods=['POST'])
@jwt_required()
def geocode_address():
    """Convert address to coordinates"""
    data = request.get_json()
    address = data.get('address', '').strip()
    
    if not address:
        return jsonify({'message': 'Address is required'}), 400
    
    try:
        result = GeoCodingService.geocode_address(address)
        if result:
            return jsonify(result), 200
        else:
            return jsonify({'message': 'Address not found'}), 404
    except Exception as e:
        logger.error(f"Geocoding error: {str(e)}")
        return jsonify({'message': 'Geocoding failed'}), 500

@location_bp.route('/reverse-geocode', methods=['POST'])
@jwt_required()
def reverse_geocode():
    """Convert coordinates to address"""
    data = request.get_json()
    
    try:
        lat = float(data.get('lat'))
        lon = float(data.get('lon'))
    except (TypeError, ValueError):
        return jsonify({'message': 'Invalid coordinates'}), 400
    
    try:
        result = GeoCodingService.reverse_geocode(lat, lon)
        if result:
            return jsonify(result), 200
        else:
            return jsonify({'message': 'Location not found'}), 404
    except Exception as e:
        logger.error(f"Reverse geocoding error: {str(e)}")
        return jsonify({'message': 'Reverse geocoding failed'}), 500

@location_bp.route('/create-hierarchy', methods=['POST'])
@jwt_required()
def create_location_hierarchy():
    """Create complete location hierarchy"""
    data = request.get_json()
    
    required_fields = ['country', 'state', 'city', 'district', 'ward']
    if not all(field in data for field in required_fields):
        return jsonify({'message': 'All location fields are required'}), 400
    
    try:
        coordinates = None
        if data.get('latitude') and data.get('longitude'):
            coordinates = (float(data['latitude']), float(data['longitude']))
        
        ward = LocationService.create_location_hierarchy(
            country_name=data['country'],
            state_name=data['state'],
            city_name=data['city'],
            district_name=data['district'],
            ward_name=data['ward'],
            coordinates=coordinates
        )
        
        return jsonify({
            'message': 'Location hierarchy created successfully',
            'ward': ward.to_dict(include_hierarchy=True)
        }), 201
        
    except Exception as e:
        logger.error(f"Error creating location hierarchy: {str(e)}")
        return jsonify({'message': 'Failed to create location hierarchy'}), 500



