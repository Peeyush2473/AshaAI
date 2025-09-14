# # app/models/location_models.py
# from app import db
# from datetime import datetime
# from sqlalchemy import Index

# class CountryModel(db.Model):
#     __tablename__ = 'countries'
    
#     country_id = db.Column(db.Integer, primary_key=True)
#     country_name = db.Column(db.String(100), unique=True, nullable=False)
#     country_code = db.Column(db.String(3), unique=True, nullable=False)  # ISO 3166-1 alpha-3
#     created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
#     states = db.relationship('StateModel', backref='country', lazy=True, cascade="all, delete-orphan")
    
#     def to_dict(self):
#         return {
#             'country_id': self.country_id,
#             'country_name': self.country_name,
#             'country_code': self.country_code
#         }

# class StateModel(db.Model):
#     __tablename__ = 'states'
    
#     state_id = db.Column(db.Integer, primary_key=True)
#     state_name = db.Column(db.String(100), nullable=False)
#     state_code = db.Column(db.String(10), nullable=False)
#     country_id = db.Column(db.Integer, db.ForeignKey('countries.country_id'), nullable=False)
#     created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
#     cities = db.relationship('CityModel', backref='state', lazy=True, cascade="all, delete-orphan")
    
#     __table_args__ = (
#         Index('idx_state_country', 'country_id', 'state_name'),
#     )
    
#     def to_dict(self):
#         return {
#             'state_id': self.state_id,
#             'state_name': self.state_name,
#             'state_code': self.state_code,
#             'country_id': self.country_id,
#             'country_name': self.country.country_name if self.country else None
#         }

# class CityModel(db.Model):
#     __tablename__ = 'cities'
    
#     city_id = db.Column(db.Integer, primary_key=True)
#     city_name = db.Column(db.String(100), nullable=False)
#     state_id = db.Column(db.Integer, db.ForeignKey('states.state_id'), nullable=False)
#     latitude = db.Column(db.Float, nullable=True)
#     longitude = db.Column(db.Float, nullable=True)
#     population = db.Column(db.Integer, nullable=True)
#     created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
#     districts = db.relationship('DistrictModel', backref='city', lazy=True, cascade="all, delete-orphan")
    
#     __table_args__ = (
#         Index('idx_city_state', 'state_id', 'city_name'),
#         Index('idx_city_coordinates', 'latitude', 'longitude'),
#     )
    
#     def to_dict(self):
#         return {
#             'city_id': self.city_id,
#             'city_name': self.city_name,
#             'state_id': self.state_id,
#             'state_name': self.state.state_name if self.state else None,
#             'country_name': self.state.country.country_name if self.state and self.state.country else None,
#             'latitude': self.latitude,
#             'longitude': self.longitude,
#             'population': self.population
#         }

# class DistrictModel(db.Model):
#     __tablename__ = 'districts'
    
#     district_id = db.Column(db.Integer, primary_key=True)
#     district_name = db.Column(db.String(100), nullable=False)
#     city_id = db.Column(db.Integer, db.ForeignKey('cities.city_id'), nullable=False)
#     created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
#     wards = db.relationship('WardModel', backref='district', lazy=True, cascade="all, delete-orphan")
    
#     def to_dict(self):
#         return {
#             'district_id': self.district_id,
#             'district_name': self.district_name,
#             'city_id': self.city_id,
#             'city_name': self.city.city_name if self.city else None
#         }

# class WardModel(db.Model):
#     __tablename__ = 'wards'

#     ward_id = db.Column(db.Integer, primary_key=True)
#     ward_name = db.Column(db.String(100), nullable=False)
#     ward_code = db.Column(db.String(20), nullable=True)
#     district_id = db.Column(db.Integer, db.ForeignKey('districts.district_id'), nullable=False)
#     geo_boundary = db.Column(db.Text, nullable=True)  # GeoJSON polygon
#     latitude = db.Column(db.Float, nullable=True)
#     longitude = db.Column(db.Float, nullable=True)
#     population = db.Column(db.Integer, nullable=True)
#     area_sq_km = db.Column(db.Float, nullable=True)
#     created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

#     screenings = db.relationship('ScreeningModel', backref='ward', lazy=True)
#     workers = db.relationship('UserModel', backref='ward', lazy=True)
    
#     __table_args__ = (
#         Index('idx_ward_district', 'district_id', 'ward_name'),
#         Index('idx_ward_coordinates', 'latitude', 'longitude'),
#     )

#     def to_dict(self, include_hierarchy=False):
#         base_dict = {
#             'ward_id': self.ward_id,
#             'ward_name': self.ward_name,
#             'ward_code': self.ward_code,
#             'district_id': self.district_id,
#             'latitude': self.latitude,
#             'longitude': self.longitude,
#             'population': self.population,
#             'area_sq_km': self.area_sq_km
#         }
        
#         if include_hierarchy and self.district:
#             base_dict.update({
#                 'district_name': self.district.district_name,
#                 'city_name': self.district.city.city_name if self.district.city else None,
#                 'state_name': self.district.city.state.state_name if self.district.city and self.district.city.state else None,
#                 'country_name': self.district.city.state.country.country_name if self.district.city and self.district.city.state and self.district.city.state.country else None
#             })
        
#         return base_dict

# # app/models/user_model.py (Enhanced)
# from app import db
# from datetime import datetime

# class UserModel(db.Model):
#     __tablename__ = 'asha_workers'

#     worker_id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     phone_number = db.Column(db.String(15), unique=True, nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=True)
#     password_hash = db.Column(db.String(128), nullable=False)
#     ward_id = db.Column(db.Integer, db.ForeignKey('wards.ward_id'), nullable=False)
#     worker_type = db.Column(db.String(50), nullable=False, default='ASHA')  # ASHA, ANM, AWW
#     qualification = db.Column(db.String(100), nullable=True)
#     experience_years = db.Column(db.Integer, nullable=True)
#     is_active = db.Column(db.Boolean, nullable=False, default=True)
#     last_login = db.Column(db.DateTime, nullable=True)
#     created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
#     updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

#     screenings = db.relationship('ScreeningModel', backref='worker', lazy=True, cascade="all, delete-orphan")
    
#     __table_args__ = (
#         Index('idx_worker_ward', 'ward_id', 'is_active'),
#         Index('idx_worker_phone', 'phone_number'),
#     )

#     def to_dict(self, include_location=False):
#         base_dict = {
#             'worker_id': self.worker_id,
#             'name': self.name,
#             'phone_number': self.phone_number,
#             'email': self.email,
#             'ward_id': self.ward_id,
#             'worker_type': self.worker_type,
#             'qualification': self.qualification,
#             'experience_years': self.experience_years,
#             'is_active': self.is_active,
#             'last_login': self.last_login.isoformat() if self.last_login else None,
#             'created_at': self.created_at.isoformat()
#         }
        
#         if include_location and self.ward:
#             base_dict.update({
#                 'location': self.ward.to_dict(include_hierarchy=True)
#             })
        
#         return base_dict

# # app/models/screening_model.py (Enhanced)
# from app import db
# from datetime import datetime

# class ScreeningModel(db.Model):
#     __tablename__ = 'screenings'

#     screening_id = db.Column(db.Integer, primary_key=True)
#     worker_id = db.Column(db.Integer, db.ForeignKey('asha_workers.worker_id'), nullable=False)
#     ward_id = db.Column(db.Integer, db.ForeignKey('wards.ward_id'), nullable=False)
#     citizen_age = db.Column(db.Integer, nullable=True)
#     citizen_gender = db.Column(db.String(10), nullable=True)  # Male, Female, Other
#     screening_type = db.Column(db.String(50), nullable=False)  # Anemia, Jaundice, Vitals, etc.
#     result_value = db.Column(db.Float, nullable=True)  # Numeric result (e.g., Hb level)
#     risk_level = db.Column(db.String(20), nullable=False)  # Low, Medium, High
#     confidence_score = db.Column(db.Float, nullable=True)  # AI model confidence (0-1)
#     location_lat = db.Column(db.Float, nullable=True)
#     location_lon = db.Column(db.Float, nullable=True)
#     timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
#     follow_up_required = db.Column(db.Boolean, nullable=False, default=False)
#     notes = db.Column(db.Text, nullable=True)
    
#     __table_args__ = (
#         Index('idx_screening_ward_date', 'ward_id', 'timestamp'),
#         Index('idx_screening_type_risk', 'screening_type', 'risk_level'),
#         Index('idx_screening_worker', 'worker_id', 'timestamp'),
#     )

#     def to_dict(self, include_location=False):
#         base_dict = {
#             'screening_id': self.screening_id,
#             'worker_id': self.worker_id,
#             'ward_id': self.ward_id,
#             'citizen_age': self.citizen_age,
#             'citizen_gender': self.citizen_gender,
#             'screening_type': self.screening_type,
#             'result_value': self.result_value,
#             'risk_level': self.risk_level,
#             'confidence_score': self.confidence_score,
#             'timestamp': self.timestamp.isoformat(),
#             'follow_up_required': self.follow_up_required,
#             'notes': self.notes,
#             'location': {
#                 'lat': self.location_lat,
#                 'lon': self.location_lon
#             }
#         }
        
#         if include_location and self.ward:
#             base_dict.update({
#                 'ward_info': self.ward.to_dict(include_hierarchy=True)
#             })
        
#         return base_dict