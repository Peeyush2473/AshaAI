# from flask import Blueprint, jsonify, request
# from flask_jwt_extended import jwt_required
# from app import db
# from app.models.screening_model import ScreeningModel
# from app.models.user_model import UserModel
# from app.models.ward_model import WardModel
# from sqlalchemy import func, case
# from datetime import datetime, timedelta

# dashboard_bp = Blueprint('dashboard_bp', __name__)

# @dashboard_bp.route('/stats', methods=['GET'])
# @jwt_required()
# def get_stats():
#     today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    
#     total_screenings_today = db.session.query(func.count(ScreeningModel.screening_id)).filter(ScreeningModel.timestamp >= today_start).scalar()
#     high_risk_cases_today = db.session.query(func.count(ScreeningModel.screening_id)).filter(ScreeningModel.timestamp >= today_start, ScreeningModel.risk_level == 'High').scalar()
    
#     active_wards_query = db.session.query(
#         ScreeningModel.ward_id,
#         func.count(ScreeningModel.screening_id).label('screening_count')
#     ).filter(ScreeningModel.timestamp >= today_start).group_by(ScreeningModel.ward_id).order_by(func.count(ScreeningModel.screening_id).desc()).first()

#     most_active_ward = "N/A"
#     if active_wards_query:
#         ward = WardModel.query.get(active_wards_query.ward_id)
#         if ward:
#             most_active_ward = ward.ward_name

#     stats = {
#         'totalScreenings': {'value': total_screenings_today, 'trend': '+5%'},
#         'highRiskCases': {'value': high_risk_cases_today, 'trend': '-2%'},
#         'activeWards': {'value': most_active_ward}
#     }
#     return jsonify(stats), 200

# @dashboard_bp.route('/heatmap', methods=['GET'])
# @jwt_required()
# def get_heatmap_data():
#     date_filter = request.args.get('dateRange', '7d')
#     days = 7 if date_filter == '7d' else 30
#     start_date = datetime.utcnow() - timedelta(days=days)

#     risk_scores = case(
#         (ScreeningModel.risk_level == 'High', 3),
#         (ScreeningModel.risk_level == 'Medium', 2),
#         (ScreeningModel.risk_level == 'Low', 1),
#         else_=0
#     )

#     ward_data = db.session.query(
#         ScreeningModel.ward_id,
#         func.avg(risk_scores).label('avg_risk_score')
#     ).filter(ScreeningModel.timestamp >= start_date).group_by(ScreeningModel.ward_id).all()

#     heatmap = []
#     for ward in ward_data:
#         avg_risk = float(ward.avg_risk_score) if ward.avg_risk_score is not None else 0
#         risk_level = "Low"
#         if avg_risk > 2.5:
#             risk_level = "High"
#         elif avg_risk > 1.5:
#             risk_level = "Medium"
        
#         ward_info = WardModel.query.get(ward.ward_id)
#         heatmap.append({
#             'wardId': ward.ward_id,
#             'wardName': ward_info.ward_name if ward_info else 'Unknown',
#             'riskLevel': risk_level,
#             'value': avg_risk
#         })

#     return jsonify(heatmap), 200

# @dashboard_bp.route('/trends', methods=['GET'])
# @jwt_required()
# def get_trends():
#     screening_type = request.args.get('type', 'Anemia')
    
#     trends = db.session.query(
#         func.date(ScreeningModel.timestamp).label('date'),
#         func.count(case((ScreeningModel.risk_level == 'High', 1))).label('high'),
#         func.count(case((ScreeningModel.risk_level == 'Medium', 1))).label('medium'),
#         func.count(case((ScreeningModel.risk_level == 'Low', 1))).label('low')
#     ).filter(ScreeningModel.screening_type == screening_type).group_by(func.date(ScreeningModel.timestamp)).order_by(func.date(ScreeningModel.timestamp)).limit(30).all()

#     trend_data = {
#         'labels': [t.date.strftime('%b %d') for t in trends],
#         'datasets': [
#             {'label': 'High Risk', 'data': [t.high for t in trends]},
#             {'label': 'Medium Risk', 'data': [t.medium for t in trends]},
#             {'label': 'Low Risk', 'data': [t.low for t in trends]},
#         ]
#     }
#     return jsonify(trend_data), 200

# @dashboard_bp.route('/workers', methods=['GET'])
# @jwt_required()
# def get_workers():
#     workers = UserModel.query.all()
#     worker_list = [worker.to_dict() for worker in workers]
#     return jsonify(worker_list), 200













# app/routes/dashboard_routes.py (Enhanced)
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from app import db
from app.models.screening_model import ScreeningModel
from app.models.user_model import UserModel
from app.models.location_models import WardModel, DistrictModel, CityModel
from sqlalchemy import func, case, text
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)
dashboard_bp = Blueprint('dashboard_bp', __name__)

@dashboard_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_stats():
    """Get dashboard statistics with location filtering"""
    try:
        # Get query parameters for filtering
        ward_id = request.args.get('ward_id', type=int)
        city_id = request.args.get('city_id', type=int)
        date_range = request.args.get('date_range', '1d')  # 1d, 7d, 30d
        
        # Calculate date filter
        days_map = {'1d': 1, '7d': 7, '30d': 30}
        days = days_map.get(date_range, 1)
        start_date = datetime.utcnow() - timedelta(days=days)
        
        # Base query
        base_query = db.session.query(ScreeningModel).filter(
            ScreeningModel.timestamp >= start_date
        )
        
        # Apply location filters
        if ward_id:
            base_query = base_query.filter(ScreeningModel.ward_id == ward_id)
        elif city_id:
            # Filter by city through ward hierarchy
            ward_ids = db.session.query(WardModel.ward_id).join(
                DistrictModel
            ).filter(DistrictModel.city_id == city_id).subquery()
            base_query = base_query.filter(ScreeningModel.ward_id.in_(ward_ids))
        
        # Calculate stats
        total_screenings = base_query.count()
        high_risk_cases = base_query.filter(ScreeningModel.risk_level == 'High').count()
        
        # Most active ward
        ward_activity = base_query.with_entities(
            ScreeningModel.ward_id,
            func.count(ScreeningModel.screening_id).label('count')
        ).group_by(ScreeningModel.ward_id).order_by(text('count DESC')).first()
        
        most_active_ward = "N/A"
        if ward_activity:
            ward = WardModel.query.get(ward_activity.ward_id)
            if ward:
                most_active_ward = f"{ward.ward_name}, {ward.district.city.city_name}"
        
        # Screening type breakdown
        screening_types = base_query.with_entities(
            ScreeningModel.screening_type,
            func.count(ScreeningModel.screening_id).label('count')
        ).group_by(ScreeningModel.screening_type).all()
        
        stats = {
            'totalScreenings': {'value': total_screenings, 'trend': '+5%'},
            'highRiskCases': {'value': high_risk_cases, 'trend': '-2%'},
            'activeWards': {'value': most_active_ward},
            'screeningTypes': [{'type': st.screening_type, 'count': st.count} for st in screening_types]
        }
        
        return jsonify(stats), 200
        
    except Exception as e:
        logger.error(f"Stats error: {str(e)}")
        return jsonify({'message': 'Failed to fetch statistics'}), 500

@dashboard_bp.route('/heatmap', methods=['GET'])
@jwt_required()
def get_heatmap_data():
    """Get heatmap data with geographic filtering"""
    try:
        date_filter = request.args.get('dateRange', '7d')
        screening_type = request.args.get('type', 'Anemia')
        level = request.args.get('level', 'ward')  # ward, district, city
        
        days = 7 if date_filter == '7d' else 30
        start_date = datetime.utcnow() - timedelta(days=days)

        risk_scores = case(
            (ScreeningModel.risk_level == 'High', 3),
            (ScreeningModel.risk_level == 'Medium', 2),
            (ScreeningModel.risk_level == 'Low', 1),
            else_=0
        )

        if level == 'ward':
            data = db.session.query(
                ScreeningModel.ward_id.label('id'),
                WardModel.ward_name.label('name'),
                func.avg(risk_scores).label('avg_risk'),
                func.count(ScreeningModel.screening_id).label('total_screenings'),
                WardModel.latitude,
                WardModel.longitude
            ).join(WardModel).filter(
                ScreeningModel.timestamp >= start_date,
                ScreeningModel.screening_type == screening_type
            ).group_by(
                ScreeningModel.ward_id, WardModel.ward_name, 
                WardModel.latitude, WardModel.longitude
            ).all()
        elif level == 'district':
            data = db.session.query(
                DistrictModel.district_id.label('id'),
                DistrictModel.district_name.label('name'),
                func.avg(risk_scores).label('avg_risk'),
                func.count(ScreeningModel.screening_id).label('total_screenings')
            ).join(WardModel).join(DistrictModel).filter(
                ScreeningModel.timestamp >= start_date,
                ScreeningModel.screening_type == screening_type
            ).group_by(
                DistrictModel.district_id, DistrictModel.district_name
            ).all()
        
        heatmap = []
        for item in data:
            avg_risk = float(item.avg_risk) if item.avg_risk else 0
            risk_level = "Low"
            if avg_risk > 2.5:
                risk_level = "High"
            elif avg_risk > 1.5:
                risk_level = "Medium"
            
            heatmap_item = {
                'id': item.id,
                'name': item.name,
                'riskLevel': risk_level,
                'value': avg_risk,
                'totalScreenings': item.total_screenings
            }
            
            if hasattr(item, 'latitude') and item.latitude:
                heatmap_item.update({
                    'latitude': item.latitude,
                    'longitude': item.longitude
                })
            
            heatmap.append(heatmap_item)

        return jsonify({'heatmap': heatmap, 'level': level}), 200
        
    except Exception as e:
        logger.error(f"Heatmap error: {str(e)}")
        return jsonify({'message': 'Failed to fetch heatmap data'}), 500