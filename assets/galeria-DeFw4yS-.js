import{CanvasTexture as e,ClampToEdgeWrapping as t,Clock as n,Color as r,CylinderGeometry as i,DataTexture as a,Euler as o,HalfFloatType as s,InstancedBufferAttribute as c,InstancedMesh as l,LinearFilter as u,LinearMipmapLinearFilter as d,MathUtils as f,Matrix4 as ee,Mesh as te,MeshBasicMaterial as ne,PerspectiveCamera as re,PlaneGeometry as ie,Quaternion as ae,Raycaster as p,SRGBColorSpace as oe,Scene as se,ShaderMaterial as ce,Texture as le,TorusGeometry as ue,Vector2 as de,Vector3 as m,WebGLRenderTarget as fe,WebGLRenderer as pe}from"./three.module-D7TxY2cb.js";import{i as me,n as he,r as ge,t as _e}from"./OutputPass-CPPXKWbS.js";var h=document,g={},ve=[],ye=[],_=(e,t,n,r)=>{e.addEventListener(t,n,r),ve.push([e,t,n,r])},v=e=>(h||document).querySelector(e),y=matchMedia(`(pointer: coarse)`).matches;matchMedia(`(prefers-reduced-motion: reduce)`).matches;var b=!y&&matchMedia(`(min-width: 701px)`).matches,x=structuredClone({gallery:{imageScale:.83,radius:6,spiralStep:.8,imagesPerTurn:7,curvature:1.5,instancias:18},motion:{momentum:.87,scrollAdvance:.17,autoRotate:.002,scrollRotateForce:.5,maxRotSpeed:.15,rotSmoothing:.09},effects:{squeezeMax:.5,squeezeWidth:7.5,chromatic:.02,opacity:1,emission:.15,saturation:1.5,brightness:.84,scanLines:.6,scanSpeed:3.9,scanDensity:25,fadeStart:3,fadeEnd:8,flicker:.18,flickerSpeed:5},border:{width:.005,color:`#bff747`,glow:.9,radius:0,offset:0},corners:{size:.06,width:.005,offset:.03},dither:{on:!0,cell:3,gap:5.5,contrast:-.02,baseScale:.5,intensity:2.61,mode:`invHalftone`,shape:`circle`,bg:`#111111`,fg:`#bff747`,useColor:!0},bloom:{intensity:.35,threshold:.4,radius:.65},grid:{on:!0,radius:32,height:90,cell:.45,subdivisions:2,tileX:17,tileY:5,majorW:.005,minorW:.004,dotSize:.011,color:`#bff747`,majorOp:.46,minorOp:.14,dotOp:1,bg:`#26330a`,bgOp:.12,hFade:.1,hFadeSoft:.7},camera:{baseZoom:11,maxZoomOut:28.5,zoomSpeed:.05,zoomDecay:.1,panX:.8,panY:1.2,smoothing:.06,lookY:.1,exposicion:1},shape:{on:!0,color:`#bff747`,scale:2.3,opacity:.8,tiltX:-.5,tiltZ:-1.95,autoRotate:.004,scrollRotate:1.75,maxRot:.15,smooth:.09,scaleReact:.02},entrada:{recorrido:1,distancia:9,altura:7,giro:.8,amortigua:.22},recorrido:{ritmo:.14,tope:1.7},foco:{margen:1.5,offsetMira:.95,duracion:1.2}}),be={flat:0,halftone:1,invHalftone:2,rotacion:3,cuadros:6,contorno:10,cuantizado:12,ruido:13,umbral:15},xe={circle:0,square:1,diamond:2,hexagon:3,star:8,hueco:9,plus:10};function Se(e,t){let n=e.split(`.`),r=n.pop();n.reduce((e,t)=>e[t],x)[r]=t}function Ce(){return(g.items||[]).map(e=>({...e,url:new URL(e.img,location.origin).href,catalogo:new URL(e.img,location.origin).href,alta:new URL(String(e.img).replace(`-640.webp`,`.webp`),location.origin).href}))}function we(e,t){let n=0;return Promise.all(e.map(r=>new Promise(i=>{let a=new Image;a.onload=()=>{n++,t(n,e.length),i(a)},a.onerror=()=>{n++,t(n,e.length),i(null)},a.src=r.url})))}function Te(n,r,i){let a=Math.round(i/r),o=Math.max(1,Math.ceil(Math.sqrt(n.length))),s=Math.max(1,Math.ceil(n.length/o)),c=document.createElement(`canvas`);c.width=o*i,c.height=s*a;let l=c.getContext(`2d`);l.fillStyle=`#000`,l.fillRect(0,0,c.width,c.height),n.forEach((e,t)=>{if(!e)return;let n=t%o,s=Math.floor(t/o),c=e.naturalWidth/e.naturalHeight,u=0,d=e.naturalWidth,f=e.naturalHeight;c>r?(d=e.naturalHeight*r,u=(e.naturalWidth-d)/2):f=e.naturalWidth/r,l.drawImage(e,u,0,d,f,n*i,s*a,i,a)});let d=new e(c);return d.minFilter=u,d.magFilter=u,d.wrapS=t,d.wrapT=t,d.generateMipmaps=!1,d.needsUpdate=!0,{tex:d,cols:o,rows:s,count:n.length}}var Ee=`
  uniform float uRadio;
  uniform float uDesplazaY;
  uniform float uAlturaTotal;
  uniform float uEscala;
  uniform float uCurvatura;
  uniform float uRotacion;
  uniform float uAprieta;        // squeeze (reloj de arena)
  uniform float uAprietaAncho;
  attribute float aAngulo;
  attribute float aY;
  attribute float aTex;
  attribute float aFoco;
  varying vec2 vUv;
  varying float vTex;
  varying float vProfundidad;
  varying float vMundoY;
  varying float vFoco;
  void main() {
    vUv = uv;
    vTex = aTex;
    vFoco = aFoco;
    vec3 esc = position * uEscala;
    float yEnvuelto = aY + uDesplazaY;
    yEnvuelto = mod(yEnvuelto + uAlturaTotal * 0.5, uAlturaTotal) - uAlturaTotal * 0.5;
    float y = yEnvuelto + esc.y;
    float gauss = exp(-(y * y) / (uAprietaAncho * uAprietaAncho));
    float radioEf = uRadio * (1.0 - uAprieta * gauss);
    float ang = aAngulo + uRotacion + esc.x / (radioEf * uCurvatura);
    float x = sin(ang) * radioEf;
    float z = cos(ang) * radioEf;
    vProfundidad = smoothstep(-radioEf, radioEf * 0.5, z);
    vMundoY = y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(x, y, z, 1.0);
  }
`,De=`
  precision highp float;
  uniform sampler2D uAtlas;
  uniform float uAtlasCols;
  uniform float uAtlasRows;
  uniform float uTiempo;
  uniform float uAberracion;
  uniform float uOpacidad;
  uniform float uSaturacion;
  uniform float uBrillo;
  uniform float uEmision;
  uniform float uScan;
  uniform float uScanVel;
  uniform float uScanDens;
  uniform float uFadeIni;
  uniform float uFadeFin;
  uniform float uFlicker;
  uniform float uFlickerVel;
  uniform float uBordeAncho;
  uniform vec3 uBordeColor;
  uniform float uBordeBrillo;
  uniform float uBordeRadio;
  uniform float uBordeOffset;
  uniform float uEsquina;
  uniform float uEsquinaAncho;
  uniform float uEsquinaOffset;
  uniform float uDitherOn;
  uniform float uDCelda;
  uniform float uDGap;
  uniform float uDContraste;
  uniform float uDModo;
  uniform float uDForma;
  uniform float uDEscala;
  uniform float uDIntensidad;
  uniform vec3 uDFondo;
  uniform vec3 uDFrente;
  uniform float uDColor;
  uniform float uAspecto;
  uniform float uHayFoco;
  uniform sampler2D uAlta;
  uniform float uAltaLista;
  varying vec2 vUv;
  varying float vTex;
  varying float vProfundidad;
  varying float vMundoY;
  varying float vFoco;

  const float PI = 3.14159265359;

  vec2 uvTile(vec2 local) {
    float idx = floor(vTex + 0.5);
    float col = mod(idx, uAtlasCols);
    float fil = floor(idx / uAtlasCols);
    return vec2((col + local.x) / uAtlasCols, 1.0 - (fil + 1.0 - local.y) / uAtlasRows);
  }

  float luma(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }

  float sdRect(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }
  float sdCirculo(vec2 p, float r) { return length(p) - r; }
  float sdCaja(vec2 p, vec2 b) { vec2 d = abs(p) - b; return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0); }
  float sdRombo(vec2 p, float r) { vec2 q = abs(p) / max(r, 1e-4); return (q.x + q.y - 1.0) * r * 0.7071; }
  float sdHexagono(vec2 p, float r) {
    const vec3 k = vec3(-0.866025404, 0.5, 0.577350269);
    vec2 q = abs(p.yx);
    q -= 2.0 * min(dot(k.xy, q), 0.0) * k.xy;
    q -= vec2(clamp(q.x, -k.z * r, k.z * r), r);
    return length(q) * sign(q.y);
  }
  float sdEstrella(vec2 p, float r) {
    vec2 q = p / max(r, 1e-4);
    q.x = abs(q.x);
    const vec2 k1 = vec2(0.809016994, -0.587785252);
    const vec2 k2 = vec2(-0.809016994, -0.587785252);
    q -= 2.0 * max(dot(k1, q), 0.0) * k1;
    q -= 2.0 * max(dot(k2, q), 0.0) * k2;
    q.x = abs(q.x);
    q.y -= 1.0;
    vec2 ba = 0.5 * vec2(0.587785252, 0.809016994) - vec2(0.0, 1.0);
    float h = clamp(dot(q, ba) / dot(ba, ba), 0.0, 1.0);
    return length(q - ba * h) * r;
  }
  mat2 gira(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }

  float formaSDF(vec2 p, float esc) {
    float e = 0.5 * esc;
    if (uDForma < 0.5)  return sdCirculo(p, e);
    if (uDForma < 1.5)  return sdCaja(p, vec2(e));
    if (uDForma < 2.5)  return sdRombo(p, e);
    if (uDForma < 3.5)  return sdHexagono(p, e);
    if (uDForma < 8.5)  return sdEstrella(vec2(p.x, -p.y), e);
    if (uDForma < 9.5)  return max(sdCaja(p, vec2(e)), -sdCaja(p, vec2(e * 0.78)));
    return min(sdCaja(p, vec2(e * 0.22, e)), sdCaja(p, vec2(e, e * 0.22)));
  }

  // Trama: por cada celda se dibuja una figura con tamano/giro segun la
  // luminancia de la imagen (medio tono / negativo / cuantizado / umbral...).
  vec4 trama(vec2 local) {
    vec2 p = vec2(local.x * uAspecto, local.y);
    float celdas = 1.0 / (uDCelda / 100.0);
    vec2 indice = floor(p * celdas);
    float aa = 2.0 / uDCelda;

    float mejorDist = 100.0;
    float prioridad = -1.0;
    vec3 colorFigura = vec3(0.0);

    for (float y = -1.0; y <= 1.0; y++) {
      for (float x = -1.0; x <= 1.0; x++) {
        vec2 nIdx = indice + vec2(x, y);
        vec2 centroUv = (nIdx + 0.5) / celdas;
        centroUv.x /= uAspecto;
        if (centroUv.x < 0.0 || centroUv.x > 1.0 || centroUv.y < 0.0 || centroUv.y > 1.0) continue;

        vec3 col = texture2D(uAtlas, uvTile(centroUv)).rgb;
        float f = (1.015 * (uDContraste + 1.0)) / (1.0 * (1.015 - uDContraste));
        col = clamp(f * (col - 0.5) + 0.5, 0.0, 1.0);
        float lum = luma(col);

        float escX = uDEscala;
        float escY = uDEscala;
        float giro = 0.0;
        vec2 desp = vec2(0.0);

        if (uDModo < 0.5)       { }                                       // plano
        else if (uDModo < 1.5)  { escX = escY = lum * uDEscala * 1.5; }    // medio tono
        else if (uDModo < 2.5)  { escX = escY = (1.0 - lum) * uDEscala * 1.5; }  // negativo
        else if (uDModo < 3.5)  { giro = lum * PI * uDIntensidad; }
        else if (uDModo < 6.5)  {                                          // cuadros
          if (mod(nIdx.x + nIdx.y, 2.0) < 0.5) escX = escY = lum * uDEscala * 1.5;
          else escX = escY = (1.0 - lum) * uDEscala * 1.5;
        }
        else if (uDModo < 10.5) { escX = escY = abs(lum - 0.5) * 2.0 * uDEscala; }
        else if (uDModo < 12.5) { float q = floor(lum * 4.0) / 4.0; escX = escY = q * uDEscala * 1.5; }
        else if (uDModo < 13.5) { float n = fract(sin(dot(nIdx, vec2(12.9898, 78.233))) * 43758.5453); escX = escY = (lum + n * 0.5) * uDEscala; }
        else                    { escX = escY = (lum < 0.5) ? 0.0 : uDEscala; }

        if (escX < 0.001 || escY < 0.001) continue;

        float hueco = 1.0 - (uDGap / uDCelda);   // puede ser negativo: figura llena
        float esc = 0.5 * hueco;
        vec2 centroCelda = (nIdx + 0.5 + desp) / celdas;
        vec2 rel = p - centroCelda;
        if (giro != 0.0) rel = gira(giro) * rel;
        rel *= celdas;

        float d = formaSDF(rel, esc * ((escX + escY) * 0.5));
        mejorDist = min(mejorDist, d);
        if (d < aa && lum > prioridad) {
          prioridad = lum;
          colorFigura = (uDColor > 0.5) ? col : uDFrente;
        }
      }
    }
    float mascara = 1.0 - smoothstep(0.0, aa, mejorDist);
    return vec4(mix(uDFondo, colorFigura, mascara), mascara);
  }

  float esquinas(vec2 uv, float largo, float ancho, float off) {
    float m = 0.0;
    float o = off;
    if (uv.x >= o && uv.x < o + largo && uv.y >= o && uv.y < o + ancho) m = 1.0;
    if (uv.x >= o && uv.x < o + ancho && uv.y >= o && uv.y < o + largo) m = 1.0;
    if (uv.x > 1.0 - o - largo && uv.x <= 1.0 - o && uv.y >= o && uv.y < o + ancho) m = 1.0;
    if (uv.x > 1.0 - o - ancho && uv.x <= 1.0 - o && uv.y >= o && uv.y < o + largo) m = 1.0;
    if (uv.x >= o && uv.x < o + largo && uv.y > 1.0 - o - ancho && uv.y <= 1.0 - o) m = 1.0;
    if (uv.x >= o && uv.x < o + ancho && uv.y > 1.0 - o - largo && uv.y <= 1.0 - o) m = 1.0;
    if (uv.x > 1.0 - o - largo && uv.x <= 1.0 - o && uv.y > 1.0 - o - ancho && uv.y <= 1.0 - o) m = 1.0;
    if (uv.x > 1.0 - o - ancho && uv.x <= 1.0 - o && uv.y > 1.0 - o - largo && uv.y <= 1.0 - o) m = 1.0;
    return m;
  }

  void main() {
    vec2 centrado = vUv - 0.5;
    float aa = 0.005;
    float mascaraImg = 1.0 - smoothstep(-aa, aa, sdRect(centrado, vec2(0.5), uBordeRadio));

    float ca = uAberracion * (0.3 + 0.7 * (1.0 - vProfundidad)) * (1.0 - vFoco);
    vec3 color = vec3(
      texture2D(uAtlas, uvTile(vUv + vec2(ca, 0.0))).r,
      texture2D(uAtlas, uvTile(vUv)).g,
      texture2D(uAtlas, uvTile(vUv - vec2(ca, 0.0))).b
    );

    // La tarjeta ENFOCADA va limpia: sin trama, sin scanlines, sin parpadeo, sin
    // fundido y con el brillo neutro (se ve la captura de verdad). vFoco mezcla.
    // Ademas, si hay captura en ALTA resolucion cargada (uAlta), se usa ESA para
    // que no se vea pixelada al llenar la pantalla.
    vec3 colorLimpio = color;
    if (uAltaLista > 0.5 && vFoco > 0.001) {
      colorLimpio = mix(colorLimpio, texture2D(uAlta, vUv).rgb, vFoco);
    }
    float alfaTrama = 1.0;
    if (uDitherOn > 0.5) {
      vec4 t = trama(vUv);
      color = t.rgb;
      alfaTrama = t.a;
    }
    color = mix(color, colorLimpio, vFoco);

    float l = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(l), color, mix(uSaturacion, 1.0, vFoco));
    color *= mix(uBrillo, 1.0, vFoco);

    float scan = uScan * (1.0 - vFoco);
    if (scan > 0.0) {
      float linea = sin((vMundoY * uScanDens + uTiempo * uScanVel) * 3.14159) * 0.5 + 0.5;
      color *= 1.0 - scan * (1.0 - linea) * 0.3;
    }
    color *= mix(mix(0.15, 1.0, smoothstep(0.0, 0.5, vProfundidad)), 1.0, vFoco);
    color += color * (uEmision * (1.0 - vFoco));

    float alfaImg = mascaraImg * mix(uDitherOn > 0.5 ? alfaTrama : 1.0, 1.0, vFoco);

    vec3 brillo = uBordeColor * (1.0 + uBordeBrillo);
    float dist = sdRect(centrado, vec2(0.5) - uBordeOffset, uBordeRadio);
    float borde = clamp((1.0 - smoothstep(-aa, aa, dist)) - (1.0 - smoothstep(-aa, aa, dist + uBordeAncho)), 0.0, 1.0);
    float esq = esquinas(vUv, uEsquina, uEsquinaAncho, uEsquinaOffset);
    color = mix(color, brillo, max(borde, esq));

    float fade = 1.0 - smoothstep(uFadeIni, uFadeFin, abs(vMundoY));
    fade = mix(fade, 1.0, vFoco);
    float parpadeo = 1.0;
    if (uFlicker > 0.0) {
      float t = uTiempo * uFlickerVel;
      float f1 = sin(t * 13.0) * 0.5 + 0.5;
      float f2 = sin(t * 37.0 + 1.7) * 0.5 + 0.5;
      float f3 = sin(t * 59.0 + 4.1) * 0.5 + 0.5;
      float comb = f1 * f2 + f3 * 0.3;
      float glitch = step(0.92, fract(sin(floor(t * 8.0)) * 43758.5453));
      comb = mix(comb, 0.1, glitch);
      parpadeo = 1.0 - uFlicker * (1.0 - clamp(comb, 0.3, 1.0));
    }
    parpadeo = mix(parpadeo, 1.0, vFoco);
    // con una tarjeta enfocada, las demas se atenuan para que resalte
    color *= 1.0 - 0.6 * uHayFoco * (1.0 - vFoco);
    gl_FragColor = vec4(color * parpadeo, max(alfaImg, max(borde, esq)) * mix(uOpacidad, 1.0, vFoco) * fade);
  }
`,Oe=`
  precision highp float;
  uniform float uCelda;
  uniform float uSubdiv;
  uniform float uAnchoMayor;
  uniform float uAnchoMenor;
  uniform float uPunto;
  uniform vec3 uColor;
  uniform float uOpMayor;
  uniform float uOpMenor;
  uniform float uOpPunto;
  uniform vec3 uFondo;
  uniform float uOpFondo;
  uniform float uTileX;
  uniform float uTileY;
  uniform float uFade;
  uniform float uFadeSuave;
  varying vec2 vUv;
  void main() {
    vec2 uv = vec2(vUv.x * uTileX, vUv.y * uTileY);
    vec2 gMayor = mod(uv, uCelda);
    vec2 dMayor = min(gMayor, uCelda - gMayor);
    float lMayor = min(dMayor.x, dMayor.y);
    float mMayor = 1.0 - smoothstep(0.0, uAnchoMayor, lMayor);

    float sub = uCelda / uSubdiv;
    vec2 gMenor = mod(uv, sub);
    vec2 dMenor = min(gMenor, sub - gMenor);
    float lMenor = min(dMenor.x, dMenor.y);
    float mMenor = (1.0 - smoothstep(0.0, uAnchoMenor, lMenor)) * (1.0 - mMayor);

    vec2 cruce = floor(uv / uCelda + 0.5) * uCelda;
    float mPunto = 1.0 - smoothstep(0.0, uPunto, length(uv - cruce));

    float horz = abs(vUv.x - 0.5) * 2.0;
    float visibilidad = smoothstep(uFade, uFade + uFadeSuave, horz);

    vec3 color = uFondo;
    float alpha = uOpFondo;
    color = mix(color, uColor, mMenor * uOpMenor);
    alpha = max(alpha, mMenor * uOpMenor);
    color = mix(color, uColor, mMayor * uOpMayor);
    alpha = max(alpha, mMayor * uOpMayor);
    color = mix(color, uColor, mPunto * uOpPunto);
    alpha = max(alpha, mPunto * uOpPunto);

    gl_FragColor = vec4(color, alpha * visibilidad);
  }
`,S={enganchado:!1,progreso:0,progresoSuave:0,offset:0,velocidad:0,pendiente:0,momentum:.87},C=0,ke=0;function Ae(){return v(`#enganche`)}function je(){return Math.max(1,Ae().offsetHeight-window.innerHeight)}function Me(){let e=Ae().getBoundingClientRect();return f.clamp(-e.top/je(),0,1)}function Ne(){let e=Ae().getBoundingClientRect();return e.top<=24&&e.bottom>=window.innerHeight*.5}function w(){S.enganchado||b&&(S.enganchado=!0,S.progreso=Me(),S.progresoSuave=S.progreso,document.body.classList.add(`gal-enganchado`))}function Pe(){S.enganchado&&(S.enganchado=!1,document.body.classList.remove(`gal-enganchado`))}function Fe(){let e=e=>e.target&&e.target.closest&&e.target.closest(`#panel-foco`),t=()=>q.idx!==null||q.activo;_(window,`wheel`,n=>{if(e(n))return;if(t()){n.preventDefault();return}if(!b)return;let r=n.deltaY>0;!S.enganchado&&r&&Ne()&&w(),S.enganchado&&(n.preventDefault(),S.pendiente+=n.deltaY*.0022)},{passive:!1}),_(window,`touchstart`,e=>{t()||(C=e.touches[0].clientY,S.velocidad=0)},{passive:!0}),_(window,`touchmove`,n=>{if(e(n)||t()||!b)return;let r=n.touches[0].clientY,i=C-r;C=r,!S.enganchado&&i>0&&Ne()&&w(),S.enganchado&&(n.preventDefault(),S.pendiente+=i*.0035)},{passive:!1}),_(window,`keydown`,e=>{if(e.key===`Escape`&&(q.idx!==null||q.activo)){X();return}let n=[`ArrowDown`,`PageDown`,` `,`Spacebar`].includes(e.key),r=[`ArrowUp`,`PageUp`].includes(e.key);if(!(!n&&!r)){if(t()){e.preventDefault();return}if(b){if(!S.enganchado){if(n&&Ne())w();else return}e.preventDefault(),S.pendiente+=n?.06:-.06}}})}function Ie(e){S.momentum=x.motion.momentum;let t=S.pendiente;if(S.pendiente=0,S.enganchado){S.velocidad=(S.velocidad+t)*S.momentum**(e*60),Math.abs(S.velocidad)<1e-4&&(S.velocidad=0);let n=S.progreso>=1?x.recorrido.ritmo:1,r=S.velocidad*e*26*n;S.progreso=f.clamp(S.progreso+r,0,x.recorrido.tope),S.offset+=S.velocidad*e*60}else S.progreso=performance.now()<ke?1:Me(),S.velocidad*=S.momentum**(e*60),Math.abs(S.velocidad)<1e-4&&(S.velocidad=0),S.offset+=S.velocidad*e*60;S.progresoSuave+=(S.progreso-S.progresoSuave)*x.entrada.amortigua}var T={listo:!1,imgs:[],cargadas:0,error:null,fps:0,preset:`portfolio`,rotacion:0,cuadros:0,hoverIdx:-1,datos:[],total:0,slugs:[],cargadasOK:0,faltantes:[],alta:null,parado:!1};window.__galeria=T;var E,D,O,k,A,j,M,N,P,F,I=null,L=null,Le=new p,R=new m(0,.1,0),Re=new de,z=null,B=0,V=.001,ze=1,H=0,U={x:0,y:0},W={x:0,y:0},G,K,Be=0,Ve=.001,He=1,Ue=new n;function We(){let e=v(`#escenario`);return{w:Math.max(1,e.clientWidth),h:Math.max(1,e.clientHeight)}}function Ge(e){let t=6/3.75;z=Te(e,t,320);let n=We();E=new pe({antialias:!y,powerPreference:`high-performance`}),E.setPixelRatio(Math.min(window.devicePixelRatio||1,y?1.6:2)),E.setSize(n.w,n.h),E.toneMapping=4,E.toneMappingExposure=x.camera.exposicion,E.outputColorSpace=oe,v(`#escenario`).appendChild(E.domElement),D=new se,D.background=new r(0),O=new re(75,n.w/n.h,.1,1e3),G=x.camera.baseZoom,K=x.camera.baseZoom,O.position.z=K,O.lookAt(0,x.camera.lookY,0);let a=Math.max(1,x.gallery.instancias),o=6/t;N=new ie(6,o,40,20);let u=new Float32Array(a),d=new Float32Array(a),f=new Float32Array(a),ae=new Float32Array(a),p=a*x.gallery.spiralStep,le=-p/2;for(let e=0;e<a;e++)u[e]=e*Math.PI*2/x.gallery.imagesPerTurn,d[e]=le+e*x.gallery.spiralStep,f[e]=e%z.count;N.setAttribute(`aAngulo`,new c(u,1)),N.setAttribute(`aY`,new c(d,1)),N.setAttribute(`aTex`,new c(f,1)),N.setAttribute(`aFoco`,new c(ae,1)),I={n:a,aAngulo:u,aY:d,aFoco:ae,alturaTotal:p,ancho:6,alto:o},M=new ce({vertexShader:Ee,fragmentShader:De,transparent:!0,side:2,uniforms:{uRadio:{value:x.gallery.radius},uDesplazaY:{value:0},uAlturaTotal:{value:p},uEscala:{value:x.gallery.imageScale},uCurvatura:{value:x.gallery.curvature},uRotacion:{value:0},uAprieta:{value:0},uAprietaAncho:{value:x.effects.squeezeWidth},uAtlas:{value:z.tex},uAtlasCols:{value:z.cols},uAtlasRows:{value:z.rows},uTiempo:{value:0},uAberracion:{value:x.effects.chromatic},uOpacidad:{value:x.effects.opacity},uSaturacion:{value:x.effects.saturation},uBrillo:{value:x.effects.brightness},uEmision:{value:x.effects.emission},uScan:{value:x.effects.scanLines},uScanVel:{value:x.effects.scanSpeed},uScanDens:{value:x.effects.scanDensity},uFadeIni:{value:x.effects.fadeStart},uFadeFin:{value:x.effects.fadeEnd},uFlicker:{value:x.effects.flicker},uFlickerVel:{value:x.effects.flickerSpeed},uBordeAncho:{value:x.border.width},uBordeColor:{value:new r(x.border.color)},uBordeBrillo:{value:x.border.glow},uBordeRadio:{value:x.border.radius},uBordeOffset:{value:x.border.offset},uEsquina:{value:x.corners.size},uEsquinaAncho:{value:x.corners.width},uEsquinaOffset:{value:x.corners.offset},uDitherOn:{value:+!!x.dither.on},uDCelda:{value:x.dither.cell},uDGap:{value:x.dither.gap},uDContraste:{value:x.dither.contrast},uDModo:{value:be[x.dither.mode]??2},uDForma:{value:xe[x.dither.shape]??0},uDEscala:{value:x.dither.baseScale},uDIntensidad:{value:x.dither.intensity},uDFondo:{value:new r(x.dither.bg)},uDFrente:{value:new r(x.dither.fg)},uDColor:{value:+!!x.dither.useColor},uAspecto:{value:t},uHayFoco:{value:0},uAlta:{value:Ye()},uAltaLista:{value:0}}}),j=new l(N,M,a),j.frustumCulled=!1;let m=new ee;for(let e=0;e<a;e++)j.setMatrixAt(e,m);j.instanceMatrix.needsUpdate=!0,D.add(j),L=new l(N,new ne({visible:!1}),a),L.frustumCulled=!1,D.add(L),R.set(0,x.camera.lookY,0),_(E.domElement,`click`,ot);let h=new ce({vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:Oe,transparent:!0,side:1,depthWrite:!1,uniforms:{uCelda:{value:x.grid.cell},uSubdiv:{value:x.grid.subdivisions},uAnchoMayor:{value:x.grid.majorW},uAnchoMenor:{value:x.grid.minorW},uPunto:{value:x.grid.dotSize},uColor:{value:new r(x.grid.color)},uOpMayor:{value:x.grid.majorOp},uOpMenor:{value:x.grid.minorOp},uOpPunto:{value:x.grid.dotOp},uFondo:{value:new r(x.grid.bg)},uOpFondo:{value:x.grid.bgOp},uTileX:{value:x.grid.tileX},uTileY:{value:x.grid.tileY},uFade:{value:x.grid.hFade},uFadeSuave:{value:x.grid.hFadeSoft}}});if(P=new te(new i(x.grid.radius,x.grid.radius,x.grid.height,64,1,!0),h),P.renderOrder=-1,D.add(P),F=new te(new ue(1,.35,16,32),new ne({color:new r(x.shape.color),wireframe:!0,transparent:!0,opacity:x.shape.opacity,side:0})),D.add(F),y)k=new me(E);else{let e=new fe(n.w,n.h,{type:s,samples:4});k=new me(E,e)}k.addPass(new ge(D,O)),A=new he(new de(window.innerWidth,window.innerHeight),x.bloom.intensity,x.bloom.radius,x.bloom.threshold),k.addPass(A),k.addPass(new _e),Ke(),T.listo=!0}function Ke(){if(!M)return;let e=M.uniforms;if(E&&(E.toneMappingExposure=x.camera.exposicion),e.uRadio.value=x.gallery.radius,e.uEscala.value=x.gallery.imageScale,e.uCurvatura.value=x.gallery.curvature,e.uAprietaAncho.value=x.effects.squeezeWidth,e.uAberracion.value=x.effects.chromatic,e.uOpacidad.value=x.effects.opacity,e.uSaturacion.value=x.effects.saturation,e.uBrillo.value=x.effects.brightness,e.uEmision.value=x.effects.emission,e.uScan.value=x.effects.scanLines,e.uScanVel.value=x.effects.scanSpeed,e.uScanDens.value=x.effects.scanDensity,e.uFadeIni.value=x.effects.fadeStart,e.uFadeFin.value=x.effects.fadeEnd,e.uFlicker.value=x.effects.flicker,e.uFlickerVel.value=x.effects.flickerSpeed,e.uBordeAncho.value=x.border.width,e.uBordeColor.value.set(x.border.color),e.uBordeBrillo.value=x.border.glow,e.uBordeRadio.value=x.border.radius,e.uBordeOffset.value=x.border.offset,e.uEsquina.value=x.corners.size,e.uEsquinaAncho.value=x.corners.width,e.uEsquinaOffset.value=x.corners.offset,e.uDitherOn.value=+!!x.dither.on,e.uDCelda.value=x.dither.cell,e.uDGap.value=x.dither.gap,e.uDContraste.value=x.dither.contrast,e.uDModo.value=be[x.dither.mode]??2,e.uDForma.value=xe[x.dither.shape]??0,e.uDEscala.value=x.dither.baseScale,e.uDIntensidad.value=x.dither.intensity,e.uDFondo.value.set(x.dither.bg),e.uDFrente.value.set(x.dither.fg),e.uDColor.value=+!!x.dither.useColor,A&&(A.strength=x.bloom.intensity,A.radius=x.bloom.radius,A.threshold=x.bloom.threshold),P){let e=P.material.uniforms;e.uCelda.value=x.grid.cell,e.uSubdiv.value=x.grid.subdivisions,e.uAnchoMayor.value=x.grid.majorW,e.uAnchoMenor.value=x.grid.minorW,e.uPunto.value=x.grid.dotSize,e.uColor.value.set(x.grid.color),e.uOpMayor.value=x.grid.majorOp,e.uOpMenor.value=x.grid.minorOp,e.uOpPunto.value=x.grid.dotOp,e.uFondo.value.set(x.grid.bg),e.uOpFondo.value=x.grid.bgOp,e.uTileX.value=x.grid.tileX,e.uTileY.value=x.grid.tileY,e.uFade.value=x.grid.hFade,e.uFadeSuave.value=x.grid.hFadeSoft,P.visible=x.grid.on}F&&(F.visible=x.shape.on,F.material.color.set(x.shape.color),F.material.opacity=x.shape.opacity)}var q={idx:null,activo:!1,volviendo:!1,enFoco:!1,t:0,desde:null,hasta:null,partida:null,hayFoco:0};function qe(e,t){return((e+t*.5)%t+t)%t-t*.5}var J=null,Je=``;function Ye(){let e=new a(new Uint8Array([0,0,0,255]),1,1);return e.needsUpdate=!0,e}function Xe(e){let t=ct(e);if(!t||!t.img)return;let n=new URL(String(t.img).replace(`-640.webp`,`.webp`),location.origin).href;if(n===Je&&J){M.uniforms.uAlta.value=J,M.uniforms.uAltaLista.value=1;return}Je=n;let r=new Image;r.onload=()=>{if(Je!==n)return;let e=new le(r);e.minFilter=d,e.magFilter=u,e.generateMipmaps=!0,e.anisotropy=E.capabilities.getMaxAnisotropy(),e.needsUpdate=!0,J&&J.dispose(),J=e,M.uniforms.uAlta.value=e,M.uniforms.uAltaLista.value=1,T.alta={url:n,w:r.naturalWidth,h:r.naturalHeight,lista:!0}},r.onerror=()=>{T.alta={url:n,error:!0}},r.src=n,T.alta={url:n,cargando:!0}}function Ze(e){let t=Math.exp(-(e*e)/(x.effects.squeezeWidth*x.effects.squeezeWidth));return x.gallery.radius*(1-H*t)}var Qe=new ee,$e=new ae,et=new o,tt=new m,nt=new m;function rt(){for(let e=0;e<I.n;e++){let t=qe(I.aY[e]+M.uniforms.uDesplazaY.value,I.alturaTotal),n=I.aAngulo[e]+B,r=Ze(t);tt.set(Math.sin(n)*r,t,Math.cos(n)*r),et.set(0,n,0),$e.setFromEuler(et),nt.set(x.gallery.imageScale,x.gallery.imageScale,1),Qe.compose(tt,$e,nt),L.setMatrixAt(e,Qe)}L.instanceMatrix.needsUpdate=!0}function Y(e){let t=qe(I.aY[e]+M.uniforms.uDesplazaY.value,I.alturaTotal),n=I.aAngulo[e]+B,r=Ze(t);return{centro:new m(Math.sin(n)*r,t,Math.cos(n)*r),normal:new m(Math.sin(n),0,Math.cos(n)),tangente:new m(Math.cos(n),0,-Math.sin(n))}}function it(){let e=f.degToRad(O.fov),t=Math.tan(e/2),n=I.alto*x.gallery.imageScale,r=I.ancho*x.gallery.imageScale;return Math.max(n/2/t,r/2/(t*O.aspect))*x.foco.margen}function at(){let{centro:e,normal:t,tangente:n}=Y(q.idx);return{cam:e.clone().addScaledVector(t,it()),mira:e.clone().addScaledVector(n,y?0:x.foco.offsetMira)}}function ot(e){if(q.idx!==null||q.activo||S.progresoSuave<.9)return;let t=E.domElement.getBoundingClientRect();Re.set((e.clientX-t.left)/t.width*2-1,-((e.clientY-t.top)/t.height)*2+1),Le.setFromCamera(Re,O);let n=Le.intersectObject(L,!1).find(e=>e.instanceId!==void 0&&e.instanceId!==null);n&&st(n.instanceId)}function st(e){q.idx!==null||q.activo||(q.partida||={cam:O.position.clone(),mira:R.clone(),zoom:K},q.idx=e,q.activo=!0,q.volviendo=!1,q.enFoco=!1,q.t=0,q.desde={cam:O.position.clone(),mira:R.clone()},S.velocidad=0,S.pendiente=0,V=0,document.body.classList.add(`gal-con-foco`),dt(e),Xe(e))}function X(){if(q.idx===null&&!q.activo)return;let e=q.partida||{cam:new m(0,0,x.camera.baseZoom),mira:new m(0,x.camera.lookY,0),zoom:x.camera.baseZoom};q.desde={cam:O.position.clone(),mira:R.clone()},q.hasta={cam:e.cam.clone(),mira:e.mira.clone(),zoom:e.zoom},q.volviendo=!0,q.activo=!0,q.enFoco=!1,q.t=0,q.idx=null,V=0,document.body.classList.remove(`gal-con-foco`),ft(),M.uniforms.uAltaLista.value=0}function ct(e){let t=T.datos||[];return t.length?t[e%t.length]:null}window.__itemActual=()=>ct(q.itemIdx)||null;function lt(){return g.idioma&&g.idioma()||`es`}function Z(e){let t=typeof e==`string`?null:e;return t?t[lt()]||t.es||``:e||``}function ut(){let e=ct(q.itemIdx);if(!e)return;let t=g.textos||{},n={sitios:t.grupoSitios||`Sitios web`,ecommerce:t.grupoEcommerce||`E-commerce`,software:t.grupoSoftware||`Automatizaciones`};v(`#ficha-grupo`).textContent=n[e.grupo]||e.grupo;let r=String(Z(e.nombre)||``),[i,a]=r.includes(`|`)?r.split(`|`):[r,``];v(`#ficha-nombre`).innerHTML=`${i} ${a?`<span class="outline">`+a+`</span>`:``}`,v(`#ficha-meta`).textContent=Z(e.meta);let o=v(`#ficha-rating`);o&&(o.hidden=!e.tieneCaptura,e.tieneCaptura&&(o.innerHTML=`<span class="estrellas">★★★★★</span> ${t.rating||``}`)),v(`#ficha-desc`).textContent=Z(e.desc),v(`#ficha-tags`).innerHTML=(e.tags||[]).map(e=>`<span class="tag">${e}</span>`).join(``);let s=e.historia||{};v(`#ficha-pasos`).innerHTML=[[t.reto||`Reto`,s.reto],[t.propuesta||`Propuesta`,s.propuesta],[t.entrega||`Entrega`,s.entrega]].filter(([,e])=>e).map(([e,t])=>`<div class="paso"><dt>${e}</dt><dd>${Z(t).replace(/</g,`&lt;`)}</dd></div>`).join(``),v(`#ficha-acciones`).innerHTML=(()=>{let n=[];if(e.url){let r=e.grupo===`ecommerce`?t.verTienda||`Ver la tienda`:t.verSitio||`Ver el sitio`;n.push(`<a class="btn-lima" href="${e.url}" target="_blank" rel="noopener">${r} <span aria-hidden="true">→</span></a>`)}else n.push(`<span class="btn-apagado">${t.interno||`Proyecto interno`}</span>`);return e.caso&&n.push(`<a class="btn-borde" href="${g.casoBase&&g.casoBase()||`/`}casos/${e.caso}/" target="_blank" rel="noopener">${t.caso||`Caso completo`}</a>`),n.join(``)})()}function dt(e){q.itemIdx=e,ut(),v(`#panel-foco`).hidden=!1,document.body.classList.add(`gal-con-foco`)}function ft(){v(`#panel-foco`).hidden=!0}var pt=performance.now(),mt=-1,Q=!1,$=!1;function ht(){if(T.parado||(requestAnimationFrame(ht),!T.listo))return;let e=Math.min(Ue.getDelta(),.05),t=Ue.elapsedTime;Ie(e);let n=q.idx!==null||q.activo,r=S.velocidad;if(Math.abs(r)>.001&&(ze=r>0?1:-1),n)V=0;else{let t=ze*x.motion.autoRotate+r*x.motion.scrollRotateForce,n=f.clamp(t,-x.motion.maxRotSpeed,x.motion.maxRotSpeed);V+=(n-V)*x.motion.rotSmoothing,B+=V*e*60}let i=n?0:Math.min(Math.abs(r)*3,1)*x.effects.squeezeMax;H+=(i-H)*.08;let a=Math.min(1,S.progresoSuave),o=n?0:1-a,s=M.uniforms;if(s.uRotacion.value=B+o*x.entrada.giro,s.uDesplazaY.value=S.offset*x.motion.scrollAdvance,s.uTiempo.value=t,s.uAprieta.value=H,n){q.t=Math.min(1,q.t+e/x.foco.duracion);let t=q.t<.5?4*q.t*q.t*q.t:1-(-2*q.t+2)**3/2,n=q.volviendo?q.hasta:at();O.position.lerpVectors(q.desde.cam,n.cam,t),R.lerpVectors(q.desde.mira,n.mira,t),O.lookAt(R),q.t>=1&&(q.activo=!1,q.volviendo?(q.volviendo=!1,K=q.hasta.zoom,G=q.hasta.zoom,q.partida=null):q.enFoco=!0)}else W.x+=(U.x-W.x)*x.camera.smoothing,W.y+=(U.y-W.y)*x.camera.smoothing,O.position.x=W.x*x.camera.panX,O.position.y=W.y*x.camera.panY+o*x.entrada.altura,G=f.clamp(G+Math.abs(r)*x.camera.zoomSpeed,x.camera.baseZoom,x.camera.maxZoomOut),K+=(G-K)*.1,O.position.z=K+o*x.entrada.distancia,G=f.lerp(G,x.camera.baseZoom,1-x.camera.zoomDecay),R.set(0,x.camera.lookY,0),O.lookAt(R);if(E.domElement.style.opacity=(.1+.9*a).toFixed(3),F.visible){let t=ze*x.shape.autoRotate+r*x.shape.scrollRotate,n=f.clamp(t,-x.shape.maxRot,x.shape.maxRot);Ve+=(n-Ve)*x.shape.smooth,Be+=Ve*e*60,F.rotation.set(x.shape.tiltX,Be,x.shape.tiltZ);let i=x.shape.scale-Math.abs(r)*x.shape.scaleReact*10;He+=(i-He)*.04,F.scale.setScalar(He)}if(P.visible&&P.position.copy(O.position),I&&L){for(let e=0;e<I.n;e++){let t=+(e===q.idx&&!q.volviendo);I.aFoco[e]+=(t-I.aFoco[e])*.12}N.getAttribute(`aFoco`).needsUpdate=!0;let e=0;for(let t=0;t<I.n;t++)e=Math.max(e,I.aFoco[t]);q.hayFoco=e,s.uHayFoco.value=e,rt()}k.render(),T.cuadros++;let c=performance.now();if(c-pt>500){T.fps=Math.round(T.cuadros*1e3/(c-pt)),T.cuadros=0,pt=c;let e=v(`#fps`);e&&(e.textContent=T.fps+` fps`)}if(T.rotacion=B,T.scrollY=s.uDesplazaY.value,T.zoom=K,T.enganchado=S.enganchado,T.progreso=a,Math.abs(a-mt)>.01){mt=a;let e=v(`#gal-pista-pct`);e&&(e.textContent=Math.round(a*100)+`%`),v(`#gal-pista-barra`).style.width=(a*100).toFixed(1)+`%`}a>=.995&&!$?($=!0,v(`#gal-pista-txt`).innerHTML=(g.textos||{}).pistaLibre||``):a<.99&&$&&($=!1,mt=-1,v(`#gal-pista-txt`).innerHTML=((g.textos||{}).pistaEntrada||`Entrada`)+` <b id="gal-pista-pct">0%</b>`),a>.995&&!Q?(Q=!0,v(`#btn-salir`).classList.add(`pulso`)):a<.99&&Q&&(Q=!1,v(`#btn-salir`).classList.remove(`pulso`))}function gt(){return(h||document.body).getBoundingClientRect().bottom+window.scrollY+2}function _t(){let e=g.textos||{};v(`#btn-salir`).onclick=()=>{Pe(),ke=performance.now()+1100,S.progreso=1,S.progresoSuave=1,window.scrollTo({top:gt(),behavior:`smooth`}),vt(e.saliste||``)},v(`#btn-volver`).onclick=()=>X(),v(`#btn-cerrar-ficha`).onclick=()=>X()}function vt(e){let t=v(`#toast`);!t||!e||(t.textContent=e,t.classList.add(`ver`),setTimeout(()=>t.classList.remove(`ver`),2200))}function yt(){_(window,`mousemove`,e=>{U.x=e.clientX/window.innerWidth*2-1,U.y=-(e.clientY/window.innerHeight)*2+1})}function bt(){let e=()=>{if(!E||!O)return;let{w:e,h:t}=We();O.aspect=e/t,O.updateProjectionMatrix(),E.setSize(e,t),k.setSize(e,t),A.setSize(e,t)};if(_(window,`resize`,e),typeof ResizeObserver<`u`&&v(`#escenario`)){let t=new ResizeObserver(e);t.observe(v(`#escenario`)),ye.push(t)}}function xt(e,t={}){if(h&&h!==document&&document.contains(h))return()=>{};h=e,g=t,T.datos=t.items||[],T.parado=!1;let n=!0;return y&&(x.gallery.instancias=Math.min(x.gallery.instancias,16)),_t(),yt(),bt(),Fe(),(async()=>{try{let e=Ce();T.total=e.length;let t=v(`#carga-total`);t&&(t.textContent=e.length);let r=await we(e,(e,t)=>{if(T.cargadas=e,!n)return;let r=v(`#carga-hechas`),i=v(`#barra`);r&&(r.textContent=e),i&&(i.style.width=(e/t*100).toFixed(0)+`%`)});if(!n)return;let i=r.filter(Boolean);T.imgs=e,T.slugs=e.map(e=>e.slug),T.cargadasOK=i.length,T.faltantes=e.filter((e,t)=>!r[t]).map(e=>e.slug),Ge(i);let a=v(`#gal-cargando`);a&&a.classList.add(`fuera`),ht()}catch(e){T.error=String(e);let t=v(`#gal-cargando`);t&&(t.innerHTML=`<div class="err">${(g.textos||{}).error||``}</div>`)}})(),()=>{n=!1,T.parado=!0,ve.forEach(([e,t,n,r])=>e.removeEventListener(t,n,r)),ve.length=0,ye.forEach(e=>e.disconnect()),ye.length=0,E&&=(E.dispose(),E.domElement.remove(),null),M&&=(M.dispose(),null),z&&z.tex&&(z.tex.dispose(),z=null),J&&=(J.dispose(),null),I=null,document.body.classList.remove(`gal-con-foco`),h=document}}window.__set=(e,t)=>{Se(e,t),Ke()},window.__config=()=>JSON.stringify(x,null,2),window.__scroll=S,window.__enganchar=w,window.__soltar=Pe,window.__progresoNativo=Me,window.__salir=()=>document.querySelector(`#btn-salir`).click(),window.__foco=q,window.__enfocar=st,window.__volver=X,window.__poseTarjeta=e=>{let t=Y(e);return{centro:t.centro.toArray(),normal:t.normal.toArray()}},window.__pantallaTarjeta=e=>{let{centro:t,normal:n}=Y(e),r=t.clone().project(O),i=E.domElement.getBoundingClientRect(),a=new m().subVectors(O.position,t).normalize();return{x:i.left+(r.x*.5+.5)*i.width,y:i.top+(-r.y*.5+.5)*i.height,ndc:r.toArray(),frente:n.dot(a),dist:O.position.distanceTo(t)}},window.__tarjetasVisibles=()=>{let e=[],t=E.domElement.getBoundingClientRect();if(t.bottom<40||t.top>window.innerHeight-40)return e;for(let n=0;n<I.n;n++){let r=window.__pantallaTarjeta(n);r.frente<.35||r.x<t.left+8||r.x>t.right-8||r.y<t.top+8||r.y>t.bottom-8||e.push({i:n,x:Math.round(r.x),y:Math.round(r.y),frente:+r.frente.toFixed(3),dist:+r.dist.toFixed(2)})}return e.sort((e,t)=>e.dist-t.dist)},window.__camPos=()=>O.position.toArray().map(e=>+e.toFixed(4)),window.__altaInfo=()=>T.alta||null,window.__altaLista=()=>M.uniforms.uAltaLista.value,window.__forzarAlta=e=>{M.uniforms.uAltaLista.value=+!!e},window.__msaa=()=>k&&k.renderTarget1&&k.renderTarget1.samples||0,window.__rot=()=>B,window.__velRot=()=>V,window.__pararGiro=()=>{V=0,S.velocidad=0,S.pendiente=0},window.__errorFrente=()=>{if(q.idx===null)return null;let{centro:e,normal:t}=Y(q.idx),n=new m().subVectors(O.position,e).normalize();return{dot:+t.dot(n).toFixed(4),dist:+O.position.distanceTo(e).toFixed(3),cam:O.position.toArray().map(e=>+e.toFixed(3))}};export{xt as initGaleria};