const input = document.querySelector('.enter');
const commentList = document.querySelector('.comment-list');

// Load saved comments from localStorage
window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('comments');
    if (saved) {
        const comments = JSON.parse(saved);
        comments.forEach(comment => renderComment(comment));
    }
});

const saveToLocalStorage = () => {
    const allComments = [];
    document.querySelectorAll('.comment').forEach(comment => {
        const text = comment.querySelector('.text').textContent;
        const name = comment.querySelector('.meta strong').textContent;
        const time = comment.querySelector('.meta').textContent.split('•')[1].trim();
        const voteCount = comment.querySelector('.vote-count').textContent;
        const replies = [];
        comment.querySelectorAll('.reply-comment').forEach(reply => {
            replies.push(reply.textContent);
        });

        allComments.push({ name, text, time, voteCount, replies });
    });
    localStorage.setItem('comments', JSON.stringify(allComments));
};

const create = () => {
    const value = input.value.trim();
    if (value) {
        const name = 'User';
        const timeStamp = new Date().toLocaleString();
        renderComment({ name, text: value, time: timeStamp, voteCount: 0, replies: [] });
        saveToLocalStorage();
        input.value = '';
    }
};

const renderComment = ({ name, text, time, voteCount, replies }) => {
    const comment = document.createElement('div');
    comment.className = 'comment';
    comment.innerHTML = `
        <div class="meta"><strong>${name}</strong> • ${time}</div>
        <div class="text">${text}</div>
        <div class="actions">
            <button class="upvote">👍</button>
            <span class="vote-count">${voteCount}</span>
            <button class="downvote">👎</button>
            <button class="reply-btn">Reply</button>
            <button class="delete-btn">Delete</button>
        </div>
        <div class="replies"></div>
    `;

    const upvoteBtn = comment.querySelector('.upvote');
    const downvoteBtn = comment.querySelector('.downvote');
    const replyBtn = comment.querySelector('.reply-btn');
    const voteSpan = comment.querySelector('.vote-count');
    const repliesContainer = comment.querySelector('.replies');
    const deleteBtn = comment.querySelector('.delete-btn');

    let count = parseInt(voteCount);

    upvoteBtn.addEventListener('click', () => {
        count++;
        voteSpan.textContent = count;
        saveToLocalStorage();
    });

    downvoteBtn.addEventListener('click', () => {
        count--;
        voteSpan.textContent = count;
        saveToLocalStorage();
    });

    replyBtn.addEventListener('click', () => {
        if (comment.querySelector('.createReply')) return;
    
        const replyBox = document.createElement('div');
        replyBox.className = 'createReply';
        replyBox.innerHTML = `
            <input class="enterReply" placeholder="Add reply...">
            <button class="submitReply">Submit</button>
        `;
        repliesContainer.appendChild(replyBox);
    
        const submitReplyBtn = replyBox.querySelector('.submitReply');
        const replyInput = replyBox.querySelector('.enterReply');
    
        submitReplyBtn.addEventListener('click', () => {
            const replyText = replyInput.value.trim();
            if (replyText) {
                const time = new Date().toLocaleString();
                const replyComment = createReplyElement(`@${name} ${replyText}`, time, 0);
                repliesContainer.appendChild(replyComment);
                replyBox.remove();
                saveToLocalStorage();
            }
        });
    });
    
    

    replies.forEach(reply => {
        const replyComment = document.createElement('div');
        replyComment.className = 'reply-comment';
        replyComment.textContent = reply;
        repliesContainer.appendChild(replyComment);
    });

    deleteBtn.addEventListener('click', () => {
        comment.remove();
        saveToLocalStorage();
    });

    commentList.appendChild(comment);
};

function createReplyElement(text, time, voteCount) {
    const replyComment = document.createElement('div');
    replyComment.className = 'reply-comment';
    replyComment.innerHTML = `
        <div class="reply-meta">
            <span class="reply-time">${time}</span>
        </div>
        <div class="reply-text">${text}</div>
        <div class="reply-actions">
            <button class="reply-upvote">👍</button>
            <span class="reply-vote-count">${voteCount}</span>
            <button class="reply-downvote">👎</button>
            <button class="reply-delete">Delete</button>
        </div>
    `;

    const upvoteBtn = replyComment.querySelector('.reply-upvote');
    const downvoteBtn = replyComment.querySelector('.reply-downvote');
    const deleteBtn = replyComment.querySelector('.reply-delete');
    const voteSpan = replyComment.querySelector('.reply-vote-count');

    let count = parseInt(voteCount);

    upvoteBtn.addEventListener('click', () => {
        count++;
        voteSpan.textContent = count;
        saveToLocalStorage();
    });

    downvoteBtn.addEventListener('click', () => {
        count--;
        voteSpan.textContent = count;
        saveToLocalStorage();
    });

    deleteBtn.addEventListener('click', () => {
        replyComment.remove();
        saveToLocalStorage();
    });

    return replyComment;
}

replies.forEach(reply => {
    const replyComment = createReplyElement(reply, time, 0); // default voteCount for old ones
    repliesContainer.appendChild(replyComment);
});

