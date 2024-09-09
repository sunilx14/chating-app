document.getElementById('post-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const content = document.getElementById('post-content').value;
    
    if (content) {
        fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: content })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Post created:', data);
            loadPosts();
        });
    }
});

function loadPosts() {
    fetch('/api/posts')
    .then(response => response.json())
    .then(data => {
        const postsSection = document.getElementById('posts');
        postsSection.innerHTML = '';
        data.posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerText = post.content;
            postsSection.appendChild(postElement);
        });
    });
}

// Load posts on page load
document.addEventListener('DOMContentLoaded', loadPosts);
