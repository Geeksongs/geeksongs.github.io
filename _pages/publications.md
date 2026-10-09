---
layout: page
permalink: /publications/
title: publications
description: Published papers, preprints, and manuscripts in preparation.
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

## Published Papers, Preprints & Posters

{% include publication_filters.liquid %}

<div class="publications">

{% bibliography --query @*[selected=true]* %}

</div>

{% include manuscripts_in_preparation.liquid %}
