from app import db
from datetime import datetime

class ScreeningModel(db.Model):
    __tablename__ = 'screenings'

    screening_id = db.Column(db.Integer, primary_key=True)
    worker_id = db.Column(db.Integer, db.ForeignKey('asha_workers.worker_id'), nullable=False)
    ward_id = db.Column(db.Integer, db.ForeignKey('wards.ward_id'), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    screening_type = db.Column(db.String(50), nullable=False)
    risk_level = db.Column(db.String(50), nullable=False)
    location_lat = db.Column(db.Float, nullable=True)
    location_lon = db.Column(db.Float, nullable=True)

    def to_dict(self):
        return {
            'screening_id': self.screening_id,
            'worker_id': self.worker_id,
            'ward_id': self.ward_id,
            'timestamp': self.timestamp.isoformat(),
            'screening_type': self.screening_type,
            'risk_level': self.risk_level,
            'location': {
                'lat': self.location_lat,
                'lon': self.location_lon
            }
        }
