# SAMANVAYA 2027

Website for **SAMANVAYA 2027**, an international conference on pure and applied mathematics held on 31 May and 1 June 2027. The host is the School of Mathematical and Statistical Sciences (SMSS) at IIT Mandi, Kamand, Himachal Pradesh.

The site is plain HTML, CSS and JavaScript. It has no build step and no dependencies.

## Pages

| File | Page |
|------|------|
| `index.html` | Home |
| `about.html` | About the conference |
| `committees.html` | Committees |
| `speakers.html` | Speakers and programme |
| `call-for-papers.html` | Call for papers and posters, with scope |
| `registration.html` | Registration, fees and submission |
| `travel.html` | Travel and attractions |
| `contact.html` | Contact |

Shared styles live in `css/style.css` and shared behaviour (menu and banner drawing) lives in `js/main.js`. Images go in `assets/`. `_template.html` is the starting point for a new page.

## Publishing with GitHub Pages

1. Push this folder to a public repository, for example `samanvaya2027`.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then select `main` and `/ (root)`.
4. After a minute or two the site appears at `https://<github-username>.github.io/samanvaya2027/`.

To use a custom address such as `samanvaya2027.iitmandi.ac.in`, enter it under **Settings → Pages → Custom domain**. The IIT Mandi computer centre then needs to add a CNAME record pointing to `<github-username>.github.io`.

## Editing

- Every placeholder is plain text in the HTML. This covers speaker names ("Keynote Speaker 1"), committee members, emails, fees and bank details. Search for the placeholder text and replace it.
- Each page repeats the same header and footer. If you change one, change it in every page.
- Put campus photographs in `assets/images/`.
- Check each page on a phone after editing.
