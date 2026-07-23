# ICT2216 Practical Test — 2401229 dev notes

Run everything: `sudo docker-compose up -d` (first boot: MySQL + SonarQube take ~1 min)

## Services / ports / creds

| Service | URL | Login |
|---|---|---|
| Q1 nginx (basic auth) | http://localhost:8080/ | admin / 2401229@SIT.singaporetech.edu.sg |
| Q2 HTTPS (self-signed, browser will warn — accept) | https://127.0.0.1/ | same as Q1 |
| Q3 Gitea git server | http://localhost:3000/ | admin / 2401229@SIT.singaporetech.edu.sg |
| Q4 search app | http://localhost:3001/ | - |
| Q7/8 SonarQube | http://127.0.0.1:9000/ | admin / 2401229@SIT.singaporetech.edu.sg |

## Notes to self

- Q1/Q2: htpasswd hash in `web/.htpasswd`, cert in `web/certs/` (CN=127.0.0.1). Both HTTP+HTTPS behind basic auth.
- Q3: git identity = "Matin Mirza Bin Mahbob" / 2401229@sit.singaporetech.edu.sg. Repo pushed to Gitea at admin/ssd-prac-test (data persisted in `git-server/data/` so it survives the zip).
- Q4: validation is allow-list `[A-Za-z0-9 ]`, 2–50 chars, shared file `app/public/validate.js` used by BOTH frontend (form submit handler) and backend (`/search` route) — one source of truth, no drift. Rejected input never touches the DB. Valid searches logged to MySQL table `2401229` (query + time). Check: `docker exec db mysql -uappuser -papppass searchdb -e "SELECT * FROM \`2401229\`;"`
- Q5: workflow `.github/workflows/ci.yml` — integration (mocha+supertest), OWASP Dependency-Check, UI test (selenium headless chrome) over http. Runs on GitHub: https://github.com/Matzz2401229/2401229_SSDTest (same repo pushed to both GitHub + local Gitea)
- Q6: ESLint security step in same workflow — eslint-plugin-security + no-unsanitized, SARIF uploaded to GitHub Security tab. Local run: `cd app && npx eslint .`
- Q7/8: scan already run, results visible on SonarQube dashboard (project `search-app`). Rescan:
  `docker run --rm --network ssd_prac_test_default -v "$(pwd)/app:/usr/src" sonarsource/sonar-scanner-cli:latest -Dsonar.projectKey=search-app -Dsonar.sources=. -Dsonar.exclusions=node_modules/**,test/** -Dsonar.host.url=http://sonarqube:9000 -Dsonar.token=<token from SonarQube UI>`
- Q9: fixed all findings (root user in Dockerfile, recursive COPY, x-powered-by disclosure, missing lang/label) — dashboard now 0 bugs / 0 vulns / 0 hotspots.
