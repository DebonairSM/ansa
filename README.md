# ANSA Brasil - Static Site Migration

Bilingual website for ANSA Brasil (Associação Nossa Senhora Aparecida), a nonprofit organization helping underprivileged communities in Brazil since 1982.

## Architecture

- **Frontend**: Next.js 14+ (TypeScript, Tailwind CSS, App Router, i18n routing)
- **Content**: File-based Markdown with frontmatter (Git as CMS)
- **API**: Express + TypeScript (form handling, integrations)
- **Database**: Supabase PostgreSQL (optional, for forms/analytics)
- **Deployment**: Render.com (2 web services)

## Project Structure

```
apps/
  web/          # Next.js frontend (PT/EN routes)
    src/
      content/  # Markdown content files
        projects/
          pt/   # Portuguese project files
          en/   # English project files
        pages/
          pt/   # Portuguese static pages
          en/   # English static pages
        categories/
          pt/   # Portuguese categories
          en/   # English categories
      lib/      # Content loaders (Markdown parsing)
      app/      # Next.js App Router pages
  api/          # Express API server
render.yaml     # Render.com deployment config
```

## Content Management

Content is stored as Markdown files with YAML frontmatter. No database or CMS required.

### Content Structure

Each content type (projects, pages, categories) has language-specific directories (`pt` and `en`).

**Example project file** (`apps/web/src/content/projects/pt/projeto-exemplo.md`):

```markdown
---
slug: "projeto-exemplo"
title: "Project Title"
locale: "pt"
category: "Education"
location: "City, State"
year: 2024
featuredImage: "/uploads/image.jpg"
description: "Short project description"
---

Full project content in Markdown format...

## Subheading

- List item 1
- List item 2
```

### Supported Fields

**Projects**:
- `slug`: URL identifier (required)
- `title`: Display title (required)
- `locale`: Language code `pt` or `en` (required)
- `category`: Project category
- `location`: Geographic location
- `year`: Project year
- `donation`: Donation amount
- `description`: Short summary
- `featuredImage`: Image path
- `media`: Array of media objects

**Pages**:
- `slug`: URL identifier
- `title`: Page title
- `locale`: Language code
- `featuredImage`: Hero image
- `media`: Array of media objects

**Categories**:
- `slug`: URL identifier
- `name`: Category name
- `locale`: Language code

## Local Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. **Install dependencies**:

```powershell
# Install root dependencies
npm install

# Install web app dependencies
cd apps/web
npm install

# Install API dependencies (optional)
cd ../api
npm install
```

2. **Run development server**:

```powershell
# From root directory
npm run web:dev

# Or from apps/web directory
cd apps/web
npm run dev
```

The site will be available at `http://localhost:4545`

### Adding New Content

See [docs/PUBLISHING_POSTS.md](docs/PUBLISHING_POSTS.md) for detailed instructions on adding content via GitHub.

Quick steps:
1. Create new `.md` file in appropriate directory
2. Add frontmatter with required fields
3. Write content in Markdown
4. Commit to repository
5. Push to trigger automatic deployment

## Building for Production

```powershell
cd apps/web
npm run build
npm start
```

## Deployment to Render.com

### Prerequisites

- GitHub repository with this code
- Render.com account

### Steps

1. **Push to Git**:

```powershell
git add .
git commit -m "Your commit message"
git push origin main
```

2. **Deploy on Render**:
   - Go to Render Dashboard → New → Blueprint
   - Connect repository
   - Render will detect `render.yaml` and create services automatically

3. **Environment variables** (configure in Render Dashboard):

**ansa-web**:
- `NEXT_PUBLIC_API_URL`: `https://ansa-api.onrender.com` (optional)
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL (optional)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key (optional)

**ansa-api** (optional):
- `SUPABASE_URL`: Your Supabase URL
- `SUPABASE_API_KEY`: Your Supabase service key

### Custom Domain

Configure custom domain in Render settings:
- Settings → Custom Domains → Add `ansabrasil.org`
- Update DNS with provided CNAME record

## Technology Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: Markdown with gray-matter parsing
- **Markdown Rendering**: react-markdown
- **Deployment**: Render.com
- **Version Control**: Git (GitHub)

## Available Scripts

```powershell
# Development
npm run web:dev          # Start Next.js dev server
npm run api:dev          # Start Express API server

# Production
npm run web:build        # Build Next.js for production
npm run api:build        # Build Express API
```

## Content Editing

Power users can edit content directly via:

1. **GitHub Web Interface**: Edit files directly on GitHub
2. **Local Clone**: Clone repository, edit files, commit and push
3. **GitHub Desktop**: User-friendly GUI for Git operations

See [docs/PUBLISHING_POSTS.md](docs/PUBLISHING_POSTS.md) for step-by-step instructions.

## Migration Notes

This project was migrated from WordPress to a static Next.js site with Markdown content management.

## Support

- Next.js docs: https://nextjs.org/docs
- Markdown Guide: https://www.markdownguide.org
- Render docs: https://render.com/docs
- Supabase docs: https://supabase.com/docs (optional features)

## License

This is a nonprofit organization website. All content is copyright ANSA Brasil.
