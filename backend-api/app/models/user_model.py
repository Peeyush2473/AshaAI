from app import db
from datetime import datetime

class UserModel(db.Model):
    __tablename__ = 'asha_workers'

    worker_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(15), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    ward_id = db.Column(db.Integer, db.ForeignKey('wards.ward_id'), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    screenings = db.relationship('ScreeningModel', backref='worker', lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'worker_id': self.worker_id,
            'name': self.name,
            'phone_number': self.phone_number,
            'ward_id': self.ward_id,
            'created_at': self.created_at.isoformat()
        }


