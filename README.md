# chia-kai-chang.github.io

Personal website of Dr. Chia-Kai Chang (Educational Omics Lab, National Central University), built with Jekyll and served by GitHub Pages.

## Updating content

Most updates only need a change in `_data/`:

| File | Content |
| --- | --- |
| `_data/publications.yml` | All papers. `type`: journal / conference / accepted; `selected: true` shows it on the home page; `tags`: gai, edu, ai, optics |
| `_data/news.yml` | News on the home page (newest first) |
| `_data/stats.yml` | Citations, funding, student counts (paper counts are computed automatically) |
| `_data/awards.yml` | Awards |
| `_data/grants.yml` | Funded research projects |
| `_data/projects.yml`, `_data/pillars.yml` | Research projects and pillars |
| `_data/courses.yml`, `_data/talks.yml` | Teaching and invited talks |
| `_data/career.yml`, `_data/development.yml` | About page timeline and training |

Contact details and profile links are in `_config.yml`. Styles are in `assets/css/style.css`.

## Local preview

```sh
gem install jekyll
jekyll serve
```
