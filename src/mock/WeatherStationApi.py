from flask import Flask, jsonify, request, abort

sensor_data = [
    {"source": "WeatherStation", "timestamp": "20210418-210000", "temperature": ["13.3"], "humidity":["62"], "windSpeed":["2.7"], "gustSpeed":["3.4"], "rain":["168.9"], "windDirection":["135.0"], "dataFor":["20210418-210000"]},
    {"source": "WeatherStation", "timestamp": "20210418-211500", "temperature": ["13.0"], "humidity":["62"], "windSpeed":["1.3"], "gustSpeed":["2.3"], "rain":["168.9"], "windDirection":["135.0"], "dataFor":["20210418-211500"]},
    {"source": "WeatherStation", "timestamp": "20210418-213000", "temperature": ["12.6"], "humidity":["63"], "windSpeed":["1.3"], "gustSpeed":["2.0"], "rain":["168.9"], "windDirection":["135.0"], "dataFor":["20210418-213000"]},
    {"source": "WeatherStation", "timestamp": "20210418-214500", "temperature": ["12.3"], "humidity":["68"], "windSpeed":["1.7"], "gustSpeed":["2.7"], "rain":["168.9"], "windDirection":["135.0"], "dataFor":["20210418-214500"]},
    {"source": "WeatherStation", "timestamp": "20210418-220000", "temperature": ["12.4"], "humidity":["66"], "windSpeed":["2.3"], "gustSpeed":["3.0"], "rain":["168.9"], "windDirection":["135.0"], "dataFor":["20210418-220000"]},
    {"source": "WeatherStation", "timestamp": "20210418-221500", "temperature": ["11.8"], "humidity":["68"], "windSpeed":["2.0"], "gustSpeed":["2.7"], "rain":["168.9"], "windDirection":["135.0"], "dataFor":["20210418-221500"]},
    {"source": "WeatherStation", "timestamp": "20210418-223000", "temperature": ["11.3"], "humidity":["70"], "windSpeed":["1.7"], "gustSpeed":["2.0"], "rain":["168.9"], "windDirection":["180.0"], "dataFor":["20210418-223000"]}
]

forecast_hourly = [
    {"timestamp": "20210404-180000", "temperature": 7.43, "precipitationProbability": 0},
    {"timestamp": "20210404-190000", "temperature": 7.25, "precipitationProbability": 0},
    {"timestamp": "20210404-200000", "temperature": 6.27, "precipitationProbability": 0},
    {"timestamp": "20210404-210000", "temperature": 5.04, "precipitationProbability": 0},
    {"timestamp": "20210404-220000", "temperature": 4.05, "precipitationProbability": 0},
    {"timestamp": "20210404-230000", "temperature": 3.52, "precipitationProbability": 0},
    {"timestamp": "20210405-000000", "temperature": 3.15, "precipitationProbability": 0},
    {"timestamp": "20210405-010000", "temperature": 3.02, "precipitationProbability": 0},
    {"timestamp": "20210405-020000", "temperature": 2.88, "precipitationProbability": 0},
    {"timestamp": "20210405-030000", "temperature": 3.12, "precipitationProbability": 0},
    {"timestamp": "20210405-040000", "temperature": 3.75, "precipitationProbability": 0},
    {"timestamp": "20210405-050000", "temperature": 4.01, "precipitationProbability": 5},
    {"timestamp": "20210405-060000", "temperature": 4.21, "precipitationProbability": 15},
    {"timestamp": "20210405-070000", "temperature": 4.29, "precipitationProbability": 30},
    {"timestamp": "20210405-080000", "temperature": 4.79, "precipitationProbability": 40},
    {"timestamp": "20210405-090000", "temperature": 5.48, "precipitationProbability": 50},
    {"timestamp": "20210405-100000", "temperature": 5.22, "precipitationProbability": 55},
    {"timestamp": "20210405-110000", "temperature": 3.41, "precipitationProbability": 50},
    {"timestamp": "20210405-120000", "temperature": 3.27, "precipitationProbability": 45},
    {"timestamp": "20210405-130000", "temperature": 3.75, "precipitationProbability": 35},
    {"timestamp": "20210405-140000", "temperature": 4.28, "precipitationProbability": 20},
    {"timestamp": "20210405-150000", "temperature": 4.66, "precipitationProbability": 10},
    {"timestamp": "20210405-160000", "temperature": 4.63, "precipitationProbability": 5},
    {"timestamp": "20210405-170000", "temperature": 3.96, "precipitationProbability": 5},
    {"timestamp": "20210405-180000", "temperature": 3.28, "precipitationProbability": 5}
]

forecast_daily = [
    {"timestamp": "20210404-060000", "temperature": 7.81, "precipitationProbability": 5},
    {"timestamp": "20210405-060000", "temperature": 5.48, "precipitationProbability": 55},
    {"timestamp": "20210406-060000", "temperature": 4.44, "precipitationProbability": 50},
    {"timestamp": "20210407-060000", "temperature": 6.6, "precipitationProbability": 65},
    {"timestamp": "20210408-060000", "temperature": 10.29, "precipitationProbability": 55},
    {"timestamp": "20210409-060000", "temperature": 9.07, "precipitationProbability": 5}
]

api = Flask(__name__)


@api.route('/api/weather', methods=['GET'])
def get_weather_data():
    response = jsonify(sensor_data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@api.route('/api/forecast', methods=['GET'])
def get_weather_forecast():
    if request.args.get('resolution') == 'hourly':
        response = jsonify(forecast_hourly)
    elif request.args.get('resolution') == 'daily':
        response = jsonify(forecast_daily)
    else:
        return abort(404, description='Wrong/missing resolution')
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == '__main__':
    api.run()
