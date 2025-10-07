# 🔧 Git Setup Instructions for Repository Maintainers

This guide helps you set up this repository for Hacktoberfest 2025 with proper Git configuration.

---

## 📋 Prerequisites

- Git installed on your computer
- GitHub account
- Repository cloned locally

---

## 🚀 Repository Setup Steps

### 1. Clone the Repository (if starting fresh)

If you downloaded this as a ZIP or want to duplicate the original first-contributions repository:

```bash
# Clone the original repository with full history
git clone https://github.com/firstcontributions/first-contributions.git first-contributions-id

# Navigate to the directory
cd first-contributions-id
```

### 2. Remove Original Remote (if duplicating)

```bash
# Check current remotes
git remote -v

# Remove the original remote
git remote remove origin

# Verify it's removed
git remote -v
```

### 3. Create New Repository on GitHub

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `first-contributions-id` (or your preferred name)
3. **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click "Create repository"

### 4. Link to Your New Repository

```bash
# Add your new repository as origin
git remote add origin https://github.com/YOUR-USERNAME/first-contributions-id.git

# Or use SSH (recommended)
git remote add origin git@github.com:YOUR-USERNAME/first-contributions-id.git

# Verify the remote is added
git remote -v
```

### 5. Push to Your New Repository

```bash
# Push all branches with history
git push -u origin --all

# Push all tags
git push -u origin --tags
```

### 6. Configure Repository Settings on GitHub

#### A. Add Repository Topics

Go to your repository on GitHub → Click the gear icon next to "About" → Add topics:
- `hacktoberfest`
- `good-first-issue`
- `beginner-friendly`
- `first-contributions`
- `open-source`
- `indonesia`

#### B. Configure Repository Settings

Navigate to **Settings** → **General**:

1. **Features**:
   - ✅ Enable Issues
   - ✅ Enable Discussions (recommended)
   - ✅ Enable Projects (optional)
   - ✅ Enable Wiki (optional)

2. **Pull Requests**:
   - ✅ Allow squash merging
   - ✅ Allow merge commits
   - ✅ Allow rebase merging
   - ✅ Automatically delete head branches

3. **Merge button**:
   - ✅ Default to pull request title and description

#### C. Branch Protection (Recommended)

Navigate to **Settings** → **Branches** → **Add rule**:

**Branch name pattern**: `main`

Enable:
- ✅ Require a pull request before merging
- ✅ Require approvals (1)
- ✅ Dismiss stale pull request approvals when new commits are pushed
- ✅ Require status checks to pass before merging
  - Search for `markdown-link-check` and add it
- ✅ Require conversation resolution before merging
- ✅ Do not allow bypassing the above settings

#### D. Create Labels

Navigate to **Issues** → **Labels** → Create these labels if they don't exist:

| Label Name | Color | Description |
|------------|-------|-------------|
| `hacktoberfest` | `#ff6b6b` | Hacktoberfest contributions |
| `good first issue` | `#7057ff` | Good for newcomers |
| `documentation` | `#0075ca` | Documentation improvements |
| `translation` | `#5319e7` | Translation related |
| `help wanted` | `#008672` | Extra attention needed |
| `invalid` | `#e4e669` | Invalid contribution |
| `spam` | `#d93f0b` | Spam PR/issue |

### 7. Enable GitHub Bots

#### A. Welcome Bot

1. Go to [Probot Welcome](https://github.com/apps/welcome)
2. Click "Install"
3. Select your repository
4. The bot will use `.github/config.yml` for configuration

#### B. All Contributors Bot (Optional)

1. Go to [All Contributors Bot](https://github.com/apps/allcontributors)
2. Click "Install"
3. Select your repository
4. Configuration is in `.github/all-contributors.yml`

To add a contributor:
```
@allcontributors please add @username for code, doc
```

#### C. Stale Bot (Optional)

Create `.github/workflows/stale.yml`:
```yaml
name: Mark stale issues and pull requests

on:
  schedule:
  - cron: '0 0 * * *'

jobs:
  stale:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/stale@v9
      with:
        repo-token: ${{ secrets.GITHUB_TOKEN }}
        stale-issue-message: 'Issue ini ditandai sebagai stale karena tidak ada aktivitas. / This issue is marked as stale due to inactivity.'
        stale-pr-message: 'PR ini ditandai sebagai stale karena tidak ada aktivitas. / This PR is marked as stale due to inactivity.'
        days-before-stale: 30
        days-before-close: 7
```

---

## 📝 Create Initial Issues

Use the templates from `.github/SAMPLE_ISSUES.md` to create initial issues:

```bash
# You can create issues via GitHub CLI
gh issue create --title "Add your name to Contributors list" --body "..." --label "good first issue,hacktoberfest"
```

Or manually create them via GitHub web interface.

**Recommended**: Create at least 5-10 good first issues before announcing the repository.

---

## 🎃 Hacktoberfest Registration

1. Register your repository at [Hacktoberfest](https://hacktoberfest.com)
2. Ensure the `hacktoberfest` topic is added
3. Add Hacktoberfest banner to your README (already done!)
4. Monitor for spam PRs during October

---

## ✅ Verify Setup Checklist

- [ ] Repository created and pushed
- [ ] All files from setup are present
- [ ] Topics added (hacktoberfest, good-first-issue, etc.)
- [ ] Labels created
- [ ] Branch protection enabled
- [ ] GitHub Actions workflows working
- [ ] Welcome bot installed and configured
- [ ] At least 5 good first issues created
- [ ] CODE_OF_CONDUCT.md present
- [ ] CONTRIBUTING.md present
- [ ] Indonesian README enhanced
- [ ] Repository registered for Hacktoberfest

---

## 🔄 Maintenance Commands

### Update from Original Repository (if needed)

```bash
# Add original repo as upstream
git remote add upstream https://github.com/firstcontributions/first-contributions.git

# Fetch updates
git fetch upstream

# Merge updates (be careful, might conflict with your changes)
git merge upstream/main

# Or rebase
git rebase upstream/main
```

### Keep Your Fork in Sync

```bash
# Fetch all remotes
git fetch --all

# Check what branches exist
git branch -a

# Update main branch
git checkout main
git pull origin main
```

---

## 🆘 Troubleshooting

### Issue: Push Rejected

```bash
# If push is rejected due to remote changes
git pull --rebase origin main
git push origin main
```

### Issue: Authentication Failed

```bash
# Use SSH instead of HTTPS
git remote set-url origin git@github.com:YOUR-USERNAME/first-contributions-id.git

# Or create a Personal Access Token
# Go to GitHub Settings → Developer Settings → Personal Access Tokens
```

### Issue: Large Files

```bash
# If you have large files, use Git LFS
git lfs install
git lfs track "*.psd"
git add .gitattributes
```

---

## 📚 Additional Resources

- [GitHub Docs - Managing Remotes](https://docs.github.com/en/get-started/getting-started-with-git/managing-remote-repositories)
- [GitHub Docs - Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [Hacktoberfest - Maintainer Guide](https://hacktoberfest.com/participation/#maintainers)
- [Probot Apps](https://probot.github.io/apps/)

---

## 🎉 You're Ready!

Your repository is now set up for Hacktoberfest 2025! Share it with the community and welcome new contributors.

**Selamat Hacktoberfest! / Happy Hacktoberfest!** 🎃

---

## 📞 Need Help?

If you encounter issues:
1. Check GitHub documentation
2. Search for similar issues
3. Ask in GitHub Community
4. Contact Hacktoberfest support

**Good luck with your Hacktoberfest project! 🚀**
