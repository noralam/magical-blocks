# Magical Blocks - Elementor Style Blocks for Gutenberg

[![WordPress Plugin Version](https://img.shields.io/wordpress/plugin/v/magical-blocks)](https://wordpress.org/plugins/magical-blocks/)
[![WordPress Plugin Rating](https://img.shields.io/wordpress/plugin/stars/magical-blocks)](https://wordpress.org/plugins/magical-blocks/)
[![WordPress Plugin Downloads](https://img.shields.io/wordpress/plugin/dt/magical-blocks)](https://wordpress.org/plugins/magical-blocks/)
[![License](https://img.shields.io/badge/license-GPL--2.0%2B-blue.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

> **Get Elementor vibe in the WordPress Editor!** Powerful Gutenberg blocks with Flexbox containers, responsive controls, and professional design options.

![Magical Blocks Banner](https://ps.w.org/magical-blocks/assets/banner-772x250.jpg?rev=2288272)

## 🎯 Why Magical Blocks?

- **Elementor-Style Workflow** – Familiar container-based layouts with Flexbox controls
- **Lightweight & Fast** – Only loads assets for blocks you actually use
- **Design-First** – Professional styling with full customization options
- **WordPress Native** – Built entirely on the Gutenberg block editor
- **Developer Friendly** – Clean code following WordPress coding standards

## 🚀 Live Preview

Try Magical Blocks instantly in your browser - no installation required!

[![Preview in WordPress Playground](https://img.shields.io/badge/Preview%20in-WordPress%20Playground-blue?style=for-the-badge&logo=wordpress)](https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/noralam/magical-blocks/main/blueprint.json)

**Or copy this link:**
```
https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/noralam/magical-blocks/main/blueprint.json
```

## 📦 12 Professional Blocks

### Layout Blocks
| Block | Description |
|-------|-------------|
| 🔲 **Container** | Powerful Flexbox container with full layout controls (direction, wrap, justify, align) |
| 📐 **Inner Container** | Nestable container for complex multi-column layouts |
| 📄 **Section** | Full-width sections with backgrounds and inner blocks |

### Content Blocks
| Block | Description |
|-------|-------------|
| 🔤 **Heading** | Advanced typography controls with Google Fonts integration |
| 🔘 **Button** | Stylish buttons with hover effects and icon support |
| 📦 **Icon Box** | Icon + text combinations for features and services |
| 💬 **Testimonial** | Customer reviews with avatar and star ratings |
| ℹ️ **Info Box** | Information cards with icons and call-to-action |
| 🖼️ **Image Box** | Image + text layouts with hover effects |
| 🔢 **Counter** | Animated number counters for statistics |
| 📊 **Progress Bar** | Visual progress indicators with animations |
| ➖ **Divider** | Stylish separators with icons and text |

## ⚡ Key Features

- **Flexbox Layout System** – Container blocks with full Flexbox controls like Elementor
- **On-Demand Asset Loading** – CSS/JS only loads when blocks are used
- **Responsive Controls** – Desktop, tablet, and mobile settings for all properties
- **CSS Variables** – Easy theme integration and customization
- **Block Patterns** – 7 pre-designed layouts ready to use

## 🎨 Block Patterns

Pre-built layouts to get you started quickly:

1. **Hero Section** - Full-width hero with gradient background and CTAs
2. **Features Grid** - 3-column feature showcase with icon boxes
3. **Services Section** - Professional service cards layout
4. **Testimonial Cards** - Customer reviews in elegant cards
5. **Pricing Table** - 3-tier pricing comparison
6. **Team Section** - Team member profiles with social links
7. **CTA Banner** - Call-to-action banner with gradient

## 📋 Requirements

- WordPress 6.0 or higher
- PHP 8.0 or higher
- Modern browser with ES6 support

## 🔧 Installation

### From WordPress.org (Recommended)
1. Go to **Plugins > Add New** in your WordPress admin
2. Search for "**Magical Blocks**"
3. Click **Install Now** and then **Activate**

### Manual Installation
1. Download the plugin ZIP file
2. Go to **Plugins > Add New > Upload Plugin**
3. Choose the ZIP file and click **Install Now**
4. Activate the plugin

### From GitHub
```bash
cd wp-content/plugins/
git clone https://github.com/noralam/magical-blocks.git
cd magical-blocks
npm install
npm run build
```

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Composer (for PHP dependencies)

### Setup
```bash
# Clone the repository
git clone https://github.com/noralam/magical-blocks.git
cd magical-blocks

# Install dependencies
npm install
composer install

# Start development
npm run start

# Build for production
npm run build
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Build for production |
| `npm run start` | Development mode with watch |
| `npm run lint:js` | JavaScript linting |
| `npm run lint:css` | CSS linting |
| `npm run format` | Format code with Prettier |
| `composer run phpcs` | PHP code standards check |

## 📁 Project Structure

```
magical-blocks/
├── blocks/              # Server-side block rendering
├── build/               # Compiled assets (generated)
├── includes/            # PHP classes and functions
│   ├── traits/          # Reusable PHP traits
│   └── class-*.php      # Main plugin classes
├── languages/           # Translation files
├── patterns/            # Block patterns
├── src/                 # Source files
│   ├── blocks/          # Individual block source
│   ├── common/          # Shared utilities
│   └── components/      # Reusable React components
├── blueprint.json       # WordPress Playground config
├── magical-blocks.php   # Main plugin file
└── readme.txt           # WordPress.org readme
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the GPL-2.0+ License - see the [LICENSE](https://www.gnu.org/licenses/gpl-2.0.html) file for details.

## 👨‍💻 Author

**Noor Alam**
- WordPress.org: [@nalam-1](https://profiles.wordpress.org/nalam-1/)
- GitHub: [@noralam](https://github.com/noralam)
- Website: [wpthemespace.com](https://wpthemespace.com/)

## 🙏 Support

- ⭐ Star this repository if you find it helpful
- 🐛 [Report bugs](https://github.com/noralam/magical-blocks/issues)
- 💡 [Request features](https://github.com/noralam/magical-blocks/issues)
- 📖 [Documentation](https://wpthemespace.com/)

---

<p align="center">
  Made with ❤️ for the WordPress community
</p>
