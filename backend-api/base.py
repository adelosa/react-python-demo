import json
import flask
import flask_jwt_extended as jwtlib
import flask_cors
from datetime import datetime, timedelta, timezone

api = flask.Flask(__name__)
flask_cors.CORS(api)

api.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = jwtlib.JWTManager(api)

@api.route('/token', methods=["POST"])
def create_token():
    email = flask.request.json.get("email", None)
    password = flask.request.json.get("password", None)
    if email != "test" or password != "test":
        return {"msg": "Wrong email or password"}, 401

    access_token = jwtlib.create_access_token(identity=email,)
    response = {"access_token": access_token}
    return response


@api.route('/profile')
@jwtlib.jwt_required()
def my_profile():
    response_body = {
        "name": "Nagato",
        "about": "Hello! I'm a full stack developer that loves python and javascript"
    }
    response_body = {**response_body, **jwtlib.get_jwt()}
    return response_body


@api.route("/logout", methods=["POST"])
def logout():
    response = flask.jsonify({"msg": "logout successful"})
    jwtlib.unset_jwt_cookies(response)
    return response


@api.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = jwtlib.get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = jwtlib.create_access_token(identity=jwtlib.get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original response
        return response


if __name__ == '__main__':
    api.run(debug=True)
