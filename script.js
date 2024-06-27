document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');

    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    fetch('https://api.github.com/users/FrancivandoLopes/repos')
        .then(response => response.json())
        .then(data => {
            const reposContainer = document.getElementById('repos');
            data.forEach(repo => {
                const repoDiv = document.createElement('div');
                repoDiv.classList.add('repo');
                repoDiv.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description}</p>
                    <a href="${repo.html_url}" target="_blank">Ver Repositório</a>
                `;
                reposContainer.appendChild(repoDiv);
            });
        });
});
