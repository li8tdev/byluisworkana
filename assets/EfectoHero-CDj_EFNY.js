const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./GLTFLoader-BfCaJ6k9.js","./three.module-D7TxY2cb.js","./RoomEnvironment-BJ65Sm8D.js","./RoundedBoxGeometry-BC67cGb8.js"])))=>i.map(i=>d[i]);
import{i as e,n as t,r as n,t as r}from"./index-D55azLqI.js";var i=e(n(),1),a=t(),o=`成功.加油.梦想.未来.希望.勇气.坚持.努力.力量.光明.好运.幸福.快乐.热爱.创造.创新.智慧.相信.前进.自由.感恩.卓越.突破.无限.光芒.星辰.腾飞.精彩.丰收.财富.荣耀.胜利.超越.初心.奋斗.崛起.巅峰.热情.才华.奇迹.平安.吉祥.如意.发财.向上.绽放.勇敢.福气.喜乐.心想事成.一帆风顺.步步高升.万事如意.天天向上.马到成功.前程似锦.欣欣向荣.万物生长.独一无二.大展宏图.春风得意.花开富贵.好运连连.天下无双`.split(`.`),s=4.2,c=-.55;function l(e,t=8,n=256){let r=document.createElement(`canvas`);r.width=t*n,r.height=t*n;let i=r.getContext(`2d`);i.fillStyle=`#000`,i.fillRect(0,0,r.width,r.height),i.fillStyle=`#fff`,i.textAlign=`center`,i.textBaseline=`middle`;for(let r=0;r<t*t;r++){let a=e[r%e.length],o=r%t*n+n/2,s=Math.floor(r/t)*n+n/2,c=n*.78;i.font=`700 `+c+`px "Yu Gothic", "Yu Gothic UI", "MS Gothic", "Meiryo", "Noto Sans JP", "SimHei", "Microsoft YaHei", serif`;let l=i.measureText(a).width,u=n*.88;l>u&&(c=u/l*c,i.font=`700 `+c+`px "Yu Gothic", "Yu Gothic UI", "MS Gothic", "Meiryo", "Noto Sans JP", "SimHei", "Microsoft YaHei", serif`),i.lineJoin=`round`,i.lineCap=`round`,i.lineWidth=c*.085,i.strokeStyle=`#fff`,i.fillText(a,o,s),i.strokeText(a,o,s)}return{canvas:r,celdas:t,lado:n}}function u(e=256){let t=document.createElement(`canvas`);t.width=t.height=e;let n=t.getContext(`2d`),r=n.createImageData(e,e);for(let e=0;e<r.data.length;e+=4){let t=110+Math.random()*60;r.data[e]=r.data[e+1]=r.data[e+2]=t,r.data[e+3]=255}return n.putImageData(r,0,0),t}function d(){let e=(0,i.useRef)(null);return(0,i.useEffect)(()=>{let t=e.current;if(!t)return;let n=!0,i=0,a=()=>{},d=window.__efecto={montado:!1,cuadros:0,objeto:`ninguno`,errores:[],rotY:()=>0,movil:!window.matchMedia(`(min-width: 900px)`).matches};return(async()=>{let e=d.movil,f=navigator.connection||navigator.mozConnection||navigator.webkitConnection;if(f&&(f.saveData||/(^|-)2g/.test(f.effectiveType||``))){d.motivo=`ahorro de datos: queda el poster`;return}let p,ee,te,ne;try{p=await r(()=>import(`./three.module-D7TxY2cb.js`),[],import.meta.url),{GLTFLoader:ee}=await r(()=>import(`./GLTFLoader-BfCaJ6k9.js`),__vite__mapDeps([0,1]),import.meta.url),{RoomEnvironment:te}=await r(()=>import(`./RoomEnvironment-BJ65Sm8D.js`),__vite__mapDeps([2,1]),import.meta.url),{RoundedBoxGeometry:ne}=await r(()=>import(`./RoundedBoxGeometry-BC67cGb8.js`),__vite__mapDeps([3,1]),import.meta.url)}catch(e){d.errores.push(`three: `+e.message);return}if(!n)return;let re=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,m=new p.WebGLRenderer({antialias:!0,alpha:!0,powerPreference:`high-performance`});m.setPixelRatio(Math.min(window.devicePixelRatio||1,e?2:1.5)),m.setClearColor(0,0);let h=e?2:s,g=e?-1.25:0,ie=e?2.95:4.3,ae=e?150:300,oe=e?380:900,se=e?40:60,ce=e?.55:.34,_=m.domElement;_.setAttribute(`aria-hidden`,`true`),t.appendChild(_);let v=new p.Scene;v.fog=new p.FogExp2(197379,e?.036:.021);let y=new p.PerspectiveCamera(42,1,.1,300);e?(y.position.set(-.6,2,10.2),y.lookAt(1,.35,0)):(y.position.set(-1.2,4.75,9.8),y.lookAt(1.3,2.5,0));let le={valor:0},b={ndc:new p.Vector2(0,0),uv:new p.Vector2(9,9),ult:new p.Vector2(0,0),mundo:new p.Vector2(0,0),enAnillos:new p.Vector2(0,0),vel:0,click:0,golpe:0,dentro:0,hoverSuave:0},ue=new p.PlaneGeometry(300,300,ae,ae),x=new p.ShaderMaterial({uniforms:{uTiempo:{value:0},uPaso:{value:1.5},uOndas:{value:1},uPuntero:{value:new p.Vector2(0,0)},uRipple:{value:0},uRippleAmp:{value:0},uObjeto:{value:new p.Vector2(h,0)},uSuperficie:{value:1},uGolpe:{value:0},uHover:{value:0}},vertexShader:`
          uniform float uTiempo; uniform float uOndas; uniform vec2 uPuntero;
          uniform float uRipple; uniform float uRippleAmp; uniform float uHover;
          uniform vec2 uObjeto; uniform float uSuperficie; uniform float uGolpe;
          varying vec3 vNormalW; varying vec3 vMundo; varying float vAltura;
          float onda(vec2 p, float t){
            float d = length(p);
            return sin(d * 0.9 - t * 1.1) * exp(-d * 0.10) * 0.85;
          }
          // ONDAS QUE ALTERAN LA SUPERFICIE: nacen en el objeto y viajan hacia afuera.
          // Frecuencias LARGAS a proposito: con olas cortas y 1 unidad por cuadro la malla queda
          // sub-muestreada y el agua se ve como picos de videojuego viejo.
          float ondaSuperficie(vec2 p){
            float d = length(p - uObjeto);
            float fase = d * 0.45 - uTiempo * 1.8;
            float amp = exp(-d * 0.11) * (0.55 + 0.95 * uGolpe) * uSuperficie;
            return (sin(fase) + 0.35 * sin(fase * 1.7 + 1.3)) * amp;
          }
          float altura(vec2 p){
            float a = onda(p, uTiempo) * uOndas;
            a += ondaSuperficie(p);
            vec2 rel = p - uPuntero;
            float dr = length(rel);
            a += sin(dr * 1.1 - uTiempo * 2.2) * exp(-dr * 0.30) * 0.10 * uHover;
            a += sin(dr * 1.5 - uRipple * 6.0) * exp(-dr * 0.22) * uRippleAmp;
            a += sin(dr * 3.0 - uRipple * 9.0) * exp(-dr * 0.45) * uRippleAmp * 0.35;
            return a;
          }
          void main(){
            vec3 pos = position;
            float a = altura(pos.xy);
            pos.z += a;
            float e = 1.30;
            float ax = altura(pos.xy + vec2(e, 0.0));
            float ay = altura(pos.xy + vec2(0.0, e));
            vec3 n = normalize(vec3(-(ax - a) / e, -(ay - a) / e, 1.0));
            vec4 m = modelMatrix * vec4(pos, 1.0);
            vMundo = m.xyz; vAltura = a;
            vNormalW = normalize(mat3(modelMatrix) * n);
            gl_Position = projectionMatrix * viewMatrix * m;
          }`,fragmentShader:`
          uniform float uTiempo; uniform vec2 uObjeto; uniform float uPaso;
          varying vec3 vNormalW; varying vec3 vMundo; varying float vAltura;
          void main(){
            vec3 n = normalize(vNormalW);
            vec3 V = normalize(cameraPosition - vMundo);
            vec3 L = normalize(vec3(0.35, 1.0, 0.55));
            float dif = max(dot(n, L), 0.0);
            float esp = pow(max(dot(reflect(-L, n), V), 0.0), 42.0);
            float rim = pow(1.0 - max(dot(n, V), 0.0), 3.0);
            float d = length(vMundo.xz);
            /* El velo verde del agua (luz difusa) se apaga con la distancia: sin esto el agua lejana
               queda como una banda verde plana detras de la figura y no se aprecian las ondas
               (reportado por Luis el 2026-09-22). Cerca del objeto se mantiene y a partir de d=20 el
               fondo es negro; las crestas y el especular (las lineas de las ondas) siguen visibles. */
            float cerca = 1.0 - smoothstep(6.0, 30.0, d);
            /* El agua es NEGRA: la luz difusa (que daba el velo verde plano) se deja muy baja y lo que
               se ve son las LINEAS de las ondas. Las lineas se dibujan por fragmento desde la MISMA
               fase de las ondas radiales (sin(fase)^10 = cresta estrecha): si se dejan solo los realces
               de geometria, el resalte abarca toda la ola y vuelve el velo verde difuso (reportado por
               Luis el 2026-09-22). La malla (1 ud/cuadro) no puede con olas cortas en geometria. */
            /* MALLA NEON VERDE (Luis, 2026-09-23): "las ondas del buda las dejes en malla neon verde y
               quites los anillos". Antes se dibujaban ANILLOS (crestas radiales con pow(sin(fase),18))
               y el velo difuso del agua; ahora el suelo se ve como una REJILLA neon verde que ondula
               con el mismo oleaje del vertex shader (la ola mueve la malla, la rejilla la hace
               visible). Las lineas se calculan por fragmento, asi son nitidas a cualquier distancia y
               no dependen de los segmentos de la geometria. */
            vec3 col = (vec3(0.004, 0.010, 0.006) + vec3(0.06, 0.10, 0.07) * dif * 0.30) * cerca;
            // Rejilla: lineas de ~1 pixel de ancho usando fwidth (derivadas). Asi son NITIDAS a
            // cualquier distancia, sin engordar ni desaparecer. Con smoothstep sobre fract salian o
            // invisibles (finas) o pintando las celdas en vez de las lineas (anchas).
            vec2 celda = vMundo.xz / uPaso;
            vec2 grilla = abs(fract(celda - 0.5) - 0.5) / (fwidth(celda) * 0.55);   // lineas mas delgadas: el piso tiene que ser sutil
            float linea = 1.0 - min(min(grilla.x, grilla.y), 1.0);
            float caudal = 1.0 - smoothstep(8.0, 26.0, d);        // se apaga hacia el fondo
            col += vec3(0.30, 1.00, 0.48) * linea * 0.50 * caudal;             // linea neon (mas baja: no debe llamar la atencion)
            col += vec3(0.10, 0.45, 0.20) * linea * 0.16 * caudal;             // halo de la linea
            gl_FragColor = vec4(col, 1.0);
          }`}),S=new p.Mesh(ue,x);S.rotation.x=-Math.PI/2,S.position.y=-1.9,e||v.add(S),d.agua=!e;let C=oe,de=se,w=C+de,fe=l(o),T=new p.CanvasTexture(fe.canvas);T.colorSpace=p.SRGBColorSpace,T.minFilter=p.LinearMipmapLinearFilter,T.generateMipmaps=!0;let E=new p.PlaneGeometry(1,1),D=new p.InstancedBufferGeometry;D.index=E.index,D.attributes.position=E.attributes.position,D.attributes.uv=E.attributes.uv;let O=new Float32Array(w*3),k=new Float32Array(w*2),pe=new Float32Array(w),me=new Float32Array(w),he=new Float32Array(w),A=new Float32Array(w*3),ge=new Float32Array(w),j=fe.celdas;for(let e=0;e<w;e++){let t=e>=C,n=Math.random()*Math.PI*2,r=t?3.5+Math.random()*3:6+Math.random()*30;O[e*3]=Math.cos(n)*r,O[e*3+1]=t?Math.random()*2.5-.5:-1+Math.random()*13,O[e*3+2]=Math.sin(n)*r-(t?2:6);let i=Math.floor(Math.random()*j*j);k[e*2]=i%j/j,k[e*2+1]=1-(Math.floor(i/j)+1)/j,pe[e]=Math.random(),me[e]=+!!t,he[e]=-99,ge[e]=t?1.1+Math.random()*1.5:.5+Math.random()*1.4,A[e*3]=Math.cos(n)*(.6+Math.random()),A[e*3+1]=(Math.random()-.35)*.5,A[e*3+2]=Math.sin(n)*(.6+Math.random())}D.setAttribute(`iHome`,new p.InstancedBufferAttribute(O,3)),D.setAttribute(`iUv`,new p.InstancedBufferAttribute(k,2)),D.setAttribute(`iSeed`,new p.InstancedBufferAttribute(pe,1)),D.setAttribute(`iTipo`,new p.InstancedBufferAttribute(me,1)),D.setAttribute(`iInicio`,new p.InstancedBufferAttribute(he,1)),D.setAttribute(`iDir`,new p.InstancedBufferAttribute(A,3)),D.setAttribute(`iEscala`,new p.InstancedBufferAttribute(ge,1)),D.instanceCount=w;let M=new p.ShaderMaterial({transparent:!0,depthWrite:!1,uniforms:{uTiempo:{value:0},uAtlas:{value:T},uCellUv:{value:1/j},uColor:{value:new p.Color(14678435)},uPunteroNdc:{value:new p.Vector2(9,9)},uInteraccion:{value:0},uLetras:{value:1},uVida:{value:4}},vertexShader:`
          attribute vec3 iHome; attribute vec2 iUv; attribute float iSeed;
          attribute float iTipo; attribute float iInicio; attribute vec3 iDir; attribute float iEscala;
          uniform float uTiempo; uniform vec2 uPunteroNdc;
          uniform float uInteraccion; uniform float uLetras; uniform float uVida;
          varying vec2 vUv; varying vec2 vCelda; varying float vAlfa;
          void main(){
            vUv = uv; vCelda = iUv;
            float edad = uTiempo - iInicio;
            float prop = clamp(edad / uVida, 0.0, 1.0);
            vec3 base = iHome;
            float esc = iEscala;
            float alfa = 1.0;
            if (iTipo > 0.5) {
              float d = 3.0 + 16.0 * prop;
              base = iDir * d;
              base.y += sin(prop * 6.2831 + iSeed * 6.0) * 1.9;
              esc = iEscala * (0.55 + 1.25 * prop);
              alfa = smoothstep(0.0, 0.09, prop) * (1.0 - smoothstep(0.80, 1.0, prop));
              if (edad < 0.0 || edad > uVida) alfa = 0.0;
            } else {
              alfa = 0.085 * (0.45 + 0.55 * sin(uTiempo * 0.55 + iSeed * 12.0));
            }
            alfa *= uLetras;
            vec3 pos = base + position * esc;
            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            // Una letra pegada a la camara ocupa la pantalla como un manchon verde gigante y borroso
            // (Luis lo reporto con captura el 2026-09-22, y su hipotesis era esa letra): se apaga al
            // acercarse al objetivo. Sigue volando, pero deja de pegarse al cristal.
            alfa *= smoothstep(3.5, 10.0, -mv.z);
            vAlfa = alfa;
            vec4 clip = projectionMatrix * mv;
            vec2 rel = clip.xy / clip.w - uPunteroNdc;
            float dd = length(rel);
            float empuje = exp(-dd * dd * 5.5) * 0.42 * uInteraccion;
            clip.xy += normalize(rel + vec2(0.0001)) * empuje * clip.w;
            gl_Position = clip;
          }`,fragmentShader:`
          uniform sampler2D uAtlas; uniform float uCellUv; uniform vec3 uColor;
          varying vec2 vUv; varying vec2 vCelda; varying float vAlfa;
          void main(){
            float a = texture2D(uAtlas, vCelda + vUv * uCellUv).r;
            if (a < 0.04 || vAlfa < 0.004) discard;
            gl_FragColor = vec4(uColor, a * vAlfa);
          }`}),N=new p.Mesh(D,M);N.frustumCulled=!1,v.add(N),window.__efecto.letras=N,window.__efecto.piso=S;let P=new p.Group;P.position.set(h,g,0),v.add(P);let F=new p.PMREMGenerator(m);v.environment=F.fromScene(new te,.04).texture,v.environmentIntensity=.55;let I=new p.DirectionalLight(16777215,2.4);I.position.set(4,7,6),v.add(I);let L=new p.DirectionalLight(16777215,1.6);L.position.set(-5,3.5,-6),v.add(L);let R=new p.PointLight(12580679,26,16,2);R.position.set(-1.3,2.3,1.6),v.add(R);let _e=new p.PointLight(8954879,25,30,2);_e.position.set(6,4,-8),v.add(_e);let z=`ninguno`;try{let e=(await new Promise((e,t)=>{new ee().load(`/assets/buda.glb`,e,e=>{e&&e.total&&window.dispatchEvent(new CustomEvent(`hero-progreso`,{detail:Math.round(e.loaded/e.total*100)}))},t)})).scene;e.traverse(e=>{if(!e.isMesh)return;e.geometry.computeVertexNormals();let t=e.material;t&&(t.metalness=.05,t.roughness=.82,t.envMapIntensity=.45,t.needsUpdate=!0)});let t=new p.Box3().setFromObject(e),n=t.getSize(new p.Vector3);e.position.sub(t.getCenter(new p.Vector3)),e.position.y+=.45,e.rotation.y=c,e.scale.setScalar(ie/(Math.max(n.x,n.y,n.z)||1)),P.add(e),z=`buda`,d.objeto=z,requestAnimationFrame(()=>requestAnimationFrame(()=>{window.__heroListo=!0,window.dispatchEvent(new CustomEvent(`hero-listo`))}))}catch(e){d.errores.push(`buda: `+e.message);let t=new p.Mesh(new ne(1.6,1.6,1.6,3,.08),new p.MeshStandardMaterial({color:2763306,metalness:.9,roughness:.3}));P.add(t),z=`cubo`,d.objeto=z}window.__efecto.bboxPantalla=()=>{let e=new p.Box3().setFromObject(P),t=e.min,n=e.max,r=1e9,i=1e9,a=-1e9,o=-1e9;for(let e=0;e<8;e++){let s=new p.Vector3(e&1?n.x:t.x,e&2?n.y:t.y,e&4?n.z:t.z).project(y),c=(s.x*.5+.5)*innerWidth,l=(-s.y*.5+.5)*innerHeight;r=Math.min(r,c),a=Math.max(a,c),i=Math.min(i,l),o=Math.max(o,l)}return{x0:Math.round(r),y0:Math.round(i),x1:Math.round(a),y1:Math.round(o),anchoPct:Math.round((a-r)/innerWidth*100),altoPct:Math.round((o-i)/innerHeight*100)}};let B=new p.WebGLRenderTarget(2,2,{depthBuffer:!0}),ve=new p.OrthographicCamera(-1,1,1,-1,0,1),ye=new p.PlaneGeometry(2,2),V=new p.ShaderMaterial({uniforms:{tEscena:{value:B.texture},tGrano:{value:new p.CanvasTexture(u())},uRes:{value:new p.Vector2(1,1)},uTiempo:{value:0},uGrano:{value:1}},vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:`
          uniform sampler2D tEscena; uniform sampler2D tGrano;
          uniform vec2 uRes; uniform float uTiempo; uniform float uGrano;
          varying vec2 vUv;
          void main(){
            vec3 col = texture2D(tEscena, vUv).rgb;
            vec2 guv = vUv * uRes / 256.0 + vec2(fract(uTiempo * 13.7), fract(uTiempo * 7.3));
            float g = texture2D(tGrano, guv).r - 0.5;
            col += g * 0.055 * uGrano;
            float v = smoothstep(1.25, 0.30, length(vUv - 0.5) * 1.35);
            col *= mix(1.0, 0.42 + 0.58 * v, uGrano);
            gl_FragColor = vec4(col, 1.0);
          }`});V.uniforms.tGrano.value.wrapS=V.uniforms.tGrano.value.wrapT=p.RepeatWrapping;let be=new p.Scene;be.add(new p.Mesh(ye,V));function H(){let e=t.getBoundingClientRect(),n=Math.max(320,e.width),r=Math.max(320,e.height);m.setSize(n,r,!1),y.aspect=n/r,y.updateProjectionMatrix();let i=m.getPixelRatio();B.setSize(Math.round(n*i),Math.round(r*i)),V.uniforms.uRes.value.set(n,r)}H(),window.addEventListener(`resize`,H);let xe=!0,Se=!document.hidden,Ce=new IntersectionObserver(e=>{xe=e[0].isIntersecting},{threshold:.02});Ce.observe(t);let we=()=>{Se=!document.hidden};document.addEventListener(`visibilitychange`,we);let U=!1,W=0,G=0,K=0,q=0,Te=()=>{b.dentro=1},Ee=()=>{b.dentro=0},De=e=>{U=!0,W=e.clientX,_.setPointerCapture(e.pointerId),b.click=1,b.golpe=1},Oe=()=>{U=!1,b.click=0},J=e=>{let t=_.getBoundingClientRect(),n=(e.clientX-t.left)/t.width,r=1-(e.clientY-t.top)/t.height;b.uv.x<8&&(b.uv.set(n,r),b.ult.set(e.clientX,e.clientY));let i=Math.hypot(e.clientX-b.ult.x,e.clientY-b.ult.y);b.ult.set(e.clientX,e.clientY),b.uv.set(n,r),b.ndc.set(n*2-1,r*2-1),b.vel=Math.min(1,b.vel+i/45),M.uniforms.uPunteroNdc.value.copy(b.ndc);let a=new p.Raycaster;a.setFromCamera(b.ndc,y);let o=new p.Vector3;if(a.ray.intersectPlane(new p.Plane(new p.Vector3(0,1,0),1.9),o)&&b.mundo.set(o.x,-o.z),x.uniforms.uPuntero.value.copy(b.mundo),U){let t=e.clientX-W;W=e.clientX,q=t*.0032,G+=q}};_.addEventListener(`pointerenter`,Te),_.addEventListener(`pointerleave`,Ee),_.addEventListener(`pointerdown`,De),_.addEventListener(`pointerup`,Oe),_.addEventListener(`pointermove`,J);let ke=new p.Clock,Y=0,Ae=0,X=C,Z=0,Q=0;function je(e){let t=X;X=C+(X-C+1)%de;let n=(Math.random()-.5)*Math.PI*1.05,r=1+Math.random()*.7,i=D.attributes;i.iDir.setXYZ(t,Math.cos(n)*r,(Math.random()-.35)*.5,Math.sin(n)*r),i.iEscala.setX(t,.85+Math.random()*1.35),i.iInicio.setX(t,e),i.iDir.needsUpdate=i.iEscala.needsUpdate=i.iInicio.needsUpdate=!0}function $(){i=requestAnimationFrame($);let e=Math.min(ke.getDelta(),.05);if(!xe||!Se||window.__heroCasiApagado)return;let t=le.valor+=e*+!re;b.hoverSuave+=(b.dentro-b.hoverSuave)*Math.min(1,e*4);let n=b.hoverSuave;x.uniforms.uTiempo.value=t,M.uniforms.uTiempo.value=t,M.uniforms.uInteraccion.value=Math.min(1,n*.12+b.vel*.2+b.golpe);let r=Math.max(b.golpe,+!!b.click,b.vel*.22);Y=Math.max(Y,r),x.uniforms.uRipple.value=t,x.uniforms.uRippleAmp.value=Y*.9,x.uniforms.uHover.value=n,x.uniforms.uGolpe.value=b.golpe,x.uniforms.uObjeto.value.set(h,0),Y=Math.max(0,Y-e*.75),b.vel=Math.max(0,b.vel-e*1.6),b.golpe=Math.max(0,b.golpe-e*.9),t-Ae>ce&&(je(t),Ae=t),U||(q*=.94,G+=q,G>Math.PI&&(G-=Math.PI*2),G<-Math.PI&&(G+=Math.PI*2),G+=(0-G)*Math.min(1,e*.45),K+=(0-K)*Math.min(1,e*.45)),P.rotation.y=G+(re?0:Math.sin(t*.35)*.13),P.rotation.x=K+Math.sin(t*.27)*.02,P.position.y=g+Math.sin(t*.6)*.06,d.rotY=()=>P.rotation.y,V.uniforms.uTiempo.value=t,m.setRenderTarget(B),m.render(v,y),m.setRenderTarget(null),m.render(be,ve),d.cuadros=(d.cuadros||0)+1,Z++,Q+=e,Q>=1&&(d.fps=Math.round(Z/Q),Z=0,Q=0)}$(),d.montado=!0,a=()=>{cancelAnimationFrame(i),Ce.disconnect(),document.removeEventListener(`visibilitychange`,we),window.removeEventListener(`resize`,H),_.removeEventListener(`pointerenter`,Te),_.removeEventListener(`pointerleave`,Ee),_.removeEventListener(`pointerdown`,De),_.removeEventListener(`pointerup`,Oe),_.removeEventListener(`pointermove`,J),v.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material:[e.material]).forEach(e=>{e.map?.dispose?.(),e.dispose()})}),F.dispose(),B.dispose(),T.dispose(),m.dispose(),_.remove()}})(),()=>{n=!1,a()}},[]),(0,a.jsx)(`div`,{className:`hero-fx`,ref:e,"aria-hidden":`true`})}export{d as default};