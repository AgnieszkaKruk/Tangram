from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/start_game')
def start_game():
    return render_template('start_game.html')


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/register')
def register():
    return render_template('register.html')


@app.route('/user_profile')
def user_profile():
    return render_template('user_profile.html')


@app.route('/ranking')
def ranking():
    return render_template('ranking.html')


if __name__ == '__main__':
    app.run(debug=True)
