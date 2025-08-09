---
layout: page
title: 릴리즈노트
permalink: /updates/
---

<h1>🗞 업데이트 & 공지 전체</h1>
<hr>

<ul>
{% assign list1 = site.posts | where_exp: "p", "p.tags contains '업데이트'" %}
{% assign list2 = site.posts | where_exp: "p", "p.tags contains '공지'" %}
{% assign notices = list1 | concat: list2 | uniq | sort: "date" | reverse %}
{% for post in notices %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <small> — {{ post.date | date: "%Y.%m.%d" }}</small>
  </li>
{% endfor %}
{% if notices == empty %}
  <li><em>아직 공지가 없습니다.</em></li>
{% endif %}
</ul>
