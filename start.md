---
layout: landing
title: Start Your STEM Journey
permalink: /start
cta_variants:
  - "Start Learning Today"
  - "Join Our Mission"
  - "Get Involved Now"
youtube:
  title: "See Our Impact"
  subtitle: "Watch how we're empowering the next generation of engineers and entrepreneurs."
  video_ids:
    - "6sjGTbKeMOo" # Placeholder: Replace with actual YouTube video IDs
    - "BWXAXTTp_b4" # Placeholder: Replace with actual YouTube video IDs
---

<header class="masthead">
  <div class="container">
    <div class="intro-text">
      <div class="intro-lead-in">Welcome to the Digital Education & Safety Foundation</div>
      <div class="intro-heading text-uppercase">Empowering the Underserved with Modern STEM Education</div>
      <a class="btn btn-primary btn-xl text-uppercase js-scroll-trigger hero-cta" href="#education">Start Learning Today</a>
    </div>
  </div>
</header>

{% include youtube_section.html title=page.youtube.title subtitle=page.youtube.subtitle video_ids=page.youtube.video_ids %}

{% include featured_projects.html %}

{% include impact_donations.html %}

{% include contact.html %}
