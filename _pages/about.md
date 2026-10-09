---
layout: about
title: about
permalink: /
subtitle:

selected_papers: false
custom_publications: false
custom_education: false
custom_service: false
social: false

announcements:
  enabled: false

latest_posts:
  enabled: false
---

<style>
  .post-header {
    display: none;
  }
</style>

<div class="home-hero" id="biography">
  <div class="home-portrait">
    <img src="{{ '/assets/img/prof_pic.jpg' | relative_url }}" alt="Python Song">
  </div>

  <div class="home-intro">
    <h1 class="home-title">Hello, I'm <span class="home-name">Python Song.</span></h1>

    <div class="typing-intro" aria-label="I am a researcher in foundation models, robot learning, and AI for science">
      <span aria-hidden="true">I am <span id="typed-text"></span><span class="typing-cursor">|</span></span>
    </div>

    <p>
      I graduated with a master's degree from <a href="https://www.columbia.edu/">Columbia University</a>. My research spans
      <strong>foundation models, world models, robot learning, AI for science, and AGI</strong>:
    </p>

    <ul>
      <li><strong>Foundation Models &amp; World Models:</strong> In my first-author work, I led the development of the largest world model designed for <strong>Proactive AI</strong>, enabling agents to anticipate future states and proactively learn from interaction. This work was accepted as an <strong>EMNLP Oral (top ~1%)</strong>.</li>
      <li><strong>Robot Learning:</strong> I developed a robot learning framework that evolves itself and achieves #1 performance on both LIBERO-Pro and RoboCasa365, surpassing results from the robotics company <strong>Physical Intelligence</strong> on two challenging benchmarks for robot generalization.</li>
      <li><strong>AI for Science:</strong> Recently, I have also been exploring AI-driven scientific discovery. I <strong>surpassed the previous world record on the three-color Pythagorean triples problem</strong> and produced a <strong>first proof for an open problem in number theory</strong>.</li>
      <li><strong>AGI:</strong> I am researching how to create digital life inside a computer: with no loss function, no ground-truth data, and no backpropagation, I use Darwinian evolution to create digital life with few-shot autonomous learning ability, opening a new route toward true AGI. The paper has been submitted to <strong>Nature</strong>.</li>
    </ul>

    <p>
      I conducted research under the guidance of <a href="https://jessethomason.com/">Prof. Jesse Thomason</a> at Georgia Tech, and
      <a href="https://www.cs.columbia.edu/~junfeng/">Prof. Junfeng Yang</a> and <a href="https://lsl.zone/">Prof. Shilong Liu</a> at Columbia. I have also
      conducted robot learning research with Research Scientists <a href="https://siddancha.github.io/">Siddharth Ancha</a> at UC Berkeley and
      <a href="https://ai.stanford.edu/~amandlek/">Ajay Mandlekar</a> at NVIDIA.
    </p>

    <div class="phd-callout">
      <div class="phd-title">I am actively seeking Ph.D. opportunities for Fall 2027.</div>
      <div class="phd-description">
        I am particularly interested in foundation models, world models, robot learning, AI for science, and AGI, with a focus on building agents that learn proactively and evolve on their own.
      </div>
    </div>

    <div class="homepage-links">
      <a href="https://github.com/Geeksongs" target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-github" aria-hidden="true"></i> GitHub
      </a>
    </div>
  </div>
</div>

<section class="home-section-card" markdown="1" aria-labelledby="news">

## News {#news}

{% include news.liquid %}

</section>

<section class="home-section-card" markdown="1" aria-labelledby="education">

## Education {#education}

{% include custom_education.liquid %}

</section>

<section class="home-section-card" markdown="1" aria-labelledby="experience">

## Research Experience {#experience}

{% include research_experience.liquid %}

</section>

<section class="home-section-card" markdown="1" aria-labelledby="selected-publications">

## Publications {#selected-publications}

### Published Papers, Preprints & Under Review

{% include publication_filters.liquid %}

{% include selected_papers.liquid %}

{% include manuscripts_in_preparation.liquid %}

[See all publications](/publications/)

</section>

<section class="home-section-card" markdown="1" aria-labelledby="skills">

## Skills {#skills}

<div class="home-skills">
  <section class="skill-group" aria-labelledby="skill-research">
    <span class="skill-icon"><i class="fa-solid fa-brain" aria-hidden="true"></i></span>
    <div>
      <h3 id="skill-research">Research Areas</h3>
      <div class="skill-tags">
        <span>Foundation models</span><span>World models</span><span>Proactive AI</span><span>Vision-language models</span><span>Reinforcement learning</span><span>Robot learning</span><span>Embodied AI</span>
      </div>
    </div>
  </section>
  <section class="skill-group" aria-labelledby="skill-science">
    <span class="skill-icon"><i class="fa-solid fa-flask" aria-hidden="true"></i></span>
    <div>
      <h3 id="skill-science">AI for Science &amp; AGI</h3>
      <div class="skill-tags">
        <span>AI-driven mathematical discovery</span><span>Number theory</span><span>Evolutionary computation</span><span>Digital life</span><span>Few-shot autonomous learning</span>
      </div>
    </div>
  </section>
  <section class="skill-group" aria-labelledby="skill-tools">
    <span class="skill-icon"><i class="fa-solid fa-code" aria-hidden="true"></i></span>
    <div>
      <h3 id="skill-tools">Programming</h3>
      <div class="skill-tags">
        <span>Python</span><span>PyTorch</span><span>Linux</span><span>Git</span>
      </div>
    </div>
  </section>
</div>

</section>

<section class="home-section-card" markdown="1" aria-labelledby="honors-awards">

## Honors & Awards {#honors-awards}

<div class="home-awards">
  <section class="award-group" aria-labelledby="award-research">
    <h3 id="award-research">Research Recognition</h3>
    <div class="award-card">
      <span class="award-icon"><i class="fa-solid fa-trophy" aria-hidden="true"></i></span>
      <div><h4>EMNLP 2026 Oral (Top ~1%)</h4><p>ProactiveEngine · 2026</p></div>
    </div>
    <div class="award-card">
      <span class="award-icon"><i class="fa-solid fa-robot" aria-hidden="true"></i></span>
      <div><h4>#1 on LIBERO-Pro and RoboCasa365</h4><p>Surpassing Physical Intelligence · 2026</p></div>
    </div>
  </section>
  <section class="award-group" aria-labelledby="award-academic">
    <h3 id="award-academic">Academic</h3>
    <div class="award-card">
      <span class="award-icon"><i class="fa-solid fa-award" aria-hidden="true"></i></span>
      <div><h4>ICML 2026 Silver Reviewer Award</h4><p>2026</p></div>
    </div>
    <div class="award-card">
      <span class="award-icon"><i class="fa-solid fa-graduation-cap" aria-hidden="true"></i></span>
      <div><h4>First Class Honours, Graduated with Highest Distinction</h4><p>University of Sydney · Top 1% of students · 2024</p></div>
    </div>
  </section>
</div>

</section>

<section class="home-section-card" markdown="1" aria-labelledby="academic-service">

## Academic Service & Activities {#academic-service}

<div class="home-academic-services">
  <section class="home-service" aria-labelledby="conference-reviewing">
    <span class="service-icon"><i class="fa-solid fa-user-check" aria-hidden="true"></i></span>
    <h3 id="conference-reviewing">Conference Reviewing</h3>
    <ul class="service-venues" aria-label="Reviewed conferences">
      <li><strong>ICML</strong><span>2026 · Silver Reviewer</span></li>
      <li><strong>NeurIPS</strong><span>2026</span></li>
      <li><strong>ICLR</strong><span>2025</span></li>
      <li><strong>AAAI</strong><span>2025</span></li>
    </ul>
  </section>
</div>

</section>

<nav class="home-contact-rail" aria-label="Quick contact links">
  <a href="https://github.com/Geeksongs" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><i class="fa-brands fa-github" aria-hidden="true"></i></a>
</nav>

<script src="{{ '/assets/js/homepage-interactions.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const phrases = [
      "a researcher in Foundation Models & World Models",
      "a robot learning researcher",
      "an AI for Science explorer",
      "a creator of digital life",
      "chasing AGI"
    ];
    const typedText = document.getElementById("typed-text");
    if (!typedText) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      typedText.textContent = phrases[0];
      return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
      const phrase = phrases[phraseIndex];
      if (deleting) {
        charIndex--;
        typedText.textContent = phrase.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(type, 300);
          return;
        }
        setTimeout(type, 38);
      } else {
        charIndex++;
        typedText.textContent = phrase.slice(0, charIndex);
        if (charIndex === phrase.length) {
          deleting = true;
          setTimeout(type, 1400);
          return;
        }
        setTimeout(type, 70);
      }
    }

    type();
  });
</script>
