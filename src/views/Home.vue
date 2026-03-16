<template>
  <main class="home-page">
    <section class="hero">
      <div class="hero-text">
        <div class="hero-logo-wrap">
          <img src="/logo-eva.png" alt="Logo Eva Muñoz" class="hero-logo" />
        </div>

        <div class="hero-quote-wrap">
          <h1 class="hero-quote">“Tu poder empieza cuando eliges creer en ti”</h1>
        </div>

        <p class="hero-description">
          Estrategia, datos y visión de negocio aplicados a proyectos que buscan crecer
          con claridad, estructura y dirección.
        </p>

        <div class="hero-buttons">
          <button class="primary-btn" @click="goToElos">
            Entrar a ELOS
          </button>

          <a href="#perfil" class="secondary-btn">
            Conóceme más
          </a>
        </div>
      </div>

      <div class="hero-image-box">
        <img src="/eva-conferencia.jpg" alt="Eva Muñoz profesional" class="hero-image" />
      </div>
    </section>

    <section id="perfil" class="profile-section">
      <div class="profile-image-box">
        <img src="/eva-profesional.jpg" alt="Eva Muñoz dando conferencia" class="profile-image" />
      </div>

      <div class="profile-text">
        <p class="section-label">Sobre mí</p>

        <p class="section-paragraph">
          El crecimiento de un negocio rara vez ocurre por accidente.
          Detrás suele haber análisis, estrategia y una comprensión profunda de cómo interactúan el marketing,
          los datos y la estructura del negocio.
        </p>

        <p class="section-paragraph">
          Mi trabajo se centra en entender esas conexiones, detectar dónde están las verdaderas oportunidades
          de crecimiento y transformar campañas, información y decisiones en estrategias que impulsen
          ventas y expansión dentro de las empresas.
        </p>

        <p class="section-paragraph">
          A medida que el crecimiento se acelera, también aparecen nuevos desafíos: organización,
          procesos, equipos, tecnología y sistemas capaces de sostener la demanda.
          Esa experiencia trabajando con negocios en distintas etapas también me permite ayudar a optimizar,
          digitalizar y estructurar empresas para que ese crecimiento pueda ordenarse, escalarse y sostenerse en el tiempo.
        </p>

        <div class="highlight-box">
          <p>
            <strong>Impulsar el crecimiento de las ventas es donde comienza mi trabajo.</strong>
            Convertir ese crecimiento en empresas capaces de sostener la demanda, optimizar su operación e integrar tecnología, automatización y decisiones basadas en datos es donde realmente aporto valor.
          </p>
        </div>
      </div>
    </section>

    <section class="vision-section">
      <div class="vision-card">
        

        <h2 class="vision-title">
          El inicio de algo más grande
        </h2>

        <div class="vision-content">
          <p class="vision-paragraph">
            Después de trabajar durante años analizando, estructurando y ayudando a crecer distintos proyectos y empresas, empezó a formarse en mí una visión que me mueve profundamente: construir proyectos bajo un enfoque de social business, donde el conocimiento, la empresa y las comunidades puedan trabajar juntos para fortalecer la economía y generar oportunidades de desarrollo.
          </p>

          <p class="vision-paragraph">
            Con el tiempo entendí que iniciativas de este tipo se construyen por etapas. Generar impacto en comunidades completas requiere estructura, colaboración y proyectos capaces de crecer y sostenerse en el tiempo.
          </p>

          <p class="vision-paragraph">
            Por eso el primer paso comienza en otro lugar: la comunidad digital. De esa idea nace ELOS, un espacio pensado para compartir conocimiento y abrir oportunidades de desarrollo en distintas áreas de la vida. Desde aprender un oficio, desarrollar habilidades o crear proyectos propios, hasta acceder a herramientas relacionadas con la mente, las emociones, la salud, el crecimiento personal o el emprendimiento. Porque el desarrollo no es solo económico: también implica bienestar, equilibrio y la posibilidad de reconstruir la propia vida cuando las circunstancias han sido difíciles.
          </p>
        </div>
      </div>
    </section>

    <section class="areas-section">
    
      <h2 class="section-title center">
        Líneas principales de acción
      </h2>

      <div class="areas-grid two-cols">
        <article class="area-card">
          <h3>Consultoría y crecimiento empresarial </h3>
          <p>
            Análisis, estructura y dirección para empresas que buscan claridad en sus decisiones, crecimiento 
            sostenible y una mejor integración entre negocio, marketing y datos.
          </p>
          <p> <br> 
        <em>contacto: info@evamunoz.org</em>
          </p>
        </article>

        <article class="area-card featured">
          <img src="/elos-logo.png" class="elos-logo" alt="ELOS logo">
          <p>
            Es un proyecto personal que desarrollo con un enfoque filantrópico y 
            de impacto social: un espacio para aprender, crecer y acompañar procesos 
            desde una visión más humana y profunda, donde el conocimiento puede abrir nuevas 
            oportunidades de desarrollo personal, profesional y económico.
          </p>
          <button class="mini-btn" @click="goToElos">
            Ir a ELOS
          </button>
        </article>
      </div>
    </section>

    <section class="closing-section">
      <div class="closing-card">
        <p class="closing-text">
          "La estrategia hace crecer negocios. El propósito transforma vidas"   <br><i>— Eva Muñoz</i>
        </p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const router = useRouter();
const isAuthenticated = ref(false);

const goToElos = () => {
  if (isAuthenticated.value) {
    router.push("/elos");
  } else {
    router.push("/login");
  }
};

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isAuthenticated.value = !!user;
  });
});
</script>

<style scoped>
.home-page {
  background: #f5f1f0;
  color: #686968;
  min-height: 100vh;
  padding: 40px 24px 80px;
}

.hero {
  max-width: 1180px;
  margin: 0 auto 90px;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 46px;
  align-items: center;
}

.hero-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 12px 0;
  max-width: 640px;
  margin: 0 auto;
}

.hero-logo-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
}

.hero-logo-wrap::after {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -14px;
  width: 150px;
  height: 1px;
  background: linear-gradient(
    to right,
    rgba(185, 160, 156, 0),
    rgba(185, 160, 156, 0.55),
    rgba(185, 160, 156, 0)
  );
}

.hero-logo {
  width: 390px;
  max-width: 100%;
  display: block;
  filter: drop-shadow(0 6px 16px rgba(104, 105, 104, 0.08));
}

.hero-quote-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 28px auto 28px;
  width: 100%;
}

.hero-quote-wrap::after {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -16px;
  width: 165px;
  height: 1px;
  background: linear-gradient(
    to right,
    rgba(185, 160, 156, 0),
    rgba(185, 160, 156, 0.52),
    rgba(185, 160, 156, 0)
  );
}

.hero-quote {
  margin: 0;
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: #686968;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.45);
  font-weight: 500;
  white-space: nowrap;
}

.hero-description {
  margin: 30px auto 30px;
  max-width: 560px;
  font-size: 1.06rem;
  line-height: 1.9;
  color: #6d6a69;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
}

.primary-btn,
.secondary-btn,
.mini-btn {
  border: none;
  border-radius: 999px;
  padding: 14px 24px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.25s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.primary-btn {
  background: #b9a09c;
  color: white;
}

.primary-btn:hover {
  background: #a78d88;
}

.secondary-btn {
  background: transparent;
  border: 1px solid #b9a09c;
  color: #b9a09c;
}

.secondary-btn:hover {
  background: #eadbdd;
}

.mini-btn {
  background: #686968;
  color: white;
  padding: 12px 18px;
  margin-top: 14px;
}

.mini-btn:hover {
  background: #565657;
}

.hero-image-box,
.profile-image-box {
  background: white;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
}

.hero-image-box {
  position: relative;
  border-radius: 34px;
  overflow: hidden;
  background: linear-gradient(145deg, #f5efee, #ebe3e1);
  box-shadow:
    0 22px 45px rgba(104, 105, 104, 0.09),
    inset 0 1px 0 rgba(255, 255, 255, 0.65);
}

.hero-image-box::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(185, 160, 156, 0.16), transparent 32%);
  pointer-events: none;
  z-index: 1;
}

.hero-image,
.profile-image {
  width: 100%;
  display: block;
  object-fit: cover;
}

.hero-image {
  height: 650px;
  object-position: center top;
  position: relative;
  z-index: 0;
}

.profile-section {
  max-width: 1180px;
  margin: 0 auto 70px;
  display: grid;
  grid-template-columns: 0.92fr 1.08fr;
  gap: 42px;
  align-items: center;
}

.profile-image {
  height: 560px;
  object-position: center top;
}

.profile-text {
  background: white;
  padding: 44px;
  border-radius: 28px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.04);
}

.section-label {
  color: #b9a09c;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.85rem;
  margin-bottom: 12px;
}

.section-title {
  font-family: "Playfair Display", serif;
  font-size: 2.2rem;
  line-height: 1.2;
  color: #686968;
  margin-bottom: 18px;
}

.section-title.center,
.section-label.center {
  text-align: center;
}

.section-paragraph {
  line-height: 1.85;
  font-size: 1rem;
  margin-bottom: 16px;
}

.highlight-box {
  position: relative;
  margin-top: 30px;
  padding: 28px 24px 24px;
  border-radius: 24px;
  background: linear-gradient(145deg, #f2eceb, #ebe3e1);
  border: 1px solid rgba(185, 160, 156, 0.28);
  box-shadow:
    0 14px 30px rgba(104, 105, 104, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.55);
  overflow: hidden;
}

.highlight-box::before {
  content: "";
  position: absolute;
  left: 0;
  top: 22px;
  bottom: 22px;
  width: 4px;
  border-radius: 999px;
  background: linear-gradient(to bottom, #b9a09c, #8f8b8a);
  opacity: 0.95;
}

.highlight-box::after {
  content: "“";
  position: absolute;
  top: 8px;
  left: 20px;
  font-size: 4.4rem;
  line-height: 1;
  font-family: "Playfair Display", serif;
  color: rgba(104, 105, 104, 0.10);
  pointer-events: none;
}

.highlight-box p {
  margin: 0;
  position: relative;
  z-index: 1;
  text-align: center;
  color: #5f5a59;
  font-size: 1rem;
  line-height: 1.85;
  padding-left: 10px;
}

.highlight-box strong {
  display: block;
  margin-bottom: 14px;
  font-size: 1.48rem;
  line-height: 1.35;
  font-weight: 700;
  letter-spacing: -0.01em;
  text-wrap: balance;
  color: #4f4a49;
}

.highlight-box br {
  display: none;
}

.vision-section {
  max-width: 1180px;
  margin: 0 auto 90px;
}

.vision-card {
  position: relative;
  overflow: hidden;
  border-radius: 32px;
  padding: 56px 58px;
  background:
    radial-gradient(circle at top right, rgba(185, 160, 156, 0.14), transparent 34%),
    linear-gradient(135deg, #f1ebea, #ebe2e0);
  border: 1px solid rgba(185, 160, 156, 0.24);
  box-shadow:
    0 18px 36px rgba(104, 105, 104, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.60);
}

.vision-card::before {
  content: "";
  position: absolute;
  left: 28px;
  top: 44px;
  bottom: 44px;
  width: 3px;
  border-radius: 999px;
  background: linear-gradient(to bottom, #b9a09c, rgba(143, 139, 138, 0.35));
  opacity: 0.9;
}

.vision-card::after {
  content: "“";
  position: absolute;
  top: 18px;
  right: 34px;
  font-size: 5rem;
  line-height: 1;
  font-family: "Playfair Display", serif;
  color: rgba(104, 105, 104, 0.08);
  pointer-events: none;
}

.vision-title {
  font-family: "Playfair Display", serif;
  font-size: 2.15rem;
  line-height: 1.18;
  color: #686968;
  text-align: center;
  margin-bottom: 28px;
}

.vision-content {
  max-width: 950px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.vision-paragraph {
  font-size: 1.04rem;
  line-height: 1.95;
  color: #5f5a59;
  margin-bottom: 18px;
}

.vision-paragraph:last-child {
  margin-bottom: 0;
}

.areas-section {
  max-width: 1180px;
  margin: 0 auto 80px;
}

.areas-grid {
  display: grid;
  gap: 22px;
  margin-top: 28px;
}

.areas-grid.two-cols {
  grid-template-columns: repeat(2, 1fr);
}

.area-card {
  background: white;
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.04);
}

.area-card h3 {
  font-family: "Playfair Display", serif;
  font-size: 1.45rem;
  color: #686968;
  margin-bottom: 14px;
}

.area-card p {
  line-height: 1.75;
  margin: 0;
}

.area-card.featured {
  background: linear-gradient(135deg, #eadbdd, #f5f1f0);
  border: 1px solid #dbc7c3;
}

.closing-section {
  max-width: 1180px;
  margin: 0 auto;
}

.closing-card {
  background: #686968;
  color: white;
  border-radius: 28px;
  padding: 42px;
  text-align: center;
}

.closing-text {
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  line-height: 1.5;
  margin: 0;
}

.elos-logo{
height:55px;
margin-bottom:18px;
margin-top:4px;
}


@media (max-width: 900px) {
  .hero,
  .profile-section,
  .areas-grid.two-cols {
    grid-template-columns: 1fr;
  }

  .hero-text {
    max-width: 100%;
    padding: 0;
  }

  .hero-logo {
    width: 250px;
  }

  .hero-logo-wrap::after {
    width: 120px;
    bottom: -12px;
  }

  .hero-quote-wrap {
    margin: 24px auto 24px;
  }

  .hero-quote-wrap::after {
    width: 120px;
  }

  .hero-quote {
    font-size: 1.34rem;
    line-height: 1.25;
    white-space: normal;
  }

  .hero-description {
    font-size: 1rem;
    line-height: 1.8;
    margin: 20px auto 26px;
  }

  .hero-image {
    height: 430px;
  }

  .profile-image {
    height: 380px;
  }

  .profile-text,
  .closing-card,
  .vision-card {
    padding: 28px;
  }

  .highlight-box {
    padding: 24px 18px 20px;
  }

  .highlight-box strong {
    font-size: 1.28rem;
  }

  .highlight-box p {
    font-size: 0.96rem;
    line-height: 1.75;
  }

  .vision-card::before {
    left: 18px;
    top: 24px;
    bottom: 24px;
  }

  .vision-card::after {
    right: 18px;
    top: 10px;
    font-size: 4rem;
  }

  .vision-title {
    font-size: 1.7rem;
  }

  .vision-paragraph {
    font-size: 0.98rem;
    line-height: 1.85;
  }
}
</style>
