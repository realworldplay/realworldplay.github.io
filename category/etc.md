---
layout: category
title: 기타 인물들
category: 기타
permalink: /category/etc/
---

<h1>📜 감정선: 기타 인물들</h1>

<ul>
  {% for post in site.category.기타 %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a> ({{ post.date | date: "%Y.%m.%d" }})
    </li>
  {% endfor %}
</ul>
