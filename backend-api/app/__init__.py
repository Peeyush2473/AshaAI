# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_bcrypt import Bcrypt
# from flask_jwt_extended import JWTManager
# from flask_cors import CORS
# from config import Config

# db = SQLAlchemy()
# bcrypt = Bcrypt()
# jwt = JWTManager()

# def create_app(config_class=Config):
#     app = Flask(__name__)
#     app.config.from_object(config_class)

#     CORS(app) 

#     db.init_app(app)
#     bcrypt.init_app(app)
#     jwt.init_app(app)

#     from .routes.auth_routes import auth_bp
#     from .routes.screening_routes import screening_bp
#     from .routes.dashboard_routes import dashboard_bp

#     app.register_blueprint(auth_bp, url_prefix='/api/auth')
#     app.register_blueprint(screening_bp, url_prefix='/api/screenings')
#     app.register_blueprint(dashboard_bp, url_prefix='/api/dashboard')

#     return app











# app/__init__.py (Enhanced)
from flask import Flask, request, g
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from config import config
import logging
from datetime import datetime

# Initialize extensions
db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

def create_app(config_name=None):
    """Application factory pattern"""
    app = Flask(__name__)
    
    # Load configuration
    config_name = config_name or 'development'
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    
    # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    limiter.init_app(app)
    
    # Configure CORS
    CORS(app, origins=app.config['CORS_ORIGINS'])
    
    # Configure logging
    if not app.debug:
        logging.basicConfig(
            level=getattr(logging, app.config['LOG_LEVEL']),
            format='%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
        )
    
    # Register blueprints
    from .routes.auth_routes import auth_bp
    from .routes.screening_routes import screening_bp
    from .routes.dashboard_routes import dashboard_bp
    from .routes.location_routes import location_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(screening_bp, url_prefix='/api/screenings')
    app.register_blueprint(dashboard_bp, url_prefix='/api/dashboard')
    app.register_blueprint(location_bp, url_prefix='/api/locations')
    
    # Request middleware
    @app.before_request
    def before_request():
        """Log request info and set up request context"""
        g.start_time = datetime.utcnow()
        if not request.endpoint or request.endpoint == 'static':
            return
            
        app.logger.info(f"{request.method} {request.path} - {get_remote_address()}")
    
    @app.after_request
    def after_request(response):
        """Log response info and add security headers"""
        if hasattr(g, 'start_time'):
            duration = (datetime.utcnow() - g.start_time).total_seconds()
            app.logger.info(f"Response {response.status_code} - Duration: {duration:.3f}s")
        
        # Security headers
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-Frame-Options'] = 'DENY'
        response.headers['X-XSS-Protection'] = '1; mode=block'
        
        return response
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return {'message': 'Resource not found'}, 404
    
    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        app.logger.error(f"Internal server error: {str(error)}")
        return {'message': 'Internal server error'}, 500
    
    @app.errorhandler(429)
    def ratelimit_handler(e):
        return {'message': 'Rate limit exceeded', 'retry_after': str(e.retry_after)}, 429
    
    # Health check endpoint
    @app.route('/health')
    def health_check():
        """Health check endpoint for monitoring"""
        return {
            'status': 'healthy',
            'timestamp': datetime.utcnow().isoformat(),
            'version': '2.0'
        }
    
    return app
