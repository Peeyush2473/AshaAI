from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.screening_model import ScreeningModel
from datetime import datetime

screening_bp = Blueprint('screening_bp', __name__)

@screening_bp.route('/sync', methods=['POST'])
@jwt_required()
def sync_screenings():
    current_worker_id = get_jwt_identity()
    data = request.get_json()

    if not data or 'screenings' not in data or not isinstance(data['screenings'], list):
        return jsonify({'message': 'Invalid or missing screenings data'}), 400

    new_screenings_count = 0
    try:
        for screening_data in data['screenings']:
            new_screening = ScreeningModel(
                worker_id=current_worker_id,
                ward_id=screening_data.get('ward_id'),
                screening_type=screening_data.get('screening_type'),
                risk_level=screening_data.get('risk_level'),
                timestamp=datetime.fromisoformat(screening_data.get('timestamp').replace('Z', '+00:00')) if screening_data.get('timestamp') else datetime.utcnow(),
                location_lat=screening_data.get('location', {}).get('lat'),
                location_lon=screening_data.get('location', {}).get('lon')
            )
            db.session.add(new_screening)
            new_screenings_count += 1
        
        db.session.commit()
        
        return jsonify({'message': f'Successfully synced {new_screenings_count} screening records.'}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'An error occurred during sync.', 'error': str(e)}), 500
