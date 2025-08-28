class URLShortener {
    constructor() {
        this.baseUrl = 'https://short.ly/';
        this.urlDatabase = new Map();
        this.reverseDatabase = new Map();
        this.init();
    }

    init() {
        this.longUrlInput = document.getElementById('longUrl');
        this.shortenBtn = document.getElementById('shortenBtn');
        this.shortUrlInput = document.getElementById('shortUrl');
        this.copyBtn = document.getElementById('copyBtn');
        this.resultSection = document.getElementById('resultSection');
        this.errorMessage = document.getElementById('errorMessage');
        this.successMessage = document.getElementById('successMessage');

        this.bindEvents();
        this.loadFromStorage();
    }

    bindEvents() {
        this.shortenBtn.addEventListener('click', () => this.shortenUrl());
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        this.longUrlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.shortenUrl();
            }
        });
        this.longUrlInput.addEventListener('input', () => this.clearMessages());
    }

    validateUrl(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
        } catch {
            return false;
        }
    }

    generateShortCode() {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    shortenUrl() {
        const longUrl = this.longUrlInput.value.trim();
        
        this.clearMessages();
        
        if (!longUrl) {
            this.showError('Please enter a URL to shorten.');
            return;
        }

        if (!this.validateUrl(longUrl)) {
            this.showError('Please enter a valid URL (must start with http:// or https://)');
            return;
        }

        // Check if URL already exists
        if (this.reverseDatabase.has(longUrl)) {
            const existingShortCode = this.reverseDatabase.get(longUrl);
            this.displayResult(this.baseUrl + existingShortCode);
            this.showSuccess('URL already shortened! Here\'s your existing short link.');
            return;
        }

        this.shortenBtn.disabled = true;
        this.shortenBtn.textContent = 'Shortening...';

        // Simulate API delay for better UX
        setTimeout(() => {
            let shortCode;
            do {
                shortCode = this.generateShortCode();
            } while (this.urlDatabase.has(shortCode));

            const shortUrl = this.baseUrl + shortCode;
            
            // Store in databases
            this.urlDatabase.set(shortCode, longUrl);
            this.reverseDatabase.set(longUrl, shortCode);
            
            // Save to localStorage
            this.saveToStorage();
            
            this.displayResult(shortUrl);
            this.showSuccess('URL shortened successfully!');
            
            this.shortenBtn.disabled = false;
            this.shortenBtn.textContent = 'Shorten URL';
        }, 500);
    }

    displayResult(shortUrl) {
        this.shortUrlInput.value = shortUrl;
        this.resultSection.style.display = 'block';
        this.resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    async copyToClipboard() {
        try {
            await navigator.clipboard.writeText(this.shortUrlInput.value);
            this.copyBtn.textContent = 'Copied!';
            this.copyBtn.classList.add('copied');
            this.showSuccess('Short URL copied to clipboard!');
            
            setTimeout(() => {
                this.copyBtn.textContent = 'Copy';
                this.copyBtn.classList.remove('copied');
            }, 2000);
        } catch (err) {
            // Fallback for older browsers
            this.shortUrlInput.select();
            this.shortUrlInput.setSelectionRange(0, 99999);
            document.execCommand('copy');
            
            this.copyBtn.textContent = 'Copied!';
            this.copyBtn.classList.add('copied');
            this.showSuccess('Short URL copied to clipboard!');
            
            setTimeout(() => {
                this.copyBtn.textContent = 'Copy';
                this.copyBtn.classList.remove('copied');
            }, 2000);
        }
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
    }

    showSuccess(message) {
        this.successMessage.textContent = message;
        setTimeout(() => {
            this.successMessage.textContent = '';
        }, 3000);
    }

    clearMessages() {
        this.errorMessage.textContent = '';
        this.successMessage.textContent = '';
    }

    saveToStorage() {
        try {
            const data = {
                urlDatabase: Array.from(this.urlDatabase.entries()),
                reverseDatabase: Array.from(this.reverseDatabase.entries())
            };
            localStorage.setItem('urlShortenerData', JSON.stringify(data));
        } catch (err) {
            console.warn('Could not save to localStorage:', err);
        }
    }

    loadFromStorage() {
        try {
            const data = localStorage.getItem('urlShortenerData');
            if (data) {
                const parsed = JSON.parse(data);
                this.urlDatabase = new Map(parsed.urlDatabase || []);
                this.reverseDatabase = new Map(parsed.reverseDatabase || []);
            }
        } catch (err) {
            console.warn('Could not load from localStorage:', err);
        }
    }

    // Method to handle redirects (for demonstration)
    redirect(shortCode) {
        const longUrl = this.urlDatabase.get(shortCode);
        if (longUrl) {
            window.open(longUrl, '_blank');
            return true;
        }
        return false;
    }
}

// Initialize the URL shortener when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new URLShortener();
});

// Handle short URL clicks (for demonstration purposes)
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.href.includes('short.ly/')) {
        e.preventDefault();
        const shortCode = e.target.href.split('/').pop();
        const urlShortener = new URLShortener();
        if (!urlShortener.redirect(shortCode)) {
            alert('Short URL not found or expired.');
        }
    }
});

// Add some utility functions
const utils = {
    // Format URL for display
    formatUrl: (url) => {
        if (url.length > 50) {
            return url.substring(0, 47) + '...';
        }
        return url;
    },
    
    // Validate URL format more strictly
    isValidUrl: (string) => {
        try {
            const url = new URL(string);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (_) {
            return false;
        }
    },
    
    // Generate analytics (placeholder)
    trackClick: (shortCode) => {
        console.log(`Short URL clicked: ${shortCode}`);
        // In a real app, this would send analytics data to a server
    }
};

// Export for potential future use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { URLShortener, utils };
}