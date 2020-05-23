---
layout: layouts/base.njk
pageClass: posts
templateEngineOverride: njk, md
---

<main>
  {{ content | safe }}
  <div class="footnote">
    <p>
      This page is part of the posts section.
    </p>
  </div>
</main>
