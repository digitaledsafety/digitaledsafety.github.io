---
layout: default
title: Services
image: /assets/img/header-bg.jpg
---

{% include nav.html %}

<header class="masthead" style="background-image: url('{{ page.image }}')">
  <div class="container">
    <div class="intro-text">
      <div class="intro-lead-in">Our Work</div>
      <div class="intro-heading text-uppercase">Services</div>
    </div>
  </div>
</header>

<section id="services-page" class="bg-light">
  <div class="container">
    <div class="row">
      <div class="col-lg-12 text-center">
        <h2 class="section-heading text-uppercase">What We Do</h2>
        <h3 class="section-subheading text-muted">Empowering the underserved with a modern STEM education.</h3>
      </div>
    </div>
    <div class="row text-center">
      {% for service in site.data.sitetext[site.locale].services.list %}
      <div class="col-md-4">
        <span class="fa-stack fa-4x">
          <i class="fas fa-circle fa-stack-2x text-primary"></i>
          <i class="{{ service.icon }} fa-stack-1x fa-inverse"></i>
        </span>
        <h4 class="service-heading">{{ service.title }}</h4>
        <p class="text-muted">{{ service.desc }}</p>
      </div>
      {% endfor %}
    </div>
  </div>
</section>

{% include contact.html %}
