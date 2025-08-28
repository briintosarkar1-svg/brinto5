# URL Shortener

A clean, responsive web application that allows users to shorten long URLs instantly without requiring any signup. The shortened links have lifetime validity and redirect properly to the original URLs.

## Features

✨ **Core Features:**
- 🔗 Instant URL shortening without signup
- ♾️ Lifetime validity - links never expire
- 📱 Fully responsive design
- 📋 One-click copy functionality
- ✅ URL validation and error handling
- 💾 Local storage for URL history
- 🎨 Modern, clean UI with smooth animations

## Demo

![URL Shortener Demo](https://via.placeholder.com/800x400/667eea/ffffff?text=URL+Shortener+Demo)

## Getting Started

### Prerequisites

No special requirements! This is a pure client-side application that runs in any modern web browser.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
   ```

2. **Open the application:**
   - Simply open `index.html` in your web browser
   - Or serve it using a local web server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve .
     
     # Using PHP
     php -S localhost:8000
     ```

3. **Access the application:**
   - Direct file: `file:///path/to/index.html`
   - Local server: `http://localhost:8000`

## Usage

1. **Shorten a URL:**
   - Paste your long URL into the input field
   - Click "Shorten URL" or press Enter
   - Your shortened URL will appear below

2. **Copy the shortened URL:**
   - Click the "Copy" button next to the shortened URL
   - The URL is automatically copied to your clipboard

3. **URL Validation:**
   - Only valid HTTP/HTTPS URLs are accepted
   - Clear error messages guide you if the URL is invalid

## Technical Details

### Architecture

- **Frontend Only:** Pure HTML, CSS, and JavaScript
- **No Backend Required:** All processing happens client-side
- **Local Storage:** URLs are stored in browser's localStorage
- **Responsive Design:** Works on desktop, tablet, and mobile devices

### File Structure

```
url-shortener/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

### Key Components

- **URLShortener Class:** Main application logic
- **URL Validation:** Ensures only valid URLs are processed
- **Short Code Generation:** Creates unique 6-character codes
- **Local Storage:** Persists shortened URLs across sessions
- **Copy to Clipboard:** Modern clipboard API with fallback

## Customization

### Changing the Base URL

Edit the `baseUrl` property in `script.js`:

```javascript
this.baseUrl = 'https://your-domain.com/';
```

### Styling

Modify `styles.css` to customize:
- Colors and gradients
- Fonts and typography
- Layout and spacing
- Animations and transitions

### Short Code Length

Adjust the code length in the `generateShortCode()` method:

```javascript
for (let i = 0; i < 8; i++) { // Change 6 to desired length
    result += chars.charAt(Math.floor(Math.random() * chars.length));
}
```

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Features in Detail

### URL Validation
- Checks for valid HTTP/HTTPS protocols
- Validates URL format using native URL constructor
- Provides clear error messages for invalid inputs

### Short Code Generation
- Uses alphanumeric characters (a-z, A-Z, 0-9)
- Generates 6-character codes by default
- Ensures uniqueness by checking existing codes
- Case-sensitive for maximum combinations

### Local Storage
- Stores URL mappings in browser localStorage
- Persists data across browser sessions
- Handles storage errors gracefully
- Maintains both forward and reverse mappings

### Responsive Design
- Mobile-first approach
- Flexible grid layout
- Touch-friendly buttons
- Optimized for various screen sizes

## Deployment

### GitHub Pages

1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://yourusername.github.io/repository-name`

### Netlify

1. Connect your GitHub repository to Netlify
2. Deploy automatically on every push
3. Custom domain support available

### Vercel

1. Import your GitHub repository
2. Automatic deployments
3. Built-in analytics and performance monitoring

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m 'Add feature'`
6. Push: `git push origin feature-name`
7. Submit a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by popular URL shortening services
- Built with modern web standards
- Designed for simplicity and performance

## Support

If you find this project helpful, please give it a ⭐ on GitHub!

---

**Made with ❤️ for the web community**