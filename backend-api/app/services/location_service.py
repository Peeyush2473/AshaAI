# app/services/location_service.py
import requests
import json
from typing import Dict, List, Optional, Tuple
from app import db
from app.models.location_models import CountryModel, StateModel, CityModel, DistrictModel, WardModel
import logging

logger = logging.getLogger(__name__)

class LocationService:
    """Service for handling geographic data and location operations"""
    
    @staticmethod
    def get_location_hierarchy() -> Dict:
        """Get the complete location hierarchy"""
        countries = CountryModel.query.all()
        hierarchy = []
        
        for country in countries:
            country_data = country.to_dict()
            country_data['states'] = []
            
            for state in country.states:
                state_data = state.to_dict()
                state_data['cities'] = []
                
                for city in state.cities:
                    city_data = city.to_dict()
                    city_data['districts'] = []
                    
                    for district in city.districts:
                        district_data = district.to_dict()
                        district_data['wards'] = [ward.to_dict() for ward in district.wards]
                        city_data['districts'].append(district_data)
                    
                    state_data['cities'].append(city_data)
                country_data['states'].append(state_data)
            hierarchy.append(country_data)
        
        return {'hierarchy': hierarchy}
    
    @staticmethod
    def search_locations(query: str, location_type: str = None) -> List[Dict]:
        """Search for locations by name"""
        results = []
        
        if location_type in [None, 'ward']:
            wards = WardModel.query.filter(
                WardModel.ward_name.ilike(f'%{query}%')
            ).limit(10).all()
            results.extend([{
                'type': 'ward',
                'data': ward.to_dict(include_hierarchy=True)
            } for ward in wards])
        
        if location_type in [None, 'city']:
            cities = CityModel.query.filter(
                CityModel.city_name.ilike(f'%{query}%')
            ).limit(10).all()
            results.extend([{
                'type': 'city',
                'data': city.to_dict()
            } for city in cities])
        
        if location_type in [None, 'state']:
            states = StateModel.query.filter(
                StateModel.state_name.ilike(f'%{query}%')
            ).limit(10).all()
            results.extend([{
                'type': 'state',
                'data': state.to_dict()
            } for state in states])
        
        return results
    
    @staticmethod
    def get_nearby_wards(lat: float, lon: float, radius_km: float = 10) -> List[Dict]:
        """Find wards within a specified radius"""
        # Simple distance calculation (for more accuracy, use PostGIS)
        from math import radians, cos, sin, asin, sqrt
        
        def haversine(lon1, lat1, lon2, lat2):
            lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
            dlon = lon2 - lon1
            dlat = lat2 - lat1
            a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
            c = 2 * asin(sqrt(a))
            r = 6371  # Radius of earth in kilometers
            return c * r
        
        wards = WardModel.query.filter(
            WardModel.latitude.isnot(None),
            WardModel.longitude.isnot(None)
        ).all()
        
        nearby_wards = []
        for ward in wards:
            distance = haversine(lon, lat, ward.longitude, ward.latitude)
            if distance <= radius_km:
                ward_data = ward.to_dict(include_hierarchy=True)
                ward_data['distance_km'] = round(distance, 2)
                nearby_wards.append(ward_data)
        
        return sorted(nearby_wards, key=lambda x: x['distance_km'])
    
    @staticmethod
    def create_location_hierarchy(country_name: str, state_name: str, city_name: str, 
                                district_name: str, ward_name: str, 
                                coordinates: Tuple[float, float] = None) -> WardModel:
        """Create complete location hierarchy if it doesn't exist"""
        
        # Get or create country
        country = CountryModel.query.filter_by(country_name=country_name).first()
        if not country:
            # You might want to add country code mapping logic here
            country_code = 'IND' if country_name == 'India' else 'UNK'
            country = CountryModel(country_name=country_name, country_code=country_code)
            db.session.add(country)
            db.session.flush()
        
        # Get or create state
        state = StateModel.query.filter_by(
            state_name=state_name, 
            country_id=country.country_id
        ).first()
        if not state:
            state = StateModel(
                state_name=state_name,
                state_code=state_name[:3].upper(),
                country_id=country.country_id
            )
            db.session.add(state)
            db.session.flush()
        
        # Get or create city
        city = CityModel.query.filter_by(
            city_name=city_name,
            state_id=state.state_id
        ).first()
        if not city:
            city_lat, city_lon = coordinates if coordinates else (None, None)
            city = CityModel(
                city_name=city_name,
                state_id=state.state_id,
                latitude=city_lat,
                longitude=city_lon
            )
            db.session.add(city)
            db.session.flush()
        
        # Get or create district
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
        
        # Get or create ward
        ward = WardModel.query.filter_by(
            ward_name=ward_name,
            district_id=district.district_id
        ).first()
        if not ward:
            ward_lat, ward_lon = coordinates if coordinates else (None, None)
            ward = WardModel(
                ward_name=ward_name,
                district_id=district.district_id,
                latitude=ward_lat,
                longitude=ward_lon
            )
            db.session.add(ward)
            db.session.flush()
        
        db.session.commit()
        return ward

class GeoCodingService:
    """Service for geocoding and reverse geocoding using free APIs"""
    
    @staticmethod
    def geocode_address(address: str) -> Optional[Dict]:
        """Get coordinates for an address using Nominatim (OpenStreetMap)"""
        try:
            url = "https://nominatim.openstreetmap.org/search"
            params = {
                'q': address,
                'format': 'json',
                'limit': 1,
                'addressdetails': 1
            }
            headers = {
                'User-Agent': 'Asha-AI-HealthPlatform/1.0'
            }
            
            response = requests.get(url, params=params, headers=headers, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            if data:
                result = data[0]
                return {
                    'latitude': float(result['lat']),
                    'longitude': float(result['lon']),
                    'display_name': result['display_name'],
                    'address_details': result.get('address', {})
                }
        except Exception as e:
            logger.error(f"Geocoding failed for address '{address}': {str(e)}")
            
        return None
    
    @staticmethod
    def reverse_geocode(lat: float, lon: float) -> Optional[Dict]:
        """Get address details from coordinates"""
        try:
            url = "https://nominatim.openstreetmap.org/reverse"
            params = {
                'lat': lat,
                'lon': lon,
                'format': 'json',
                'addressdetails': 1
            }
            headers = {
                'User-Agent': 'Asha-AI-HealthPlatform/1.0'
            }
            
            response = requests.get(url, params=params, headers=headers, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            if data:
                address = data.get('address', {})
                return {
                    'country': address.get('country'),
                    'state': address.get('state'),
                    'city': address.get('city') or address.get('town') or address.get('village'),
                    'district': address.get('suburb') or address.get('neighbourhood'),
                    'postcode': address.get('postcode'),
                    'display_name': data.get('display_name')
                }
        except Exception as e:
            logger.error(f"Reverse geocoding failed for coordinates {lat}, {lon}: {str(e)}")
            
        return None

class IndianLocationService:
    """Specialized service for Indian administrative boundaries"""
    
    @staticmethod
    def load_indian_administrative_data():
        """Load Indian states, districts, and cities from a comprehensive dataset"""
        indian_states_data = {
            'Andhra Pradesh': {
                'code': 'AP',
                'major_cities': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool']
            },
            'Maharashtra': {
                'code': 'MH',
                'major_cities': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad']
            },
            'Madhya Pradesh': {
                'code': 'MP',
                'major_cities': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain']
            },
            # Add more states as needed
        }
        
        # Create or update India
        india = CountryModel.query.filter_by(country_code='IND').first()
        if not india:
            india = CountryModel(country_name='India', country_code='IND')
            db.session.add(india)
            db.session.flush()
        
        for state_name, state_info in indian_states_data.items():
            # Create or update state
            state = StateModel.query.filter_by(
                state_name=state_name, 
                country_id=india.country_id
            ).first()
            if not state:
                state = StateModel(
                    state_name=state_name,
                    state_code=state_info['code'],
                    country_id=india.country_id
                )
                db.session.add(state)
                db.session.flush()
            
            # Add major cities
            for city_name in state_info['major_cities']:
                city = CityModel.query.filter_by(
                    city_name=city_name,
                    state_id=state.state_id
                ).first()
                if not city:
                    # You might want to geocode these cities to get coordinates
                    city = CityModel(
                        city_name=city_name,
                        state_id=state.state_id
                    )
                    db.session.add(city)
        
        db.session.commit()
        return True