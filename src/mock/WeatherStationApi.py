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

forecast_hourly = {
    "source": "TomorrowIO-Hourly",
    "timestamp": "latest",
    "temperature": ["11.6", "10.8", "10.1", "9.6", "9.3", "9.2", "9.0", "10.4", "12.4", "14.2", "15.6", "16.8", "18.1", "19.1", "20.2", "21.1", "21.7", "22.0", "22.0", "21.8", "21.2", "19.6", "17.3",
                    "15.6", "15.0"],
    "rain": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "5", "15", "30", "40", "50", "55", "50", "45", "35", "20", "10", "5", "5", "5"],
    "dataFor": ["20210613-000000", "20210613-010000", "20210613-020000", "20210613-030000", "20210613-040000", "20210613-050000", "20210613-060000", "20210613-070000",
                "20210613-080000", "20210613-090000", "20210613-100000", "20210613-110000", "20210613-120000", "20210613-130000", "20210613-140000", "20210613-150000",
                "20210613-160000", "20210613-170000", "20210613-180000", "20210613-190000", "20210613-200000", "20210613-210000", "20210613-220000", "20210613-230000",
                "20210614-000000"]}

forecast_daily = {
    "source": "TomorrowIO-Daily",
    "timestamp": "latest",
    "temperature": ["7.8", "5.4", "4.4", "6.6", "10.2", "9.0"],
    "rain": ["5", "55", "50", "65", "55", "5"],
    "dataFor": ["20210612-060000", "20210613-060000", "20210614-060000", "20210615-060000", "20210616-060000", "20210617-060000"]
}

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
