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

    <address class="home-address">
      <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
      <span>San Francisco, CA 94105, USA</span>
    </address>

  </div>

  <div class="home-intro">
    <h1 class="home-title">Hello, I'm <span class="home-name">Python Song.</span></h1>

    <div class="typing-intro" aria-label="I am a researcher in foundation models, robot learning, and AI for science">
      <span aria-hidden="true">I am <span id="typed-text"></span><span class="typing-cursor">|</span></span>
    </div>

    <p>
      I graduated with a master's degree from <a href="https://www.columbia.edu/">Columbia University</a>. My research focuses on
      <strong class="research-key">foundation models, world models, robot learning, AI for science, and True AGI</strong>.
    </p>

    <div class="phd-callout">
      <div class="phd-title">I am actively seeking Ph.D. opportunities for Fall 2027.</div>
      <div class="phd-description">
        I am particularly interested in foundation models, world models, robot learning, AI for science, and True AGI, with a focus on building agents that learn proactively and evolve on their own.
      </div>
    </div>

    <div class="homepage-links">
      <a href="https://github.com/Geeksongs" target="_blank" rel="noopener noreferrer" class="link-btn">
        <i class="fa-brands fa-github" aria-hidden="true"></i> GitHub
      </a>
      <a href="mailto:js6665@columbia.edu" class="link-btn"> <i class="fa-solid fa-envelope" aria-hidden="true"></i> Email </a>
    </div>

  </div>

  <div class="research-grid">
    <article class="research-card">
      <div class="stat-panel"><i class="fa-solid fa-earth-americas stat-icon" aria-hidden="true"></i><span class="stat-big">Foundation Models &amp; World Models</span></div>
      <div class="card-body">
        <div class="card-head"><strong class="research-key area-label">Top 1% · EMNLP Oral</strong></div>
        <p>In my first-author work, I led the development of the largest world model designed for <strong class="research-key">Proactive AI</strong>. This work was accepted as an <strong class="research-key">EMNLP Oral (top ~1%)</strong>.</p>
      </div>
    </article>

    <article class="research-card">
      <div class="stat-panel"><i class="fa-solid fa-robot stat-icon" aria-hidden="true"></i><span class="stat-big">Robot Learning</span></div>
      <div class="card-body">
        <div class="card-head"><strong class="research-key area-label">#1 · LIBERO-Pro &amp; RoboCasa365</strong></div>
        <p>I developed a robot learning framework that evolves itself and achieves <strong class="research-key">#1 performance</strong> on both <strong>LIBERO-Pro</strong> and <strong>RoboCasa365</strong>, surpassing results from the robotics company Physical Intelligence on these two challenging benchmarks for robot generalization.</p>
      </div>
    </article>

    <article class="research-card">
      <div class="stat-panel"><i class="fa-solid fa-flask stat-icon" aria-hidden="true"></i><span class="stat-big">AI for Science</span></div>
      <div class="card-body">
        <div class="card-head"><strong class="research-key area-label">Break World Record</strong></div>
        <p>I have also been exploring AI-driven scientific discovery. I <strong class="research-key">surpassed the previous world record</strong> on the three-color Pythagorean triples problem and produced a <strong class="research-key">first proof</strong> for a notoriously hard open problem.</p>
      </div>
    </article>

    <article class="research-card">
      <div class="stat-panel"><i class="fa-solid fa-dna stat-icon" aria-hidden="true"></i><span class="stat-big">True AGI</span></div>
      <div class="card-body">
        <div class="card-head"><strong class="research-key area-label">A Brand-New Way of AI Learning</strong></div>
        <p>I am researching true AGI: with no loss function, no ground-truth data, and no backpropagation, I use Darwinian evolution, and few-shot autonomous learning ability emerges in the resulting digital life, opening a new route toward true AGI. This paper has been submitted to <strong class="research-key">Nature</strong>.</p>
      </div>
    </article>

  </div>

  <div class="home-collab">
    <p>
      I conducted research under the guidance of <a href="https://jessethomason.com/">Prof. Jesse Thomason</a> at Georgia Tech, and
      <a href="https://www.cs.columbia.edu/~junfeng/">Prof. Junfeng Yang</a> and <a href="https://lsl.zone/">Prof. Shilong Liu</a> at Columbia. I have also
      conducted robot learning research with Research Scientists <a href="https://siddancha.github.io/">Siddharth Ancha</a> at UC Berkeley and
      <a href="https://ai.stanford.edu/~amandlek/">Ajay Mandlekar</a> at NVIDIA.
    </p>
    <div class="affil-logos" aria-label="Research collaborations">
      <a href="https://www.columbia.edu/" target="_blank" rel="noopener noreferrer"><img src="{{ '/assets/img/columbia-university-vector-logo-seeklogo/columbia-university-seeklogo.png' | relative_url }}" alt="Columbia University"></a>
      <a href="https://www.gatech.edu/" target="_blank" rel="noopener noreferrer"><img src="{{ '/assets/img/gatech-logo.png' | relative_url }}" alt="Georgia Tech"></a>
      <a href="https://www.berkeley.edu/" target="_blank" rel="noopener noreferrer"><img src="{{ '/assets/img/berkeley-university-vector-logo-seeklogo/berkeley-university-seeklogo.png' | relative_url }}" alt="UC Berkeley"></a>
      <a href="https://www.nvidia.com/" target="_blank" rel="noopener noreferrer"><img src="{{ '/assets/img/nvidia-logo-png_seeklogo-101614.png' | relative_url }}" alt="NVIDIA"></a>
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

<section class="home-section-card" markdown="1" aria-labelledby="professional-experience">

## Professional Experience {#professional-experience}

{% include research_experience.liquid %}

</section>

<section class="home-section-card" markdown="1" aria-labelledby="selected-publications">

## Publications {#selected-publications}

{% include selected_papers.liquid %}

[See all publications](/publications/)

### Popular Book

**Learn Android Development from Scratch (Chinese Edition)** · Python Song (sole author) · Mechanical Industry Press, 2022. A **best-selling** title that **ranked 9th globally** on the Programmers' Frequently-Read Books List on JD.com.

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
      <h3 id="skill-science">AI for Science &amp; True AGI</h3>
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
  <section class="award-group" aria-labelledby="award-scholarships">
    <h3 id="award-scholarships">Scholarships &amp; Honors</h3>
    <div class="award-card">
      <span class="award-icon"><i class="fa-solid fa-award" aria-hidden="true"></i></span>
      <div><h4>Silver Reviewer Award, ICML</h4><p>2026</p></div>
    </div>
    <div class="award-card">
      <span class="award-icon"><i class="fa-solid fa-trophy" aria-hidden="true"></i></span>
      <div><h4>EMNLP 2026 Oral (Top 1%)</h4><p>Proactive Learning with Lifelong Memory via World Models · 2026</p></div>
    </div>
    <div class="award-card">
      <span class="award-icon"><i class="fa-solid fa-graduation-cap" aria-hidden="true"></i></span>
      <div><h4>Dalyell Scholar</h4><p>University of Sydney · 2022</p></div>
    </div>
  </section>
  <section class="award-group" aria-labelledby="award-competitions">
    <h3 id="award-competitions">Competitions</h3>
    <div class="award-card">
      <span class="award-icon"><i class="fa-solid fa-chart-line" aria-hidden="true"></i></span>
      <div><h4>CCF Big Data and Computing Intelligence Contest: Top 2%</h4><p>2021</p></div>
    </div>
    <div class="award-card">
      <span class="award-icon"><i class="fa-solid fa-atom" aria-hidden="true"></i></span>
      <div><h4>National High School Physics Olympiad: National First-Prize (Top 0.01%)</h4><p>2018</p></div>
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
      <li><strong>AAAI</strong><span>2025–2026</span></li>
      <li><strong>NeurIPS</strong><span>2026</span></li>
      <li><strong>ICML</strong><span>2026 · Silver Reviewer</span></li>
      <li><strong>ICLR</strong><span>2027</span></li>
    </ul>
  </section>
</div>

{% include homepage_impact.liquid %}

</section>

<nav class="home-contact-rail" aria-label="Quick contact links">
  <a href="mailto:js6665@columbia.edu" aria-label="Email" title="Email"><i class="fa-solid fa-envelope" aria-hidden="true"></i></a>
  <a href="https://github.com/Geeksongs" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><i class="fa-brands fa-github" aria-hidden="true"></i></a>
</nav>

<script src="{{ '/assets/js/homepage-interactions.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
<script src="{{ '/assets/js/liquid-bg.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>

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
