import database_common


@database_common.connection_handler
def register(cursor, user_name,user_password, email):
    query = """
        INSERT INTO users (user_name, user_password, email) values(%s, %s,%s);"""
    cursor.execute(query, (user_name, user_password, email))


@database_common.connection_handler
def get_user(cursor, user_name):
    query = """
        SELECT *
        from users
        WHERE user_name = %s
        ORDER BY id DESC;"""
    cursor.execute(query, (user_name,))
    return cursor.fetchone()