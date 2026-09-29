import{CanvasTexture as e,ClampToEdgeWrapping as t,Clock as n,Color as r,CylinderGeometry as i,DataTexture as a,Euler as o,HalfFloatType as s,InstancedBufferAttribute as c,InstancedMesh as l,LinearFilter as u,LinearMipmapLinearFilter as d,MathUtils as f,Matrix4 as ee,Mesh as te,MeshBasicMaterial as ne,PerspectiveCamera as re,PlaneGeometry as ie,Quaternion as ae,Raycaster as p,SRGBColorSpace as oe,Scene as se,ShaderMaterial as ce,Texture as le,TorusGeometry as ue,Vector2 as de,Vector3 as m,WebGLRenderTarget as fe,WebGLRenderer as pe}from"./three.module-D7TxY2cb.js";import{i as me,n as he,r as ge,t as _e}from"./OutputPass-CPPXKWbS.js";var h=document,g={},ve=[],ye=[],_=(e,t,n,r)=>{e.addEventListener(t,n,r),ve.push([e,t,n,r])},v=e=>(h||document).querySelector(e),y=matchMedia(`(pointer: coarse)`).matches,be=()=>y||window.innerWidth<=700;matchMedia(`(prefers-reduced-motion: reduce)`).matches;var b=structuredClone({gallery:{imageScale:.83,radius:6,spiralStep:.8,imagesPerTurn:7,curvature:1.5,instancias:18},motion:{momentum:.87,scrollAdvance:.17,autoRotate:.002,scrollRotateForce:.5,maxRotSpeed:.15,rotSmoothing:.09,vueltasPorPasada:2},effects:{squeezeMax:.5,squeezeWidth:7.5,chromatic:.02,opacity:1,emission:.15,saturation:1.5,brightness:.84,scanLines:.6,scanSpeed:3.9,scanDensity:25,fadeStart:3,fadeEnd:8,flicker:.18,flickerSpeed:5},border:{width:.005,color:`#bff747`,glow:.9,radius:0,offset:0},corners:{size:.06,width:.005,offset:.03},dither:{on:!0,cell:3,gap:5.5,contrast:-.02,baseScale:.5,intensity:2.61,mode:`invHalftone`,shape:`circle`,bg:`#111111`,fg:`#bff747`,useColor:!0},bloom:{intensity:.35,threshold:.4,radius:.65},grid:{on:!0,radius:32,height:90,cell:.45,subdivisions:2,tileX:17,tileY:5,majorW:.005,minorW:.004,dotSize:.011,color:`#bff747`,majorOp:.46,minorOp:.14,dotOp:1,bg:`#26330a`,bgOp:.12,hFade:.1,hFadeSoft:.7},camera:{baseZoom:11,maxZoomOut:28.5,zoomSpeed:.05,zoomDecay:.1,panX:.8,panY:1.2,smoothing:.06,lookY:.1,exposicion:1},shape:{on:!0,color:`#bff747`,scale:2.3,opacity:.8,tiltX:-.5,tiltZ:-1.95,autoRotate:.004,scrollRotate:1.75,maxRot:.15,smooth:.09,scaleReact:.02},entrada:{recorrido:1,distancia:9,altura:7,giro:.8,amortigua:.22,ritmoBarra:3},recorrido:{ritmo:1,tope:24},foco:{margen:1.5,offsetMira:.95,duracion:1.2,margenMovil:1.18,centroYMovil:.24}}),xe={flat:0,halftone:1,invHalftone:2,rotacion:3,cuadros:6,contorno:10,cuantizado:12,ruido:13,umbral:15},Se={circle:0,square:1,diamond:2,hexagon:3,star:8,hueco:9,plus:10};function Ce(e,t){let n=e.split(`.`),r=n.pop();n.reduce((e,t)=>e[t],b)[r]=t}function we(){return(g.items||[]).map(e=>({...e,url:new URL(e.img,location.origin).href,catalogo:new URL(e.img,location.origin).href,alta:new URL(String(e.img).replace(`-640.webp`,`.webp`),location.origin).href}))}function Te(e,t){let n=0;return Promise.all(e.map(r=>new Promise(i=>{let a=new Image;a.onload=()=>{n++,t(n,e.length),i(a)},a.onerror=()=>{n++,t(n,e.length),i(null)},a.src=r.url})))}function Ee(n,r,i){let a=Math.round(i/r),o=Math.max(1,Math.ceil(Math.sqrt(n.length))),s=Math.max(1,Math.ceil(n.length/o)),c=document.createElement(`canvas`);c.width=o*i,c.height=s*a;let l=c.getContext(`2d`);l.fillStyle=`#000`,l.fillRect(0,0,c.width,c.height),n.forEach((e,t)=>{if(!e)return;let n=t%o,s=Math.floor(t/o),c=e.naturalWidth/e.naturalHeight,u=0,d=e.naturalWidth,f=e.naturalHeight;c>r?(d=e.naturalHeight*r,u=(e.naturalWidth-d)/2):f=e.naturalWidth/r,l.drawImage(e,u,0,d,f,n*i,s*a,i,a)});let d=new e(c);return d.minFilter=u,d.magFilter=u,d.wrapS=t,d.wrapT=t,d.generateMipmaps=!1,d.needsUpdate=!0,{tex:d,cols:o,rows:s,count:n.length}}var De=`
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
`,Oe=`
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
`,ke=`
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
`,x={enganchado:!1,progreso:0,progresoSuave:0,offset:0,velocidad:0,pendiente:0,momentum:.87,topeEnganche:null},S=0,C=0;function w(){return v(`#enganche`)}function Ae(){return Math.max(1,w().offsetHeight-window.innerHeight)}function je(){let e=w().getBoundingClientRect();return f.clamp(-e.top/Ae(),0,1)}function Me(){let e=w().getBoundingClientRect();return e.top<=24&&e.bottom>=window.innerHeight*.5}function T(){x.enganchado||(x.enganchado=!0,x.topeEnganche=window.scrollY,x.progreso=je(),x.progresoSuave=x.progreso,document.body.classList.add(`gal-enganchado`))}function E(){x.enganchado&&(x.enganchado=!1,x.topeEnganche=null,document.body.classList.remove(`gal-enganchado`))}function Ne(){let e=e=>e.target&&e.target.closest&&e.target.closest(`#panel-foco`),t=()=>Z.idx!==null||Z.activo;_(window,`wheel`,n=>{if(e(n))return;if(t()){n.preventDefault();return}let r=n.deltaY>0;if(!x.enganchado&&r&&Me()&&T(),x.enganchado&&n.deltaY<-4){E();return}x.enganchado&&(n.preventDefault(),x.pendiente+=n.deltaY*22e-5)},{passive:!1}),_(window,`touchstart`,e=>{if(t())return;let n=e.touches[0];S=n.clientY,Re=n.clientX,ze=performance.now(),x.velocidad=0,K=x.enganchado&&e.target===O.domElement,K&&e.preventDefault()},{passive:!1}),_(window,`touchend`,e=>{let n=K;if(K=!1,!n||t())return;let r=e.changedTouches&&e.changedTouches[0];r&&(performance.now()-ze>500||Math.hypot(r.clientX-Re,r.clientY-S)>12||O.domElement.dispatchEvent(new MouseEvent(`click`,{bubbles:!0,cancelable:!0,clientX:r.clientX,clientY:r.clientY})))},{passive:!0}),_(window,`touchmove`,n=>{if(e(n)||t())return;let r=n.touches[0].clientY,i=S-r;if(S=r,!x.enganchado&&i>0&&Me()&&T(),x.enganchado&&i<-4&&E(),!x.enganchado){K&&window.scrollBy(0,i);return}n.preventDefault(),x.pendiente+=i*35e-5},{passive:!1}),_(window,`keydown`,e=>{if(e.key===`Escape`&&(Z.idx!==null||Z.activo)){lt();return}let n=[`ArrowDown`,`PageDown`,` `,`Spacebar`].includes(e.key),r=[`ArrowUp`,`PageUp`].includes(e.key);if(!(!n&&!r)){if(t()){e.preventDefault();return}if(!x.enganchado){if(n&&Me())T();else return}if(r){E();return}e.preventDefault(),x.pendiente+=.005}});let n=()=>{if(!x.enganchado||performance.now()<C)return;let e=x.topeEnganche===null?w().getBoundingClientRect().top+window.scrollY:x.topeEnganche;if(window.scrollY>e+1){let t=window.scrollY-e;window.scrollTo({top:e,behavior:`instant`}),x.pendiente+=t*.0022,requestAnimationFrame(n)}};_(window,`scroll`,n,{passive:!0}),_(window,`keydown`,n);let r=e=>{E(),C=performance.now()+(e||3e3)};_(document,`click`,e=>{e.target&&e.target.closest&&e.target.closest(`a[href*="#"]`)&&r(3e3)},!0),_(window,`hashchange`,()=>r(3e3)),_(window,`resize`,()=>{x.topeEnganche=null})}function Pe(e){x.momentum=b.motion.momentum;let t=x.pendiente;if(x.pendiente=0,x.enganchado){x.velocidad=(x.velocidad+t)*x.momentum**(e*60),Math.abs(x.velocidad)<1e-4&&(x.velocidad=0);let n=x.progreso>=1?b.recorrido.ritmo:b.entrada.ritmoBarra||1,r=x.velocidad*e*26*n;x.progreso=f.clamp(x.progreso+r,0,b.recorrido.tope),x.offset+=x.velocidad*e*60}else x.progreso=performance.now()<C?1:je(),x.velocidad*=x.momentum**(e*60),Math.abs(x.velocidad)<1e-4&&(x.velocidad=0),x.offset+=x.velocidad*e*60;x.progresoSuave+=(x.progreso-x.progresoSuave)*b.entrada.amortigua}var D={listo:!1,imgs:[],cargadas:0,error:null,fps:0,preset:`portfolio`,rotacion:0,cuadros:0,hoverIdx:-1,datos:[],total:0,slugs:[],cargadasOK:0,faltantes:[],alta:null,parado:!1};window.__galeria=D;var O,k,A,j,M,N,P,F,I,L,R=null,z=null,Fe=new p,B=new m(0,.1,0),Ie=new de,V=null,H=0,U=.001,Le=1,W=0,G=0,K=!1,Re=0,ze=0,q={x:0,y:0},J={x:0,y:0},Y,X,Be=0,Ve=.001,He=1,Ue=new n;function We(){let e=v(`#escenario`);return{w:Math.max(1,e.clientWidth),h:Math.max(1,e.clientHeight)}}function Ge(e){let t=6/3.75;V=Ee(e,t,320);let n=We();O=new pe({antialias:!y,powerPreference:`high-performance`}),O.setPixelRatio(Math.min(window.devicePixelRatio||1,y?1.6:2)),O.setSize(n.w,n.h),O.toneMapping=4,O.toneMappingExposure=b.camera.exposicion,O.outputColorSpace=oe,v(`#escenario`).appendChild(O.domElement),k=new se,k.background=new r(0),A=new re(75,n.w/n.h,.1,1e3),Y=b.camera.baseZoom,X=b.camera.baseZoom,A.position.z=X,A.lookAt(0,b.camera.lookY,0);let a=Math.max(1,b.gallery.instancias),o=6/t;F=new ie(6,o,40,20);let u=new Float32Array(a),d=new Float32Array(a),f=new Float32Array(a),ae=new Float32Array(a),p=a*b.gallery.spiralStep,le=-p/2;for(let e=0;e<a;e++)u[e]=e*Math.PI*2/b.gallery.imagesPerTurn,d[e]=le+e*b.gallery.spiralStep,f[e]=e%V.count;F.setAttribute(`aAngulo`,new c(u,1)),F.setAttribute(`aY`,new c(d,1)),F.setAttribute(`aTex`,new c(f,1)),F.setAttribute(`aFoco`,new c(ae,1)),R={n:a,aAngulo:u,aY:d,aFoco:ae,alturaTotal:p,ancho:6,alto:o},P=new ce({vertexShader:De,fragmentShader:Oe,transparent:!0,side:2,uniforms:{uRadio:{value:b.gallery.radius},uDesplazaY:{value:0},uAlturaTotal:{value:p},uEscala:{value:b.gallery.imageScale},uCurvatura:{value:b.gallery.curvature},uRotacion:{value:0},uAprieta:{value:0},uAprietaAncho:{value:b.effects.squeezeWidth},uAtlas:{value:V.tex},uAtlasCols:{value:V.cols},uAtlasRows:{value:V.rows},uTiempo:{value:0},uAberracion:{value:b.effects.chromatic},uOpacidad:{value:b.effects.opacity},uSaturacion:{value:b.effects.saturation},uBrillo:{value:b.effects.brightness},uEmision:{value:b.effects.emission},uScan:{value:b.effects.scanLines},uScanVel:{value:b.effects.scanSpeed},uScanDens:{value:b.effects.scanDensity},uFadeIni:{value:b.effects.fadeStart},uFadeFin:{value:b.effects.fadeEnd},uFlicker:{value:b.effects.flicker},uFlickerVel:{value:b.effects.flickerSpeed},uBordeAncho:{value:b.border.width},uBordeColor:{value:new r(b.border.color)},uBordeBrillo:{value:b.border.glow},uBordeRadio:{value:b.border.radius},uBordeOffset:{value:b.border.offset},uEsquina:{value:b.corners.size},uEsquinaAncho:{value:b.corners.width},uEsquinaOffset:{value:b.corners.offset},uDitherOn:{value:+!!b.dither.on},uDCelda:{value:b.dither.cell},uDGap:{value:b.dither.gap},uDContraste:{value:b.dither.contrast},uDModo:{value:xe[b.dither.mode]??2},uDForma:{value:Se[b.dither.shape]??0},uDEscala:{value:b.dither.baseScale},uDIntensidad:{value:b.dither.intensity},uDFondo:{value:new r(b.dither.bg)},uDFrente:{value:new r(b.dither.fg)},uDColor:{value:+!!b.dither.useColor},uAspecto:{value:t},uHayFoco:{value:0},uAlta:{value:Ye()},uAltaLista:{value:0}}}),N=new l(F,P,a),N.frustumCulled=!1;let m=new ee;for(let e=0;e<a;e++)N.setMatrixAt(e,m);N.instanceMatrix.needsUpdate=!0,k.add(N),z=new l(F,new ne({visible:!1}),a),z.frustumCulled=!1,k.add(z),B.set(0,b.camera.lookY,0),_(O.domElement,`click`,st);let h=new ce({vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:ke,transparent:!0,side:1,depthWrite:!1,uniforms:{uCelda:{value:b.grid.cell},uSubdiv:{value:b.grid.subdivisions},uAnchoMayor:{value:b.grid.majorW},uAnchoMenor:{value:b.grid.minorW},uPunto:{value:b.grid.dotSize},uColor:{value:new r(b.grid.color)},uOpMayor:{value:b.grid.majorOp},uOpMenor:{value:b.grid.minorOp},uOpPunto:{value:b.grid.dotOp},uFondo:{value:new r(b.grid.bg)},uOpFondo:{value:b.grid.bgOp},uTileX:{value:b.grid.tileX},uTileY:{value:b.grid.tileY},uFade:{value:b.grid.hFade},uFadeSuave:{value:b.grid.hFadeSoft}}});if(I=new te(new i(b.grid.radius,b.grid.radius,b.grid.height,64,1,!0),h),I.renderOrder=-1,k.add(I),L=new te(new ue(1,.35,16,32),new ne({color:new r(b.shape.color),wireframe:!0,transparent:!0,opacity:b.shape.opacity,side:0})),k.add(L),y)j=new me(O);else{let e=new fe(n.w,n.h,{type:s,samples:4});j=new me(O,e)}j.addPass(new ge(k,A)),M=new he(new de(window.innerWidth,window.innerHeight),b.bloom.intensity,b.bloom.radius,b.bloom.threshold),j.addPass(M),j.addPass(new _e),Ke(),D.listo=!0}function Ke(){if(!P)return;let e=P.uniforms;if(O&&(O.toneMappingExposure=b.camera.exposicion),e.uRadio.value=b.gallery.radius,e.uEscala.value=b.gallery.imageScale,e.uCurvatura.value=b.gallery.curvature,e.uAprietaAncho.value=b.effects.squeezeWidth,e.uAberracion.value=b.effects.chromatic,e.uOpacidad.value=b.effects.opacity,e.uSaturacion.value=b.effects.saturation,e.uBrillo.value=b.effects.brightness,e.uEmision.value=b.effects.emission,e.uScan.value=b.effects.scanLines,e.uScanVel.value=b.effects.scanSpeed,e.uScanDens.value=b.effects.scanDensity,e.uFadeIni.value=b.effects.fadeStart,e.uFadeFin.value=b.effects.fadeEnd,e.uFlicker.value=b.effects.flicker,e.uFlickerVel.value=b.effects.flickerSpeed,e.uBordeAncho.value=b.border.width,e.uBordeColor.value.set(b.border.color),e.uBordeBrillo.value=b.border.glow,e.uBordeRadio.value=b.border.radius,e.uBordeOffset.value=b.border.offset,e.uEsquina.value=b.corners.size,e.uEsquinaAncho.value=b.corners.width,e.uEsquinaOffset.value=b.corners.offset,e.uDitherOn.value=+!!b.dither.on,e.uDCelda.value=b.dither.cell,e.uDGap.value=b.dither.gap,e.uDContraste.value=b.dither.contrast,e.uDModo.value=xe[b.dither.mode]??2,e.uDForma.value=Se[b.dither.shape]??0,e.uDEscala.value=b.dither.baseScale,e.uDIntensidad.value=b.dither.intensity,e.uDFondo.value.set(b.dither.bg),e.uDFrente.value.set(b.dither.fg),e.uDColor.value=+!!b.dither.useColor,M&&(M.strength=b.bloom.intensity,M.radius=b.bloom.radius,M.threshold=b.bloom.threshold),I){let e=I.material.uniforms;e.uCelda.value=b.grid.cell,e.uSubdiv.value=b.grid.subdivisions,e.uAnchoMayor.value=b.grid.majorW,e.uAnchoMenor.value=b.grid.minorW,e.uPunto.value=b.grid.dotSize,e.uColor.value.set(b.grid.color),e.uOpMayor.value=b.grid.majorOp,e.uOpMenor.value=b.grid.minorOp,e.uOpPunto.value=b.grid.dotOp,e.uFondo.value.set(b.grid.bg),e.uOpFondo.value=b.grid.bgOp,e.uTileX.value=b.grid.tileX,e.uTileY.value=b.grid.tileY,e.uFade.value=b.grid.hFade,e.uFadeSuave.value=b.grid.hFadeSoft,I.visible=b.grid.on}L&&(L.visible=b.shape.on,L.material.color.set(b.shape.color),L.material.opacity=b.shape.opacity)}var Z={idx:null,activo:!1,volviendo:!1,enFoco:!1,t:0,desde:null,hasta:null,partida:null,hayFoco:0};function qe(e,t){return((e+t*.5)%t+t)%t-t*.5}var Q=null,Je=``;function Ye(){let e=new a(new Uint8Array([0,0,0,255]),1,1);return e.needsUpdate=!0,e}function Xe(e){let t=ut(e);if(!t||!t.img)return;let n=new URL(String(t.img).replace(`-640.webp`,`.webp`),location.origin).href;if(n===Je&&Q){P.uniforms.uAlta.value=Q,P.uniforms.uAltaLista.value=1;return}Je=n;let r=new Image;r.onload=()=>{if(Je!==n)return;let e=new le(r);e.minFilter=d,e.magFilter=u,e.generateMipmaps=!0,e.anisotropy=O.capabilities.getMaxAnisotropy(),e.needsUpdate=!0,Q&&Q.dispose(),Q=e,P.uniforms.uAlta.value=e,P.uniforms.uAltaLista.value=1,D.alta={url:n,w:r.naturalWidth,h:r.naturalHeight,lista:!0}},r.onerror=()=>{D.alta={url:n,error:!0}},r.src=n,D.alta={url:n,cargando:!0}}function Ze(e){let t=Math.exp(-(e*e)/(b.effects.squeezeWidth*b.effects.squeezeWidth));return b.gallery.radius*(1-W*t)}var Qe=new ee,$e=new ae,et=new o,tt=new m,nt=new m;function rt(){for(let e=0;e<R.n;e++){let t=qe(R.aY[e]+P.uniforms.uDesplazaY.value,R.alturaTotal),n=R.aAngulo[e]+H,r=Ze(t);tt.set(Math.sin(n)*r,t,Math.cos(n)*r),et.set(0,n,0),$e.setFromEuler(et),nt.set(b.gallery.imageScale,b.gallery.imageScale,1),Qe.compose(tt,$e,nt),z.setMatrixAt(e,Qe)}z.instanceMatrix.needsUpdate=!0}function it(e){let t=qe(R.aY[e]+P.uniforms.uDesplazaY.value,R.alturaTotal),n=R.aAngulo[e]+H,r=Ze(t);return{centro:new m(Math.sin(n)*r,t,Math.cos(n)*r),normal:new m(Math.sin(n),0,Math.cos(n)),tangente:new m(Math.cos(n),0,-Math.sin(n))}}function at(){let e=f.degToRad(A.fov),t=Math.tan(e/2),n=R.alto*b.gallery.imageScale,r=R.ancho*b.gallery.imageScale,i=be()?b.foco.margenMovil||1.18:b.foco.margen;return Math.max(n/2/t,r/2/(t*A.aspect))*i}function ot(){let{centro:e,normal:t,tangente:n}=it(Z.idx),r=e.clone().addScaledVector(t,at()),i=e.clone().addScaledVector(n,y?0:b.foco.offsetMira);if(be()){let e=Math.tan(f.degToRad(A.fov)/2);i.y-=(.5-(b.foco.centroYMovil||.24))*2*at()*e}return{cam:r,mira:i}}function st(e){if(Z.idx!==null||Z.activo||x.progresoSuave<.9)return;let t=O.domElement.getBoundingClientRect();Ie.set((e.clientX-t.left)/t.width*2-1,-((e.clientY-t.top)/t.height)*2+1),Fe.setFromCamera(Ie,A);let n=Fe.intersectObject(z,!1).find(e=>e.instanceId!==void 0&&e.instanceId!==null);n&&ct(n.instanceId)}function ct(e){Z.idx!==null||Z.activo||(Z.partida||={cam:A.position.clone(),mira:B.clone(),zoom:X},Z.idx=e,Z.activo=!0,Z.volviendo=!1,Z.enFoco=!1,Z.t=0,Z.desde={cam:A.position.clone(),mira:B.clone()},x.velocidad=0,x.pendiente=0,U=0,document.body.classList.add(`gal-con-foco`),mt(e),Xe(e))}function lt(){if(Z.idx===null&&!Z.activo)return;let e=Z.partida||{cam:new m(0,0,b.camera.baseZoom),mira:new m(0,b.camera.lookY,0),zoom:b.camera.baseZoom};Z.desde={cam:A.position.clone(),mira:B.clone()},Z.hasta={cam:e.cam.clone(),mira:e.mira.clone(),zoom:e.zoom},Z.volviendo=!0,Z.activo=!0,Z.enFoco=!1,Z.t=0,Z.idx=null,U=0,document.body.classList.remove(`gal-con-foco`),ht(),P.uniforms.uAltaLista.value=0}function ut(e){let t=D.datos||[];return t.length?t[e%t.length]:null}window.__itemActual=()=>ut(Z.itemIdx)||null;function dt(){return g.idioma&&g.idioma()||`es`}function ft(e){let t=typeof e==`string`?null:e;return t?t[dt()]||t.es||``:e||``}function pt(){let e=ut(Z.itemIdx);if(!e)return;let t=g.textos||{},n={sitios:t.grupoSitios||`Sitios web`,ecommerce:t.grupoEcommerce||`E-commerce`,software:t.grupoSoftware||`Automatizaciones`};v(`#ficha-grupo`).textContent=n[e.grupo]||e.grupo;let r=String(ft(e.nombre)||``),[i,a]=r.includes(`|`)?r.split(`|`):[r,``];v(`#ficha-nombre`).innerHTML=`${i} ${a?`<span class="outline">`+a+`</span>`:``}`,v(`#ficha-meta`).textContent=ft(e.meta);let o=v(`#ficha-rating`);o&&(o.hidden=!e.tieneCaptura,e.tieneCaptura&&(o.innerHTML=`<span class="estrellas">★★★★★</span> ${t.rating||``}`)),v(`#ficha-desc`).textContent=ft(e.desc),v(`#ficha-tags`).innerHTML=(e.tags||[]).map(e=>`<span class="tag">${e}</span>`).join(``);let s=e.historia||{};v(`#ficha-pasos`).innerHTML=[[t.reto||`Reto`,s.reto],[t.propuesta||`Propuesta`,s.propuesta],[t.entrega||`Entrega`,s.entrega]].filter(([,e])=>e).map(([e,t])=>`<div class="paso"><dt>${e}</dt><dd>${ft(t).replace(/</g,`&lt;`)}</dd></div>`).join(``),v(`#ficha-acciones`).innerHTML=(()=>{let n=[];if(e.url){let r=e.grupo===`ecommerce`?t.verTienda||`Ver la tienda`:t.verSitio||`Ver el sitio`;n.push(`<a class="btn-lima" href="${e.url}" target="_blank" rel="noopener">${r} <span aria-hidden="true">→</span></a>`)}else n.push(`<span class="btn-apagado">${t.interno||`Proyecto interno`}</span>`);return e.caso&&n.push(`<a class="btn-borde" href="${g.casoBase&&g.casoBase()||`/`}casos/${e.caso}/" target="_blank" rel="noopener">${t.caso||`Caso completo`}</a>`),n.join(``)})()}function mt(e){Z.itemIdx=e,pt(),v(`#panel-foco`).hidden=!1,document.body.classList.add(`gal-con-foco`)}function ht(){v(`#panel-foco`).hidden=!0}var gt=performance.now(),_t=-1,vt=!1,$=!1;function yt(){if(D.parado||(requestAnimationFrame(yt),!D.listo))return;let e=Math.min(Ue.getDelta(),.05),t=Ue.elapsedTime;Pe(e);let n=Z.idx!==null||Z.activo,r=x.velocidad;if(Math.abs(r)>.001&&(Le=r>0?1:-1),n)U=0;else{let t=Le*b.motion.autoRotate,n=f.clamp(t,-b.motion.maxRotSpeed,b.motion.maxRotSpeed);U+=(n-U)*b.motion.rotSmoothing;let r=b.entrada.ritmoBarra||1,i=(x.progresoSuave<=1?x.progresoSuave/r:1/r+(x.progresoSuave-1))*b.motion.vueltasPorPasada*Math.PI*2;Math.abs(i-G)>Math.PI*2?H+=i-G:H+=i-G+U*e*60,G=i}let i=n?0:Math.min(Math.abs(r)*3,1)*b.effects.squeezeMax;W+=(i-W)*.08;let a=Math.min(1,x.progresoSuave),o=n?0:1-a,s=P.uniforms;if(s.uRotacion.value=H+o*b.entrada.giro,s.uDesplazaY.value=x.offset*b.motion.scrollAdvance,s.uTiempo.value=t,s.uAprieta.value=W,n){Z.t=Math.min(1,Z.t+e/b.foco.duracion);let t=Z.t<.5?4*Z.t*Z.t*Z.t:1-(-2*Z.t+2)**3/2,n=Z.volviendo?Z.hasta:ot();A.position.lerpVectors(Z.desde.cam,n.cam,t),B.lerpVectors(Z.desde.mira,n.mira,t),A.lookAt(B),Z.t>=1&&(Z.activo=!1,Z.volviendo?(Z.volviendo=!1,X=Z.hasta.zoom,Y=Z.hasta.zoom,Z.partida=null):Z.enFoco=!0)}else J.x+=(q.x-J.x)*b.camera.smoothing,J.y+=(q.y-J.y)*b.camera.smoothing,A.position.x=J.x*b.camera.panX,A.position.y=J.y*b.camera.panY+o*b.entrada.altura,Y=f.clamp(Y+Math.abs(r)*b.camera.zoomSpeed,b.camera.baseZoom,b.camera.maxZoomOut),X+=(Y-X)*.1,A.position.z=X+o*b.entrada.distancia,Y=f.lerp(Y,b.camera.baseZoom,1-b.camera.zoomDecay),B.set(0,b.camera.lookY,0),A.lookAt(B);if(O.domElement.style.opacity=(.1+.9*a).toFixed(3),L.visible){let t=Le*b.shape.autoRotate+r*b.shape.scrollRotate,n=f.clamp(t,-b.shape.maxRot,b.shape.maxRot);Ve+=(n-Ve)*b.shape.smooth,Be+=Ve*e*60,L.rotation.set(b.shape.tiltX,Be,b.shape.tiltZ);let i=b.shape.scale-Math.abs(r)*b.shape.scaleReact*10;He+=(i-He)*.04,L.scale.setScalar(He)}if(I.visible&&I.position.copy(A.position),R&&z){for(let e=0;e<R.n;e++){let t=+(e===Z.idx&&!Z.volviendo);R.aFoco[e]+=(t-R.aFoco[e])*.12}F.getAttribute(`aFoco`).needsUpdate=!0;let e=0;for(let t=0;t<R.n;t++)e=Math.max(e,R.aFoco[t]);Z.hayFoco=e,s.uHayFoco.value=e,rt()}j.render(),D.cuadros++;let c=performance.now();if(c-gt>500){D.fps=Math.round(D.cuadros*1e3/(c-gt)),D.cuadros=0,gt=c;let e=v(`#fps`);e&&(e.textContent=D.fps+` fps`)}if(D.rotacion=H,D.scrollY=s.uDesplazaY.value,D.zoom=X,D.enganchado=x.enganchado,D.progreso=a,Math.abs(a-_t)>.01){_t=a;let e=v(`#gal-pista-pct`);e&&(e.textContent=Math.round(a*100)+`%`),v(`#gal-pista-barra`).style.width=(a*100).toFixed(1)+`%`}a>=.995&&!$?($=!0,v(`#gal-pista-txt`).innerHTML=(g.textos||{}).pistaLibre||``):a<.99&&$&&($=!1,_t=-1,v(`#gal-pista-txt`).innerHTML=((g.textos||{}).pistaEntrada||`Entrada`)+` <b id="gal-pista-pct">0%</b>`),a>.995&&!vt?(vt=!0,v(`#btn-salir`).classList.add(`pulso`)):a<.99&&vt&&(vt=!1,v(`#btn-salir`).classList.remove(`pulso`))}function bt(){return(h||document.body).getBoundingClientRect().bottom+window.scrollY+2}function xt(){let e=g.textos||{};v(`#btn-salir`).onclick=()=>{E(),C=performance.now()+2200,x.progreso=1,x.progresoSuave=1,window.scrollTo({top:bt(),behavior:`smooth`}),St(e.saliste||``)},v(`#btn-volver`).onclick=()=>lt(),v(`#btn-cerrar-ficha`).onclick=()=>lt()}function St(e){let t=v(`#toast`);!t||!e||(t.textContent=e,t.classList.add(`ver`),setTimeout(()=>t.classList.remove(`ver`),2200))}function Ct(){_(window,`mousemove`,e=>{q.x=e.clientX/window.innerWidth*2-1,q.y=-(e.clientY/window.innerHeight)*2+1})}function wt(){let e=()=>{if(!O||!A)return;let{w:e,h:t}=We();A.aspect=e/t,A.updateProjectionMatrix(),O.setSize(e,t),j.setSize(e,t),M.setSize(e,t)};if(_(window,`resize`,e),typeof ResizeObserver<`u`&&v(`#escenario`)){let t=new ResizeObserver(e);t.observe(v(`#escenario`)),ye.push(t)}}function Tt(e,t={}){if(h&&h!==document&&document.contains(h))return()=>{};h=e,g=t,D.datos=t.items||[],D.parado=!1;let n=!0;return y&&(b.gallery.instancias=Math.min(b.gallery.instancias,16)),xt(),Ct(),wt(),Ne(),(async()=>{try{let e=we();D.total=e.length;let t=v(`#carga-total`);t&&(t.textContent=e.length);let r=await Te(e,(e,t)=>{if(D.cargadas=e,!n)return;let r=v(`#carga-hechas`),i=v(`#barra`);r&&(r.textContent=e),i&&(i.style.width=(e/t*100).toFixed(0)+`%`)});if(!n)return;let i=r.filter(Boolean);D.imgs=e,D.slugs=e.map(e=>e.slug),D.cargadasOK=i.length,D.faltantes=e.filter((e,t)=>!r[t]).map(e=>e.slug),Ge(i);let a=v(`#gal-cargando`);a&&a.classList.add(`fuera`),yt()}catch(e){D.error=String(e);let t=v(`#gal-cargando`);t&&(t.innerHTML=`<div class="err">${(g.textos||{}).error||``}</div>`)}})(),()=>{n=!1,D.parado=!0,ve.forEach(([e,t,n,r])=>e.removeEventListener(t,n,r)),ve.length=0,ye.forEach(e=>e.disconnect()),ye.length=0,O&&=(O.dispose(),O.domElement.remove(),null),P&&=(P.dispose(),null),V&&V.tex&&(V.tex.dispose(),V=null),Q&&=(Q.dispose(),null),R=null,document.body.classList.remove(`gal-con-foco`),h=document}}window.__set=(e,t)=>{Ce(e,t),Ke()},window.__config=()=>JSON.stringify(b,null,2),window.__scroll=x,window.__enganchar=T,window.__soltar=E,window.__progresoNativo=je,window.__salir=()=>document.querySelector(`#btn-salir`).click(),window.__foco=Z,window.__enfocar=ct,window.__volver=lt,window.__poseTarjeta=e=>{let t=it(e);return{centro:t.centro.toArray(),normal:t.normal.toArray()}},window.__bboxTarjeta=e=>{let t=z.geometry;t.boundingBox||t.computeBoundingBox();let n=t.boundingBox,r=new ee;z.getMatrixAt(e,r);let i=O.domElement.getBoundingClientRect(),a=1e9,o=1e9,s=-1e9,c=-1e9;for(let e=0;e<4;e++){let t=new m(e&1?n.max.x:n.min.x,e&2?n.max.y:n.min.y,0).applyMatrix4(r).project(A),l=i.left+(t.x*.5+.5)*i.width,u=i.top+(-t.y*.5+.5)*i.height;a=Math.min(a,l),s=Math.max(s,l),o=Math.min(o,u),c=Math.max(c,u)}return{i:e,izq:Math.round(a),arriba:Math.round(o),der:Math.round(s),abajo:Math.round(c),anchoPct:Math.round((s-a)/i.width*100),altoPct:Math.round((c-o)/i.height*100)}},window.__pantallaTarjeta=e=>{let{centro:t,normal:n}=it(e),r=t.clone().project(A),i=O.domElement.getBoundingClientRect(),a=new m().subVectors(A.position,t).normalize();return{x:i.left+(r.x*.5+.5)*i.width,y:i.top+(-r.y*.5+.5)*i.height,ndc:r.toArray(),frente:n.dot(a),dist:A.position.distanceTo(t)}},window.__tarjetasVisibles=()=>{let e=[],t=O.domElement.getBoundingClientRect();if(t.bottom<40||t.top>window.innerHeight-40)return e;for(let n=0;n<R.n;n++){let r=window.__pantallaTarjeta(n);r.frente<.35||r.x<t.left+8||r.x>t.right-8||r.y<t.top+8||r.y>t.bottom-8||e.push({i:n,x:Math.round(r.x),y:Math.round(r.y),frente:+r.frente.toFixed(3),dist:+r.dist.toFixed(2)})}return e.sort((e,t)=>e.dist-t.dist)},window.__camPos=()=>A.position.toArray().map(e=>+e.toFixed(4)),window.__altaInfo=()=>D.alta||null,window.__altaLista=()=>P.uniforms.uAltaLista.value,window.__forzarAlta=e=>{P.uniforms.uAltaLista.value=+!!e},window.__msaa=()=>j&&j.renderTarget1&&j.renderTarget1.samples||0,window.__rot=()=>H,window.__velRot=()=>U,window.__pararGiro=()=>{U=0,x.velocidad=0,x.pendiente=0},window.__errorFrente=()=>{if(Z.idx===null)return null;let{centro:e,normal:t}=it(Z.idx),n=new m().subVectors(A.position,e).normalize();return{dot:+t.dot(n).toFixed(4),dist:+A.position.distanceTo(e).toFixed(3),cam:A.position.toArray().map(e=>+e.toFixed(3))}};export{Tt as initGaleria};