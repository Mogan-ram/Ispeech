from flask import Flask, render_template, request, jsonify
from tts.tts import translate_and_speak, languages

app = Flask(__name__, static_folder="static")


# Route to display the front-end page
@app.route("/")
def home():
    return render_template("parallax.html")


# Route to handle TTS requests
@app.route("/convert", methods=["POST"])
def convert():
    data = request.json
    language = data["language"]
    text = data["text"]
    try:
        translate_and_speak(language, text)
        return jsonify({"message": "Success"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
