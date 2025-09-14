from app import db

class WardModel(db.Model):
    __tablename__ = 'wards'

    ward_id = db.Column(db.Integer, primary_key=True)
    ward_name = db.Column(db.String(100), unique=True, nullable=False)
    geo_boundary = db.Column(db.Text, nullable=True)

    screenings = db.relationship('ScreeningModel', backref='ward', lazy=True)
    workers = db.relationship('UserModel', backref='ward', lazy=True)

    def to_dict(self):
        return {
            'ward_id': self.ward_id,
            'ward_name': self.ward_name
        }
