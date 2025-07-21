---
layout: page
title: 기타 인물들
category: 기타
permalink: /category/gita/
---


<h1>📜 감정선: 기타 인물들</h1>

{% assign cat = site.categories.gita %}
{% if cat %}
  <ul>
    {% for post in cat %}
      <li><a href="{{ post.url }}">{{ post.title }}</a> ({{ post.date | date: "%Y.%m.%d" }})</li>
    {% endfor %}
  </ul>
{% else %}
  <p>📭 현재 이 카테고리에 속한 포스트가 없습니다.</p>
{% endif %}
