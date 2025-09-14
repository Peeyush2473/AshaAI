import os
import click
from app import create_app, db
from app.models.ward_model import WardModel
from app.models.user_model import UserModel
from app.services.auth_service import hash_password

# Create the Flask app instance using the factory pattern
# This loads the configuration from config.py
app = create_app()

@app.cli.command('create_db')
def create_db():
    """
    Drops all existing tables and creates new ones based on the models.
    This is for a fresh start.
    """
    click.echo('Dropping all tables...')
    db.drop_all()
    click.echo('Creating all tables...')
    db.create_all()
    click.echo('Database tables created successfully.')

@app.cli.command('seed_db')
def seed_db():
    """
    Populates the database with initial data for demonstration.
    This includes wards for Bhopal and sample ASHA workers.
    """
    click.echo('Seeding database with initial data...')

    # --- Seed Wards Table ---
    # A list of real administrative wards in Bhopal
    bhopal_wards = [
        "Arera Colony", "Anand Nagar", "Ashoka Garden", "Awadhpuri", "Ayodhya Nagar",
        "Bagmugaliya", "Bairagarh", "Barkheda", "Berkhedi", "Bhanpur",
        "Chola", "Govindpura", "Gulmohar", "Habibganj", "Hamidia Road",
        "Idgah Hills", "Indrapuri", "Jahangirabad", "Karond", "Kolar Road",
        "Kotra Sultanabad", "Maharana Pratap Nagar", "Malviya Nagar", "Misrod",
        "Nehru Nagar", "Nishatpura", "Piplani", "Saket Nagar", "Shahpura",
        "Shastri Nagar", "TT Nagar", "Vidya Nagar"
    ]
    
    for ward_name in bhopal_wards:
        if not WardModel.query.filter_by(ward_name=ward_name).first():
            ward = WardModel(ward_name=ward_name)
            db.session.add(ward)

    # --- Seed ASHA Workers Table ---
    if not UserModel.query.filter_by(phone_number='1234567890').first():
        worker1 = UserModel(
            name='Priya Sharma',
            phone_number='1234567890',
            password_hash=hash_password('password'),
            ward_id=1 # Corresponds to Arera Colony
        )
        db.session.add(worker1)

    if not UserModel.query.filter_by(phone_number='0987654321').first():
        worker2 = UserModel(
            name='Anjali Singh',
            phone_number='0987654321',
            password_hash=hash_password('password123'),
            ward_id=10 # Corresponds to Bhanpur
        )
        db.session.add(worker2)
        
    db.session.commit()
    click.echo('Database seeded successfully.')


if __name__ == '__main__':
    # This block allows you to run the app directly using `python run.py`
    # The host='0.0.0.0' makes the server accessible from other devices on the same network
    # (like your physical phone for testing the mobile app).
    app.run(host='0.0.0.0', port=5000, debug=True)










