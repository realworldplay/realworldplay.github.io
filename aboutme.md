---
layout: page
title: 초부 & 이 아카이브
subtitle: 말해지지 않은 감정선을 복원하는 연성 실험실
permalink: /about/
---

## 🙌 안녕하세요, 초부입니다
역사 속 인물들의 **감정선**을 복원하고,  
그걸 인터랙티브로 엮어 **누르면 움직이는 서사**를 만듭니다.  
이곳은 그런 실험을 모아둔 기록실이에요.

- 📚 연성 기록실: [archive]({{ site.baseurl }}/archive/)
- 🗂 인물별 보기: [categories]({{ site.baseurl }}/categories/)
- 🎮 인터랙티브: [interactive]({{ site.baseurl }}/interactive/)

---

## 📢 업데이트 & 공지 (최근 5개)
전체 목록은 👉 [업데이트 전체 보기]({{ site.baseurl }}/updates/)

<ul>
{% assign notices = site.posts 
  | where_exp: "p", "p.tags contains '업데이트' or p.tags contains '공지'" 
  | sort: "date" | reverse %}
{% for post in notices limit:5 %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <small> — {{ post.date | date: "%Y.%m.%d" }}</small><br>
    <small>{{ post.excerpt | strip_html | truncate: 120 }}</small>
  </li>
{% endfor %}
{% if notices.size == 0 %}
  <li><em>아직 공지가 없습니다. 곧 올게요!</em></li>
{% endif %}
</ul>
