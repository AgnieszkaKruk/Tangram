from flask import Flask, render_template, request,redirect,flash,url_for,session
import database_common, data_manager
import bcrypt

app = Flask(__name__)
app.config['SECRET_KEY'] = "dfsdfefewreew"


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/start_game')
def start_game():
    return render_template('start_game.html')


@app.route('/start_game2')
def start_game2():
    return render_template('start_game2.html')


@app.route('/start_game3')
def start_game3():
    return render_template('start_game3.html')

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == 'GET':
        return render_template('register.html')
    if request.method == "POST":
        user_name = request.form['user_name']
        user_password = request.form['user_password']
        email = request.form['email']
        repeated_password = request.form['repeated_password']
        session['user_name'] = request.form['user_name']

        user = data_manager.get_user(user_name)
        if user is not None:
            flash('You are already registered! Log in!')
            return redirect(url_for("login"))

        elif user_password != repeated_password:
            flash('Passwords are not the same, try again!')
            return redirect(url_for("register"))

        else:
            data_manager.register(user_name, hash_password(), email)
            flash(
                'You are now registered!')
            return redirect(url_for('start_game'))


def hash_password():
    password = request.form['user_password']
    hashed_password = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())
    return hashed_password.decode('utf-8')


@app.route('/login', methods= ["GET", "POST"])

def login():

    if request.method == 'GET':
        return render_template("login.html")
    else:
        user_name = request.form['user_name']
        password = request.form['user_password']
        user = data_manager.get_user(user_name)


        if user is None:
            flash("You have to register first")
            return redirect(url_for('register'))
        else:
            hashed = user['user_password']
            if bcrypt.checkpw(password.encode('utf8'), hashed.encode('utf-8')):
                session['user_name'] = user_name
                flash("You now logged!")
                return redirect(url_for("start_game"))
            else:
                flash('Your password is wrong, try again!')
                return render_template(url_for("login"))



@app.route('/user_profile')
def user_profile():
    username = session.get('user_name')
    if username:
        user = data_manager.get_user(username)
        return render_template('user_profile.html', user=user)
    flash('Log in to access user profile')
    return redirect(url_for("login"))


if __name__ == '__main__':
    app.run(debug=True)    