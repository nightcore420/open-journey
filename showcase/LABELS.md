# 🏷️ GitHub Labels for Project Showcase

This document lists the GitHub labels that should be configured for the Project Showcase feature.

## Required Labels

### 1. `showcase`

- **Color**: `#FF6B9D` (Pink)
- **Description**: Related to project showcase submissions
- **Usage**: Apply to all PRs that add projects to the showcase section

### 2. `project`

- **Color**: `#7057FF` (Purple)
- **Description**: Community project submissions
- **Usage**: General label for any project-related contributions

### 3. `hacktoberfest`

- **Color**: `#FF8C00` (Dark Orange)
- **Description**: Valid for Hacktoberfest participation
- **Usage**: Apply to eligible PRs during Hacktoberfest season

## How to Add These Labels to Your Repository

### Option 1: Via GitHub Web Interface

1. Go to your repository on GitHub
2. Click on **Issues** or **Pull Requests** tab
3. Click on **Labels** button
4. Click **New label** for each label above
5. Enter the name, description, and color code
6. Click **Create label**

### Option 2: Via GitHub CLI

If you have GitHub CLI installed, run:

```bash
# showcase label
gh label create showcase --description "Related to project showcase submissions" --color FF6B9D

# project label
gh label create project --description "Community project submissions" --color 7057FF

# hacktoberfest label
gh label create hacktoberfest --description "Valid for Hacktoberfest participation" --color FF8C00
```

### Option 3: Via GitHub API

```bash
# Replace YOUR_TOKEN and OWNER/REPO with your values

curl -X POST \
  -H "Authorization: token YOUR_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/OWNER/REPO/labels \
  -d '{"name":"showcase","description":"Related to project showcase submissions","color":"FF6B9D"}'

curl -X POST \
  -H "Authorization: token YOUR_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/OWNER/REPO/labels \
  -d '{"name":"project","description":"Community project submissions","color":"7057FF"}'

curl -X POST \
  -H "Authorization: token YOUR_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/OWNER/REPO/labels \
  -d '{"name":"hacktoberfest","description":"Valid for Hacktoberfest participation","color":"FF8C00"}'
```

## Label Usage Guidelines

### When to Use `showcase`

- ✅ PRs adding new projects to `showcase/` folder
- ✅ Updates to existing showcase projects
- ✅ Improvements to showcase documentation

### When to Use `project`

- ✅ Any community project submissions
- ✅ Can be combined with `showcase` label
- ✅ Project-related discussions

### When to Use `hacktoberfest`

- ✅ During Hacktoberfest period (October)
- ✅ PRs that meet Hacktoberfest quality standards
- ✅ Must be meaningful contributions (no spam)
- ⚠️ Only apply to accepted/merged PRs

## Additional Recommended Labels

You might also want to create these complementary labels:

### `good first issue`

- **Color**: `#7057FF`
- **Description**: Good for newcomers

### `help wanted`

- **Color**: `#008672`
- **Description**: Extra attention is needed

### `question`

- **Color**: `#D876E3`
- **Description**: Further information is requested

### `documentation`

- **Color**: `#0075CA`
- **Description**: Improvements or additions to documentation

---

**Note**: After creating these labels, you may want to update your `.github/labels.yml` if you're using automated label management tools.
