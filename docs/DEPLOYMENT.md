# Web Deployment and Image Verification

The web service serves files from `apps/web/public` through the Next.js process. A new file under `public/uploads` must be present in the deployed Git commit, included in a fresh build, and served by a newly started process. Copying a file into an already running release is not a supported publishing flow.

## Render deployment flow

`render.yaml` defines the complete lifecycle for `ansa-web`:

1. `npm install` installs the monorepo from its root lockfile.
2. `npm run assets:check` verifies that every referenced team profile image and project featured image exists locally and is non-empty.
3. `npm run web:build` creates a fresh Next.js production build.
4. Render replaces the previous process and runs `npm run web:start`.

Push the content file and its image in the same commit. Before pushing, confirm that Git tracks the image:

```powershell
git ls-files apps/web/public/uploads/2026/07/new-project.jpg
npm run assets:check
npm run web:build
git push origin main
```

For an existing Render service, confirm its Settings show the same build and start commands as `render.yaml` (or sync the Blueprint) before relying on this lifecycle.

Wait until the `ansa-web` deployment for that commit is **Live**. A successful build alone is not the end of the deployment; the new process must also be running.

If a deployment is operated outside Render, use the same order and explicitly replace the old process after the build:

```powershell
npm install
npm run assets:check
npm run web:build
# Stop the old service using the host's process manager, then:
npm run web:start
```

## Required post-deploy image check

After Render reports the release as Live, run:

```powershell
npm run deploy:check-images -- https://ansabrasil.org
```

By default this discovers and checks every image referenced as a team profile image or project `featuredImage`, so newly added images are included automatically. It verifies that each local file exists, then requests the deployed URL with cache bypassing and requires a successful, non-empty `image/*` response.

For a faster check of only the images added in the release, list their paths after the deployment URL:

```powershell
npm run deploy:check-images -- `
  https://ansabrasil.org `
  /uploads/2026/07/new-profile.jpg `
  /uploads/2026/07/new-project.jpg
```

The command exits nonzero on a missing local file, HTTP error, non-image response, empty response, or timeout, making it suitable for a release checklist or CI job. `DEPLOY_URL`, `RENDER_EXTERNAL_URL`, or `NEXT_PUBLIC_SITE_URL` can supply the base URL instead of the first argument.

If a new image fails after deployment:

1. Confirm it is tracked with `git ls-files` and is present in the deployed commit.
2. Confirm the matching profile/project content uses the exact case-sensitive `/uploads/...` path.
3. Inspect the Render build log for the `assets:check` and `web:build` steps.
4. Redeploy the intended commit and wait for the replacement process to become Live.
5. Rerun the post-deploy check before declaring the release complete.
