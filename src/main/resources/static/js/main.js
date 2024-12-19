document.getElementById('imageForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', document.getElementById('imageInput').files[0]);
    formData.append('question', document.getElementById('questionInput').value);

    try {
        const response = await fetch('/api/image-analysis', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to fetch analysis');
        }

        const result = await response.text();

        const resultDiv = document.getElementById('result');
        resultDiv.textContent = result;
        resultDiv.classList.add('show');

    } catch (error) {
        const resultDiv = document.getElementById('result');
        resultDiv.textContent = 'Error: ' + error.message;
        resultDiv.classList.add('show');
    }
});

const modeToggle = document.getElementById('modeToggle');
const body = document.body;
const savedMode = localStorage.getItem('theme') || 'light';
body.classList.add(savedMode);
updateButtonText(savedMode);

modeToggle.addEventListener('click', () => {
    if (body.classList.contains('light')) {
        body.classList.remove('light');
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        updateButtonText('dark');
    } else {
        body.classList.remove('dark');
        body.classList.add('light');
        localStorage.setItem('theme', 'light');
        updateButtonText('light');
    }
});

function updateButtonText(mode) {
    if (mode === 'dark') {
        modeToggle.textContent = '🌑';
    } else {
        modeToggle.textContent = '☀️';
    }
}

const eyeball = document.querySelector(".ball");
document.onmousemove = () => {
    const x = event.clientX * 100 / window.innerWidth + "%";
    const y = event.clientY * 100 / window.innerHeight + "%";
    eyeball.style.left = x;
    eyeball.style.top = y;
    eyeball.style.transform = "translate(-"+x+",-"+y+")";
}
