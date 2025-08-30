---
layout: page
title: 성삼문
category: 성삼문
permalink: /category/sungsammoon/
---


<h1>📜 감정선: 성삼문</h1>

{% assign cat = site.categories.sungsammoon %}
{% if cat %}
  <ul>
    {% for post in cat %}
      <li><a href="{{ post.url }}">{{ post.title }}</a> ({{ post.date | date: "%Y.%m.%d" }})</li>
    {% endfor %}
  </ul>
{% else %}
  <p>📭 현재 이 카테고리에 속한 포스트가 없습니다.</p>
{% endif %}
