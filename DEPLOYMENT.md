# 🚀 Deployment Guide

This guide will walk you through deploying the Null Preserver Filter visualization to GitHub Pages and making it available in Looker Studio.

## 📋 Prerequisites

- GitHub account
- Git installed on your local machine
- Basic knowledge of Git commands

## 🔧 Step-by-Step Deployment

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **+** icon in the top right corner
3. Select **New repository**
4. Fill in the repository details:
   - **Repository name**: `looker-null-preserver-filter` (or your preferred name)
   - **Description**: `Looker Studio Community Visualization - Multi-select filter that preserves null values`
   - **Visibility**: Public (required for GitHub Pages)
   - **Initialize with**: Don't add any files
5. Click **Create repository**

### 2. Upload Files to Repository

#### Option A: Using Git (Recommended)

```bash
# Clone the repository
git clone https://github.com/[username]/looker-null-preserver-filter.git
cd looker-null-preserver-filter

# Copy all project files to this directory
# (manifest.json, nullPreserver.js, styles.css, etc.)

# Add files to Git
git add .

# Commit changes
git commit -m "Initial commit: Null Preserver Filter visualization"

# Push to GitHub
git push origin main
```

#### Option B: Using GitHub Web Interface

1. In your repository, click **Add file** → **Upload files**
2. Drag and drop all project files
3. Add commit message: "Initial commit: Null Preserver Filter visualization"
4. Click **Commit changes**

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (or click **Pages** in the left sidebar)
4. Under **Source**, select **Deploy from a branch**
5. Under **Branch**, select **main** and **/(root)**
6. Click **Save**

### 4. Verify Deployment

1. Wait a few minutes for GitHub Pages to build and deploy
2. Go to **Actions** tab to monitor the deployment progress
3. Once deployed, your visualization will be available at:
   ```
   https://[username].github.io/looker-null-preserver-filter/
   ```
4. Test the manifest URL:
   ```
   https://[username].github.io/looker-null-preserver-filter/manifest.json
   ```
   This should return valid JSON content

### 5. Test in Looker Studio

1. Open Google Looker Studio
2. Create a new report or open an existing one
3. Click **Add a chart** (+ icon)
4. Scroll down and click **Community visualizations**
5. Click **Import from URL**
6. Paste your manifest URL:
   ```
   https://[username].github.io/looker-null-preserver-filter/manifest.json
   ```
7. Click **Import**
8. The visualization should now appear in your Community visualizations list

## 🔍 Testing Your Deployment

### Local Testing

1. Open `test.html` in your browser
2. Verify the visualization renders correctly
3. Test the search functionality
4. Test the select all option
5. Check that filter emissions work

### Looker Studio Testing

1. Add the visualization to a report
2. Bind a dimension to the `dimID` field
3. Verify the UI shows only real values (no `"__NULL__"`)
4. Test filtering and verify nulls are preserved
5. Test configuration options (search, select all)

## 🚨 Common Issues & Solutions

### Issue: Manifest not accessible
**Solution**: 
- Ensure repository is public
- Check GitHub Pages is enabled
- Wait for deployment to complete (check Actions tab)

### Issue: Assets not loading
**Solution**:
- Verify all files are in the root directory
- Check file names match exactly (case-sensitive)
- Ensure no typos in manifest.json references

### Issue: Visualization not appearing in Looker Studio
**Solution**:
- Verify manifest.json is valid JSON
- Check that all required fields are present
- Try refreshing the Community visualizations section

### Issue: Filter not working
**Solution**:
- Verify dimension is bound to `dimID`
- Check data contains `"__NULL__"` sentinel
- Open browser console for error messages

## 🔄 Updating the Visualization

When you make changes to the visualization:

1. **Update files locally**
2. **Commit and push to GitHub**:
   ```bash
   git add .
   git commit -m "Update: [description of changes]"
   git push origin main
   ```
3. **Wait for GitHub Pages to rebuild** (check Actions tab)
4. **Update manifest URL in Looker Studio** with version parameter:
   ```
   https://[username].github.io/looker-null-preserver-filter/manifest.json?v=2024-01-15
   ```

## 📊 Performance Optimization

- **Minimize file sizes**: Consider minifying JS/CSS for production
- **Use CDN**: For production use, consider hosting on a CDN
- **Cache busting**: Always use version parameters when updating
- **Compression**: GitHub Pages automatically serves compressed files

## 🔒 Security Considerations

- **HTTPS only**: GitHub Pages serves over HTTPS by default
- **No external dependencies**: All code is self-contained
- **Input validation**: Visualization handles malformed data gracefully
- **Content Security Policy**: No inline scripts or external resources

## 📞 Getting Help

If you encounter issues:

1. **Check browser console** for JavaScript errors
2. **Verify file accessibility** by testing URLs directly
3. **Review GitHub Actions** for deployment status
4. **Check Looker Studio documentation** for community viz requirements
5. **Create GitHub issue** in your repository for tracking

## ✅ Deployment Checklist

- [ ] Repository created and files uploaded
- [ ] GitHub Pages enabled and deployed
- [ ] Manifest URL accessible and returns valid JSON
- [ ] All asset files accessible from GitHub Pages URL
- [ ] Visualization loads in Looker Studio
- [ ] Filter functionality works correctly
- [ ] Configuration options work as expected
- [ ] Null values are preserved but hidden from UI

---

**Congratulations!** 🎉 Your Null Preserver Filter visualization is now deployed and ready to use in Looker Studio.
