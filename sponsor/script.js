function loadSponsors() {
    fetch('sponsor/sponsors.json')
        .then(response => response.json())
        .then(sponsors => {
            const sponsorWall = document.getElementById('sponsor-wall');
            sponsors.forEach(sponsor => {
                const sponsorElement = document.createElement('div');
                sponsorElement.classList.add('sponsor');

                const sponsorLink = document.createElement('a');
                sponsorLink.href = sponsor.website;
                sponsorLink.target = '_blank';

                const sponsorImage = document.createElement('img');
                sponsorImage.src = `image/sponsors/${sponsor.name}.png`
                sponsorImage.alt = sponsor.name;
                sponsorImage.draggable = false;

                sponsorLink.appendChild(sponsorImage);
                sponsorElement.appendChild(sponsorLink);

                sponsorWall.appendChild(sponsorElement);
            });
        })
        .catch(error => {
            console.error('Error loading sponsors:', error);
        });
}

window.addEventListener('load', loadSponsors);