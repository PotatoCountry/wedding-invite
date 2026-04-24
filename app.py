from flask import Flask, render_template, request, jsonify
import sqlite3
from datetime import datetime

app = Flask(__name__)

def init_db():
    conn = sqlite3.connect('wedding.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS rsvp_submissions
                 (id INTEGER PRIMARY KEY, name TEXT, phone TEXT, attendance TEXT, guest_count INTEGER, meal_preference TEXT, message TEXT, created_at TIMESTAMP)''')
    c.execute('''CREATE TABLE IF NOT EXISTS guestbook_messages
                 (id INTEGER PRIMARY KEY, author TEXT, content TEXT, color_index INTEGER, created_at TIMESTAMP)''')
    conn.commit()
    conn.close()

init_db()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/rsvp', methods=['POST'])
def submit_rsvp():
    data = request.json
    conn = sqlite3.connect('wedding.db')
    c = conn.cursor()
    c.execute('''INSERT INTO rsvp_submissions (name, phone, attendance, guest_count, meal_preference, message, created_at)
                 VALUES (?, ?, ?, ?, ?, ?, ?)''',
              (data['name'], data['phone'], data['attendance'], data['guest_count'], data['meal'], data['message'], datetime.now()))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

@app.route('/api/guestbook', methods=['GET', 'POST'])
def guestbook():
    if request.method == 'POST':
        data = request.json
        conn = sqlite3.connect('wedding.db')
        c = conn.cursor()
        c.execute('''INSERT INTO guestbook_messages (author, content, color_index, created_at)
                     VALUES (?, ?, ?, ?)''',
                  (data['author'], data['content'], data['color_index'], datetime.now()))
        conn.commit()
        conn.close()
        return jsonify({'success': True})
    else:
        conn = sqlite3.connect('wedding.db')
        c = conn.cursor()
        c.execute('SELECT author, content, color_index FROM guestbook_messages ORDER BY created_at DESC')
        messages = c.fetchall()
        conn.close()
        return jsonify(messages)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)