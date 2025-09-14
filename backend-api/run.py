# import os
# import click
# from app import create_app, db
# from app.models.ward_model import WardModel
# from app.models.user_model import UserModel
# from app.services.auth_service import hash_password

# # Create the Flask app instance using the factory pattern
# # This loads the configuration from config.py
# app = create_app()

# @app.cli.command('create_db')
# def create_db():
#     """
#     Drops all existing tables and creates new ones based on the models.
#     This is for a fresh start.
#     """
#     click.echo('Dropping all tables...')
#     db.drop_all()
#     click.echo('Creating all tables...')
#     db.create_all()
#     click.echo('Database tables created successfully.')

# @app.cli.command('seed_db')
# def seed_db():
#     """
#     Populates the database with initial data for demonstration.
#     This includes wards for Bhopal and sample ASHA workers.
#     """
#     click.echo('Seeding database with initial data...')

#     # --- Seed Wards Table ---
#     # A list of real administrative wards in Bhopal
#     bhopal_wards = [
#         "Arera Colony", "Anand Nagar", "Ashoka Garden", "Awadhpuri", "Ayodhya Nagar",
#         "Bagmugaliya", "Bairagarh", "Barkheda", "Berkhedi", "Bhanpur",
#         "Chola", "Govindpura", "Gulmohar", "Habibganj", "Hamidia Road",
#         "Idgah Hills", "Indrapuri", "Jahangirabad", "Karond", "Kolar Road",
#         "Kotra Sultanabad", "Maharana Pratap Nagar", "Malviya Nagar", "Misrod",
#         "Nehru Nagar", "Nishatpura", "Piplani", "Saket Nagar", "Shahpura",
#         "Shastri Nagar", "TT Nagar", "Vidya Nagar"
#     ]
    
#     for ward_name in bhopal_wards:
#         if not WardModel.query.filter_by(ward_name=ward_name).first():
#             ward = WardModel(ward_name=ward_name)
#             db.session.add(ward)

#     # --- Seed ASHA Workers Table ---
#     if not UserModel.query.filter_by(phone_number='1234567890').first():
#         worker1 = UserModel(
#             name='Priya Sharma',
#             phone_number='1234567890',
#             password_hash=hash_password('password'),
#             ward_id=1 # Corresponds to Arera Colony
#         )
#         db.session.add(worker1)

#     if not UserModel.query.filter_by(phone_number='0987654321').first():
#         worker2 = UserModel(
#             name='Anjali Singh',
#             phone_number='0987654321',
#             password_hash=hash_password('password123'),
#             ward_id=10 # Corresponds to Bhanpur
#         )
#         db.session.add(worker2)
        
#     db.session.commit()
#     click.echo('Database seeded successfully.')


# if __name__ == '__main__':
#     # This block allows you to run the app directly using `python run.py`
#     # The host='0.0.0.0' makes the server accessible from other devices on the same network
#     # (like your physical phone for testing the mobile app).
#     app.run(host='0.0.0.0', port=5000, debug=True)






















# run.py (Enhanced with comprehensive location seeding)
import os
import click
from app import create_app, db
from app.models.location_models import CountryModel, StateModel, CityModel, DistrictModel, WardModel
from app.models.user_model import UserModel
from app.services.auth_service import hash_password
from app.services.location_service import GeoCodingService
import json

# Create the Flask app instance using the factory pattern
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

@app.cli.command('seed_locations')
def seed_locations():
    """
    Seed database with comprehensive Indian location data
    """
    click.echo('Seeding location data...')
    
    # Indian states with their major cities and coordinates
    indian_location_data = {
        "India": {
            "country_code": "IND",
            "states": {
                "Madhya Pradesh": {
                    "state_code": "MP",
                    "cities": {
                        "Bhopal": {
                            "latitude": 23.2599, "longitude": 77.4126,
                            "districts": {
                                "Central Bhopal": {
                                    "wards": [
                                        {"name": "Arera Colony", "lat": 23.2156, "lon": 77.4304},
                                        {"name": "MP Nagar", "lat": 23.2380, "lon": 77.4150},
                                        {"name": "TT Nagar", "lat": 23.2295, "lon": 77.4185},
                                        {"name": "Shahpura", "lat": 23.2543, "lon": 77.4015},
                                        {"name": "New Market", "lat": 23.2599, "lon": 77.4126}
                                    ]
                                },
                                "North Bhopal": {
                                    "wards": [
                                        {"name": "Ashoka Garden", "lat": 23.2707, "lon": 77.4362},
                                        {"name": "Ayodhya Nagar", "lat": 23.2800, "lon": 77.4200},
                                        {"name": "Bairagarh", "lat": 23.3045, "lon": 77.4173},
                                        {"name": "Indrapuri", "lat": 23.2850, "lon": 77.4300}
                                    ]
                                },
                                "South Bhopal": {
                                    "wards": [
                                        {"name": "Piplani", "lat": 23.1793, "lon": 77.5083},
                                        {"name": "Saket Nagar", "lat": 23.1900, "lon": 77.4500},
                                        {"name": "Gulmohar Colony", "lat": 23.2000, "lon": 77.4700},
                                        {"name": "Kolar Road", "lat": 23.1850, "lon": 77.4600}
                                    ]
                                }
                            }
                        },
                        "Indore": {
                            "latitude": 22.7196, "longitude": 75.8577,
                            "districts": {
                                "Central Indore": {
                                    "wards": [
                                        {"name": "Rajwada", "lat": 22.7196, "lon": 75.8577},
                                        {"name": "Sarafa Bazaar", "lat": 22.7205, "lon": 75.8573},
                                        {"name": "Chappan Dukan", "lat": 22.7280, "lon": 75.8723}
                                    ]
                                },
                                "West Indore": {
                                    "wards": [
                                        {"name": "Vijay Nagar", "lat": 22.7532, "lon": 75.8937},
                                        {"name": "Scheme 78", "lat": 22.7580, "lon": 75.9020},
                                        {"name": "AB Road", "lat": 22.7400, "lon": 75.8800}
                                    ]
                                }
                            }
                        }
                    }
                },
                "Maharashtra": {
                    "state_code": "MH",
                    "cities": {
                        "Mumbai": {
                            "latitude": 19.0760, "longitude": 72.8777,
                            "districts": {
                                "South Mumbai": {
                                    "wards": [
                                        {"name": "Colaba", "lat": 18.9067, "lon": 72.8147},
                                        {"name": "Fort", "lat": 18.9388, "lon": 72.8354},
                                        {"name": "Churchgate", "lat": 18.9322, "lon": 72.8264}
                                    ]
                                },
                                "Central Mumbai": {
                                    "wards": [
                                        {"name": "Dadar", "lat": 19.0178, "lon": 72.8478},
                                        {"name": "Bandra", "lat": 19.0596, "lon": 72.8295},
                                        {"name": "Andheri", "lat": 19.1197, "lon": 72.8464}
                                    ]
                                }
                            }
                        },
                        "Pune": {
                            "latitude": 18.5204, "longitude": 73.8567,
                            "districts": {
                                "Central Pune": {
                                    "wards": [
                                        {"name": "Shivajinagar", "lat": 18.5309, "lon": 73.8475},
                                        {"name": "Deccan", "lat": 18.5158, "lon": 73.8449},
                                        {"name": "FC Road", "lat": 18.5089, "lon": 73.8298}
                                    ]
                                },
                                "East Pune": {
                                    "wards": [
                                        {"name": "Koregaon Park", "lat": 18.5362, "lon": 73.8980},
                                        {"name": "Viman Nagar", "lat": 18.5679, "lon": 73.9143},
                                        {"name": "Hadapsar", "lat": 18.5089, "lon": 73.9260}
                                    ]
                                }
                            }
                        }
                    }
                },
                "Karnataka": {
                    "state_code": "KA",
                    "cities": {
                        "Bangalore": {
                            "latitude": 12.9716, "longitude": 77.5946,
                            "districts": {
                                "Central Bangalore": {
                                    "wards": [
                                        {"name": "MG Road", "lat": 12.9716, "lon": 77.5946},
                                        {"name": "Brigade Road", "lat": 12.9698, "lon": 77.6205},
                                        {"name": "Cubbon Park", "lat": 12.9698, "lon": 77.5935}
                                    ]
                                },
                                "North Bangalore": {
                                    "wards": [
                                        {"name": "Hebbal", "lat": 13.0359, "lon": 77.5971},
                                        {"name": "Yelahanka", "lat": 13.1007, "lon": 77.5963},
                                        {"name": "Marathahalli", "lat": 12.9591, "lon": 77.6974}
                                    ]
                                }
                            }
                        }
                    }
                },
                "Tamil Nadu": {
                    "state_code": "TN",
                    "cities": {
                        "Chennai": {
                            "latitude": 13.0827, "longitude": 80.2707,
                            "districts": {
                                "Central Chennai": {
                                    "wards": [
                                        {"name": "T. Nagar", "lat": 13.0418, "lon": 80.2341},
                                        {"name": "Anna Nagar", "lat": 13.0850, "lon": 80.2101},
                                        {"name": "Adyar", "lat": 13.0067, "lon": 80.2206}
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    try:
        # Create India
        country = CountryModel.query.filter_by(country_code='IND').first()
        if not country:
            country = CountryModel(country_name='India', country_code='IND')
            db.session.add(country)
            db.session.flush()
        
        # Process states
        for state_name, state_data in indian_location_data["India"]["states"].items():
            state = StateModel.query.filter_by(
                state_name=state_name, 
                country_id=country.country_id
            ).first()
            if not state:
                state = StateModel(
                    state_name=state_name,
                    state_code=state_data["state_code"],
                    country_id=country.country_id
                )
                db.session.add(state)
                db.session.flush()
            
            # Process cities
            for city_name, city_data in state_data["cities"].items():
                city = CityModel.query.filter_by(
                    city_name=city_name,
                    state_id=state.state_id
                ).first()
                if not city:
                    city = CityModel(
                        city_name=city_name,
                        state_id=state.state_id,
                        latitude=city_data["latitude"],
                        longitude=city_data["longitude"]
                    )
                    db.session.add(city)
                    db.session.flush()
                
                # Process districts
                for district_name, district_data in city_data["districts"].items():
                    district = DistrictModel.query.filter_by(
                        district_name=district_name,
                        city_id=city.city_id
                    ).first()
                    if not district:
                        district = DistrictModel(
                            district_name=district_name,
                            city_id=city.city_id
                        )
                        db.session.add(district)
                        db.session.flush()
                    
                    # Process wards
                    for ward_data in district_data["wards"]:
                        ward = WardModel.query.filter_by(
                            ward_name=ward_data["name"],
                            district_id=district.district_id
                        ).first()
                        if not ward:
                            ward = WardModel(
                                ward_name=ward_data["name"],
                                district_id=district.district_id,
                                latitude=ward_data["lat"],
                                longitude=ward_data["lon"]
                            )
                            db.session.add(ward)
        
        db.session.commit()
        click.echo('Location data seeded successfully.')
        
    except Exception as e:
        click.echo(f'Error seeding location data: {str(e)}')
        db.session.rollback()

@app.cli.command('seed_users')
def seed_users():
    """
    Seed database with sample ASHA workers across different locations
    """
    click.echo('Seeding user data...')
    
    sample_workers = [
        {
            'name': 'Priya Sharma',
            'phone_number': '+911234567890',
            'email': 'priya.sharma@health.gov.in',
            'password': 'password123',
            'worker_type': 'ASHA',
            'qualification': 'Class 8, ASHA Training',
            'experience_years': 5,
            'ward_name': 'Arera Colony'
        },
        {
            'name': 'Anjali Singh',
            'phone_number': '+910987654321',
            'email': 'anjali.singh@health.gov.in',
            'password': 'password123',
            'worker_type': 'ANM',
            'qualification': 'ANM Diploma',
            'experience_years': 8,
            'ward_name': 'MP Nagar'
        },
        {
            'name': 'Sunita Patel',
            'phone_number': '+919876543210',
            'email': 'sunita.patel@health.gov.in',
            'password': 'password123',
            'worker_type': 'ASHA',
            'qualification': 'Class 10, ASHA Training',
            'experience_years': 3,
            'ward_name': 'TT Nagar'
        },
        {
            'name': 'Meera Devi',
            'phone_number': '+918765432109',
            'password': 'password123',
            'worker_type': 'AWW',
            'qualification': 'Class 12, Anganwadi Training',
            'experience_years': 6,
            'ward_name': 'Piplani'
        },
        {
            'name': 'Rashmi Verma',
            'phone_number': '+917654321098',
            'password': 'password123',
            'worker_type': 'ASHA',
            'qualification': 'Graduate, ASHA Training',
            'experience_years': 4,
            'ward_name': 'Vijay Nagar'
        }
    ]
    
    try:
        for worker_data in sample_workers:
            # Check if user already exists
            if UserModel.query.filter_by(phone_number=worker_data['phone_number']).first():
                continue
            
            # Find ward by name
            ward = db.session.query(WardModel).filter_by(
                ward_name=worker_data['ward_name']
            ).first()
            
            if not ward:
                click.echo(f"Ward '{worker_data['ward_name']}' not found, skipping user {worker_data['name']}")
                continue
            
            hashed_password = hash_password(worker_data['password'])
            
            new_user = UserModel(
                name=worker_data['name'],
                phone_number=worker_data['phone_number'],
                email=worker_data.get('email'),
                password_hash=hashed_password,
                ward_id=ward.ward_id,
                worker_type=worker_data['worker_type'],
                qualification=worker_data['qualification'],
                experience_years=worker_data['experience_years']
            )
            
            db.session.add(new_user)
        
        db.session.commit()
        click.echo('User data seeded successfully.')
        
    except Exception as e:
        click.echo(f'Error seeding user data: {str(e)}')
        db.session.rollback()

@app.cli.command('seed_all')
def seed_all():
    """Seed all data - locations and users"""
    click.echo('Starting complete database seeding...')
    
    # First create tables
    db.create_all()
    
    # Then seed locations
    seed_locations()
    
    # Finally seed users
    seed_users()
    
    click.echo('Complete database seeding finished.')

@app.cli.command('reset_db')
def reset_db():
    """Reset database and seed with fresh data"""
    click.echo('Resetting database...')
    create_db()
    seed_all()
    click.echo('Database reset and seeded successfully.')

@app.cli.command('import_csv')
@click.option('--file', required=True, help='CSV file path containing location data')
@click.option('--type', required=True, help='Data type: wards, cities, or districts')
def import_csv(file, type):
    """Import location data from CSV file"""
    import csv
    import os
    
    if not os.path.exists(file):
        click.echo(f'File {file} not found.')
        return
    
    try:
        with open(file, 'r', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            
            if type == 'wards':
                for row in reader:
                    # Expected columns: ward_name, district_name, city_name, state_name, latitude, longitude
                    ward = WardModel.query.filter_by(ward_name=row['ward_name']).first()
                    if not ward:
                        # Find or create district
                        district = DistrictModel.query.filter_by(district_name=row['district_name']).first()
                        if district:
                            ward = WardModel(
                                ward_name=row['ward_name'],
                                district_id=district.district_id,
                                latitude=float(row['latitude']) if row.get('latitude') else None,
                                longitude=float(row['longitude']) if row.get('longitude') else None
                            )
                            db.session.add(ward)
            
            db.session.commit()
            click.echo(f'Successfully imported {type} data from {file}')
            
    except Exception as e:
        click.echo(f'Error importing data: {str(e)}')
        db.session.rollback()

@app.cli.command('geocode_locations')
def geocode_locations():
    """Geocode existing locations that don't have coordinates"""
    click.echo('Geocoding locations...')
    
    try:
        # Geocode cities without coordinates
        cities = CityModel.query.filter(
            CityModel.latitude.is_(None) | CityModel.longitude.is_(None)
        ).limit(50).all()  # Limit to avoid API rate limits
        
        for city in cities:
            address = f"{city.city_name}, {city.state.state_name}, {city.state.country.country_name}"
            result = GeoCodingService.geocode_address(address)
            if result:
                city.latitude = result['latitude']
                city.longitude = result['longitude']
                click.echo(f'Geocoded: {city.city_name}')
            else:
                click.echo(f'Failed to geocode: {city.city_name}')
        
        # Geocode wards without coordinates
        wards = WardModel.query.filter(
            WardModel.latitude.is_(None) | WardModel.longitude.is_(None)
        ).limit(30).all()  # Fewer requests for wards
        
        for ward in wards:
            address = f"{ward.ward_name}, {ward.district.city.city_name}, {ward.district.city.state.state_name}"
            result = GeoCodingService.geocode_address(address)
            if result:
                ward.latitude = result['latitude']
                ward.longitude = result['longitude']
                click.echo(f'Geocoded ward: {ward.ward_name}')
        
        db.session.commit()
        click.echo('Geocoding completed.')
        
    except Exception as e:
        click.echo(f'Error during geocoding: {str(e)}')
        db.session.rollback()

if __name__ == '__main__':
    # This block allows you to run the app directly using `python run.py`
    # The host='0.0.0.0' makes the server accessible from other devices on the same network
    # (like your physical phone for testing the mobile app).
    app.run(host='0.0.0.0', port=5000, debug=True)