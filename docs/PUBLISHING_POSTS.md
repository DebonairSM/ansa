# Publishing Content to ANSA Brasil Website

This guide explains how to add and edit content on the ANSA Brasil website using GitHub's web interface or locally with Git.

## Content Types

The website supports three content types:

1. **Projects** - Showcase projects supported by ANSA
2. **Pages** - Static informational pages
3. **Categories** - Project categories

Each content type exists in both Portuguese (PT) and English (EN).

## Method 1: Using GitHub Web Interface (Easiest)

### Adding a New Project

1. **Navigate to GitHub**:
   - Go to: https://github.com/[your-org]/ansa
   - Navigate to: `apps/web/src/content/projects/pt/` (for Portuguese)
   - Or: `apps/web/src/content/projects/en/` (for English)

2. **Create New File**:
   - Click "Add file" → "Create new file"
   - Name format: `project-slug-name.md`
   - Example: `novo-projeto-2025.md`

3. **Add Content**:
   
   Paste this template and fill it in:

```markdown
---
slug: "novo-projeto-2025"
title: "Project Title Here"
locale: "pt"
category: "Education"
location: "City, State"
year: 2025
donation: "R$ 10.000 / US$ 2,500"
description: "Brief one-sentence description of the project"
featuredImage: "/uploads/2025/01/project-image.jpg"
---

Write your full project description here using Markdown formatting.

## Section Title

You can use headings, **bold text**, *italic text*, and lists:

- Item 1
- Item 2
- Item 3

Add more paragraphs as needed to describe the project impact, beneficiaries, and outcomes.
```

4. **Commit Changes**:
   - Scroll to bottom
   - Add commit message: "Add new project: Project Title"
   - Select "Commit directly to the main branch"
   - Click "Commit new file"

5. **Deployment**:
   - Changes trigger automatic build on Render
   - Site updates in 3-5 minutes
   - Check: https://ansabrasil.org/pt/projects

### Editing Existing Content

1. Navigate to the file on GitHub
2. Click the pencil icon (Edit this file)
3. Make your changes
4. Scroll to bottom and commit with descriptive message
5. Changes deploy automatically

## Method 2: Local Editing with Git

### Setup (One-time)

1. **Install Git**:
   - Download from: https://git-scm.com/downloads
   - Or use GitHub Desktop: https://desktop.github.com

2. **Clone Repository**:

```bash
git clone https://github.com/[your-org]/ansa.git
cd ansa
```

### Adding Content Locally

1. **Create new file** in appropriate directory:
   - Projects PT: `apps/web/src/content/projects/pt/your-project.md`
   - Projects EN: `apps/web/src/content/projects/en/your-project.md`
   - Pages PT: `apps/web/src/content/pages/pt/your-page.md`
   - Pages EN: `apps/web/src/content/pages/en/your-page.md`

2. **Add frontmatter and content** (see templates below)

3. **Commit and push**:

```bash
git add .
git commit -m "Add new project: Project Title"
git push origin main
```

## Content Templates

### Project Template

```markdown
---
slug: "unique-project-identifier"
title: "Full Project Name"
locale: "pt"
category: "Education"
location: "City, State"
year: 2025
donation: "R$ 10.000 / US$ 2,500"
description: "One sentence describing the project"
featuredImage: "/uploads/2025/01/image.jpg"
createdAt: "2025-01-15T00:00:00.000Z"
updatedAt: "2025-01-15T00:00:00.000Z"
---

Project content goes here...
```

### Page Template

```markdown
---
slug: "about-us"
title: "About ANSA Brasil"
locale: "pt"
featuredImage: "/uploads/hero-image.jpg"
---

Page content goes here...
```

### Category Template

```markdown
---
slug: "education"
name: "Education Projects"
locale: "pt"
---

Category description here (optional)...
```

## Field Definitions

### Required Fields

- **slug**: Unique URL identifier (lowercase, use hyphens)
  - Good: `novo-projeto-2025`
  - Bad: `Novo Projeto 2025`

- **title**: Display title (any format)

- **locale**: Language code
  - `"pt"` for Portuguese
  - `"en"` for English

### Optional Fields

- **category**: Project category (Education, Health, Infrastructure, etc.)
- **location**: Geographic location
- **year**: Project year (number)
- **donation**: Donation amount (text)
- **description**: Short summary
- **featuredImage**: Path to hero/card image
- **media**: Array of additional images/files
- **createdAt**: Creation timestamp (ISO format)
- **updatedAt**: Last update timestamp (ISO format)

## Markdown Formatting Guide

### Headings

```markdown
# Heading 1
## Heading 2
### Heading 3
```

### Text Styling

```markdown
**Bold text**
*Italic text*
***Bold and italic***
```

### Lists

```markdown
Unordered:
- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2

Ordered:
1. First item
2. Second item
3. Third item
```

### Links

```markdown
[Link text](https://example.com)
```

### Images

```markdown
![Alt text](/uploads/2025/01/image.jpg)
```

## Adding Images

1. **Upload to repository**:
   - Place in `apps/web/public/uploads/YYYY/MM/`
   - Create year/month directories if needed
   - Example: `apps/web/public/uploads/2025/01/project-photo.jpg`

2. **Reference in content**:
   - Frontmatter: `featuredImage: "/uploads/2025/01/project-photo.jpg"`
   - Body: `![Photo description](/uploads/2025/01/project-photo.jpg)`

3. **Commit images with content**:

```bash
git add apps/web/public/uploads/
git commit -m "Add images for new project"
git push
```

## Best Practices

### File Naming

- Use lowercase
- Use hyphens not spaces
- Be descriptive but concise
- Examples:
  - `associacao-artistica.md`
  - `education-project-2025.md`
  - `about-us.md`

### Slug Naming

- Match filename (without .md)
- Use hyphens not underscores
- Keep short and memorable
- Avoid special characters

### Content Guidelines

1. **Write clear, concise descriptions**
2. **Use proper Portuguese/English**
3. **Include location and year for projects**
4. **Add donation amounts when available**
5. **Use relevant categories**
6. **Optimize images** (max 1MB, use JPG/PNG)

### Bilingual Content

Always create both PT and EN versions:

1. Create PT version first: `apps/web/src/content/projects/pt/projeto.md`
2. Create EN version: `apps/web/src/content/projects/en/projeto.md`
3. Use same slug for both languages
4. Translate all fields and content

## Troubleshooting

### Build Fails After Commit

Check for:
- Missing required fields (slug, title, locale)
- Incorrect frontmatter format (must be valid YAML)
- Missing closing `---` in frontmatter
- Special characters not escaped in quotes

### Image Not Displaying

Check:
- Image path starts with `/uploads/`
- Image file exists in `apps/web/public/uploads/`
- Correct file extension (.jpg, .png, etc.)
- No typos in filename

### Changes Not Appearing

- Wait 3-5 minutes for deployment
- Check Render dashboard for build status
- Clear browser cache
- Verify commit went to main branch

## Quick Reference

### Create New Project (PT)

```bash
# Navigate to projects directory
cd apps/web/src/content/projects/pt

# Create file
touch novo-projeto.md

# Edit file, add template
# Commit and push
git add .
git commit -m "Add new project"
git push
```

### Edit Existing Project

```bash
# Edit file
vim apps/web/src/content/projects/pt/projeto-existente.md

# Commit changes
git add .
git commit -m "Update project description"
git push
```

## Getting Help

- Check existing files for examples
- Review Markdown guide: https://www.markdownguide.org
- Ask team for assistance
- Test locally with `npm run web:dev` before pushing

## Workflow Summary

1. Create/edit `.md` file in correct directory
2. Add frontmatter with required fields
3. Write content in Markdown
4. Commit with descriptive message
5. Push to main branch
6. Wait for automatic deployment (3-5 min)
7. Verify changes on live site

That's it! Content management without a CMS.









