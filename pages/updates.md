---
layout: page
title: 업데이트
permalink: /updates/
---

<h1>🗞 업데이트 & 공지 전체</h1>
<p>사이트 변경, 신규 인터랙티브 공개, 유지보수 일정 등 모든 공지를 모았습니다.</p>
<hr>

<ul>
{% assign notices = site.posts 
  | where_exp: "p", "p.tags contains '업데이트' or p.tags contains '공지'" 
  | sort: "date" | reverse %}
{% for post in notices %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <small> — {{ post.date | date: "%Y.%m.%d" }}</small>
  </li>
{% endfor %}
{% if notices.size == 0 %}
  <li><em>아직 공지가 없습니다.</em></li>
{% endif %}
</ul>
