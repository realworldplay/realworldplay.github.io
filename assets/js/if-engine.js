// Minimal Interactive Fiction Engine
const IF = (() => {
  const st = {
    data: null,     // scene graph
    state: { flags: {}, history: [] },
    current: null,
    baseUrl: "",
    storageKey: "if-save"
  };

  const el = {
    text: null, media: null, choices: null,
    back: null, restart: null, save: null, load: null, work: null
  };

  function qs(id) { return document.getElementById(id); }

  function applyEffects(effects = []) {
    effects.forEach(e => {
      if (e.setFlag) st.state.flags[e.setFlag] = true;
      if (e.clearFlag) delete st.state.flags[e.clearFlag];
    });
  }

  function meets(req = []) {
    // req: ["flagA", "!flagB"]
    return req.every(r => r.startsWith('!') ? !st.state.flags[r.slice(1)] : !!st.state.flags[r]);
  }

  function renderScene(id, pushHistory = true) {
    const scene = st.data.scenes[id];
    if (!scene) return console.error("Scene not found:", id);
    st.current = id;
    if (pushHistory) st.state.history.push(id);

    // media
    el.media.innerHTML = scene.media ? `<img alt="" src="${scene.media}">` : "";

    // text (typewriter optional)
    el.text.innerHTML = "";
    typeWriter(scene.text, el.text, 10);

    // choices
    el.choices.innerHTML = "";
    (scene.choices || []).forEach(ch => {
      if (ch.require && !meets(ch.require)) return;
      const b = document.createElement("button");
      b.className = "choice";
      b.textContent = ch.label;
      b.onclick = () => {
        applyEffects(ch.effects);
        renderScene(ch.goto);
      };
      el.choices.appendChild(b);
    });

    // auto-advance
    if ((!scene.choices || scene.choices.length === 0) && scene.next) {
      setTimeout(() => renderScene(scene.next), scene.delay || 800);
    }

    // update URL hash (북마크/공유)
    window.location.hash = `#${id}`;
  }

  function typeWriter(text, target, speed = 15) {
    let i = 0;
    function step() {
      target.innerHTML = text.slice(0, i++);
      if (i <= text.length) requestAnimationFrame(step);
    }
    step();
  }

  async function loadWork(file) {
    const res = await fetch(st.baseUrl + file, { cache: "no-cache" });
    st.data = await res.json();
    st.state = { flags: {}, history: [] };
    const start = st.data.start || Object.keys(st.data.scenes)[0];
    renderScene(start, false);
    // hash support
    if (location.hash) {
      const id = location.hash.replace("#", "");
      if (st.data.scenes[id]) renderScene(id, false);
    }
  }

  function goBack() {
    st.state.history.pop(); // current
    const prev = st.state.history.pop();
    if (prev) renderScene(prev, true);
  }

  function save() {
    localStorage.setItem(st.storageKey, JSON.stringify({
      dataId: st.data.id, state: st.state, current: st.current
    }));
    alert("저장됨");
  }

  async function load() {
    const raw = localStorage.getItem(st.storageKey);
    if (!raw) return alert("저장 데이터 없음");
    const save = JSON.parse(raw);
    await loadWork(save.dataId);
    st.state = save.state;
    renderScene(save.current, false);
  }

  function bind() {
    el.text = qs("scene-text");
    el.media = qs("scene-media");
    el.choices = qs("choices");
    el.back = qs("btnBack");
    el.restart = qs("btnRestart");
    el.save = qs("btnSave");
    el.load = qs("btnLoad");
    el.work = qs("workSelect");

    el.back.onclick = goBack;
    el.restart.onclick = () => loadWork(el.work.value);
    el.save.onclick = save;
    el.load.onclick = load;
    el.work.onchange = () => loadWork(el.work.value);

    // 키보드: 숫자 선택
    document.addEventListener("keydown", e => {
      const idx = parseInt(e.key, 10);
      if (!isNaN(idx)) {
        const btn = el.choices.querySelectorAll(".choice")[idx - 1];
        if (btn) btn.click();
      }
      if (e.key === "Backspace") goBack();
    });
  }

  function init(opts) {
    st.baseUrl = opts.baseUrl || "";
    st.storageKey = opts.storageKey || "if-save";
    bind();
    // 기본 작품 로드
    const sel = qs("workSelect");
    loadWork(sel.value);
  }

  return { init };
})();
