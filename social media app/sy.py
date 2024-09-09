from flask import Flask, request, jsonify
app = Flask(__name__)

# ye memory storage hai
posts = []

@app.route('/api/posts', methods=['GET'])
def get_posts():
    return jsonify({'posts': posts})

@app.route('/api/posts', methods=['POST'])
def create_post():
    data = request.json
    content = data.get('content')
    
    if content:
        post = {'content': content}
        posts.append(post)
        return jsonify(post), 201
    else:
        return jsonify({'error': 'Content is required'}), 400

if __name__ == '__main__':
    app.run(debug=True)