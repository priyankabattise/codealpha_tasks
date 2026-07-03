// Sample image data with categories
const images = [
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', title: 'Mountain view', category: 'nature', description: 'Beautiful mountain landscape' },
    { src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800', title: 'City buildings', category: 'city', description: 'Urban scene' },
    { src: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800', title: 'Panda', category: 'animals', description: 'Wildlife' },
    { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800', title: 'Technology', category: 'technology', description: 'Modern tech setup' },
    { src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800', title: 'Forest path', category: 'nature', description: 'Peaceful forest trail' },
    { src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800', title: 'Urban sunset', category: 'city', description: 'City view' },
    { src: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800', title: 'Cute mouse', category: 'animals', description: 'Adorable mice' },
    { src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800', title: 'Gadgets', category: 'technology', description: 'Latest technology' },
    { src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800', title: 'Mountain sunset', category: 'nature', description: 'Tranquil sunset' },
    { src: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800', title: 'Night City', category: 'city', description: 'City skyline at night' },
    { src: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800', title: 'Human', category: 'animals', description: 'Forest' },
    { src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800', title: 'Laptop ', category: 'technology', description: 'Technology' }
];

let currentImageIndex = 0;
let currentFilter = 'all';
let zoomLevel = 1;
let filteredImages = [...images];

// Filter settings
let filterSettings = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    grayscale: 0,
    sepia: 0
};

// Load gallery
function loadGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    filteredImages.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.setAttribute('data-category', image.category);

        item.innerHTML = `
            <img src="${image.src}" alt="${image.title}" loading="lazy">
            <div class="overlay">
                <h3>${image.title}</h3>
                <p>${image.description}</p>
            </div>
        `;

        item.addEventListener('click', () => openLightbox(index));
        gallery.appendChild(item);
    });
}

// Filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        currentFilter = filter;

        if (filter === 'all') {
            filteredImages = [...images];
        } else {
            filteredImages = images.filter(img => img.category === filter);
        }

        loadGallery();
    });
});

// Open lightbox
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');

    lightbox.classList.add('active');
    lightboxImage.src = filteredImages[index].src;
    updateImageCounter();
    resetZoom();
    resetFilters();
    document.body.style.overflow = 'hidden';
}

// Close lightbox
document.getElementById('closeBtn').addEventListener('click', closeLightbox);

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.getElementById('editPanel').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close on background click
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

// Navigation
document.getElementById('prevBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    navigateImage(-1);
});

document.getElementById('nextBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    navigateImage(1);
});

function navigateImage(direction) {
    currentImageIndex += direction;

    if (currentImageIndex < 0) {
        currentImageIndex = filteredImages.length - 1;
    } else if (currentImageIndex >= filteredImages.length) {
        currentImageIndex = 0;
    }

    const lightboxImage = document.getElementById('lightboxImage');
    lightboxImage.style.opacity = '0';

    setTimeout(() => {
        lightboxImage.src = filteredImages[currentImageIndex].src;
        lightboxImage.style.opacity = '1';
        updateImageCounter();
        resetZoom();
        resetFilters();
    }, 150);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');

    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft') navigateImage(-1);
        if (e.key === 'ArrowRight') navigateImage(1);
        if (e.key === 'Escape') closeLightbox();
    }
});

// Zoom functionality
document.getElementById('zoomInBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    zoomLevel = Math.min(zoomLevel + 0.2, 3);
    applyZoom();
});

document.getElementById('zoomOutBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    zoomLevel = Math.max(zoomLevel - 0.2, 0.5);
    applyZoom();
});

document.getElementById('resetZoomBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    resetZoom();
});

function applyZoom() {
    const lightboxImage = document.getElementById('lightboxImage');
    lightboxImage.style.transform = `scale(${zoomLevel})`;
}

function resetZoom() {
    zoomLevel = 1;
    applyZoom();
}

// Edit functionality
document.getElementById('editBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    const editPanel = document.getElementById('editPanel');
    editPanel.classList.toggle('active');
});

// Filter controls
const filterControls = [
    'brightness',
    'contrast',
    'saturation',
    'blur',
    'grayscale',
    'sepia'
];

filterControls.forEach(control => {
    const input = document.getElementById(control);
    const valueDisplay = document.getElementById(control + 'Value');

    input.addEventListener('input', (e) => {
        const value = e.target.value;
        filterSettings[control] = value;
        valueDisplay.textContent = value;
        applyFilters();
    });
});

function applyFilters() {
    const lightboxImage = document.getElementById('lightboxImage');

    const filters = `
        brightness(${filterSettings.brightness}%)
        contrast(${filterSettings.contrast}%)
        saturate(${filterSettings.saturation}%)
        blur(${filterSettings.blur}px)
        grayscale(${filterSettings.grayscale}%)
        sepia(${filterSettings.sepia}%)
    `;

    lightboxImage.style.filter = filters;
}

document.getElementById('resetFiltersBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    resetFilters();
});

function resetFilters() {
    filterSettings = {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        blur: 0,
        grayscale: 0,
        sepia: 0
    };

    filterControls.forEach(control => {
        const input = document.getElementById(control);
        const valueDisplay = document.getElementById(control + 'Value');

        input.value = filterSettings[control];
        valueDisplay.textContent = filterSettings[control];
    });

    applyFilters();
}

// Download functionality
document.getElementById('downloadBtn').addEventListener('click', async (e) => {
    e.stopPropagation();

    const img = document.getElementById('lightboxImage');
    const btn = e.target;
    const originalText = btn.textContent;

    btn.textContent = 'Downloading...';

    try {
        const response = await fetch(img.src);
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `image-${currentImageIndex + 1}.jpg`;

        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        btn.textContent = '✓ Downloaded';

        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);

    } catch (error) {
        btn.textContent = '✗ Failed';

        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }
});

// Update image counter
function updateImageCounter() {
    const counter = document.getElementById('imageCounter');
    counter.textContent = `${currentImageIndex + 1} / ${filteredImages.length}`;
}

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('lightbox').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.getElementById('lightbox').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        navigateImage(1); // Swipe left - next image
    }

    if (touchEndX > touchStartX + 50) {
        navigateImage(-1); // Swipe right - previous image
    }
}

// Initialize gallery on load
window.addEventListener('load', loadGallery);