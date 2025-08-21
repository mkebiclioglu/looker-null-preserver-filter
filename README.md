# 🔍 Null Preserver Filter

A powerful multi-select filter visualization for Google Looker Studio that automatically preserves null values in filtering while keeping them completely hidden from users.

## ✨ Key Features

- **Automatic Null Preservation**: Always includes null values in filtering without showing them in the UI
- **Multi-Select Interface**: Clean checkbox interface for easy value selection
- **Search Functionality**: Quickly find values in large datasets
- **Select All Option**: Convenient bulk selection with smart state management
- **Responsive Design**: Works seamlessly across different screen sizes
- **Accessibility First**: Full keyboard navigation and screen reader support

## 🔧 How It Works

The visualization uses a **sentinel string approach** to handle null values. Your data should map SQL nulls to the string `"__NULL__"` upstream. This sentinel string will never be displayed to users but will always be included in filter operations.

### Data Contract

- **Input**: One TEXT dimension bound to `dimID`
- **Null Handling**: SQL nulls must be converted to `"__NULL__"` string
- **Output**: Filter selections that always include `"__NULL__"` plus user selections

## 📊 Usage in Looker Studio

1. In your Looker Studio report, go to **Add a chart**
2. Select **Community visualizations**
3. Click **Import from URL**
4. Paste the manifest URL: `https://[username].github.io/[repo]/manifest.json`
5. Bind your dimension to the `dimID` field
6. Configure search and select all options as needed

## 📝 SQL Examples

### BigQuery
```sql
SELECT 
    IFNULL(category, "__NULL__") AS category_nullsafe,
    COUNT(*) as count
FROM your_table
GROUP BY category_nullsafe
```

### Snowflake
```sql
SELECT 
    COALESCE(category, '__NULL__') AS category_nullsafe,
    COUNT(*) as count
FROM your_table
GROUP BY category_nullsafe
```

### PostgreSQL
```sql
SELECT 
    COALESCE(category, '__NULL__') AS category_nullsafe,
    COUNT(*) as count
FROM your_table
GROUP BY category_nullsafe
```

### Looker Studio Calculated Field
```
IFNULL(category, "__NULL__")
```

## ⚙️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `showSearch` | Boolean | `true` | Enable/disable the search functionality |
| `selectAll` | Boolean | `true` | Enable/disable the select all option |

## 🚀 Deployment

### GitHub Pages Setup

1. **Create Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Null Preserver Filter"
   git branch -M main
   git remote add origin https://github.com/[username]/[repo].git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
   - Click Save

3. **Verify Deployment**
   - Your manifest will be accessible at: `https://[username].github.io/[repo]/manifest.json`
   - Test the URL in a browser to ensure it returns valid JSON

### File Structure
```
looker-null-preserver-filter/
├── manifest.json          # Looker Studio configuration
├── nullPreserver.js       # Main visualization logic
├── styles.css             # Styling and responsive design
├── index.html             # Landing page (optional)
├── icon.png               # 16x16 icon (optional)
├── logo.png               # 128x128 logo (optional)
└── README.md              # This file
```

## 🔄 Updates & Cache Busting

When updating the visualization, add a version parameter to the manifest URL to avoid caching issues:

```
https://[username].github.io/[repo]/manifest.json?v=2024-01-15
```

## 🐛 Troubleshooting

### Common Issues

| Problem | Solution |
|---------|----------|
| Visualization not loading | Ensure manifest URL is accessible and returns proper JSON |
| Filter not working | Verify dimension is bound to `dimID` and contains `"__NULL__"` sentinel |
| Styling issues | Check that all CSS and JS files are accessible from GitHub Pages URL |
| Caching problems | Add version parameter to manifest URL |

### Debug Checklist

- [ ] Manifest URL returns valid JSON
- [ ] All asset files (JS, CSS) are accessible
- [ ] Dimension is properly bound to `dimID`
- [ ] Data contains `"__NULL__"` sentinel for null values
- [ ] No JavaScript errors in browser console

## 📚 Technical Details

- **Framework**: Vanilla JavaScript (no external dependencies)
- **APIs**: Looker Studio Community Visualization APIs
- **Browser Support**: Modern browsers with ES6+ support
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance**: Optimized for large datasets with efficient filtering

## 🔒 Security & Best Practices

- **No External Dependencies**: All code is self-contained
- **HTTPS Only**: GitHub Pages serves over HTTPS by default
- **Content Security Policy**: No inline scripts or external resources
- **Input Validation**: Defensive handling of malformed data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly in Looker Studio
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Looker Studio Community Visualization team
- Contributors and users of this visualization
- The open source community

---

**Note**: This visualization is designed specifically for Looker Studio and requires the data to follow the sentinel string pattern for null values. Make sure your data pipeline converts SQL nulls to `"__NULL__"` before binding to this visualization.
