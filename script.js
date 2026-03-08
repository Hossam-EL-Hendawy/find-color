// ══════════════════════════════════════════════════════
// CURSOR ANIMATION
// ══════════════════════════════════════════════════════
const dot   = document.getElementById('cursor-dot');
const ring  = document.getElementById('cursor-ring');
const trail = document.getElementById('cursor-trail');

let mx=0, my=0, tx=0, ty=0, ttx=0, tty=0;

document.addEventListener('mousemove', e=>{
  mx=e.clientX; my=e.clientY;
  dot.style.left=mx+'px'; dot.style.top=my+'px';
});

// Smooth lag for ring and trail
function animateCursor(){
  tx += (mx-tx)*0.12;
  ty += (my-ty)*0.12;
  ring.style.left=tx+'px'; ring.style.top=ty+'px';

  ttx += (mx-ttx)*0.06;
  tty += (my-tty)*0.06;
  trail.style.left=ttx+'px'; trail.style.top=tty+'px';

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect
const hoverEls = 'a,button,.color-card,.upload-inner,.palette-strip-seg,.cc-btn,.btn-export,.lang-sel,.theme-toggle,.sort-sel';
document.addEventListener('mouseover', e=>{
  if(e.target.closest(hoverEls)) document.body.classList.add('cursor-hover');
});
document.addEventListener('mouseout', e=>{
  if(e.target.closest(hoverEls)) document.body.classList.remove('cursor-hover');
});

// Click burst
document.addEventListener('mousedown',()=> document.body.classList.add('cursor-click'));
document.addEventListener('mouseup',  ()=> document.body.classList.remove('cursor-click'));

// Hide on leave, show on enter
document.addEventListener('mouseleave',()=>{ dot.style.opacity='0'; ring.style.opacity='0'; trail.style.opacity='0'; });
document.addEventListener('mouseenter',()=>{ dot.style.opacity='1'; ring.style.opacity='0.6'; trail.style.opacity='0.4'; });

// ══════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
let isDark = true;

themeToggle.addEventListener('click', ()=>{
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark?'dark':'light');
  themeIcon.textContent = isDark ? '🌙' : '☀️';
  if(lastColors.length) rerenderGrid();
});

// ══════════════════════════════════════════════════════
// i18n
// ══════════════════════════════════════════════════════
const T={
  en:{nav_tool:"Color Extractor",nav_how:"How It Works",badge:"K-Means ML · Real-Time · 100% Private",h1a:"Extract",h1b:" Every",h1c:"Color",h1d:" & HEX",hero_sub:"Upload any image and our ML algorithm identifies every dominant color, generating HEX codes, RGB, HSL values and coverage percentage — instantly.",upload_title:"Drop Your Image and Video Here",upload_hint:"Drag & drop or click to browse",btn_remove:"✕ Remove",btn_extract:"✦ Extract Colors",btn_reanalyze:"↻ Re-Analyze",loading:"Analyzing image...",ctrl_colors:"Colors",ctrl_sort:"Sort",sort_pct:"Coverage",sort_hue:"Hue",sort_bright:"Brightness",sort_sat:"Saturation",results_title:"Color Palette",export_title:"Export Palette",exp_hex:"Copy All HEX",exp_css:"CSS Variables",exp_scss:"SCSS",exp_json:"JSON",exp_svg:"Download SVG",exp_view:"View Code",how_tag:"The Technology",how_h:"How It Works",s1t:"Image Loading",s1d:"Your image loads into HTML5 Canvas in-browser. Nothing leaves your device.",s2t:"Pixel Sampling",s2d:"We sample up to 50,000 pixels building a dataset of every color.",s3t:"K-Means++ Clustering",s3d:"ML algorithm groups similar pixels into clusters to find dominant colors.",s4t:"Color Conversion",s4d:"Each cluster converts to HEX, RGB, HSL with coverage % and auto-names.",foot_copy:"",foot_priv:"100% Private · No uploads · No tracking",copied:"Copied!",download_done:"Downloading...",stat_colors:"Colors Found",stat_pixels:"Pixels Analyzed",stat_dominant:"Dominant Color",stat_coverage:"Top Coverage",
    harm_tag:"ML Color Harmony Engine",harm_title:"Suggest Harmonious Colors",harm_desc:"Choose a harmony rule and let the ML engine analyze your image's dominant hues to generate a scientifically balanced future color palette.",harm_btn:"Generate Harmony",harm_computing:"Computing color relationships...",harm_copy_hex:"Copy All HEX",harm_copy_css:"CSS Variables",harm_copy_json:"JSON",wallet_btn:"My Wallet",wallet_title_em:"Color",wallet_title_post:"Wallet",wallet_empty:"Save colors you love by clicking 💛 on any color card.",wallet_css:"CSS",wallet_json:"JSON",wallet_clear:"Clear All",wallet_copy_hex:"Copy All HEX",wallet_svg:"Download SVG",ct_tag:"Color Tools",ct_title_em:"CSS Prompt",ct_title_post:"& Color Search",ct_desc:"Type any CSS color value or color name to explore its full shade spectrum — with an interactive Photoshop-style color picker.",ct_tab_cmd:"⌨ CSS Prompt",ct_tab_search:"🔍 Color Search",ct_enter:"↵ Enter",ct_search_btn:"Search",ct_copy_all:"Copy All HEX",ct_saturation:"Saturation / Lightness",ct_hue:"Hue",ct_alpha:"Opacity",ct_preview:"Preview",ct_shades:"Shade Spectrum",ct_save_wallet:"Save to Wallet",outfit_nav_btn:"Outfit Harmony",outfit_title_em:"Outfit",outfit_title_post:"Harmony Analyzer",outfit_sub:"Upload outfit photos (full look or separate pieces). AI scores each outfit's color harmony and picks the winner.",outfit_drop:"Drop or click",outfit_outfit:"Outfit",outfit_add_slot:"Add slot",outfit_analyse_btn:"✦ Analyse Harmony",outfit_reset_btn:"Reset",outfit_loading:"Analysing color harmony…",outfit_winner_lbl:"Best Color Harmony",outfit_score_lbl:"/ 100 Color Score",outfit_dim_harmony:"Harmony",outfit_dim_contrast:"Contrast",outfit_dim_sat:"Saturation",outfit_dim_tone:"Tone Unity",outfit_dim_rule:"Rule",outfit_stylist_note:"Stylist Notes",wallet_saved:"Saved to wallet!",wallet_removed:"Removed from wallet",wallet_empty_title:"Your wallet is empty",hm_tag:"Color Harmony Heatmap",hm_title_pre:"Spatial ",hm_title_em:"Harmony",hm_title_post:" Analysis",hm_desc:"Cluster-based heatmap showing how harmoniously the colors in your image relate to each other spatially — hot zones indicate color discord, cool zones show harmonic regions.",hm_btn:"Generate Heatmap",hm_mode_harmony:"Harmony Score",hm_mode_cluster:"Cluster Distance",hm_mode_sat:"Saturation Map",hm_mode_tension:"Color Tension",hm_computing:"Computing heatmap…",hm_harmonious:"Harmonious",hm_moderate:"Moderate",hm_discordant:"Discordant",
    rule_comp:"Complementary",rule_anal:"Analogous",rule_tri:"Triadic",rule_split:"Split-Complementary",rule_tetra:"Tetradic",rule_sq:"Square",rule_mono:"Monochromatic",
    exp_comp:"<strong>Complementary</strong> — Colors opposite on the wheel (180°). Creates maximum contrast and visual energy. Perfect for bold, high-impact designs.",
    exp_anal:"<strong>Analogous</strong> — Adjacent colors (±30°). Harmonious, natural, and pleasing. Ideal for calm, cohesive palettes found in nature.",
    exp_tri:"<strong>Triadic</strong> — Three colors evenly spaced (120° each). Vibrant yet balanced. Great for dynamic illustrations and playful interfaces.",
    exp_split:"<strong>Split-Complementary</strong> — The base color plus two adjacent to its complement (±30°). High contrast like complementary but softer and more versatile.",
    exp_tetra:"<strong>Tetradic (Rectangle)</strong> — Four colors in two complementary pairs (60°/120°). Rich, complex palettes. Works best when one color dominates.",
    exp_sq:"<strong>Square</strong> — Four colors equally spaced (90°). Balanced tension across the whole spectrum. All four must be used equally for best results.",
    exp_mono:"<strong>Monochromatic</strong> — Variations of a single hue (different lightness & saturation). Elegant, sophisticated, and always cohesive.",
    harm_generated:"Generated harmony palette",harm_from:"based on image dominant color"},
  ar:{nav_tool:"مستخرج الألوان",nav_how:"كيف يعمل",badge:"خوارزمية K-Means · فوري · خصوصية 100%",h1a:"استخرج",h1b:" كل",h1c:"لون",h1d:" و HEX",hero_sub:"ارفع أي صورة وستحدد خوارزمية التعلم الآلي كل الألوان السائدة مع أكواد HEX وRGB وHSL ونسبة التغطية — فوراً.",upload_title:"أسقط صورتك هنا",upload_hint:"اسحب وأفلت أو انقر للاستعراض",btn_remove:"✕ إزالة",btn_extract:"✦ استخراج الألوان",btn_reanalyze:"↻ إعادة التحليل",loading:"جاري تحليل الصورة...",ctrl_colors:"الألوان",ctrl_sort:"ترتيب",sort_pct:"التغطية",sort_hue:"درجة اللون",sort_bright:"السطوع",sort_sat:"التشبع",results_title:"لوحة الألوان",export_title:"تصدير اللوحة",exp_hex:"نسخ كل HEX",exp_css:"متغيرات CSS",exp_scss:"SCSS",exp_json:"JSON",exp_svg:"تحميل SVG",exp_view:"عرض الكود",how_tag:"التقنية",how_h:"كيف يعمل",s1t:"تحميل الصورة",s1d:"تُحمَّل صورتك في Canvas بالمتصفح. لا شيء يغادر جهازك.",s2t:"أخذ عينات البيكسل",s2d:"نأخذ حتى 50,000 بيكسل لبناء مجموعة بيانات.",s3t:"تجميع K-Means++",s3d:"تجمع الخوارزمية البيكسلات المتشابهة للوصول إلى الألوان السائدة.",s4t:"تحويل الألوان",s4d:"يُحوَّل كل مجموعة إلى HEX وRGB وHSL مع نسبة التغطية.",foot_copy:"",foot_priv:"خصوصية 100% · لا رفع · لا تتبع",copied:"تم النسخ!",download_done:"جاري التحميل...",stat_colors:"ألوان",stat_pixels:"بيكسل",stat_dominant:"اللون السائد",stat_coverage:"التغطية",
    harm_tag:"محرك التناسق اللوني بالذكاء الاصطناعي",harm_title:"اقتراح ألوان متناسقة",harm_desc:"اختر قاعدة التناسق ودع الخوارزمية تحلل الألوان السائدة في صورتك لتوليد لوحة ألوان متوازنة علمياً.",harm_btn:"توليد التناسق",harm_computing:"جاري حساب العلاقات اللونية...",harm_copy_hex:"نسخ كل HEX",harm_copy_css:"متغيرات CSS",harm_copy_json:"JSON",
    rule_comp:"تكاملي",rule_anal:"متجاور",rule_tri:"ثلاثي",rule_split:"شبه تكاملي",rule_tetra:"رباعي",rule_sq:"مربع",rule_mono:"أحادي اللون",
    exp_comp:"<strong>تكاملي</strong> — ألوان متقابلة في الدائرة اللونية (180°). يخلق أقصى تباين وطاقة بصرية. مثالي للتصاميم الجريئة.",
    exp_anal:"<strong>متجاور</strong> — ألوان متجاورة (±30°). متناسق وطبيعي ومريح. مثالي للوحات الهادئة والمتماسكة.",
    exp_tri:"<strong>ثلاثي</strong> — ثلاثة ألوان متباعدة بالتساوي (120°). حيوي ومتوازن. رائع للرسوم التوضيحية.",
    exp_split:"<strong>شبه تكاملي</strong> — اللون الأساسي بالإضافة إلى لونين مجاورين للون التكميلي. تباين عالٍ لكن أكثر نعومة.",
    exp_tetra:"<strong>رباعي</strong> — أربعة ألوان في زوجين تكاملين. لوحات غنية ومعقدة.",
    exp_sq:"<strong>مربع</strong> — أربعة ألوان متباعدة بالتساوي (90°). توازن عبر الطيف اللوني بأكمله.",
    exp_mono:"<strong>أحادي اللون</strong> — تنويعات من لون واحد. أنيق ومتماسك دائماً.",
    harm_generated:"لوحة التناسق المولَّدة",harm_from:"بناءً على اللون السائد في الصورة",hm_tag:"خريطة تناسق الألوان الحرارية",hm_title_pre:"تحليل ",hm_title_em:"التناسق",hm_title_post:" المكاني",hm_desc:"خريطة حرارية مبنية على التجميع توضح مدى تناسق الألوان في صورتك مكانياً — المناطق الساخنة تشير إلى تنافر الألوان، والمناطق الباردة تُظهر المناطق المتناسقة.",hm_btn:"توليد الخريطة الحرارية",hm_mode_harmony:"درجة التناسق",hm_mode_cluster:"مسافة التجميع",hm_mode_sat:"خريطة التشبع",hm_mode_tension:"توتر الألوان",hm_computing:"جاري حساب الخريطة الحرارية…",hm_harmonious:"متناسق",hm_moderate:"متوسط",hm_discordant:"متنافر",wallet_btn:"محفظتي",wallet_title_em:"ألوان",wallet_title_post:"المحفظة",wallet_empty:"احفظ الألوان التي تعجبك بالضغط على 💛 في أي بطاقة لون.",wallet_css:"CSS",wallet_json:"JSON",wallet_clear:"مسح الكل",wallet_copy_hex:"نسخ كل HEX",wallet_svg:"تحميل SVG",wallet_saved:"تم الحفظ!",wallet_removed:"تم الحذف",wallet_empty_title:"محفظتك فارغة",ct_tag:"أدوات الألوان",ct_title_em:"موجه CSS",ct_title_post:"& البحث عن الألوان",ct_desc:"اكتب أي قيمة CSS للون لاستعراض طيف درجاته الكامل مع منتقي ألوان تفاعلي.",ct_tab_cmd:"⌨ موجه CSS",ct_tab_search:"🔍 بحث عن لون",ct_enter:"↵ إدخال",ct_search_btn:"بحث",ct_copy_all:"نسخ كل HEX",ct_saturation:"التشبع / الإضاءة",ct_hue:"درجة اللون",ct_alpha:"الشفافية",ct_preview:"معاينة",ct_shades:"طيف الدرجات",ct_save_wallet:"حفظ في المحفظة",outfit_nav_btn:"تناسق الأزياء",outfit_title_em:"تحليل",outfit_title_post:"تناسق الأزياء",outfit_sub:"ارفع صور أطقم (كاملة أو قطعاً منفصلة). سيقيّم الذكاء الاصطناعي تناسق الألوان ويختار الأفضل.",outfit_drop:"اسحب أو انقر",outfit_outfit:"طقم",outfit_add_slot:"إضافة",outfit_analyse_btn:"✦ تحليل التناسق",outfit_reset_btn:"إعادة",outfit_loading:"جاري التحليل…",outfit_winner_lbl:"أفضل تناسق لوني",outfit_score_lbl:"/ 100 تناسق",outfit_dim_harmony:"التناسق",outfit_dim_contrast:"التباين",outfit_dim_sat:"التشبع",outfit_dim_tone:"وحدة الدرجات",outfit_dim_rule:"القاعدة",outfit_stylist_note:"ملاحظات المصمم"},
  fr:{nav_tool:"Extracteur couleurs",nav_how:"Comment ça marche",badge:"K-Means ML · Temps réel · 100% Privé",h1a:"Extraire",h1b:" Toutes",h1c:"Couleurs",h1d:" & HEX",hero_sub:"Téléchargez une image, notre algorithme ML identifie chaque couleur dominante avec codes HEX, RGB, HSL et pourcentage.",upload_title:"Déposez votre image",upload_hint:"Glissez-déposez ou cliquez",btn_remove:"✕ Supprimer",btn_extract:"✦ Extraire",btn_reanalyze:"↻ Réanalyser",loading:"Analyse en cours...",ctrl_colors:"Couleurs",ctrl_sort:"Trier",sort_pct:"Couverture",sort_hue:"Teinte",sort_bright:"Luminosité",sort_sat:"Saturation",results_title:"Palette Couleurs",export_title:"Exporter",exp_hex:"Copier HEX",exp_css:"CSS",exp_scss:"SCSS",exp_json:"JSON",exp_svg:"SVG",exp_view:"Code",how_tag:"Technologie",how_h:"Comment ça marche",s1t:"Chargement",s1d:"L'image se charge dans Canvas dans le navigateur.",s2t:"Échantillonnage",s2d:"Jusqu'à 50 000 pixels échantillonnés.",s3t:"K-Means++",s3d:"Regroupe les pixels similaires en clusters.",s4t:"Conversion",s4d:"Converti en HEX, RGB, HSL avec pourcentage.",foot_copy:"",foot_priv:"100% Privé · Aucun upload",copied:"Copié!",download_done:"Téléchargement...",stat_colors:"Couleurs",stat_pixels:"Pixels",stat_dominant:"Dominant",stat_coverage:"Couverture",hm_tag:"Carte thermique harmonique",hm_title_pre:"Analyse d'",hm_title_em:"Harmonie",hm_title_post:" Spatiale",hm_desc:"Carte thermique par clusters montrant l'harmonie spatiale des couleurs — zones chaudes = discord, zones froides = harmonie.",hm_btn:"Générer la carte",hm_mode_harmony:"Score d'harmonie",hm_mode_cluster:"Distance cluster",hm_mode_sat:"Carte saturation",hm_mode_tension:"Tension couleur",hm_computing:"Calcul en cours…",hm_harmonious:"Harmonieux",hm_moderate:"Modéré",hm_discordant:"Discordant",wallet_btn:"Mon Wallet",wallet_title_em:"Couleur",wallet_title_post:"Wallet",wallet_empty:"Sauvegardez les couleurs en cliquant 💛 sur une carte.",wallet_css:"CSS",wallet_json:"JSON",wallet_clear:"Tout effacer",wallet_copy_hex:"Copier HEX",wallet_svg:"SVG",wallet_saved:"Sauvegardé!",wallet_removed:"Supprimé",wallet_empty_title:"Wallet vide",ct_tag:"Outils couleur",ct_title_em:"Invite CSS",ct_title_post:"& Recherche",ct_desc:"Tapez une valeur CSS pour explorer tout le spectre de teintes avec un sélecteur interactif.",ct_tab_cmd:"⌨ Invite CSS",ct_tab_search:"🔍 Recherche",ct_enter:"↵ Entrée",ct_search_btn:"Rechercher",ct_copy_all:"Copier HEX",ct_saturation:"Saturation / Luminosité",ct_hue:"Teinte",ct_alpha:"Opacité",ct_preview:"Aperçu",ct_shades:"Spectre",ct_save_wallet:"Wallet",outfit_nav_btn:"Harmonie Tenue",outfit_title_em:"Tenue",outfit_title_post:"Analyseur Harmonie",outfit_sub:"Téléchargez des photos de tenues. L'IA évalue l'harmonie des couleurs et choisit la meilleure.",outfit_drop:"Déposer ou cliquer",outfit_outfit:"Tenue",outfit_add_slot:"Ajouter",outfit_analyse_btn:"✦ Analyser",outfit_reset_btn:"Réinitialiser",outfit_loading:"Analyse en cours…",outfit_winner_lbl:"Meilleure harmonie",outfit_score_lbl:"/ 100 Score",outfit_dim_harmony:"Harmonie",outfit_dim_contrast:"Contraste",outfit_dim_sat:"Saturation",outfit_dim_tone:"Unité tonale",outfit_dim_rule:"Règle",outfit_stylist_note:"Notes styliste"},
  es:{nav_tool:"Extractor colores",nav_how:"Cómo funciona",badge:"K-Means ML · Tiempo real · Privado",h1a:"Extrae",h1b:" Todos",h1c:"Colores",h1d:" y HEX",hero_sub:"Sube cualquier imagen y el algoritmo ML identifica cada color dominante con HEX, RGB, HSL y cobertura.",upload_title:"Suelta tu imagen",upload_hint:"Arrastra o haz clic",btn_remove:"✕ Eliminar",btn_extract:"✦ Extraer",btn_reanalyze:"↻ Re-analizar",loading:"Analizando...",ctrl_colors:"Colores",ctrl_sort:"Ordenar",sort_pct:"Cobertura",sort_hue:"Tono",sort_bright:"Brillo",sort_sat:"Saturación",results_title:"Paleta Colores",export_title:"Exportar",exp_hex:"Copiar HEX",exp_css:"CSS",exp_scss:"SCSS",exp_json:"JSON",exp_svg:"SVG",exp_view:"Código",how_tag:"Tecnología",how_h:"Cómo funciona",s1t:"Carga",s1d:"La imagen carga en Canvas en el navegador.",s2t:"Muestreo",s2d:"Hasta 50.000 píxeles muestreados.",s3t:"K-Means++",s3d:"Agrupa píxeles similares en clusters.",s4t:"Conversión",s4d:"Convierte a HEX, RGB, HSL con porcentaje.",foot_copy:"",foot_priv:"100% Privado",copied:"¡Copiado!",download_done:"Descargando...",stat_colors:"Colores",stat_pixels:"Píxeles",stat_dominant:"Dominante",stat_coverage:"Cobertura",hm_tag:"Mapa de calor armónico",hm_title_pre:"Análisis de ",hm_title_em:"Armonía",hm_title_post:" Espacial",hm_desc:"Mapa de calor por clusters mostrando la armonía espacial de los colores — zonas calientes = discordia, zonas frías = armonía.",hm_btn:"Generar mapa",hm_mode_harmony:"Puntuación armonía",hm_mode_cluster:"Distancia cluster",hm_mode_sat:"Mapa saturación",hm_mode_tension:"Tensión color",hm_computing:"Calculando…",hm_harmonious:"Armonioso",hm_moderate:"Moderado",hm_discordant:"Discordante",wallet_btn:"Mi Wallet",wallet_title_em:"Color",wallet_title_post:"Wallet",wallet_empty:"Guarda colores tocando 💛 en cualquier tarjeta.",wallet_css:"CSS",wallet_json:"JSON",wallet_clear:"Borrar todo",wallet_copy_hex:"Copiar HEX",wallet_svg:"SVG",wallet_saved:"¡Guardado!",wallet_removed:"Eliminado",wallet_empty_title:"Wallet vacío",ct_tag:"Herramientas",ct_title_em:"Prompt CSS",ct_title_post:"& Búsqueda",ct_desc:"Escribe un valor CSS para explorar el espectro completo de tonos con un selector interactivo.",ct_tab_cmd:"⌨ Prompt CSS",ct_tab_search:"🔍 Buscar",ct_enter:"↵ Intro",ct_search_btn:"Buscar",ct_copy_all:"Copiar HEX",ct_saturation:"Saturación / Luminosidad",ct_hue:"Tono",ct_alpha:"Opacidad",ct_preview:"Vista previa",ct_shades:"Espectro",ct_save_wallet:"Guardar",outfit_nav_btn:"Armonía Outfit",outfit_title_em:"Outfit",outfit_title_post:"Analizador Armonía",outfit_sub:"Sube fotos de outfits. La IA puntúa la armonía de colores y elige el ganador.",outfit_drop:"Arrastra o haz clic",outfit_outfit:"Outfit",outfit_add_slot:"Agregar",outfit_analyse_btn:"✦ Analizar",outfit_reset_btn:"Reiniciar",outfit_loading:"Analizando…",outfit_winner_lbl:"Mejor armonía",outfit_score_lbl:"/ 100 Puntos",outfit_dim_harmony:"Armonía",outfit_dim_contrast:"Contraste",outfit_dim_sat:"Saturación",outfit_dim_tone:"Unidad tonal",outfit_dim_rule:"Regla",outfit_stylist_note:"Notas del estilista"},
  de:{nav_tool:"Farbextraktor",nav_how:"Wie es funktioniert",badge:"K-Means ML · Echtzeit · Privat",h1a:"Extrahiere",h1b:" Alle",h1c:"Farben",h1d:" & HEX",hero_sub:"Lade ein Bild hoch, unser ML-Algorithmus findet jede dominante Farbe mit HEX, RGB, HSL und Abdeckung.",upload_title:"Bild hier ablegen",upload_hint:"Drag & Drop oder klicken",btn_remove:"✕ Entfernen",btn_extract:"✦ Farben extrahieren",btn_reanalyze:"↻ Neu analysieren",loading:"Analysiere...",ctrl_colors:"Farben",ctrl_sort:"Sortieren",sort_pct:"Abdeckung",sort_hue:"Farbton",sort_bright:"Helligkeit",sort_sat:"Sättigung",results_title:"Farbpalette",export_title:"Exportieren",exp_hex:"HEX kopieren",exp_css:"CSS",exp_scss:"SCSS",exp_json:"JSON",exp_svg:"SVG",exp_view:"Code",how_tag:"Technologie",how_h:"Wie es funktioniert",s1t:"Laden",s1d:"Das Bild lädt im Browser-Canvas.",s2t:"Pixel-Sampling",s2d:"Bis zu 50.000 Pixel werden gesampelt.",s3t:"K-Means++",s3d:"Ähnliche Pixel werden zu Clustern gruppiert.",s4t:"Konvertierung",s4d:"In HEX, RGB, HSL mit Prozent konvertiert.",foot_copy:"",foot_priv:"100% Privat · Kein Upload",copied:"Kopiert!",download_done:"Download...",stat_colors:"Farben",stat_pixels:"Pixel",stat_dominant:"Dominante",stat_coverage:"Abdeckung",hm_tag:"Harmonie-Heatmap",hm_title_pre:"Räumliche ",hm_title_em:"Harmonie",hm_title_post:"-Analyse",hm_desc:"Cluster-basierte Heatmap der Farbharmonie — heiße Zonen zeigen Disharmonie, kühle Zonen zeigen harmonische Bereiche.",hm_btn:"Heatmap erzeugen",hm_mode_harmony:"Harmonie-Score",hm_mode_cluster:"Cluster-Abstand",hm_mode_sat:"Sättigungskarte",hm_mode_tension:"Farbspannung",hm_computing:"Berechnung…",hm_harmonious:"Harmonisch",hm_moderate:"Moderat",hm_discordant:"Disharmonisch",wallet_btn:"Mein Wallet",wallet_title_em:"Farb",wallet_title_post:"Wallet",wallet_empty:"Farben speichern durch Klick auf 💛 in einer Karte.",wallet_css:"CSS",wallet_json:"JSON",wallet_clear:"Alle löschen",wallet_copy_hex:"HEX kopieren",wallet_svg:"SVG",wallet_saved:"Gespeichert!",wallet_removed:"Entfernt",wallet_empty_title:"Wallet leer",ct_tag:"Farbwerkzeuge",ct_title_em:"CSS-Eingabe",ct_title_post:"& Suche",ct_desc:"CSS-Farbwert eingeben um das gesamte Farbspektrum mit interaktivem Picker zu erkunden.",ct_tab_cmd:"⌨ CSS-Eingabe",ct_tab_search:"🔍 Suche",ct_enter:"↵ Eingabe",ct_search_btn:"Suchen",ct_copy_all:"HEX kopieren",ct_saturation:"Sättigung / Helligkeit",ct_hue:"Farbton",ct_alpha:"Deckkraft",ct_preview:"Vorschau",ct_shades:"Farbspektrum",ct_save_wallet:"Speichern",outfit_nav_btn:"Outfit-Harmonie",outfit_title_em:"Outfit",outfit_title_post:"Harmonie-Analyse",outfit_sub:"Outfit-Fotos hochladen. KI bewertet Farbharmonie und wählt den Gewinner.",outfit_drop:"Ablegen oder klicken",outfit_outfit:"Outfit",outfit_add_slot:"Hinzufügen",outfit_analyse_btn:"✦ Analysieren",outfit_reset_btn:"Zurücksetzen",outfit_loading:"Analyse läuft…",outfit_winner_lbl:"Beste Harmonie",outfit_score_lbl:"/ 100 Punkte",outfit_dim_harmony:"Harmonie",outfit_dim_contrast:"Kontrast",outfit_dim_sat:"Sättigung",outfit_dim_tone:"Ton-Einheit",outfit_dim_rule:"Regel",outfit_stylist_note:"Stilist-Notizen"},
  it:{nav_tool:"Estrattore colori",nav_how:"Come funziona",badge:"K-Means ML · Tempo reale · Privato",h1a:"Estrai",h1b:" Tutti i",h1c:"Colori",h1d:" e HEX",hero_sub:"Carica un'immagine, il nostro algoritmo ML identifica ogni colore dominante con HEX, RGB, HSL e copertura.",upload_title:"Trascina l'immagine",upload_hint:"Trascina o clicca",btn_remove:"✕ Rimuovi",btn_extract:"✦ Estrai colori",btn_reanalyze:"↻ Ri-analizza",loading:"Analisi...",ctrl_colors:"Colori",ctrl_sort:"Ordina",sort_pct:"Copertura",sort_hue:"Tonalità",sort_bright:"Luminosità",sort_sat:"Saturazione",results_title:"Palette Colori",export_title:"Esporta",exp_hex:"Copia HEX",exp_css:"CSS",exp_scss:"SCSS",exp_json:"JSON",exp_svg:"SVG",exp_view:"Codice",how_tag:"Tecnologia",how_h:"Come funziona",s1t:"Caricamento",s1d:"L'immagine carica nel Canvas del browser.",s2t:"Campionamento",s2d:"Fino a 50.000 pixel campionati.",s3t:"K-Means++",s3d:"Raggruppa pixel simili in cluster.",s4t:"Conversione",s4d:"Converti in HEX, RGB, HSL con percentuale.",foot_copy:"",foot_priv:"100% Privato",copied:"Copiato!",download_done:"Scaricamento...",stat_colors:"Colori",stat_pixels:"Pixel",stat_dominant:"Dominante",stat_coverage:"Copertura",hm_tag:"Mappa termica armonica",hm_title_pre:"Analisi ",hm_title_em:"Armonia",hm_title_post:" Spaziale",hm_desc:"Mappa termica cluster che mostra l'armonia spaziale dei colori.",hm_btn:"Genera mappa",hm_mode_harmony:"Punteggio armonia",hm_mode_cluster:"Distanza cluster",hm_mode_sat:"Mappa saturazione",hm_mode_tension:"Tensione colore",hm_computing:"Calcolo…",hm_harmonious:"Armonioso",hm_moderate:"Moderato",hm_discordant:"Discordante",wallet_btn:"Il mio Wallet",wallet_title_em:"Colore",wallet_title_post:"Wallet",wallet_empty:"Salva i colori cliccando 💛 su qualsiasi scheda.",wallet_css:"CSS",wallet_json:"JSON",wallet_clear:"Cancella tutto",wallet_copy_hex:"Copia HEX",wallet_svg:"SVG",wallet_saved:"Salvato!",wallet_removed:"Rimosso",wallet_empty_title:"Wallet vuoto",ct_tag:"Strumenti colore",ct_title_em:"Prompt CSS",ct_title_post:"& Ricerca",ct_desc:"Digita un valore CSS per esplorare lo spettro completo delle tonalità.",ct_tab_cmd:"⌨ Prompt CSS",ct_tab_search:"🔍 Cerca",ct_enter:"↵ Invio",ct_search_btn:"Cerca",ct_copy_all:"Copia HEX",ct_saturation:"Saturazione / Luminosità",ct_hue:"Tonalità",ct_alpha:"Opacità",ct_preview:"Anteprima",ct_shades:"Spettro",ct_save_wallet:"Salva",outfit_nav_btn:"Armonia Outfit",outfit_title_em:"Outfit",outfit_title_post:"Analisi Armonia",outfit_sub:"Carica foto di outfit. L'AI valuta l'armonia cromatica e sceglie il vincitore.",outfit_drop:"Trascina o clicca",outfit_outfit:"Outfit",outfit_add_slot:"Aggiungi",outfit_analyse_btn:"✦ Analizza",outfit_reset_btn:"Reset",outfit_loading:"Analisi in corso…",outfit_winner_lbl:"Migliore armonia",outfit_score_lbl:"/ 100 Punteggio",outfit_dim_harmony:"Armonia",outfit_dim_contrast:"Contrasto",outfit_dim_sat:"Saturazione",outfit_dim_tone:"Unità tono",outfit_dim_rule:"Regola",outfit_stylist_note:"Note stilista"},
  pt:{nav_tool:"Extrator de cores",nav_how:"Como funciona",badge:"K-Means ML · Tempo real · Privado",h1a:"Extraia",h1b:" Todas",h1c:"Cores",h1d:" e HEX",hero_sub:"Carregue uma imagem, nosso algoritmo ML identifica cada cor dominante com HEX, RGB, HSL e cobertura.",upload_title:"Solte sua imagem",upload_hint:"Arraste ou clique",btn_remove:"✕ Remover",btn_extract:"✦ Extrair cores",btn_reanalyze:"↻ Re-analisar",loading:"Analisando...",ctrl_colors:"Cores",ctrl_sort:"Ordenar",sort_pct:"Cobertura",sort_hue:"Tom",sort_bright:"Brilho",sort_sat:"Saturação",results_title:"Paleta de Cores",export_title:"Exportar",exp_hex:"Copiar HEX",exp_css:"CSS",exp_scss:"SCSS",exp_json:"JSON",exp_svg:"SVG",exp_view:"Código",how_tag:"Tecnologia",how_h:"Como funciona",s1t:"Carregamento",s1d:"A imagem carrega no Canvas do navegador.",s2t:"Amostragem",s2d:"Até 50.000 pixels amostrados.",s3t:"K-Means++",s3d:"Agrupa pixels similares em clusters.",s4t:"Conversão",s4d:"Converte para HEX, RGB, HSL com porcentagem.",foot_copy:"",foot_priv:"100% Privado",copied:"Copiado!",download_done:"Baixando...",stat_colors:"Cores",stat_pixels:"Pixels",stat_dominant:"Dominante",stat_coverage:"Cobertura",hm_tag:"Mapa de calor harmônico",hm_title_pre:"Análise de ",hm_title_em:"Harmonia",hm_title_post:" Espacial",hm_desc:"Mapa de calor por clusters mostrando harmonia espacial das cores.",hm_btn:"Gerar mapa",hm_mode_harmony:"Pontuação harmonia",hm_mode_cluster:"Distância cluster",hm_mode_sat:"Mapa saturação",hm_mode_tension:"Tensão cor",hm_computing:"Calculando…",hm_harmonious:"Harmonioso",hm_moderate:"Moderado",hm_discordant:"Discordante",wallet_btn:"Minha Carteira",wallet_title_em:"Cor",wallet_title_post:"Carteira",wallet_empty:"Salve cores clicando 💛 em qualquer cartão.",wallet_css:"CSS",wallet_json:"JSON",wallet_clear:"Limpar tudo",wallet_copy_hex:"Copiar HEX",wallet_svg:"SVG",wallet_saved:"Salvo!",wallet_removed:"Removido",wallet_empty_title:"Carteira vazia",ct_tag:"Ferramentas",ct_title_em:"Prompt CSS",ct_title_post:"& Pesquisa",ct_desc:"Digite um valor CSS para explorar o espectro completo de tons.",ct_tab_cmd:"⌨ Prompt CSS",ct_tab_search:"🔍 Pesquisar",ct_enter:"↵ Enter",ct_search_btn:"Pesquisar",ct_copy_all:"Copiar HEX",ct_saturation:"Saturação / Luminosidade",ct_hue:"Matiz",ct_alpha:"Opacidade",ct_preview:"Pré-visualização",ct_shades:"Espectro",ct_save_wallet:"Salvar",outfit_nav_btn:"Harmonia Outfit",outfit_title_em:"Outfit",outfit_title_post:"Análise Harmonia",outfit_sub:"Envie fotos de looks. A IA pontua a harmonia de cores e escolhe o vencedor.",outfit_drop:"Arraste ou clique",outfit_outfit:"Outfit",outfit_add_slot:"Adicionar",outfit_analyse_btn:"✦ Analisar",outfit_reset_btn:"Resetar",outfit_loading:"Analisando…",outfit_winner_lbl:"Melhor harmonia",outfit_score_lbl:"/ 100 Pontos",outfit_dim_harmony:"Harmonia",outfit_dim_contrast:"Contraste",outfit_dim_sat:"Saturação",outfit_dim_tone:"Unidade tonal",outfit_dim_rule:"Regra",outfit_stylist_note:"Notas do estilista"},
  ru:{nav_tool:"Экстрактор цветов",nav_how:"Как работает",badge:"K-Means ML · Реальное время · Приватно",h1a:"Извлечь",h1b:" Все",h1c:"Цвета",h1d:" и HEX",hero_sub:"Загрузите изображение — ML-алгоритм найдёт все доминирующие цвета с HEX, RGB, HSL и процентом.",upload_title:"Перетащите изображение",upload_hint:"Перетащите или нажмите",btn_remove:"✕ Удалить",btn_extract:"✦ Извлечь цвета",btn_reanalyze:"↻ Переанализировать",loading:"Анализ...",ctrl_colors:"Цвета",ctrl_sort:"Сортировка",sort_pct:"Покрытие",sort_hue:"Оттенок",sort_bright:"Яркость",sort_sat:"Насыщенность",results_title:"Цветовая палитра",export_title:"Экспорт",exp_hex:"Копировать HEX",exp_css:"CSS",exp_scss:"SCSS",exp_json:"JSON",exp_svg:"SVG",exp_view:"Код",how_tag:"Технология",how_h:"Как работает",s1t:"Загрузка",s1d:"Изображение обрабатывается в браузере.",s2t:"Сэмплинг",s2d:"До 50 000 пикселей.",s3t:"K-Means++",s3d:"Группировка похожих пикселей.",s4t:"Конвертация",s4d:"В HEX, RGB, HSL с процентом.",foot_copy:"",foot_priv:"100% Приватно",copied:"Скопировано!",download_done:"Загрузка...",stat_colors:"Цветов",stat_pixels:"Пикселей",stat_dominant:"Доминирующий",stat_coverage:"Покрытие",hm_tag:"Тепловая карта гармонии",hm_title_pre:"Пространственный ",hm_title_em:"Гармонический",hm_title_post:" Анализ",hm_desc:"Тепловая карта на основе кластеров, показывающая гармоничность цветов.",hm_btn:"Создать карту",hm_mode_harmony:"Индекс гармонии",hm_mode_cluster:"Расстояние кластеров",hm_mode_sat:"Карта насыщенности",hm_mode_tension:"Цветовое напряжение",hm_computing:"Вычисление…",hm_harmonious:"Гармонично",hm_moderate:"Умеренно",hm_discordant:"Дисгармония",wallet_btn:"Кошелёк",wallet_title_em:"Цветовой",wallet_title_post:"Кошелёк",wallet_empty:"Сохраняйте цвета нажатием 💛 на карточку.",wallet_css:"CSS",wallet_json:"JSON",wallet_clear:"Очистить всё",wallet_copy_hex:"Скопировать HEX",wallet_svg:"SVG",wallet_saved:"Сохранено!",wallet_removed:"Удалено",wallet_empty_title:"Кошелёк пуст",ct_tag:"Инструменты",ct_title_em:"CSS-подсказка",ct_title_post:"и Поиск",ct_desc:"Введите значение CSS для изучения полного спектра оттенков.",ct_tab_cmd:"⌨ CSS-подсказка",ct_tab_search:"🔍 Поиск",ct_enter:"↵ Ввод",ct_search_btn:"Найти",ct_copy_all:"Копировать HEX",ct_saturation:"Насыщенность / Яркость",ct_hue:"Оттенок",ct_alpha:"Прозрачность",ct_preview:"Предпросмотр",ct_shades:"Спектр",ct_save_wallet:"Сохранить",outfit_nav_btn:"Гармония образа",outfit_title_em:"Образ",outfit_title_post:"Анализ гармонии",outfit_sub:"Загрузите фото нарядов. ИИ оценит цветовую гармонию и выберет победителя.",outfit_drop:"Перетащите или кликните",outfit_outfit:"Образ",outfit_add_slot:"Добавить",outfit_analyse_btn:"✦ Анализировать",outfit_reset_btn:"Сбросить",outfit_loading:"Анализ…",outfit_winner_lbl:"Лучшая гармония",outfit_score_lbl:"/ 100 баллов",outfit_dim_harmony:"Гармония",outfit_dim_contrast:"Контраст",outfit_dim_sat:"Насыщенность",outfit_dim_tone:"Единство тонов",outfit_dim_rule:"Правило",outfit_stylist_note:"Заметки стилиста"},
  tr:{nav_tool:"Renk Çıkarıcı",nav_how:"Nasıl Çalışır",badge:"K-Means ML · Gerçek Zamanlı · Gizli",h1a:"Çıkar",h1b:" Tüm",h1c:"Renkleri",h1d:" ve HEX",hero_sub:"Görsel yükle — ML algoritmamız HEX, RGB, HSL ve kapsama yüzdesiyle tüm baskın renkleri tespit eder.",upload_title:"Görselini buraya bırak",upload_hint:"Sürükle bırak veya tıkla",btn_remove:"✕ Kaldır",btn_extract:"✦ Renkleri Çıkar",btn_reanalyze:"↻ Yeniden Analiz",loading:"Analiz ediliyor...",ctrl_colors:"Renkler",ctrl_sort:"Sırala",sort_pct:"Kapsam",sort_hue:"Ton",sort_bright:"Parlaklık",sort_sat:"Doygunluk",results_title:"Renk Paleti",export_title:"Dışa Aktar",exp_hex:"HEX Kopyala",exp_css:"CSS",exp_scss:"SCSS",exp_json:"JSON",exp_svg:"SVG",exp_view:"Kod",how_tag:"Teknoloji",how_h:"Nasıl Çalışır",s1t:"Yükleme",s1d:"Görsel tarayıcıda Canvas'a yüklenir.",s2t:"Piksel Örnekleme",s2d:"50.000'e kadar piksel.",s3t:"K-Means++",s3d:"Benzer pikseller kümelere gruplandırılır.",s4t:"Dönüşüm",s4d:"HEX, RGB, HSL'ye dönüştürülür.",foot_copy:"",foot_priv:"%100 Gizli",copied:"Kopyalandı!",download_done:"İndiriliyor...",stat_colors:"Renk",stat_pixels:"Piksel",stat_dominant:"Baskın",stat_coverage:"Kapsam",hm_tag:"Uyum Isı Haritası",hm_title_pre:"Uzamsal ",hm_title_em:"Uyum",hm_title_post:" Analizi",hm_desc:"Renklerin mekansal uyumunu gösteren küme tabanlı ısı haritası.",hm_btn:"Isı Haritası Oluştur",hm_mode_harmony:"Uyum Skoru",hm_mode_cluster:"Küme Mesafesi",hm_mode_sat:"Doygunluk Haritası",hm_mode_tension:"Renk Gerilimi",hm_computing:"Hesaplanıyor…",hm_harmonious:"Uyumlu",hm_moderate:"Orta",hm_discordant:"Uyumsuz",wallet_btn:"Cüzdanım",wallet_title_em:"Renk",wallet_title_post:"Cüzdanı",wallet_empty:"💛 tıklayarak renkleri kaydedin.",wallet_css:"CSS",wallet_json:"JSON",wallet_clear:"Tümünü sil",wallet_copy_hex:"HEX Kopyala",wallet_svg:"SVG",wallet_saved:"Kaydedildi!",wallet_removed:"Silindi",wallet_empty_title:"Cüzdan boş",ct_tag:"Renk Araçları",ct_title_em:"CSS Komutu",ct_title_post:"& Arama",ct_desc:"CSS renk değeri girerek tam ton spektrumunu keşfedin.",ct_tab_cmd:"⌨ CSS Komutu",ct_tab_search:"🔍 Arama",ct_enter:"↵ Gir",ct_search_btn:"Ara",ct_copy_all:"HEX Kopyala",ct_saturation:"Doygunluk / Parlaklık",ct_hue:"Ton",ct_alpha:"Saydamlık",ct_preview:"Önizleme",ct_shades:"Ton Spektrumu",ct_save_wallet:"Kaydet",outfit_nav_btn:"Kıyafet Uyumu",outfit_title_em:"Kıyafet",outfit_title_post:"Uyum Analizi",outfit_sub:"Kıyafet fotoğrafları yükle. AI renk uyumunu puanlar ve kazananı seçer.",outfit_drop:"Sürükle veya tıkla",outfit_outfit:"Kıyafet",outfit_add_slot:"Ekle",outfit_analyse_btn:"✦ Analiz Et",outfit_reset_btn:"Sıfırla",outfit_loading:"Analiz ediliyor…",outfit_winner_lbl:"En iyi uyum",outfit_score_lbl:"/ 100 Puan",outfit_dim_harmony:"Uyum",outfit_dim_contrast:"Kontrast",outfit_dim_sat:"Doygunluk",outfit_dim_tone:"Ton birliği",outfit_dim_rule:"Kural",outfit_stylist_note:"Stilist notları"},
  nl:{nav_tool:"Kleurenextractor",nav_how:"Hoe werkt het",badge:"K-Means ML · Realtime · Privé",h1a:"Extraheer",h1b:" Alle",h1c:"Kleuren",h1d:" & HEX",hero_sub:"Upload een afbeelding — ons ML-algoritme identificeert elke dominante kleur met HEX, RGB, HSL en dekking.",upload_title:"Zet je afbeelding hier",upload_hint:"Slepen of klikken",btn_remove:"✕ Verwijderen",btn_extract:"✦ Extraheer",btn_reanalyze:"↻ Opnieuw",loading:"Analyseren...",ctrl_colors:"Kleuren",ctrl_sort:"Sorteren",sort_pct:"Dekking",sort_hue:"Tint",sort_bright:"Helderheid",sort_sat:"Verzadiging",results_title:"Kleurenpalet",export_title:"Exporteren",exp_hex:"HEX kopiëren",exp_css:"CSS",exp_scss:"SCSS",exp_json:"JSON",exp_svg:"SVG",exp_view:"Code",how_tag:"Technologie",how_h:"Hoe werkt het",s1t:"Laden",s1d:"Afbeelding laadt in Canvas in de browser.",s2t:"Sampling",s2d:"Tot 50.000 pixels.",s3t:"K-Means++",s3d:"Vergelijkbare pixels gegroepeerd.",s4t:"Conversie",s4d:"Naar HEX, RGB, HSL met percentage.",foot_copy:"",foot_priv:"100% Privé",copied:"Gekopieerd!",download_done:"Downloaden...",stat_colors:"Kleuren",stat_pixels:"Pixels",stat_dominant:"Dominant",stat_coverage:"Dekking",hm_tag:"Harmonische Heatmap",hm_title_pre:"Ruimtelijke ",hm_title_em:"Harmonie",hm_title_post:" Analyse",hm_desc:"Clustergebaseerde heatmap van kleurharmonie.",hm_btn:"Genereer heatmap",hm_mode_harmony:"Harmoniescore",hm_mode_cluster:"Clusterafstand",hm_mode_sat:"Verzadigingskaart",hm_mode_tension:"Kleurspanning",hm_computing:"Berekening…",hm_harmonious:"Harmonieus",hm_moderate:"Matig",hm_discordant:"Dissonant",wallet_btn:"Mijn Wallet",wallet_title_em:"Kleur",wallet_title_post:"Wallet",wallet_empty:"Sla kleuren op door op 💛 te klikken.",wallet_css:"CSS",wallet_json:"JSON",wallet_clear:"Alles wissen",wallet_copy_hex:"HEX kopiëren",wallet_svg:"SVG",wallet_saved:"Opgeslagen!",wallet_removed:"Verwijderd",wallet_empty_title:"Wallet leeg",ct_tag:"Kleurtools",ct_title_em:"CSS-prompt",ct_title_post:"& Zoeken",ct_desc:"Voer een CSS-kleurwaarde in om het volledige spectrum te verkennen.",ct_tab_cmd:"⌨ CSS-prompt",ct_tab_search:"🔍 Zoeken",ct_enter:"↵ Enter",ct_search_btn:"Zoeken",ct_copy_all:"HEX kopiëren",ct_saturation:"Verzadiging / Helderheid",ct_hue:"Tint",ct_alpha:"Dekking",ct_preview:"Voorbeeld",ct_shades:"Kleurspectrum",ct_save_wallet:"Opslaan",outfit_nav_btn:"Outfit Harmonie",outfit_title_em:"Outfit",outfit_title_post:"Harmonie Analyse",outfit_sub:"Upload outfit foto's. AI beoordeelt kleurharmonie en kiest de winnaar.",outfit_drop:"Sleep of klik",outfit_outfit:"Outfit",outfit_add_slot:"Toevoegen",outfit_analyse_btn:"✦ Analyseer",outfit_reset_btn:"Reset",outfit_loading:"Analyseren…",outfit_winner_lbl:"Beste harmonie",outfit_score_lbl:"/ 100 Score",outfit_dim_harmony:"Harmonie",outfit_dim_contrast:"Contrast",outfit_dim_sat:"Verzadiging",outfit_dim_tone:"Ton eenheid",outfit_dim_rule:"Regel",outfit_stylist_note:"Stilist notities"},
  pl:{nav_tool:"Ekstraktor kolorów",nav_how:"Jak działa",badge:"K-Means ML · Czas rzeczywisty · Prywatne",h1a:"Wyodrębnij",h1b:" Wszystkie",h1c:"Kolory",h1d:" i HEX",hero_sub:"Prześlij obraz — nasz algorytm ML identyfikuje każdy dominujący kolor z HEX, RGB, HSL i procentem.",upload_title:"Upuść obraz tutaj",upload_hint:"Przeciągnij lub kliknij",btn_remove:"✕ Usuń",btn_extract:"✦ Wyodrębnij",btn_reanalyze:"↻ Ponów",loading:"Analizowanie...",ctrl_colors:"Kolory",ctrl_sort:"Sortuj",sort_pct:"Pokrycie",sort_hue:"Barwa",sort_bright:"Jasność",sort_sat:"Nasycenie",results_title:"Paleta kolorów",export_title:"Eksport",exp_hex:"Kopiuj HEX",exp_css:"CSS",exp_scss:"SCSS",exp_json:"JSON",exp_svg:"SVG",exp_view:"Kod",how_tag:"Technologia",how_h:"Jak działa",s1t:"Ładowanie",s1d:"Obraz ładuje się w Canvas przeglądarki.",s2t:"Próbkowanie",s2d:"Do 50 000 pikseli.",s3t:"K-Means++",s3d:"Podobne piksele grupowane w klastry.",s4t:"Konwersja",s4d:"Do HEX, RGB, HSL z procentem.",foot_copy:"",foot_priv:"100% Prywatne",copied:"Skopiowano!",download_done:"Pobieranie...",stat_colors:"Kolory",stat_pixels:"Piksele",stat_dominant:"Dominujący",stat_coverage:"Pokrycie",hm_tag:"Mapa cieplna harmonii",hm_title_pre:"Przestrzenna ",hm_title_em:"Harmonia",hm_title_post:" — Analiza",hm_desc:"Mapa cieplna klastrów pokazująca harmonię kolorów.",hm_btn:"Generuj mapę",hm_mode_harmony:"Wynik harmonii",hm_mode_cluster:"Odległość klastra",hm_mode_sat:"Mapa nasycenia",hm_mode_tension:"Napięcie kolorów",hm_computing:"Obliczanie…",hm_harmonious:"Harmonijny",hm_moderate:"Umiarkowany",hm_discordant:"Dysharmonijny",wallet_btn:"Mój Portfel",wallet_title_em:"Kolor",wallet_title_post:"Portfel",wallet_empty:"Zapisuj kolory klikając 💛 na kartę.",wallet_css:"CSS",wallet_json:"JSON",wallet_clear:"Wyczyść wszystko",wallet_copy_hex:"Kopiuj HEX",wallet_svg:"SVG",wallet_saved:"Zapisano!",wallet_removed:"Usunięto",wallet_empty_title:"Portfel pusty",ct_tag:"Narzędzia",ct_title_em:"Prompt CSS",ct_title_post:"& Szukaj",ct_desc:"Wpisz wartość CSS, aby zbadać pełne spektrum tonów.",ct_tab_cmd:"⌨ Prompt CSS",ct_tab_search:"🔍 Szukaj",ct_enter:"↵ Enter",ct_search_btn:"Szukaj",ct_copy_all:"Kopiuj HEX",ct_saturation:"Nasycenie / Jasność",ct_hue:"Barwa",ct_alpha:"Przezroczystość",ct_preview:"Podgląd",ct_shades:"Spektrum",ct_save_wallet:"Zapisz",outfit_nav_btn:"Harmonia Stroju",outfit_title_em:"Strój",outfit_title_post:"Analiza Harmonii",outfit_sub:"Prześlij zdjęcia strojów. AI oceni harmonię kolorów i wybierze zwycięzcę.",outfit_drop:"Przeciągnij lub kliknij",outfit_outfit:"Strój",outfit_add_slot:"Dodaj",outfit_analyse_btn:"✦ Analizuj",outfit_reset_btn:"Resetuj",outfit_loading:"Analiza…",outfit_winner_lbl:"Najlepsza harmonia",outfit_score_lbl:"/ 100 Punktów",outfit_dim_harmony:"Harmonia",outfit_dim_contrast:"Kontrast",outfit_dim_sat:"Nasycenie",outfit_dim_tone:"Jedność tonów",outfit_dim_rule:"Reguła",outfit_stylist_note:"Notatki stylisty"},
  sv:{nav_tool:"Färgextraktor",nav_how:"Hur det fungerar",badge:"K-Means ML · Realtid · Privat",h1a:"Extrahera",h1b:" Alla",h1c:"Färger",h1d:" & HEX",hero_sub:"Ladda upp en bild — vår ML-algoritm identifierar varje dominerande färg med HEX, RGB, HSL och täckning.",upload_title:"Släpp bilden här",upload_hint:"Dra & släpp eller klicka",btn_remove:"✕ Ta bort",btn_extract:"✦ Extrahera",btn_reanalyze:"↻ Analysera om",loading:"Analyserar...",ctrl_colors:"Färger",ctrl_sort:"Sortera",sort_pct:"Täckning",sort_hue:"Nyans",sort_bright:"Ljusstyrka",sort_sat:"Mättnad",results_title:"Färgpalett",export_title:"Exportera",exp_hex:"Kopiera HEX",exp_css:"CSS",exp_scss:"SCSS",exp_json:"JSON",exp_svg:"SVG",exp_view:"Kod",how_tag:"Tekniken",how_h:"Hur det fungerar",s1t:"Laddning",s1d:"Bilden laddas i Canvas i webbläsaren.",s2t:"Pixelsampel",s2d:"Upp till 50 000 pixlar.",s3t:"K-Means++",s3d:"Liknande pixlar grupperas i kluster.",s4t:"Konvertering",s4d:"Till HEX, RGB, HSL med procent.",foot_copy:"",foot_priv:"100% Privat",copied:"Kopierat!",download_done:"Laddar...",stat_colors:"Färger",stat_pixels:"Pixlar",stat_dominant:"Dominerande",stat_coverage:"Täckning",hm_tag:"Harmonisk värmekarta",hm_title_pre:"Rumslig ",hm_title_em:"Harmoni",hm_title_post:" Analys",hm_desc:"Klusterbaserad värmekarta över färgharmoni.",hm_btn:"Generera värmekarta",hm_mode_harmony:"Harmonipoäng",hm_mode_cluster:"Klusteravstånd",hm_mode_sat:"Mättnadskarta",hm_mode_tension:"Färgspänning",hm_computing:"Beräknar…",hm_harmonious:"Harmonisk",hm_moderate:"Måttlig",hm_discordant:"Dissonant",wallet_btn:"Min Plånbok",wallet_title_em:"Färg",wallet_title_post:"Plånbok",wallet_empty:"Spara färger genom att klicka 💛.",wallet_css:"CSS",wallet_json:"JSON",wallet_clear:"Rensa allt",wallet_copy_hex:"Kopiera HEX",wallet_svg:"SVG",wallet_saved:"Sparad!",wallet_removed:"Borttagen",wallet_empty_title:"Plånboken är tom",ct_tag:"Färgverktyg",ct_title_em:"CSS-prompt",ct_title_post:"& Sök",ct_desc:"Ange ett CSS-färgvärde för att utforska hela tonspektrumet.",ct_tab_cmd:"⌨ CSS-prompt",ct_tab_search:"🔍 Sök",ct_enter:"↵ Enter",ct_search_btn:"Sök",ct_copy_all:"Kopiera HEX",ct_saturation:"Mättnad / Ljusstyrka",ct_hue:"Nyans",ct_alpha:"Genomskinlighet",ct_preview:"Förhandsvisning",ct_shades:"Tonspektrum",ct_save_wallet:"Spara",outfit_nav_btn:"Outfit Harmoni",outfit_title_em:"Outfit",outfit_title_post:"Harmonianalys",outfit_sub:"Ladda upp outfit-bilder. AI bedömer färgharmoni och väljer vinnaren.",outfit_drop:"Dra eller klicka",outfit_outfit:"Outfit",outfit_add_slot:"Lägg till",outfit_analyse_btn:"✦ Analysera",outfit_reset_btn:"Återställ",outfit_loading:"Analyserar…",outfit_winner_lbl:"Bästa harmoni",outfit_score_lbl:"/ 100 Poäng",outfit_dim_harmony:"Harmoni",outfit_dim_contrast:"Kontrast",outfit_dim_sat:"Mättnad",outfit_dim_tone:"Ton-enhet",outfit_dim_rule:"Regel",outfit_stylist_note:"Stylistkommentarer"},
  zh:{nav_tool:"颜色提取器",nav_how:"工作原理",badge:"K-Means ML · 实时 · 100%隐私",h1a:"提取",h1b:"所有",h1c:"颜色",h1d:"和 HEX",hero_sub:"上传任何图片，ML算法识别每种主色调，生成HEX、RGB、HSL和覆盖百分比。",upload_title:"将图片拖放至此",upload_hint:"拖放或点击浏览",btn_remove:"✕ 删除",btn_extract:"✦ 提取颜色",btn_reanalyze:"↻ 重新分析",loading:"分析中...",ctrl_colors:"颜色数",ctrl_sort:"排序",sort_pct:"覆盖率",sort_hue:"色调",sort_bright:"亮度",sort_sat:"饱和度",results_title:"调色板",export_title:"导出",exp_hex:"复制HEX",exp_css:"CSS",exp_scss:"SCSS",exp_json:"JSON",exp_svg:"SVG",exp_view:"代码",how_tag:"技术",how_h:"工作原理",s1t:"加载",s1d:"图片在浏览器Canvas中处理。",s2t:"采样",s2d:"最多50,000像素。",s3t:"K-Means++",s3d:"将相似像素分组。",s4t:"转换",s4d:"转换为HEX、RGB、HSL。",foot_copy:"",foot_priv:"100%隐私",copied:"已复制！",download_done:"下载中...",stat_colors:"颜色",stat_pixels:"像素",stat_dominant:"主色",stat_coverage:"覆盖率",hm_tag:"色彩和谐热图",hm_title_pre:"空间 ",hm_title_em:"和谐",hm_title_post:"分析",hm_desc:"基于聚类的热图，显示图像中颜色的空间和谐性。",hm_btn:"生成热图",hm_mode_harmony:"和谐分数",hm_mode_cluster:"聚类距离",hm_mode_sat:"饱和度图",hm_mode_tension:"颜色张力",hm_computing:"计算中…",hm_harmonious:"和谐",hm_moderate:"适中",hm_discordant:"不和谐",wallet_btn:"我的钱包",wallet_title_em:"颜色",wallet_title_post:"钱包",wallet_empty:"点击颜色卡上的 💛 保存颜色。",wallet_css:"CSS",wallet_json:"JSON",wallet_clear:"清空全部",wallet_copy_hex:"复制HEX",wallet_svg:"SVG",wallet_saved:"已保存！",wallet_removed:"已删除",wallet_empty_title:"钱包为空",ct_tag:"颜色工具",ct_title_em:"CSS提示符",ct_title_post:"& 颜色搜索",ct_desc:"输入任何CSS颜色值探索完整色调范围，带交互式拾色器。",ct_tab_cmd:"⌨ CSS提示符",ct_tab_search:"🔍 搜索",ct_enter:"↵ 确认",ct_search_btn:"搜索",ct_copy_all:"复制全部HEX",ct_saturation:"饱和度/亮度",ct_hue:"色相",ct_alpha:"透明度",ct_preview:"预览",ct_shades:"色调范围",ct_save_wallet:"加入钱包",outfit_nav_btn:"搭配和谐",outfit_title_em:"服装",outfit_title_post:"颜色和谐分析",outfit_sub:"上传服装照片，AI评分颜色和谐度并选出最佳搭配。",outfit_drop:"拖放或点击",outfit_outfit:"搭配",outfit_add_slot:"添加",outfit_analyse_btn:"✦ 分析和谐",outfit_reset_btn:"重置",outfit_loading:"分析中…",outfit_winner_lbl:"最佳颜色和谐",outfit_score_lbl:"/ 100 分",outfit_dim_harmony:"和谐",outfit_dim_contrast:"对比",outfit_dim_sat:"饱和",outfit_dim_tone:"色调统一",outfit_dim_rule:"规则",outfit_stylist_note:"造型师提示"},
  ja:{nav_tool:"カラー抽出",nav_how:"仕組み",badge:"K-Means ML · リアルタイム · プライベート",h1a:"抽出",h1b:"すべての",h1c:"カラー",h1d:"と HEX",hero_sub:"画像をアップロードするとMLアルゴリズムがHEX、RGB、HSL、カバー率で全主色を識別します。",upload_title:"画像をドロップ",upload_hint:"ドラッグ＆ドロップまたはクリック",btn_remove:"✕ 削除",btn_extract:"✦ 抽出",btn_reanalyze:"↻ 再分析",loading:"分析中...",ctrl_colors:"色数",ctrl_sort:"並び替え",sort_pct:"カバー率",sort_hue:"色相",sort_bright:"明度",sort_sat:"彩度",results_title:"カラーパレット",export_title:"エクスポート",exp_hex:"HEXコピー",exp_css:"CSS",exp_scss:"SCSS",exp_json:"JSON",exp_svg:"SVG",exp_view:"コード",how_tag:"テクノロジー",how_h:"仕組み",s1t:"読み込み",s1d:"ブラウザのCanvasで処理。",s2t:"サンプリング",s2d:"最大50,000ピクセル。",s3t:"K-Means++",s3d:"類似ピクセルをクラスター化。",s4t:"変換",s4d:"HEX、RGB、HSLに変換。",foot_copy:"",foot_priv:"100%プライベート",copied:"コピー！",download_done:"ダウンロード...",stat_colors:"色",stat_pixels:"ピクセル",stat_dominant:"主色",stat_coverage:"カバー率",hm_tag:"カラーハーモニー ヒートマップ",hm_title_pre:"空間的な ",hm_title_em:"調和",hm_title_post:"分析",hm_desc:"クラスターベースのヒートマップで色の空間的な調和を表示。",hm_btn:"ヒートマップ生成",hm_mode_harmony:"調和スコア",hm_mode_cluster:"クラスター距離",hm_mode_sat:"彩度マップ",hm_mode_tension:"色の緊張",hm_computing:"計算中…",hm_harmonious:"調和的",hm_moderate:"普通",hm_discordant:"不調和",wallet_btn:"マイウォレット",wallet_title_em:"カラー",wallet_title_post:"ウォレット",wallet_empty:"💛 をクリックして色を保存。",wallet_css:"CSS",wallet_json:"JSON",wallet_clear:"全て削除",wallet_copy_hex:"HEXコピー",wallet_svg:"SVG",wallet_saved:"保存！",wallet_removed:"削除済み",wallet_empty_title:"ウォレットは空",ct_tag:"カラーツール",ct_title_em:"CSSプロンプト",ct_title_post:"& カラー検索",ct_desc:"CSSカラー値を入力してフルシェードスペクトラムを探索。",ct_tab_cmd:"⌨ CSSプロンプト",ct_tab_search:"🔍 カラー検索",ct_enter:"↵ Enter",ct_search_btn:"検索",ct_copy_all:"HEX全コピー",ct_saturation:"彩度/明度",ct_hue:"色相",ct_alpha:"不透明度",ct_preview:"プレビュー",ct_shades:"シェードスペクトラム",ct_save_wallet:"ウォレットへ",outfit_nav_btn:"コーデ診断",outfit_title_em:"コーデ",outfit_title_post:"カラー診断",outfit_sub:"コーデ写真をアップロード。AIが色の調和を採点し、最優秀を選びます。",outfit_drop:"ドロップかクリック",outfit_outfit:"コーデ",outfit_add_slot:"追加",outfit_analyse_btn:"✦ 診断する",outfit_reset_btn:"リセット",outfit_loading:"診断中…",outfit_winner_lbl:"最高の色調和",outfit_score_lbl:"/ 100 点",outfit_dim_harmony:"調和",outfit_dim_contrast:"コントラスト",outfit_dim_sat:"彩度",outfit_dim_tone:"色調統一",outfit_dim_rule:"ルール",outfit_stylist_note:"スタイリストメモ"},
  ko:{nav_tool:"색상 추출기",nav_how:"작동 방식",badge:"K-Means ML · 실시간 · 프라이버시",h1a:"추출",h1b:"모든",h1c:"색상",h1d:"과 HEX",hero_sub:"이미지 업로드 — ML 알고리즘이 HEX, RGB, HSL, 커버리지로 모든 주요 색상을 식별합니다.",upload_title:"이미지를 여기에 놓으세요",upload_hint:"드래그 앤 드롭 또는 클릭",btn_remove:"✕ 제거",btn_extract:"✦ 색상 추출",btn_reanalyze:"↻ 재분석",loading:"분석 중...",ctrl_colors:"색상 수",ctrl_sort:"정렬",sort_pct:"커버리지",sort_hue:"색조",sort_bright:"밝기",sort_sat:"채도",results_title:"색상 팔레트",export_title:"내보내기",exp_hex:"HEX 복사",exp_css:"CSS",exp_scss:"SCSS",exp_json:"JSON",exp_svg:"SVG",exp_view:"코드",how_tag:"기술",how_h:"작동 방식",s1t:"로딩",s1d:"브라우저 Canvas에서 처리됩니다.",s2t:"픽셀 샘플링",s2d:"최대 50,000픽셀.",s3t:"K-Means++",s3d:"유사한 픽셀을 클러스터화합니다.",s4t:"색상 변환",s4d:"HEX, RGB, HSL로 변환.",foot_copy:"",foot_priv:"100% 프라이버시",copied:"복사됨!",download_done:"다운로드...",stat_colors:"색상",stat_pixels:"픽셀",stat_dominant:"주요 색상",stat_coverage:"커버리지",hm_tag:"색상 조화 히트맵",hm_title_pre:"공간적 ",hm_title_em:"조화",hm_title_post:"분석",hm_desc:"클러스터 기반 히트맵으로 이미지의 색상 공간 조화를 표시.",hm_btn:"히트맵 생성",hm_mode_harmony:"조화 점수",hm_mode_cluster:"클러스터 거리",hm_mode_sat:"채도 맵",hm_mode_tension:"색상 긴장",hm_computing:"계산 중…",hm_harmonious:"조화로움",hm_moderate:"보통",hm_discordant:"불협화음",wallet_btn:"내 지갑",wallet_title_em:"컬러",wallet_title_post:"지갑",wallet_empty:"💛 를 클릭하여 색상 저장.",wallet_css:"CSS",wallet_json:"JSON",wallet_clear:"모두 지우기",wallet_copy_hex:"HEX 복사",wallet_svg:"SVG",wallet_saved:"저장됨!",wallet_removed:"삭제됨",wallet_empty_title:"지갑이 비어있습니다",ct_tag:"색상 도구",ct_title_em:"CSS 프롬프트",ct_title_post:"& 색상 검색",ct_desc:"CSS 색상 값을 입력하여 전체 색조 스펙트럼을 탐색하세요.",ct_tab_cmd:"⌨ CSS 프롬프트",ct_tab_search:"🔍 색상 검색",ct_enter:"↵ Enter",ct_search_btn:"검색",ct_copy_all:"HEX 전체 복사",ct_saturation:"채도/명도",ct_hue:"색상",ct_alpha:"불투명도",ct_preview:"미리보기",ct_shades:"색조 스펙트럼",ct_save_wallet:"지갑에 저장",outfit_nav_btn:"코디 분석",outfit_title_em:"코디",outfit_title_post:"컬러 조화 분석",outfit_sub:"코디 사진을 업로드하세요. AI가 색상 조화를 채점하고 최고를 선택합니다.",outfit_drop:"드롭 또는 클릭",outfit_outfit:"코디",outfit_add_slot:"추가",outfit_analyse_btn:"✦ 분석하기",outfit_reset_btn:"초기화",outfit_loading:"분석 중…",outfit_winner_lbl:"최고 색상 조화",outfit_score_lbl:"/ 100 점",outfit_dim_harmony:"조화",outfit_dim_contrast:"대비",outfit_dim_sat:"채도",outfit_dim_tone:"톤 통일",outfit_dim_rule:"법칙",outfit_stylist_note:"스타일리스트 메모"},
  hi:{nav_tool:"रंग एक्सट्रेक्टर",nav_how:"कैसे काम करता है",badge:"K-Means ML · रियल-टाइम · प्राइवेट",h1a:"निकालें",h1b:"सभी",h1c:"रंग",h1d:"और HEX",hero_sub:"कोई भी छवि अपलोड करें — ML एल्गोरिदम HEX, RGB, HSL और कवरेज के साथ हर प्रमुख रंग पहचानता है।",upload_title:"यहाँ छवि छोड़ें",upload_hint:"खींचें और छोड़ें या क्लिक करें",btn_remove:"✕ हटाएं",btn_extract:"✦ रंग निकालें",btn_reanalyze:"↻ पुनः विश्लेषण",loading:"विश्लेषण हो रहा है...",ctrl_colors:"रंग",ctrl_sort:"क्रमबद्ध",sort_pct:"कवरेज",sort_hue:"रंग",sort_bright:"चमक",sort_sat:"संतृप्ति",results_title:"रंग पट्टिका",export_title:"निर्यात",exp_hex:"HEX कॉपी",exp_css:"CSS",exp_scss:"SCSS",exp_json:"JSON",exp_svg:"SVG",exp_view:"कोड",how_tag:"तकनीक",how_h:"कैसे काम करता है",s1t:"लोडिंग",s1d:"छवि ब्राउज़र में Canvas पर लोड होती है।",s2t:"सैंपलिंग",s2d:"50,000 तक पिक्सेल।",s3t:"K-Means++",s3d:"समान पिक्सेल क्लस्टर में समूहित।",s4t:"रूपांतरण",s4d:"HEX, RGB, HSL में बदला जाता है।",foot_copy:"",foot_priv:"100% प्राइवेट",copied:"कॉपी!",download_done:"डाउनलोड...",stat_colors:"रंग",stat_pixels:"पिक्सेल",stat_dominant:"प्रमुख",stat_coverage:"कवरेज",hm_tag:"रंग सामंजस्य हीटमैप",hm_title_pre:"स्थानिक ",hm_title_em:"सामंजस्य",hm_title_post:" विश्लेषण",hm_desc:"क्लस्टर-आधारित हीटमैप जो छवि के रंगों की स्थानिक सामंजस्यता दिखाता है।",hm_btn:"हीटमैप बनाएं",hm_mode_harmony:"सामंजस्य स्कोर",hm_mode_cluster:"क्लस्टर दूरी",hm_mode_sat:"संतृप्ति मानचित्र",hm_mode_tension:"रंग तनाव",hm_computing:"गणना हो रही है…",hm_harmonious:"सामंजस्यपूर्ण",hm_moderate:"मध्यम",hm_discordant:"असंगत",wallet_btn:"मेरा वॉलेट",wallet_title_em:"रंग",wallet_title_post:"वॉलेट",wallet_empty:"💛 पर क्लिक करके रंग सेव करें।",wallet_css:"CSS",wallet_json:"JSON",wallet_clear:"सब मिटाएं",wallet_copy_hex:"HEX कॉपी",wallet_svg:"SVG",wallet_saved:"सेव!",wallet_removed:"हटाया",wallet_empty_title:"वॉलेट खाली है",ct_tag:"रंग उपकरण",ct_title_em:"CSS प्रॉम्प्ट",ct_title_post:"& रंग खोज",ct_desc:"किसी भी CSS रंग मान को टाइप करें और पूरे रंग स्पेक्ट्रम को देखें।",ct_tab_cmd:"⌨ CSS प्रॉम्प्ट",ct_tab_search:"🔍 रंग खोजें",ct_enter:"↵ Enter",ct_search_btn:"खोजें",ct_copy_all:"HEX कॉपी",ct_saturation:"संतृप्ति/चमक",ct_hue:"रंग",ct_alpha:"पारदर्शिता",ct_preview:"पूर्वावलोकन",ct_shades:"शेड स्पेक्ट्रम",ct_save_wallet:"वॉलेट में जोड़ें",outfit_nav_btn:"आउटफिट हार्मनी",outfit_title_em:"आउटफिट",outfit_title_post:"रंग विश्लेषण",outfit_sub:"आउटफिट की फ़ोटो अपलोड करें। AI रंग सामंजस्य स्कोर करेगा और विजेता चुनेगा।",outfit_drop:"ड्रॉप या क्लिक",outfit_outfit:"आउटफिट",outfit_add_slot:"जोड़ें",outfit_analyse_btn:"✦ विश्लेषण",outfit_reset_btn:"रीसेट",outfit_loading:"विश्लेषण हो रहा है…",outfit_winner_lbl:"सर्वश्रेष्ठ सामंजस्य",outfit_score_lbl:"/ 100 स्कोर",outfit_dim_harmony:"सामंजस्य",outfit_dim_contrast:"कंट्रास्ट",outfit_dim_sat:"संतृप्ति",outfit_dim_tone:"टोन एकता",outfit_dim_rule:"नियम",outfit_stylist_note:"स्टाइलिस्ट नोट्स"},
};

let lang='en';
function tr(k){ return (T[lang]&&T[lang][k])||T.en[k]||k; }
function setLang(l){
  lang=l;
  const isAr=l==='ar';
  document.documentElement.lang=l;
  document.documentElement.dir=isAr?'rtl':'ltr';
  document.body.className=l;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.dataset.i18n;
    const v=(T[l]&&T[l][k])||T.en[k];
    if(v) el.textContent=v;
  });
  // Heatmap title has <em> inside — handle specially
  const hmTitleEl = document.querySelector('.heatmap-title');
  if(hmTitleEl){
    const pre  = (T[l]&&T[l]['hm_title_pre'])  || T.en['hm_title_pre']  || 'Spatial ';
    const em   = (T[l]&&T[l]['hm_title_em'])   || T.en['hm_title_em']   || 'Harmony';
    const post = (T[l]&&T[l]['hm_title_post']) || T.en['hm_title_post'] || ' Analysis';
    hmTitleEl.innerHTML = `${pre}<em>${em}</em>${post}`;
  }
  document.getElementById('langSel').value=l;
  const ss=document.getElementById('sortSel');
  if(ss){['sort_pct','sort_hue','sort_bright','sort_sat'].forEach((k,i)=>ss.options[i].textContent=tr(k));}
  if(lastColors.length) rerenderGrid();
  // Re-translate heatmap score row & mode descriptions (dynamically built)
  updateHeatmapLangUI();
}

function updateHeatmapLangUI(){
  // translate static heatmap labels that are built dynamically in renderHeatmapScores
  // The score row is rebuilt on each runHeatmap(), so just update the legend labels
  const low = document.getElementById('hmLabelLow');
  const mid = document.getElementById('hmLabelMid');
  const high= document.getElementById('hmLabelHigh');
  if(low)  low.textContent  = tr('hm_harmonious');
  if(mid)  mid.textContent  = tr('hm_moderate');
  if(high) high.textContent = tr('hm_discordant');
}

// ══════════════════════════════════════════════════════
// COLOR HARMONY ML ENGINE
// ══════════════════════════════════════════════════════

let activeRule = 'complementary';
let lastHarmonyColors = [];

function selectRule(btn){
  document.querySelectorAll('.h-tab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  activeRule = btn.dataset.rule;
}

/* ── Color math helpers ── */
function hslToRgb(h,s,l){
  s/=100; l/=100;
  const k=n=>(n+h/30)%12;
  const a=s*Math.min(l,1-l);
  const f=n=>l-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1)));
  return{r:Math.round(f(0)*255),g:Math.round(f(8)*255),b:Math.round(f(4)*255)};
}

function clampH(h){ return((h%360)+360)%360; }

/* Weighted dominant hue: pick the cluster with highest pct & decent saturation */
function getDominantHSL(colors){
  const candidates = colors
    .filter(c=>c.hsl.s > 8)                // skip near-grays
    .sort((a,b)=>b.pct - a.pct);
  return candidates.length ? candidates[0].hsl : colors[0].hsl;
}

/* Build varied lightness/saturation versions for richer output */
function buildVariants(h, s, l, count){
  const variants=[];
  for(let i=0;i<count;i++){
    const lv = Math.round(Math.max(20, Math.min(82, l + (i-Math.floor(count/2))*12)));
    const sv = Math.round(Math.max(15, Math.min(100, s + (i%2===0?0:-8))));
    const rgb = hslToRgb(h, sv, lv);
    variants.push({
      h, s:sv, l:lv,
      r:rgb.r, g:rgb.g, b:rgb.b,
      hex:toHex(rgb.r,rgb.g,rgb.b),
      hsl:{h,s:sv,l:lv},
      name:nameColor(rgb.r,rgb.g,rgb.b),
      angle: 0
    });
  }
  return variants;
}

/* ── Harmony rules (pure color theory) ── */
function computeHarmony(baseHSL, rule){
  const {h,s,l} = baseHSL;
  let swatches = [];

  if(rule === 'complementary'){
    const angles = [0, 180];
    angles.forEach(a=>{
      const hh = clampH(h+a);
      buildVariants(hh,s,l,3).forEach((c,i)=>{c.angle=a;swatches.push(c);});
    });
  }
  else if(rule === 'analogous'){
    [-60,-30,0,30,60].forEach(a=>{
      const hh = clampH(h+a);
      const rgb = hslToRgb(hh,s,l);
      swatches.push({h:hh,s,l,r:rgb.r,g:rgb.g,b:rgb.b,hex:toHex(rgb.r,rgb.g,rgb.b),hsl:{h:hh,s,l},name:nameColor(rgb.r,rgb.g,rgb.b),angle:a});
    });
    // add light/dark variants of base
    buildVariants(h,s,l,4).forEach(c=>{c.angle=0;swatches.push(c);});
  }
  else if(rule === 'triadic'){
    [0,120,240].forEach(a=>{
      const hh = clampH(h+a);
      buildVariants(hh,s,l,3).forEach(c=>{c.angle=a;swatches.push(c);});
    });
  }
  else if(rule === 'split'){
    [0,150,210].forEach(a=>{
      const hh=clampH(h+a);
      buildVariants(hh,s,l,3).forEach(c=>{c.angle=a;swatches.push(c);});
    });
  }
  else if(rule === 'tetradic'){
    [0,60,180,240].forEach(a=>{
      const hh=clampH(h+a);
      buildVariants(hh,s,l,2).forEach(c=>{c.angle=a;swatches.push(c);});
    });
  }
  else if(rule === 'square'){
    [0,90,180,270].forEach(a=>{
      const hh=clampH(h+a);
      buildVariants(hh,s,l,2).forEach(c=>{c.angle=a;swatches.push(c);});
    });
  }
  else if(rule === 'monochromatic'){
    const lSteps=[15,25,38,52,65,75,85];
    const sSteps=[100,80,65,50,35,20,10];
    lSteps.forEach((lv,i)=>{
      const sv=sSteps[i];
      const rgb=hslToRgb(h,sv,lv);
      swatches.push({h,s:sv,l:lv,r:rgb.r,g:rgb.g,b:rgb.b,hex:toHex(rgb.r,rgb.g,rgb.b),hsl:{h,s:sv,l:lv},name:nameColor(rgb.r,rgb.g,rgb.b),angle:0});
    });
  }

  // deduplicate by HEX
  const seen=new Set();
  return swatches.filter(c=>{ if(seen.has(c.hex)) return false; seen.add(c.hex); return true; });
}

/* ── Draw color wheel ── */
function drawHarmonyWheel(baseHSL, rule){
  const cvs = document.getElementById('harmonyWheel');
  if(!cvs) return;
  const ctx = cvs.getContext('2d');
  const cx=80, cy=80, r=72, ri=28;

  ctx.clearRect(0,0,160,160);

  // Draw hue wheel
  for(let deg=0;deg<360;deg++){
    const startAngle=(deg-90)*Math.PI/180;
    const endAngle=(deg-89)*Math.PI/180;
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.arc(cx,cy,r,startAngle,endAngle);
    ctx.closePath();
    ctx.fillStyle=`hsl(${deg},70%,55%)`;
    ctx.fill();
  }
  // Inner circle mask
  ctx.beginPath();
  ctx.arc(cx,cy,ri,0,Math.PI*2);
  ctx.fillStyle=isDark?'#141416':'#ffffff';
  ctx.fill();

  // Mark angles
  const {h} = baseHSL;
  const ruleAngles={
    complementary:[0,180],
    analogous:[-60,-30,0,30,60],
    triadic:[0,120,240],
    split:[0,150,210],
    tetradic:[0,60,180,240],
    square:[0,90,180,270],
    monochromatic:[0],
  };
  const angles = ruleAngles[rule]||[0];
  angles.forEach((a,i)=>{
    const totalDeg = clampH(h+a);
    const rad = (totalDeg-90)*Math.PI/180;
    const mx = cx + (ri+10)*Math.cos(rad);
    const my = cy + (ri+10)*Math.sin(rad);
    const ox = cx + (r-8)*Math.cos(rad);
    const oy = cy + (r-8)*Math.sin(rad);
    ctx.beginPath();
    ctx.moveTo(mx,my); ctx.lineTo(ox,oy);
    ctx.strokeStyle = i===0?'#ffffff':'rgba(255,255,255,0.7)';
    ctx.lineWidth = i===0?2:1.5;
    ctx.stroke();
    // dot
    ctx.beginPath();
    ctx.arc(ox,oy,4,0,Math.PI*2);
    ctx.fillStyle = i===0?'#ffffff':'rgba(255,255,255,0.8)';
    ctx.fill();
  });
}

/* ── Main harmony runner ── */
async function runHarmony(){
  if(!lastColors.length){
    showToast('⚠ Extract colors first!'); return;
  }
  const btn = document.getElementById('harmonyBtn');
  btn.disabled=true;
  document.getElementById('harmonyLoading').style.display='flex';
  document.getElementById('harmonyResults').style.display='none';

  await new Promise(r=>setTimeout(r,600));

  const baseHSL = getDominantHSL(lastColors);
  const harmonized = computeHarmony(baseHSL, activeRule);
  lastHarmonyColors = harmonized;

  document.getElementById('harmonyLoading').style.display='none';
  renderHarmony(harmonized, baseHSL);
  btn.disabled=false;
}

function renderHarmony(colors, baseHSL){
  const res = document.getElementById('harmonyResults');
  res.style.display='block';

  // Draw wheel
  drawHarmonyWheel(baseHSL, activeRule);

  // Explainer
  const ruleToExpKey={complementary:'exp_comp',analogous:'exp_anal',triadic:'exp_tri','split-complementary':'exp_split',split:'exp_split',tetradic:'exp_tetra',square:'exp_sq',monochromatic:'exp_mono'};
  const expKey=ruleToExpKey[activeRule]||'exp_comp';
  document.getElementById('harmonyExplainer').innerHTML = tr(expKey)||'';

  // Rule label
  const ruleKey = 'rule_'+({complementary:'comp',analogous:'anal',triadic:'tri',split:'split',tetradic:'tetra',square:'sq',monochromatic:'mono'}[activeRule]);
  document.getElementById('harmonyRuleLabel').textContent = tr(ruleKey)||activeRule;

  // Grid
  const grid = document.getElementById('harmonyGrid');
  grid.innerHTML = colors.map(c=>{
    const contrast = getContrast(c.r,c.g,c.b);
    const angleLabel = activeRule!=='monochromatic' && c.angle!==0 ? `+${c.angle}°` : '';
    return`<div class="h-swatch-card" onclick="copyHex('${c.hex}')">
      <div class="h-swatch-top" style="background:${c.hex}">
        ${angleLabel?`<div class="h-swatch-angle">${angleLabel}</div>`:''}
      </div>
      <div class="h-swatch-body">
        <div class="h-swatch-hex"><span>${c.hex}</span><span class="h-copy-icon">⧉</span></div>
        <div class="h-swatch-name">${c.name}</div>
        <div class="h-swatch-hsl">hsl(${c.h}°,${c.s}%,${c.l}%)</div>
      </div>
    </div>`;
  }).join('');

  // re-attach cursor hover
  grid.querySelectorAll('.h-swatch-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-hover'));
  });

  // scroll into view
  document.getElementById('harmony-section').scrollIntoView({behavior:'smooth',block:'nearest'});
}

function copyHarmonyHex(){
  navigator.clipboard.writeText(lastHarmonyColors.map(c=>c.hex).join('\n')).catch(()=>{});
  showToast(tr('copied')+` (${lastHarmonyColors.length})`);
}
function copyHarmonyCSS(){
  const txt=`:root {\n`+lastHarmonyColors.map((c,i)=>`  --harmony-${i+1}: ${c.hex}; /* ${c.name} */`).join('\n')+'\n}';
  navigator.clipboard.writeText(txt).catch(()=>{});
  showToast('CSS '+tr('copied'));
}
function copyHarmonyJSON(){
  navigator.clipboard.writeText(JSON.stringify(lastHarmonyColors.map((c,i)=>({index:i+1,hex:c.hex,rgb:{r:c.r,g:c.g,b:c.b},hsl:{h:c.h,s:c.s,l:c.l},name:c.name})),null,2)).catch(()=>{});
  showToast('JSON '+tr('copied'));
}

// ══════════════════════════════════════════════════════
// K-MEANS++ ENGINE
// ══════════════════════════════════════════════════════
function dist3(a,b){return(a[0]-b[0])**2+(a[1]-b[1])**2+(a[2]-b[2])**2;}

function kMeanspp(pixels,k,iter=30){
  if(!pixels.length||k<1) return [];
  k=Math.min(k,pixels.length);
  const centroids=[pixels[Math.floor(Math.random()*pixels.length)].slice()];
  while(centroids.length<k){
    const dists=pixels.map(p=>Math.min(...centroids.map(c=>dist3(p,c))));
    const sum=dists.reduce((a,b)=>a+b,0);
    let r=Math.random()*sum,acc=0;
    for(let i=0;i<dists.length;i++){acc+=dists[i];if(acc>=r){centroids.push(pixels[i].slice());break;}}
  }
  const assignments=new Int32Array(pixels.length);
  for(let it=0;it<iter;it++){
    let changed=false;
    for(let i=0;i<pixels.length;i++){
      let best=0,bd=Infinity;
      for(let c=0;c<k;c++){const d=dist3(pixels[i],centroids[c]);if(d<bd){bd=d;best=c;}}
      if(assignments[i]!==best){assignments[i]=best;changed=true;}
    }
    if(!changed) break;
    const sums=Array.from({length:k},()=>[0,0,0,0]);
    for(let i=0;i<pixels.length;i++){const c=assignments[i];sums[c][0]+=pixels[i][0];sums[c][1]+=pixels[i][1];sums[c][2]+=pixels[i][2];sums[c][3]++;}
    for(let c=0;c<k;c++){if(sums[c][3]>0){centroids[c][0]=sums[c][0]/sums[c][3];centroids[c][1]=sums[c][1]/sums[c][3];centroids[c][2]=sums[c][2]/sums[c][3];}}
  }
  const counts=new Array(k).fill(0);
  for(let i=0;i<pixels.length;i++) counts[assignments[i]]++;
  return centroids.map((c,i)=>({r:Math.round(c[0]),g:Math.round(c[1]),b:Math.round(c[2]),count:counts[i]})).filter(c=>c.count>0);
}

function toHex(r,g,b){'use strict';return'#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('').toUpperCase();}
function toHSL(r,g,b){r/=255;g/=255;b/=255;const max=Math.max(r,g,b),min=Math.min(r,g,b);let h,s,l=(max+min)/2;if(max===min){h=s=0;}else{const d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);switch(max){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;default:h=((r-g)/d+4)/6;}}return{h:Math.round(h*360),s:Math.round(s*100),l:Math.round(l*100)};}
function getBrightness(r,g,b){return 0.299*r+0.587*g+0.114*b;}
function getContrast(r,g,b){return getBrightness(r,g,b)>140?'#111111':'#ffffff';}
function nameColor(r,g,b){const hsl=toHSL(r,g,b);const h=hsl.h,s=hsl.s,l=hsl.l;if(s<8){if(l<10)return'Black';if(l<25)return'Very Dark Gray';if(l<45)return'Dark Gray';if(l<65)return'Gray';if(l<82)return'Light Gray';return'White';}const li=l<20?'Very Dark ':l<38?'Dark ':l<64?'':l<80?'Light ':'Very Light ';const sa=s<30?'Muted ':s<60?'':'Vivid ';const nm=[[0,'Red'],[15,'Red-Orange'],[30,'Orange'],[45,'Amber'],[55,'Yellow'],[75,'Lime'],[105,'Green'],[140,'Forest Green'],[165,'Teal Green'],[185,'Teal'],[200,'Cyan'],[215,'Sky Blue'],[240,'Blue'],[255,'Indigo'],[275,'Violet'],[295,'Purple'],[315,'Magenta'],[335,'Pink'],[350,'Rose'],[360,'Red']];let cn='Red';for(let i=0;i<nm.length-1;i++){if(h>=nm[i][0]&&h<nm[i+1][0]){cn=nm[i][1];break;}}return li+sa+cn;}

// ══════════════════════════════════════════════════════
// FILE HANDLING
// ══════════════════════════════════════════════════════
let currentImg=null, lastColors=[], currentK=12, analyzedPixels=0, currentFile=null;

function onDrag(e){e.preventDefault();document.getElementById('uploadZone').classList.add('drag');}
function offDrag(e){e.preventDefault();document.getElementById('uploadZone').classList.remove('drag');}
function onDrop(e){e.preventDefault();document.getElementById('uploadZone').classList.remove('drag');const f=e.dataTransfer.files[0];if(f&&(f.type.startsWith('image/')||f.type.startsWith('video/')))loadFile(f);}
function onFile(e){if(e.target.files[0])loadFile(e.target.files[0]);}

let isVideoMode = false;
let currentVideoEl = null;

function loadFile(file){
  if(file.type.startsWith('video/')) loadVideoFile(file);
  else loadImageFile(file);
}

function loadImageFile(file){
  isVideoMode = false;
  currentFile = file;
  const reader = new FileReader();
  reader.onload = e => {
    const dataUrl = e.target.result;
    const img = document.getElementById('previewImg');
    img.src = dataUrl;
    img.style.display = 'block';
    const vid = document.getElementById('previewVideo');
    if(vid.src){ URL.revokeObjectURL(vid.src); vid.src=''; }
    vid.style.display = 'none';
    document.getElementById('videoScrubBar').style.display = 'none';
    document.getElementById('uploadDefault').style.display = 'none';
    document.getElementById('uploadZone').style.cssText = 'min-height:0;cursor:default;';
    document.getElementById('previewZone').style.display = 'block';
    document.getElementById('results').style.display = 'none';
    document.getElementById('controlsBar').style.display = 'none';
    img.onload = () => { currentImg = img; };
    saveToHistory(file, dataUrl, []).then(() => { updateHistoryBadge(); });
  };
  reader.readAsDataURL(file);
}

function loadVideoFile(file){
  isVideoMode = true;
  currentImg = null;
  currentFile = file;
  const url = URL.createObjectURL(file);
  const vid = document.getElementById('previewVideo');
  vid.src = url;
  vid.style.display = 'block';
  document.getElementById('previewImg').style.display = 'none';
  document.getElementById('videoScrubBar').style.display = 'flex';
  document.getElementById('uploadDefault').style.display = 'none';
  document.getElementById('uploadZone').style.cssText = 'min-height:0;cursor:default;';
  document.getElementById('previewZone').style.display = 'block';
  document.getElementById('results').style.display = 'none';
  document.getElementById('controlsBar').style.display = 'none';
  currentVideoEl = vid;
  vid.onloadedmetadata = () => {
    updateVideoFrameCount();
    // Grab first frame so currentImg is set (for heatmap/harmony compat)
    seekAndCapture(vid, 0).then(img => { currentImg = img; });
  };
}

function updateVideoFrameCount(){
  const vid = currentVideoEl;
  if(!vid || !vid.duration) return;
  const rate = parseInt(document.getElementById('videoSampleRate').value) || 2;
  const count = Math.max(1, Math.ceil(vid.duration / rate));
  document.getElementById('videoFrameCount').textContent = `≈ ${count} frame${count!==1?'s':''} · ${Math.round(vid.duration)}s video`;
}

function seekAndCapture(vid, time){
  return new Promise(resolve => {
    const doCapture = () => {
      const c = document.createElement('canvas');
      c.width  = vid.videoWidth  || 640;
      c.height = vid.videoHeight || 360;
      c.getContext('2d').drawImage(vid, 0, 0, c.width, c.height);
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = c.toDataURL('image/jpeg', 0.85);
    };
    if(Math.abs(vid.currentTime - time) < 0.05){ doCapture(); return; }
    const onSeeked = () => { vid.removeEventListener('seeked', onSeeked); doCapture(); };
    vid.addEventListener('seeked', onSeeked);
    vid.currentTime = time;
  });
}

async function extractVideoPixels(vid, sampleRate, pixelsPerFrame){
  const duration = vid.duration;
  const times = [];
  for(let t = 0; t < duration; t += sampleRate) times.push(t);
  if(!times.length) times.push(0);

  const all = [];
  const cvs = document.createElement('canvas');
  const ctx2 = cvs.getContext('2d');
  const barEl = document.getElementById('loadBar');

  for(let i = 0; i < times.length; i++){
    await new Promise(resolve => {
      const doFrame = () => {
        cvs.width  = vid.videoWidth  || 640;
        cvs.height = vid.videoHeight || 360;
        ctx2.drawImage(vid, 0, 0, cvs.width, cvs.height);
        const data = ctx2.getImageData(0, 0, cvs.width, cvs.height).data;
        const total = cvs.width * cvs.height;
        const step  = Math.max(1, Math.floor(total / pixelsPerFrame));
        for(let p = 0; p < data.length; p += 4*step){
          if(data[p+3] > 20) all.push([data[p], data[p+1], data[p+2]]);
        }
        resolve();
      };
      if(Math.abs(vid.currentTime - times[i]) < 0.05){ doFrame(); return; }
      const onSeeked = () => { vid.removeEventListener('seeked', onSeeked); doFrame(); };
      vid.addEventListener('seeked', onSeeked);
      vid.currentTime = times[i];
    });
    if(barEl) barEl.style.width = Math.round(10 + (i+1)/times.length * 65) + '%';
    await new Promise(r => setTimeout(r, 15));
  }
  return all;
}

function resetAll(){
  currentImg=null; lastColors=[]; isVideoMode=false;
  const vid = document.getElementById('previewVideo');
  if(vid.src){ URL.revokeObjectURL(vid.src); vid.src=''; }
  vid.style.display='none';
  currentVideoEl=null;
  document.getElementById('previewImg').src='';
  document.getElementById('previewImg').style.display='block';
  document.getElementById('videoScrubBar').style.display='none';
  document.getElementById('videoFrameCount').textContent='';
  document.getElementById('uploadDefault').style.display='flex';
  document.getElementById('uploadZone').style.cssText='';
  document.getElementById('previewZone').style.display='none';
  document.getElementById('results').style.display='none';
  document.getElementById('controlsBar').style.display='none';
  document.getElementById('fileInput').value='';
  document.getElementById('codeBlock').style.display='none';
  document.getElementById('harmony-section').style.display='none';
  document.getElementById('harmonyResults').style.display='none';
  document.getElementById('heatmap-section').style.display='none';
  document.getElementById('heatmapCanvasArea').style.display='none';
  document.getElementById('heatmapScoreRow').style.display='none';
  const ac=document.getElementById('annotationCanvas');
  if(ac){ ac.classList.remove('visible'); const c=ac.getContext('2d'); c.clearRect(0,0,ac.width,ac.height); }
}

function setK(k){
  currentK=k;
  document.querySelectorAll('.cc-btn').forEach(b=>{b.classList.toggle('active',parseInt(b.textContent)===k);});
  if(currentImg || isVideoMode) runExtraction();
}

// ══════════════════════════════════════════════════════
// ANALYSIS
// ══════════════════════════════════════════════════════
const loadSteps={
  en:["Loading image into canvas...","Sampling pixels...","Running K-Means++ clustering...","Computing centroids...","Converting to HEX, RGB, HSL...","Building palette..."],
  ar:["تحميل الصورة...","أخذ عينات البيكسل...","تشغيل K-Means++...","حساب المراكز...","تحويل الألوان...","إنشاء اللوحة..."],
  fr:["Chargement...","Échantillonnage...","K-Means++...","Calcul...","Conversion...","Palette..."],
  es:["Cargando...","Muestreando...","K-Means++...","Calculando...","Convirtiendo...","Paleta..."],
  de:["Laden...","Sampling...","K-Means++...","Berechnen...","Konvertieren...","Palette..."],
  zh:["加载...","采样...","K-Means++...","计算...","转换...","生成调色板..."],
  ja:["読み込み...","サンプリング...","K-Means++...","計算...","変換...","パレット生成..."],
  ko:["로딩...","샘플링...","K-Means++...","계산...","변환...","팔레트 생성..."],
  ar:["تحميل...","أخذ عينات...","K-Means++...","حساب...","تحويل...","إنشاء..."],
};

async function runExtraction(){
  if(!currentImg && !isVideoMode) return;
  const btn=document.getElementById('extractBtn');
  btn.disabled=true;
  document.getElementById('previewZone').style.display='none';
  const lw=document.getElementById('loadingWrap');
  lw.style.display='flex';
  document.getElementById('results').style.display='none';

  const steps=(loadSteps[lang]||loadSteps.en);
  let si=0;
  const stepEl=document.getElementById('loadStep');
  const barEl=document.getElementById('loadBar');
  stepEl.textContent=steps[0]; barEl.style.width='5%';

  let pixels=[];
  let pixelPos=[];

  // ─── VIDEO MODE ───────────────────────────────────────
  if(isVideoMode && currentVideoEl){
    const rate = parseInt(document.getElementById('videoSampleRate').value) || 2;
    const stepTimer = setInterval(()=>{ si=(si+1)%steps.length; stepEl.textContent=steps[si]; }, 600);
    stepEl.textContent = 'Extracting video frames...';
    barEl.style.width = '10%';
    await new Promise(r=>setTimeout(r,60));
    pixels = await extractVideoPixels(currentVideoEl, rate, 4000);
    clearInterval(stepTimer);
    stepEl.textContent = 'Running K-Means++ on video palette...';
    barEl.style.width = '78%';
    await new Promise(r=>setTimeout(r,60));

  // ─── IMAGE MODE ───────────────────────────────────────
  } else {
    const stepTimer = setInterval(()=>{si=(si+1)%steps.length;stepEl.textContent=steps[si];barEl.style.width=Math.min(92,(si+1)/steps.length*100)+'%';},480);
    await new Promise(r=>setTimeout(r,80));
    const cvs=document.createElement('canvas');
    const scale=Math.min(1,900/Math.max(currentImg.naturalWidth||currentImg.width,currentImg.naturalHeight||currentImg.height));
    cvs.width=Math.max(1,Math.round((currentImg.naturalWidth||currentImg.width)*scale));
    cvs.height=Math.max(1,Math.round((currentImg.naturalHeight||currentImg.height)*scale));
    const ctx=cvs.getContext('2d');
    ctx.drawImage(currentImg,0,0,cvs.width,cvs.height);
    await new Promise(r=>setTimeout(r,80));
    const imgData=ctx.getImageData(0,0,cvs.width,cvs.height).data;
    const totalPx=cvs.width*cvs.height;
    const step=Math.max(1,Math.floor(totalPx/50000));
    for(let i=0;i<imgData.length;i+=4*step){
      if(imgData[i+3]>20){
        pixels.push([imgData[i],imgData[i+1],imgData[i+2]]);
        const idx=i/4;
        pixelPos.push([idx%cvs.width, Math.floor(idx/cvs.width)]);
      }
    }
    clearInterval(stepTimer);
    barEl.style.width='60%';
    await new Promise(r=>setTimeout(r,120));
  }

  analyzedPixels=pixels.length;

  const raw=kMeanspp(pixels,currentK,35);
  const total=raw.reduce((s,c)=>s+c.count,0);
  const colors=raw.map(c=>({
    ...c,
    pct:total>0?Math.round(c.count/total*1000)/10:0,
    hex:toHex(c.r,c.g,c.b),
    hsl:toHSL(c.r,c.g,c.b),
    name:nameColor(c.r,c.g,c.b),
    brightness:getBrightness(c.r,c.g,c.b),
  })).sort((a,b)=>b.count-a.count).filter(c=>c.pct>=0.1);

  // Compute spatial centroid (image mode only — video has no single spatial ref)
  if(!isVideoMode && pixelPos.length){
    const TOL=38;
    const cx={}, cy={}, cc={};
    colors.forEach(c=>{ cx[c.hex]=0; cy[c.hex]=0; cc[c.hex]=0; });
    // need canvas dims — re-derive from currentImg
    const _iw = currentImg.naturalWidth||currentImg.width;
    const _ih = currentImg.naturalHeight||currentImg.height;
    const _sc = Math.min(1, 900/Math.max(_iw,_ih));
    const _cw = Math.max(1,Math.round(_iw*_sc));
    const _ch = Math.max(1,Math.round(_ih*_sc));
    for(let pi=0;pi<pixels.length;pi++){
      const [pr,pg,pb]=pixels[pi];
      let best=null, bestD=TOL*TOL*3+1;
      for(const c of colors){
        const d=(pr-c.r)**2+(pg-c.g)**2+(pb-c.b)**2;
        if(d<bestD){bestD=d;best=c;}
      }
      if(best && bestD<=TOL*TOL*3){
        cx[best.hex]+=pixelPos[pi][0];
        cy[best.hex]+=pixelPos[pi][1];
        cc[best.hex]++;
      }
    }
    colors.forEach(c=>{
      c.centroidX = cc[c.hex]>0 ? cx[c.hex]/cc[c.hex]/_cw : 0.5;
      c.centroidY = cc[c.hex]>0 ? cy[c.hex]/cc[c.hex]/_ch : 0.5;
    });
  } else {
    colors.forEach(c=>{ c.centroidX=0.5; c.centroidY=0.5; });
  }

  barEl.style.width='100%';
  await new Promise(r=>setTimeout(r,180));
  lw.style.display='none';
  lastColors=colors;
  btn.disabled=false;
  renderResults(colors);
  document.getElementById('previewZone').style.display='block';
  document.getElementById('controlsBar').style.display='flex';
  document.getElementById('harmony-section').style.display='block';
  document.getElementById('heatmap-section').style.display='block';
  document.getElementById('harmonyResults').style.display='none';
  document.getElementById('harmonyLoading').style.display='none';
  // Draw color annotations on preview image
  setTimeout(()=>drawColorAnnotations(colors), 120);
  // Update the most recent history entry with the extracted colors
  updateLatestHistoryColors(colors.slice(0,8).map(c=>c.hex));
}

// ══════════════════════════════════════════════════════
// RENDER
// ══════════════════════════════════════════════════════
function sortColors(colors){
  const by=document.getElementById('sortSel').value;
  const c=[...colors];
  if(by==='pct') return c.sort((a,b)=>b.pct-a.pct);
  if(by==='hue') return c.sort((a,b)=>a.hsl.h-b.hsl.h);
  if(by==='bright') return c.sort((a,b)=>b.brightness-a.brightness);
  if(by==='sat') return c.sort((a,b)=>b.hsl.s-a.hsl.s);
  return c;
}

function rerenderGrid(){ if(lastColors.length) renderResults(lastColors); }

function renderResults(colors){
  const sorted=sortColors(colors);
  const res=document.getElementById('results');
  res.style.display='block';
  const d=new Date();
  document.getElementById('resultsMeta').textContent=`${sorted.length} ${tr('stat_colors')} · ${analyzedPixels.toLocaleString()} px · ${d.toLocaleTimeString()}`;

  // Strip
  const strip=document.getElementById('paletteStrip');
  strip.innerHTML=sorted.map(c=>`<div class="palette-strip-seg" style="background:${c.hex}" onclick="copyHex('${c.hex}')"><div class="seg-hex">${c.hex}</div></div>`).join('');

  // Stats
  const dom=sorted[0];
  document.getElementById('statsRow').innerHTML=`
    <div class="stat-box"><div class="stat-val">${sorted.length}</div><div class="stat-lbl">${tr('stat_colors')}</div></div>
    <div class="stat-box"><div class="stat-val">${(analyzedPixels/1000).toFixed(0)}K</div><div class="stat-lbl">${tr('stat_pixels')}</div></div>
    <div class="stat-box">
      <div style="width:44px;height:44px;background:${dom.hex};border-radius:50%;margin:0 auto 8px;box-shadow:0 4px 16px rgba(0,0,0,0.4)"></div>
      <div class="stat-lbl">${tr('stat_dominant')}</div>
    </div>
    <div class="stat-box"><div class="stat-val">${dom.pct}%</div><div class="stat-lbl">${tr('stat_coverage')}</div></div>`;

  // Grid
  document.getElementById('colorGrid').innerHTML=sorted.map((c,i)=>{
    const contrast=getContrast(c.r,c.g,c.b);
    const barClr=`hsl(${c.hsl.h},${c.hsl.s}%,${Math.min(68,Math.max(38,c.hsl.l))}%)`;
    return`<div class="color-card" onclick="copyHex('${c.hex}')">
      <div class="cc-swatch" style="background:${c.hex}">
        <div class="cc-rank" style="color:${contrast}">#${i+1}</div>
        <button class="cc-map-btn" title="View on image" onclick="event.stopPropagation();openColorMap('${c.hex}',${c.r},${c.g},${c.b},'${c.name}',${c.pct})">🔍</button>
        <button class="cc-wallet-btn" id="wbtn-${c.hex.replace('#','')}" title="Save to Wallet" onclick="event.stopPropagation();addToWallet('${c.hex}','${c.name}')">💛</button>
        <div class="cc-pct-badge">${c.pct}%</div>
        <div class="copy-flash" id="flash-${c.hex.replace('#','')}"><span style="color:${contrast}">✓</span></div>
      </div>
      <div class="cc-info">
        <div class="cc-hex"><span>${c.hex}</span><span class="cc-copy-icon">⧉</span></div>
        <div class="cc-rgb">rgb(${c.r}, ${c.g}, ${c.b})</div>
        <div class="cc-hsl">hsl(${c.hsl.h}°, ${c.hsl.s}%, ${c.hsl.l}%)</div>
        <div class="cc-name">${c.name}</div>
        <div class="cc-bar"><div class="cc-bar-fill" style="width:${Math.min(100,c.pct*2)}%;background:${barClr}"></div></div>
      </div>
    </div>`;
  }).join('');

  // re-attach hover for new cards
  document.querySelectorAll('.color-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-hover'));
  });
  updateCardWalletBtns();

  updateCodeBlock();
  res.scrollIntoView({behavior:'smooth',block:'start'});
  setTimeout(()=>{document.querySelectorAll('#results .reveal').forEach((el,i)=>setTimeout(()=>el.classList.add('visible'),i*70));},100);
}

// ══════════════════════════════════════════════════════
// COLOR ANNOTATION OVERLAY
// ══════════════════════════════════════════════════════
function drawColorAnnotations(colors) {
  const img    = document.getElementById('previewImg');
  const canvas = document.getElementById('annotationCanvas');
  if (!canvas || !img) return;

  // Match canvas pixel size to the rendered img element
  const rect = img.getBoundingClientRect();
  const W = img.offsetWidth  || rect.width  || 600;
  const H = img.offsetHeight || rect.height || 400;
  canvas.width  = W;
  canvas.height = H;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  // Show only colors >= 1% to avoid clutter
  const visible = colors.filter(c => c.pct >= 1.0);

  // Smart label placement: spread labels to avoid heavy overlap
  // Place labels in a ring outside the image center
  const labels = visible.map((c, i) => {
    // Centroid in canvas space
    const rawX = c.centroidX * W;
    const rawY = c.centroidY * H;

    // Push label away from centroid so arrow is visible
    // Determine which quadrant the centroid is in
    const cx = W / 2, cy = H / 2;
    const angle = Math.atan2(rawY - cy, rawX - cx);

    // Label offset: push outward from centroid
    const PUSH = Math.min(W, H) * 0.18;
    let lx = rawX + Math.cos(angle) * PUSH;
    let ly = rawY + Math.sin(angle) * PUSH;

    // Keep labels inside canvas with padding
    const PAD = 54;
    lx = Math.max(PAD, Math.min(W - PAD, lx));
    ly = Math.max(PAD, Math.min(H - PAD, ly));

    return { c, rawX, rawY, lx, ly };
  });

  // Separation pass: push overlapping labels apart
  const LABEL_W = 72, LABEL_H = 28;
  for (let pass = 0; pass < 30; pass++) {
    for (let i = 0; i < labels.length; i++) {
      for (let j = i + 1; j < labels.length; j++) {
        const a = labels[i], b = labels[j];
        const dx = b.lx - a.lx, dy = b.ly - a.ly;
        const minDX = LABEL_W + 6, minDY = LABEL_H + 6;
        if (Math.abs(dx) < minDX && Math.abs(dy) < minDY) {
          const pushX = (minDX - Math.abs(dx)) / 2 * (dx >= 0 ? 1 : -1);
          const pushY = (minDY - Math.abs(dy)) / 2 * (dy >= 0 ? 1 : -1);
          a.lx -= pushX; a.ly -= pushY;
          b.lx += pushX; b.ly += pushY;
          // Re-clamp
          const PAD = 54;
          a.lx = Math.max(PAD, Math.min(W - PAD, a.lx));
          a.ly = Math.max(PAD*0.7, Math.min(H - PAD*0.7, a.ly));
          b.lx = Math.max(PAD, Math.min(W - PAD, b.lx));
          b.ly = Math.max(PAD*0.7, Math.min(H - PAD*0.7, b.ly));
        }
      }
    }
  }

  // Animate drawing each annotation with staggered delay
  labels.forEach((item, i) => {
    setTimeout(() => drawOneAnnotation(ctx, item, W, H), i * 90);
  });

  // Fade in canvas
  canvas.classList.add('visible');
}

function drawOneAnnotation(ctx, item, W, H) {
  const { c, rawX, rawY, lx, ly } = item;

  // Determine text contrast on the color
  const textCol = c.brightness > 140 ? '#111' : '#fff';
  const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

  // ── ARROW LINE ──
  // Find the edge of the label box (arrow tip at label edge)
  const dx = rawX - lx, dy = rawY - ly;
  const dist = Math.sqrt(dx*dx + dy*dy);
  const nx = dx / dist, ny = dy / dist;
  const LABEL_HALF_W = 36, LABEL_HALF_H = 13;
  // Clip arrow start to label box edge
  let arrowStartX = lx + nx * Math.min(LABEL_HALF_W, Math.abs(dx));
  let arrowStartY = ly + ny * Math.min(LABEL_HALF_H, Math.abs(dy));

  // Dot at centroid
  const DOT_R = Math.max(4, Math.min(9, W * 0.012));

  ctx.save();

  // Dashed line from label to centroid dot
  ctx.beginPath();
  ctx.setLineDash([3, 4]);
  ctx.moveTo(arrowStartX, arrowStartY);
  ctx.lineTo(rawX - nx * (DOT_R + 2), rawY - ny * (DOT_R + 2));
  ctx.strokeStyle = c.hex;
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.85;
  ctx.stroke();
  ctx.setLineDash([]);

  // Arrow head at centroid
  const arrowLen = 7, arrowWide = 3.5;
  const ax = rawX - nx * (DOT_R + 1), ay = rawY - ny * (DOT_R + 1);
  const perpX = -ny, perpY = nx;
  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(ax - nx * arrowLen + perpX * arrowWide, ay - ny * arrowLen + perpY * arrowWide);
  ctx.lineTo(ax - nx * arrowLen - perpX * arrowWide, ay - ny * arrowLen - perpY * arrowWide);
  ctx.closePath();
  ctx.fillStyle = c.hex;
  ctx.globalAlpha = 0.95;
  ctx.fill();

  // Centroid dot (ring + fill)
  ctx.beginPath();
  ctx.arc(rawX, rawY, DOT_R, 0, Math.PI * 2);
  ctx.fillStyle = c.hex;
  ctx.globalAlpha = 0.92;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(rawX, rawY, DOT_R + 2, 0, Math.PI * 2);
  ctx.strokeStyle = isDarkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.4)';
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.7;
  ctx.stroke();

  // ── LABEL PILL ──
  const LW = 70, LH = 26, LR = 6;
  const lLeft = lx - LW/2, lTop = ly - LH/2;

  // Shadow
  ctx.globalAlpha = 0.25;
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.roundRect ? ctx.roundRect(lLeft+2, lTop+2, LW, LH, LR) : ctx.rect(lLeft+2, lTop+2, LW, LH);
  ctx.fill();

  // Pill background
  ctx.globalAlpha = 0.95;
  ctx.fillStyle = c.hex;
  ctx.beginPath();
  ctx.roundRect ? ctx.roundRect(lLeft, lTop, LW, LH, LR) : ctx.rect(lLeft, lTop, LW, LH);
  ctx.fill();

  // Pill border
  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = isDarkMode ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect ? ctx.roundRect(lLeft, lTop, LW, LH, LR) : ctx.rect(lLeft, lTop, LW, LH);
  ctx.stroke();

  // Percentage text
  ctx.globalAlpha = 1;
  ctx.fillStyle = textCol;
  ctx.font = `bold ${Math.max(10, W*0.018)}px "JetBrains Mono", monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${c.pct}%`, lx, ly - 1);

  ctx.restore();
}


// ══════════════════════════════════════════════════════
// COLOR WALLET
// ══════════════════════════════════════════════════════
let walletColors = [];  // [{hex, name, ts}]
const WALLET_KEY = 'fc_wallet';

function loadWallet(){
  try { walletColors = JSON.parse(localStorage.getItem(WALLET_KEY)||'[]'); } catch(e){ walletColors=[]; }
  updateWalletBadge();
}

function saveWallet(){
  try { localStorage.setItem(WALLET_KEY, JSON.stringify(walletColors)); } catch(e){}
  updateWalletBadge();
}

function updateWalletBadge(){
  const b = document.getElementById('walletBadge');
  if(!b) return;
  const n = walletColors.length;
  b.textContent = n;
  b.style.display = n>0 ? 'flex' : 'none';
}

function addToWallet(hex, name){
  const already = walletColors.findIndex(c=>c.hex===hex);
  if(already !== -1){
    // Remove if already saved (toggle)
    walletColors.splice(already,1);
    saveWallet();
    renderWalletPanel();
    updateCardWalletBtns();
    showToast(tr('wallet_removed')||'Removed');
    return;
  }
  walletColors.unshift({hex, name, ts: Date.now()});
  saveWallet();
  renderWalletPanel();
  updateCardWalletBtns();
  // Badge bump animation
  const b=document.getElementById('walletBadge');
  if(b){ b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); }
  showToast(tr('wallet_saved')||'Saved to wallet!');
}

function updateCardWalletBtns(){
  document.querySelectorAll('.cc-wallet-btn').forEach(btn=>{
    const id = btn.id.replace('wbtn-','#');
    const saved = walletColors.some(c=>c.hex===id);
    btn.classList.toggle('saved', saved);
    btn.title = saved ? (tr('wallet_removed')||'Remove from wallet') : (tr('wallet_saved')||'Save to wallet');
    btn.textContent = saved ? '✓' : '💛';
  });
}

function toggleWalletPanel(){
  const panel   = document.getElementById('walletPanel');
  const overlay = document.getElementById('walletOverlay');
  const isOpen  = panel.classList.contains('open');
  panel.classList.toggle('open', !isOpen);
  overlay.style.display = isOpen ? 'none' : 'block';
  if(!isOpen) renderWalletPanel();
}

function renderWalletPanel(){
  const body   = document.getElementById('walletBody');
  const footer = document.getElementById('walletFooter');
  if(!body) return;

  if(walletColors.length === 0){
    body.innerHTML = `
      <div class="wallet-empty">
        <div class="wallet-empty-icon">💛</div>
        <div class="wallet-empty-text">${tr('wallet_empty')||'Save colors you love by clicking 💛 on any color card.'}</div>
      </div>`;
    if(footer) footer.style.display='none';
    return;
  }

  if(footer) footer.style.display='flex';

  body.innerHTML = walletColors.map((c,i)=>{
    const hsl = toHSL(...hexToRgb(c.hex));
    const textCol = hsl.l > 55 ? '#111' : '#fff';
    return `<div class="wallet-swatch" onclick="navigator.clipboard.writeText('${c.hex}').catch(()=>{});showToast('${c.hex} — ${tr('copied')||'Copied!'}')" style="cursor:pointer">
      <div class="wallet-color-dot" style="background:${c.hex}"></div>
      <div class="wallet-swatch-info">
        <div class="wallet-swatch-hex">${c.hex}</div>
        <div class="wallet-swatch-name">${c.name}</div>
      </div>
      <button class="wallet-swatch-copy" onclick="event.stopPropagation();navigator.clipboard.writeText('${c.hex}').catch(()=>{});showToast('${c.hex}')">⧉</button>
      <button class="wallet-swatch-del" onclick="event.stopPropagation();removeFromWallet(${i})" title="Remove">✕</button>
    </div>`;
  }).join('');
}

function removeFromWallet(idx){
  walletColors.splice(idx,1);
  saveWallet();
  renderWalletPanel();
  updateCardWalletBtns();
}

function clearWallet(){
  if(walletColors.length===0) return;
  walletColors=[];
  saveWallet();
  renderWalletPanel();
  updateCardWalletBtns();
}

function hexToRgb(hex){
  const r=parseInt(hex.slice(1,3),16);
  const g=parseInt(hex.slice(3,5),16);
  const b=parseInt(hex.slice(5,7),16);
  return [r,g,b];
}

function exportWalletHex(){
  if(!walletColors.length) return;
  navigator.clipboard.writeText(walletColors.map(c=>c.hex).join('\n')).catch(()=>{});
  showToast((tr('copied')||'Copied!')+` (${walletColors.length})`);
}

function exportWalletCSS(){
  if(!walletColors.length) return;
  const css=`:root {\n`+walletColors.map((c,i)=>`  --wallet-${i+1}: ${c.hex}; /* ${c.name} */`).join('\n')+'\n}';
  navigator.clipboard.writeText(css).catch(()=>{});
  showToast('CSS '+(tr('copied')||'Copied!'));
}

function exportWalletJSON(){
  if(!walletColors.length) return;
  navigator.clipboard.writeText(JSON.stringify(walletColors.map((c,i)=>({index:i+1,hex:c.hex,name:c.name})),null,2)).catch(()=>{});
  showToast('JSON '+(tr('copied')||'Copied!'));
}

function exportWalletSVG(){
  if(!walletColors.length) return;
  const size=80;
  const rects=walletColors.map((c,i)=>`<rect x="${i*size}" y="0" width="${size}" height="${size}" fill="${c.hex}"/><text x="${i*size+size/2}" y="${size+14}" text-anchor="middle" font-family="monospace" font-size="10" fill="#888">${c.hex}</text>`).join('');
  const svgStr=`<svg xmlns="http://www.w3.org/2000/svg" width="${walletColors.length*size}" height="${size+24}">${rects}</svg>`;
  const a=document.createElement('a');
  a.href='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svgStr);
  a.download='wallet-palette.svg';
  a.click();
  showToast(tr('download_done')||'Downloading...');
}

// ══════════════════════════════════════════════════════
// COLOR TOOLS — CSS PROMPT + COLOR SEARCH + PICKER
// ══════════════════════════════════════════════════════

// ── Internal state ──
let ct = {
  h:0, s:100, l:50, a:1,   // current HSL + alpha
  dragging: null             // 'sl'|'hue'|'alpha'
};

// ── Tab switch ──
function ctSwitchTab(tab){
  document.getElementById('ctTabCmd').classList.toggle('active', tab==='cmd');
  document.getElementById('ctTabSearch').classList.toggle('active', tab==='search');
  document.getElementById('ctCmdBody').style.display   = tab==='cmd'    ? 'block' : 'none';
  document.getElementById('ctSearchBody').style.display= tab==='search' ? 'block' : 'none';
}

// ── CSS Prompt ──
function ctFillCmd(val){
  const inp=document.getElementById('ctCmdInput');
  inp.value=val; inp.focus();
}

function ctRunCmd(){
  const raw = document.getElementById('ctCmdInput').value.trim();
  if(!raw) return;
  // Extract color value from CSS declarations like "color: red;" or bare "red"
  let colorStr = raw;
  const declMatch = raw.match(/:\s*(.+?)(?:;|$)/);
  if(declMatch) colorStr = declMatch[1].trim();
  const rgb = ctParseColor(colorStr);
  if(!rgb){ showToast('⚠ Could not parse color'); return; }
  const hsl = ctRgbToHsl(rgb[0],rgb[1],rgb[2]);
  ct.h=hsl[0]; ct.s=hsl[1]; ct.l=hsl[2]; ct.a=rgb[3]!==undefined?rgb[3]:1;
  ctOpenPanel(colorStr);
}

// ── Color Search ──
function ctRunSearch(){
  const raw = document.getElementById('ctSearchInput').value.trim();
  if(!raw) return;
  // First try direct parse
  let rgb = ctParseColor(raw);
  // If failed, try Claude API to resolve natural language color name
  if(!rgb){
    ctResolveColorName(raw).then(hex=>{
      if(!hex){ showToast('⚠ Color not found'); return; }
      const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
      const hsl=ctRgbToHsl(r,g,b);
      ct.h=hsl[0]; ct.s=hsl[1]; ct.l=hsl[2]; ct.a=1;
      ctOpenPanel(raw);
    });
    return;
  }
  const hsl=ctRgbToHsl(rgb[0],rgb[1],rgb[2]);
  ct.h=hsl[0]; ct.s=hsl[1]; ct.l=hsl[2]; ct.a=rgb[3]!==undefined?rgb[3]:1;
  ctOpenPanel(raw);
}

async function ctResolveColorName(name){
  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST', headers:{'Content-Type':'application/json',
        'anthropic-version':'2023-06-01',
        'anthropic-dangerous-direct-browser-access':'true'},
      body: JSON.stringify({
        model:'claude-sonnet-4-20250514', max_tokens:60,
        messages:[{role:'user',content:`Convert this color description to a HEX color code. Reply ONLY with the hex code like #rrggbb, nothing else.\nColor: "${name}"`}]
      })
    });
    const d=await resp.json();
    const t=(d.content?.find(b=>b.type==='text')?.text||'').trim();
    const m=t.match(/#[0-9a-fA-F]{6}/);
    return m?m[0]:null;
  } catch(e){ return null; }
}

// ── Open/render the panel ──
function ctOpenPanel(label){
  const panel=document.getElementById('ctPanel');
  panel.classList.add('show');
  document.getElementById('ctPanelLabel').textContent=label;
  const hex=ctHslToHex(ct.h,ct.s,ct.l);
  document.getElementById('ctPanelSwatch').style.background=hex;
  ctUpdatePicker();
  ctBuildShades();
  panel.scrollIntoView({behavior:'smooth',block:'nearest'});
}

// ── Picker sync ──
function ctUpdatePicker(){
  const H=ct.h, S=ct.s, L=ct.l, A=ct.a;
  const hex=ctHslToHex(H,S,L);
  const [r,g,b]=ctHslToRgb(H,S,L);

  // SL box background = pure hue
  const slBox=document.getElementById('ctSlBox');
  slBox.style.background=`hsl(${H},100%,50%)`;

  // SL cursor position
  // Photoshop-style: x=saturation(0→left=0%,right=100%), y=lightness(0→top=100%,bottom=0%)
  // Convert HSL to HSV for picker coords
  const [hv,sv,vv]=ctHslToHsv(H,S,L);
  const slCursor=document.getElementById('ctSlCursor');
  slCursor.style.left=(sv*100)+'%';
  slCursor.style.top=((1-vv)*100)+'%';
  slCursor.style.borderColor=vv>0.5?'#000':'#fff';

  // Hue thumb
  document.getElementById('ctHueThumb').style.left=(H/360*100)+'%';
  document.getElementById('ctHueThumb').style.background=`hsl(${H},100%,50%)`;

  // Alpha
  document.getElementById('ctAlphaGradient').style.background=
    `linear-gradient(to right,transparent,${hex})`;
  document.getElementById('ctAlphaThumb').style.left=(A*100)+'%';
  document.getElementById('ctAlphaThumb').style.background=
    `rgba(${r},${g},${b},${A})`;

  // Preview
  const previewColor=A<1?`rgba(${r},${g},${b},${A})`:hex;
  document.getElementById('ctPreviewInner').style.background=previewColor;

  // Values
  document.getElementById('ctValHex').value=hex;
  document.getElementById('ctValRgb').value=A<1?`rgba(${r},${g},${b},${A.toFixed(2)})`:`rgb(${r},${g},${b})`;
  document.getElementById('ctValHsl').value=A<1?`hsla(${H},${S}%,${L}%,${A.toFixed(2)})`:`hsl(${H},${S}%,${L}%)`;
  document.getElementById('ctValCss').value=A<1?`rgba(${r},${g},${b},${A.toFixed(2)})`:hex;

  // Swatch in panel header
  document.getElementById('ctPanelSwatch').style.background=previewColor;
}

// ── Value field editing ──
function ctValChanged(type, val){
  let rgb=null;
  try{
    if(type==='hex')  rgb=ctParseColor(val.trim());
    if(type==='rgb')  rgb=ctParseColor(val.trim());
    if(type==='hsl')  rgb=ctParseColor(val.trim());
  }catch(e){}
  if(!rgb) return;
  const hsl=ctRgbToHsl(rgb[0],rgb[1],rgb[2]);
  ct.h=hsl[0]; ct.s=hsl[1]; ct.l=hsl[2];
  if(rgb[3]!==undefined) ct.a=rgb[3];
  ctUpdatePicker();
  ctBuildShades();
}

// ── Shade spectrum ──
function ctBuildShades(){
  const grid=document.getElementById('ctShadesGrid');
  if(!grid) return;
  const shades=[];
  // Generate 36 shades: vary lightness 5%→95% across full range
  // Also vary saturation slightly for richness
  for(let i=0;i<36;i++){
    const l=Math.round(5+i*(90/35));
    const s=Math.round(Math.max(0,Math.min(100, ct.s + (l<50?(50-l)*0.3:(l-50)*(-0.2)) )));
    shades.push({l,s,h:ct.h});
  }

  grid.innerHTML=shades.map((sh,i)=>{
    const hex=ctHslToHex(sh.h,sh.s,sh.l);
    const isActive=Math.abs(sh.l-ct.l)<4;
    return `<div class="ct-shade${isActive?' active-shade':''}"
      style="background:${hex}"
      onclick="ctSelectShade(${sh.h},${sh.s},${sh.l})"
      title="${hex}">
      <div class="ct-shade-hex">${hex}</div>
      <div class="ct-shade-wallet" onclick="event.stopPropagation();addToWallet('${hex}','${hex}')">💛</div>
    </div>`;
  }).join('');
}

function ctSelectShade(h,s,l){
  ct.h=h; ct.s=s; ct.l=l;
  ctUpdatePicker();
  ctBuildShades();
  document.getElementById('ctPanelLabel').textContent=ctHslToHex(h,s,l);
  document.getElementById('ctPanelSwatch').style.background=ctHslToHex(h,s,l);
}

function ctCopyAllShades(){
  const shades=document.querySelectorAll('.ct-shade');
  const hexes=[...shades].map(s=>s.title).filter(Boolean).join('\n');
  navigator.clipboard.writeText(hexes).catch(()=>{});
  showToast((tr('copied')||'Copied!')+` (${shades.length})`);
}

// ── Photoshop-style drag interactions ──
function ctInitPicker(){
  // SL box
  const slBox=document.getElementById('ctSlBox');
  function slMove(e){
    if(ct.dragging!=='sl') return;
    const rect=slBox.getBoundingClientRect();
    const px=(e.clientX||e.touches?.[0]?.clientX||0)-rect.left;
    const py=(e.clientY||e.touches?.[0]?.clientY||0)-rect.top;
    const sv=Math.max(0,Math.min(1,px/rect.width));
    const vv=Math.max(0,Math.min(1,1-py/rect.height));
    // Convert HSV → HSL
    const [hh,ss,ll]=ctHsvToHsl(ct.h,sv*100,vv*100);
    ct.s=ss; ct.l=ll;
    ctUpdatePicker();
    ctBuildShades();
  }
  slBox.addEventListener('mousedown', e=>{ct.dragging='sl';slMove(e);});
  slBox.addEventListener('touchstart',e=>{ct.dragging='sl';slMove(e);},{passive:true});

  // Hue track
  const hueTrack=document.getElementById('ctHueTrack');
  function hueMove(e){
    if(ct.dragging!=='hue') return;
    const rect=hueTrack.getBoundingClientRect();
    const px=(e.clientX||e.touches?.[0]?.clientX||0)-rect.left;
    ct.h=Math.round(Math.max(0,Math.min(360,px/rect.width*360)));
    ctUpdatePicker();
    ctBuildShades();
  }
  hueTrack.addEventListener('mousedown',e=>{ct.dragging='hue';hueMove(e);});
  hueTrack.addEventListener('touchstart',e=>{ct.dragging='hue';hueMove(e);},{passive:true});

  // Alpha track
  const alphaTrack=document.getElementById('ctAlphaTrack');
  function alphaMove(e){
    if(ct.dragging!=='alpha') return;
    const rect=alphaTrack.getBoundingClientRect();
    const px=(e.clientX||e.touches?.[0]?.clientX||0)-rect.left;
    ct.a=Math.max(0,Math.min(1,px/rect.width));
    ctUpdatePicker();
  }
  alphaTrack.addEventListener('mousedown',e=>{ct.dragging='alpha';alphaMove(e);});
  alphaTrack.addEventListener('touchstart',e=>{ct.dragging='alpha';alphaMove(e);},{passive:true});

  // Global move + up
  document.addEventListener('mousemove',e=>{slMove(e);hueMove(e);alphaMove(e);});
  document.addEventListener('mouseup',  ()=>{ct.dragging=null;});
  document.addEventListener('touchmove',e=>{slMove(e);hueMove(e);alphaMove(e);},{passive:true});
  document.addEventListener('touchend', ()=>{ct.dragging=null;});
}
ctInitPicker();

// ── Color math helpers ──
function ctParseColor(str){
  if(!str) return null;
  str=str.trim();
  // HEX
  let m=str.match(/^#?([0-9a-fA-F]{3,8})$/);
  if(m){
    let h=m[1];
    if(h.length===3) h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
    if(h.length===6) return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16),1];
    if(h.length===8) return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16),parseInt(h.slice(6,8),16)/255];
  }
  // rgb/rgba
  m=str.match(/rgba?\(([^)]+)\)/i);
  if(m){
    const p=m[1].split(',').map(s=>parseFloat(s.trim()));
    return [Math.round(p[0]),Math.round(p[1]),Math.round(p[2]),p[3]!==undefined?p[3]:1];
  }
  // hsl/hsla
  m=str.match(/hsla?\(([^)]+)\)/i);
  if(m){
    const p=m[1].replace(/%/g,'').split(',').map(s=>parseFloat(s.trim()));
    const [r,g,b]=ctHslToRgb(p[0],p[1],p[2]);
    return [r,g,b,p[3]!==undefined?p[3]:1];
  }
  // CSS named color via canvas trick
  try {
    const cv=document.createElement('canvas');cv.width=cv.height=1;
    const cx=cv.getContext('2d');cx.fillStyle=str;cx.fillRect(0,0,1,1);
    const d=cx.getImageData(0,0,1,1).data;
    if(d[0]===0&&d[1]===0&&d[2]===0&&d[3]===0) return null; // transparent = not found
    return [d[0],d[1],d[2],d[3]/255];
  } catch(e){ return null; }
}

function ctRgbToHsl(r,g,b){
  r/=255;g/=255;b/=255;
  const max=Math.max(r,g,b),min=Math.min(r,g,b);
  let h,s,l=(max+min)/2;
  if(max===min){h=s=0;}
  else{
    const d=max-min;
    s=l>0.5?d/(2-max-min):d/(max+min);
    switch(max){
      case r:h=((g-b)/d+(g<b?6:0))/6;break;
      case g:h=((b-r)/d+2)/6;break;
      case b:h=((r-g)/d+4)/6;break;
    }
  }
  return [Math.round(h*360),Math.round(s*100),Math.round(l*100)];
}

function ctHslToRgb(h,s,l){
  s/=100;l/=100;
  const k=n=>(n+h/30)%12;
  const a=s*Math.min(l,1-l);
  const f=n=>l-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1)));
  return [Math.round(f(0)*255),Math.round(f(8)*255),Math.round(f(4)*255)];
}

function ctHslToHex(h,s,l){
  const [r,g,b]=ctHslToRgb(h,s,l);
  return '#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('');
}

function ctHslToHsv(h,s,l){
  s/=100;l/=100;
  const v=l+s*Math.min(l,1-l);
  const sv=v===0?0:2*(1-l/v);
  return [h,sv*100,v*100];
}

function ctHsvToHsl(h,sv,v){
  sv/=100;v/=100;
  const l=v*(1-sv/2);
  const s=l===0||l===1?0:(v-l)/Math.min(l,1-l);
  return [h,Math.round(s*100),Math.round(l*100)];
}

// ══════════════════════════════════════════════════════
// OUTFIT HARMONY ANALYZER
// ══════════════════════════════════════════════════════
let outfitImages = [];       // [{dataUrl, file, label}]
let outfitTargetSlot = -1;   // which slot triggered file pick

/* ── Open / Close ── */
function openOutfitModal(){
  document.getElementById('outfitOverlay').classList.add('show');
  document.getElementById('outfitModal').classList.add('show');
  if(outfitImages.length === 0) outfitAddSlots(2);   // start with 2 empty slots
  renderOutfitZones();
}
function closeOutfitModal(){
  document.getElementById('outfitOverlay').classList.remove('show');
  document.getElementById('outfitModal').classList.remove('show');
}

/* ── Slot management ── */
function outfitAddSlots(n=1){
  for(let i=0;i<n;i++) outfitImages.push(null);
  renderOutfitZones();
}

function renderOutfitZones(){
  const row = document.getElementById('outfitZonesRow');
  const isMobile = window.innerWidth < 560;
  row.innerHTML = outfitImages.map((img,i) => {
    if(img){
      return `<div class="outfit-zone has-img" id="ozone-${i}"
          onclick="outfitPickFile(${i})"
          ondragover="event.preventDefault();this.classList.add('drag-over')"
          ondragleave="this.classList.remove('drag-over')"
          ondrop="outfitDrop(event,${i})">
        <img src="${img.dataUrl}" alt="outfit ${i+1}"/>
        <div class="outfit-zone-num">${img.label}</div>
        <div class="outfit-zone-del" onclick="event.stopPropagation();outfitRemove(${i})">✕</div>
      </div>`;
    } else {
      return `<div class="outfit-zone" id="ozone-${i}"
          onclick="outfitPickFile(${i})"
          ondragover="event.preventDefault();this.classList.add('drag-over')"
          ondragleave="this.classList.remove('drag-over')"
          ondrop="outfitDrop(event,${i})">
        <div class="outfit-zone-ico"><svg style="width:28px;height:28px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c1.5 0 3 .5 3 2H9c0-1.5 1.5-2 3-2z"/><path d="M9 5c-2 0-4 .5-5 1.5L3 9h18l-1-2.5C19 5.5 17 5 15 5"/><rect x="3" y="9" width="18" height="11" rx="1"/><line x1="12" y1="9" x2="12" y2="20"/></svg></div>
        <div class="outfit-zone-lbl">${tr('outfit_drop')||'Drop or click'}<br>${tr('outfit_outfit')||'Outfit'} ${i+1}</div>
      </div>`;
    }
  }).join('') +
  `<button class="outfit-add-btn" onclick="outfitAddSlots(1)" title="${tr('outfit_add_slot')||'Add slot'}">＋</button>`;

  // Update analyse button state
  const filled = outfitImages.filter(Boolean).length;
  document.getElementById('outfitGoBtn').disabled = filled < 1;
}

function outfitPickFile(slotIdx){
  outfitTargetSlot = slotIdx;
  const inp = document.getElementById('outfitFileInput');
  inp.multiple = false;
  inp.onchange = e => outfitFileChosen(e, slotIdx);
  inp.click();
}

function outfitFileChosen(e, slotIdx){
  const files = [...e.target.files];
  files.forEach((file,fi) => {
    const idx = slotIdx + fi;
    // Expand array if needed
    while(outfitImages.length <= idx) outfitImages.push(null);
    const reader = new FileReader();
    reader.onload = ev => {
      outfitImages[idx] = { dataUrl: ev.target.result, file, label: `Outfit ${idx+1}` };
      renderOutfitZones();
    };
    reader.readAsDataURL(file);
  });
  e.target.value = '';
}

function outfitDrop(e, slotIdx){
  e.preventDefault();
  document.getElementById(`ozone-${slotIdx}`)?.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if(!file || !file.type.startsWith('image/')) return;
  const reader = new FileReader();
  reader.onload = ev => {
    outfitImages[slotIdx] = { dataUrl: ev.target.result, file, label: `Outfit ${slotIdx+1}` };
    renderOutfitZones();
  };
  reader.readAsDataURL(file);
}

function outfitRemove(idx){
  outfitImages[idx] = null;
  renderOutfitZones();
}

function resetOutfit(){
  outfitImages = [null, null];
  document.getElementById('outfitResults').classList.remove('show');
  document.getElementById('outfitLoading').classList.remove('show');
  renderOutfitZones();
}

/* ── Analysis ── */
// ── ML ENGINE: K-Means color extraction from image ──
// ── Seeded LCG pseudo-random (deterministic) ──
function outfitSeededRandom(seed){
  let s = seed >>> 0;
  return function(){
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

// ── Single K-Means run with fixed seed ──
function outfitKMeansRun(samples, k, seed){
  const rng = outfitSeededRandom(seed);
  // K-Means++ init (deterministic)
  const centroids = [samples[Math.floor(rng() * samples.length)]];
  while(centroids.length < k){
    const dists = samples.map(s => {
      let minD = Infinity;
      centroids.forEach(c => {
        const d = (s[0]-c[0])**2+(s[1]-c[1])**2+(s[2]-c[2])**2;
        if(d < minD) minD = d;
      });
      return minD;
    });
    const sum = dists.reduce((a,b)=>a+b,0);
    let rand = rng()*sum, acc=0;
    for(let i=0;i<dists.length;i++){
      acc+=dists[i];
      if(acc>=rand){ centroids.push([...samples[i]]); break; }
    }
    if(centroids.length < k) centroids.push([...samples[Math.floor(rng()*samples.length)]]);
  }

  let clusters = centroids.map(c=>[...c]);
  // 25 iterations for stable convergence
  for(let iter=0;iter<25;iter++){
    const sums = clusters.map(()=>[0,0,0,0]);
    samples.forEach(s=>{
      let best=0, bestD=Infinity;
      clusters.forEach((c,ci)=>{
        const d=(s[0]-c[0])**2+(s[1]-c[1])**2+(s[2]-c[2])**2;
        if(d<bestD){bestD=d;best=ci;}
      });
      sums[best][0]+=s[0];sums[best][1]+=s[1];
      sums[best][2]+=s[2];sums[best][3]++;
    });
    clusters=sums.map((sm,ci)=>
      sm[3]>0?[Math.round(sm[0]/sm[3]),Math.round(sm[1]/sm[3]),Math.round(sm[2]/sm[3])]:clusters[ci]
    );
  }
  return clusters;
}

// ── Ensemble: run 5 seeds, average centroids by nearest-match ──
async function outfitKMeans(dataUrl, k=6){
  return new Promise(resolve=>{
    const img=new Image();
    img.onload=()=>{
      const MAX=140;
      const cv=document.createElement('canvas');
      const sc=Math.min(1,MAX/Math.max(img.width,img.height));
      cv.width=Math.max(1,Math.round(img.width*sc));
      cv.height=Math.max(1,Math.round(img.height*sc));
      const ctx=cv.getContext('2d');
      ctx.drawImage(img,0,0,cv.width,cv.height);
      const px=ctx.getImageData(0,0,cv.width,cv.height).data;

      // Sample pixels (skip transparent & near-white/near-black backgrounds)
      const samples=[];
      for(let i=0;i<px.length;i+=4){
        if(px[i+3]<30) continue;
        samples.push([px[i],px[i+1],px[i+2]]);
      }
      if(samples.length<k){resolve([]);return;}

      // Run 5 fixed seeds for ensemble stability
      const SEEDS=[42,137,271,523,911];
      const allRuns=SEEDS.map(seed=>outfitKMeansRun(samples,k,seed));

      // Ensemble merge: use run[0] as reference, match other runs to it
      const ref=allRuns[0];
      const averaged=ref.map((refC,ri)=>{
        // Sum across all runs the centroid nearest to this reference centroid
        let sumR=refC[0],sumG=refC[1],sumB=refC[2];
        for(let run=1;run<allRuns.length;run++){
          let best=0,bestD=Infinity;
          allRuns[run].forEach((c,ci)=>{
            const d=(c[0]-refC[0])**2+(c[1]-refC[1])**2+(c[2]-refC[2])**2;
            if(d<bestD){bestD=d;best=ci;}
          });
          sumR+=allRuns[run][best][0];
          sumG+=allRuns[run][best][1];
          sumB+=allRuns[run][best][2];
        }
        return [Math.round(sumR/SEEDS.length),Math.round(sumG/SEEDS.length),Math.round(sumB/SEEDS.length)];
      });

      // Count pixel assignments to averaged centroids
      const counts=new Array(k).fill(0);
      samples.forEach(s=>{
        let best=0,bestD=Infinity;
        averaged.forEach((c,ci)=>{
          const d=(s[0]-c[0])**2+(s[1]-c[1])**2+(s[2]-c[2])**2;
          if(d<bestD){bestD=d;best=ci;}
        });
        counts[best]++;
      });

      const total=samples.length;
      const result=averaged.map((c,i)=>({
        r:c[0],g:c[1],b:c[2],
        hex:'#'+[c[0],c[1],c[2]].map(v=>v.toString(16).padStart(2,'0')).join(''),
        pct:Math.round(counts[i]/total*100),
        hsl:rgbToHslObj(c[0],c[1],c[2])
      })).filter(c=>c.pct>0).sort((a,b)=>b.pct-a.pct);

      resolve(result);
    };
    img.src=dataUrl;
  });
}

function rgbToHslObj(r,g,b){
  r/=255; g/=255; b/=255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b);
  let h,s,l=(max+min)/2;
  if(max===min){ h=s=0; }
  else{
    const d=max-min;
    s=l>0.5?d/(2-max-min):d/(max+min);
    switch(max){
      case r: h=((g-b)/d+(g<b?6:0))/6; break;
      case g: h=((b-r)/d+2)/6; break;
      default: h=((r-g)/d+4)/6;
    }
  }
  return { h:Math.round(h*360), s:Math.round(s*100), l:Math.round(l*100) };
}

// ── SCORING ENGINE ──
// Hue-wheel distance (0-180)
function hueDist(h1,h2){
  const d = Math.abs(h1-h2) % 360;
  return d > 180 ? 360-d : d;
}

// Detect harmony rule from dominant hues
function detectHarmonyRule(colors){
  const hues = colors.slice(0,5).filter(c=>c.hsl.s>15).map(c=>c.hsl.h);
  if(hues.length < 2) return 'Monochromatic';

  // Check monochromatic: all hues within 20°
  const spread = Math.max(...hues) - Math.min(...hues);
  if(spread < 25 || (360 - spread) < 25) return 'Monochromatic';

  // Check analogous: all within 60°
  const sorted = [...hues].sort((a,b)=>a-b);
  let maxGap = 0;
  for(let i=1;i<sorted.length;i++) maxGap=Math.max(maxGap,sorted[i]-sorted[i-1]);
  if(maxGap < 60) return 'Analogous';

  // Check complementary: two main hues ~180° apart
  for(let i=0;i<hues.length;i++)
    for(let j=i+1;j<hues.length;j++)
      if(hueDist(hues[i],hues[j])>=150 && hueDist(hues[i],hues[j])<=180) return 'Complementary';

  // Check triadic: three hues ~120° apart
  if(hues.length>=3)
    for(let i=0;i<hues.length;i++)
      for(let j=i+1;j<hues.length;j++)
        for(let k=j+1;k<hues.length;k++){
          const d1=hueDist(hues[i],hues[j]),d2=hueDist(hues[j],hues[k]),d3=hueDist(hues[i],hues[k]);
          if(Math.abs(d1-120)<35&&Math.abs(d2-120)<35) return 'Triadic';
        }

  // Check split-complementary
  for(let i=0;i<hues.length;i++)
    for(let j=i+1;j<hues.length;j++){
      const d=hueDist(hues[i],hues[j]);
      if(d>=140&&d<=175) return 'Split-Complementary';
    }

  return 'Eclectic';
}

// Compute harmony score using hue theory
function scoreHarmony(colors){
  const hues = colors.slice(0,6).filter(c=>c.hsl.s>12).map(c=>c.hsl.h);
  if(hues.length < 2) return 88; // monochromatic = high harmony

  // For each pair, compute closeness to a "harmonic interval"
  // Harmonic intervals: 0°(same),30°(analogous),60°(analogous),120°(triadic),150°(split-comp),180°(comp)
  const harmonicAngles = [0,30,60,120,150,180];
  let totalScore = 0, pairs = 0;
  for(let i=0;i<hues.length;i++){
    for(let j=i+1;j<hues.length;j++){
      const d = hueDist(hues[i], hues[j]);
      // Find closest harmonic angle
      const minDelta = Math.min(...harmonicAngles.map(a=>Math.abs(d-a)));
      // Score: 100 if perfect match, decreasing with deviation (tolerance 25°)
      totalScore += Math.max(0, 100 - minDelta * 2.8);
      pairs++;
    }
  }
  return Math.round(pairs > 0 ? totalScore/pairs : 80);
}

// Contrast balance: variety in lightness (not too flat, not too extreme)
function scoreContrast(colors){
  const lights = colors.slice(0,6).map(c=>c.hsl.l);
  if(lights.length<2) return 70;
  const range = Math.max(...lights) - Math.min(...lights);
  // Ideal range: 30-60 lightness points
  if(range >= 30 && range <= 65) return Math.round(85 + (range-30)*0.3);
  if(range < 30) return Math.round(40 + range*1.5);   // too flat
  return Math.round(Math.max(40, 95 - (range-65)*1.2)); // too extreme
}

// Saturation cohesion: saturations should be in a similar range
function scoreSaturation(colors){
  const sats = colors.slice(0,6).filter(c=>c.hsl.l>10&&c.hsl.l<90).map(c=>c.hsl.s);
  if(sats.length<2) return 75;
  const avg = sats.reduce((a,b)=>a+b,0)/sats.length;
  const variance = sats.reduce((a,b)=>a+(b-avg)**2,0)/sats.length;
  const stddev = Math.sqrt(variance);
  // Low stddev = cohesive; high = chaotic
  return Math.round(Math.max(30, 95 - stddev * 1.1));
}

// Tone unity: warm vs cool balance
function scoreToneUnity(colors){
  const top = colors.slice(0,6).filter(c=>c.hsl.s>10);
  if(top.length<2) return 80;
  let warm=0, cool=0;
  top.forEach(c=>{
    const h = c.hsl.h;
    // Warm: reds/oranges/yellows 0-75° and 330-360°
    if((h>=0&&h<=75)||(h>=330&&h<=360)) warm+=c.pct;
    else cool+=c.pct;
  });
  const total = warm+cool;
  if(total===0) return 80;
  const ratio = Math.max(warm,cool)/total; // 0.5=perfect balance, 1=all one tone
  // Either balanced OR strongly one-toned are both acceptable styles
  if(ratio < 0.65) return 90;             // balanced = great
  if(ratio < 0.8)  return 78;             // slightly one-sided
  return Math.round(95 - (ratio-0.8)*50); // mostly one tone = fine but slightly less unified
}

// ── MAIN ANALYSIS ──
async function runOutfitAnalysis(){
  const filled = outfitImages.map((img,i)=>img?{img,i}:null).filter(Boolean);
  if(!filled.length){ showToast('⚠ Add at least one outfit image'); return; }

  document.getElementById('outfitResults').classList.remove('show');
  document.getElementById('outfitLoading').classList.add('show');
  document.getElementById('outfitGoBtn').disabled = true;

  const prog = document.getElementById('outfitProg');
  prog.style.width = '0%';

  try {
    const outfits = [];

    for(let fi=0; fi<filled.length; fi++){
      const {img, i} = filled[fi];

      // Progress: spread evenly across outfits
      prog.style.width = Math.round((fi/filled.length)*88) + '%';
      document.getElementById('outfitLoadingTxt').textContent =
        `Analysing ${img.label}… (K-Means clustering)`;

      // Small yield so the DOM updates
      await new Promise(r=>setTimeout(r,30));

      // ① Extract colors via K-Means
      const colors = await outfitKMeans(img.dataUrl, 7);
      if(!colors.length){ outfits.push(null); continue; }

      // ② Score each dimension
      const harmonyScore   = scoreHarmony(colors);
      const contrastScore  = scoreContrast(colors);
      const satScore       = scoreSaturation(colors);
      const toneScore      = scoreToneUnity(colors);

      // ③ Weighted overall
      const overall = Math.round(
        harmonyScore  * 0.40 +
        contrastScore * 0.20 +
        satScore      * 0.20 +
        toneScore     * 0.20
      );

      const rule = detectHarmonyRule(colors);

      // ④ Generate verdict text from scores
      const verdict = outfitVerdict(rule, overall, harmonyScore, contrastScore);

      outfits.push({
        label: img.label,
        _dataUrl: img.dataUrl,
        scores:{
          harmony_score:   harmonyScore,
          contrast_balance: contrastScore,
          saturation_cohesion: satScore,
          tone_unity:      toneScore,
          overall
        },
        dominant_colors: colors.slice(0,6).map(c=>c.hex),
        harmony_rule: rule,
        verdict,
        _colors: colors
      });
    }

    prog.style.width = '100%';

    const validOutfits = outfits.filter(Boolean);
    if(!validOutfits.length) throw new Error('No valid outfits analysed');

    // Find winner
    const winner = validOutfits.reduce((a,b)=>a.scores.overall>=b.scores.overall?a:b);
    const winnerReason = outfitWinnerReason(winner, validOutfits);
    const stylistNote  = outfitStylistNote(validOutfits);

    renderOutfitResults({
      outfits: validOutfits,
      winner: winner.label,
      winner_reason: winnerReason,
      stylist_note: stylistNote
    });

  } catch(err){
    prog.style.width = '0%';
    document.getElementById('outfitLoading').classList.remove('show');
    document.getElementById('outfitGoBtn').disabled = false;
    showToast('⚠ ' + (err.message||'Analysis failed'));
    console.error('Outfit ML error:', err);
  }
}

// ── Text generators ──
function outfitVerdict(rule, overall, harmony, contrast){
  const quality = overall>=80?'excellent':overall>=65?'good':overall>=50?'moderate':'limited';
  const ruleDesc = {
    'Analogous':'smooth, flowing color transition',
    'Complementary':'bold, high-impact contrast',
    'Triadic':'vibrant, dynamic energy',
    'Monochromatic':'refined, elegant simplicity',
    'Split-Complementary':'subtle contrast with visual interest',
    'Eclectic':'expressive, layered palette'
  }[rule]||'distinct palette';
  return `${rule} palette with ${quality} harmony — ${ruleDesc}.`;
}

function outfitWinnerReason(winner, all){
  const runnerUp = all.filter(o=>o.label!==winner.label).sort((a,b)=>b.scores.overall-a.scores.overall)[0];
  const diff = runnerUp ? winner.scores.overall - runnerUp.scores.overall : 0;
  const margin = diff>15?'significantly':diff>5?'clearly':'slightly';
  const rule = winner.harmony_rule;
  const s = winner.scores;
  const best = [
    ['Harmony',s.harmony_score],['Contrast',s.contrast_balance],
    ['Saturation',s.saturation_cohesion],['Tone Unity',s.tone_unity]
  ].sort((a,b)=>b[1]-a[1])[0][0];
  return `${winner.label} scores ${margin} higher with a ${rule} palette (${winner.scores.overall}/100). ` +
    `Its strongest dimension is ${best} (${s[['harmony_score','contrast_balance','saturation_cohesion','tone_unity'][['Harmony','Contrast','Saturation','Tone Unity'].indexOf(best)]]}). ` +
    (runnerUp ? `${runnerUp.label} follows at ${runnerUp.scores.overall}/100.` : 'A strong, well-balanced colour story.');
}

function outfitStylistNote(outfits){
  const best = outfits[0];
  const notes = {
    'Analogous':'Analogous palettes work beautifully in outfit styling — consider adding a neutral accessory to ground the look.',
    'Complementary':'Complementary colors create maximum visual impact. Balance the ratio (70/30) to avoid clashing.',
    'Triadic':'Triadic outfits are bold and energetic. Keep one color dominant and use the other two as accents.',
    'Monochromatic':'Monochromatic dressing is timeless. Vary textures and silhouettes to add depth.',
    'Split-Complementary':'A safe alternative to complementary — more sophisticated with less tension.',
    'Eclectic':'An eclectic palette shows confidence. Consider a unifying neutral to tie the pieces together.'
  };
  return notes[best?.harmony_rule] || 'Focus on consistent undertones — all warm or all cool — for effortless cohesion.';
}

function renderOutfitResults(result){
  document.getElementById('outfitLoading').classList.remove('show');
  const container = document.getElementById('outfitResults');
  container.classList.add('show');

  const winner = result.winner || (result.outfits[0]?.label);
  const winnerObj = result.outfits.find(o=>o.label===winner) || result.outfits[0];

  // Sort outfits by overall score desc
  const sorted = [...result.outfits].sort((a,b)=>(b.scores?.overall||0)-(a.scores?.overall||0));

  container.innerHTML = `
    <!-- Winner banner -->
    <div class="outfit-winner">
      <div class="outfit-winner-ico">🏆</div>
      <div>
        <div class="outfit-winner-lbl">${tr('outfit_winner_lbl')||'Best Color Harmony'}</div>
        <div class="outfit-winner-name">${winner}</div>
        <div class="outfit-winner-why">${result.winner_reason||''}</div>
      </div>
    </div>

    <!-- Score cards -->
    <div class="outfit-cards">
      ${sorted.map((o,rank) => {
        const s = o.scores || {};
        const ov = s.overall || 0;
        const isWin = o.label === winner;
        const colors = (o.dominant_colors||[]).map(c=>
          `<div class="outfit-pal-dot" style="background:${c}" title="${c}" onclick="addToWallet('${c}','${c}')"></div>`
        ).join('');
        return `
        <div class="outfit-card ${isWin?'is-winner':''}">
          <img class="outfit-card-img" src="${o._dataUrl}" alt="${o.label}"/>
          <div class="outfit-card-body">
            <div class="outfit-card-rank">
              ${isWin?'<span class="outfit-card-crown">👑</span>':''}
              <span>#${rank+1} — ${o.label}</span>
            </div>
            <div class="outfit-card-score" style="color:${ov>=75?'#6bcb77':ov>=55?'#ffd93d':'#ff6b6b'}">${ov}</div>
            <div class="outfit-card-score-lbl">${tr('outfit_score_lbl')||'/ 100 Color Score'}</div>
            <div class="outfit-score-bar-wrap"><div class="outfit-score-bar" style="width:${ov}%"></div></div>
            <div class="outfit-dims">
              <div class="outfit-dim-row"><span>${tr('outfit_dim_harmony')||'Harmony'}</span><span class="outfit-dim-val">${s.harmony_score||'—'}</span></div>
              <div class="outfit-dim-row"><span>${tr('outfit_dim_contrast')||'Contrast'}</span><span class="outfit-dim-val">${s.contrast_balance||'—'}</span></div>
              <div class="outfit-dim-row"><span>${tr('outfit_dim_sat')||'Saturation'}</span><span class="outfit-dim-val">${s.saturation_cohesion||'—'}</span></div>
              <div class="outfit-dim-row"><span>${tr('outfit_dim_tone')||'Tone Unity'}</span><span class="outfit-dim-val">${s.tone_unity||'—'}</span></div>
              ${o.harmony_rule?`<div class="outfit-dim-row"><span>${tr('outfit_dim_rule')||'Rule'}</span><span class="outfit-dim-val" style="color:#f59e0b">${o.harmony_rule}</span></div>`:''}
            </div>
            ${o.verdict?`<div style="font-size:.62rem;color:var(--muted);margin-top:8px;line-height:1.6;font-style:italic">"${o.verdict}"</div>`:''}
            <div class="outfit-palette">${colors}</div>
          </div>
        </div>`;
      }).join('')}
    </div>


  `;

  // Animate score bars after render
  requestAnimationFrame(()=>{
    document.querySelectorAll('.outfit-score-bar').forEach(bar=>{
      const target = bar.style.width;
      bar.style.width = '0%';
      setTimeout(()=>{ bar.style.width = target; }, 100);
    });
  });

  container.scrollIntoView({behavior:'smooth', block:'start'});
  document.getElementById('outfitGoBtn').disabled = false;
}

let toastTimer=null;
function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  if(toastTimer) clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),2200);
}

function copyHex(hex){
  navigator.clipboard.writeText(hex).catch(()=>{});
  const f=document.getElementById('flash-'+hex.replace('#',''));
  if(f){f.style.opacity='1';setTimeout(()=>f.style.opacity='0',700);}
  showToast(`${hex} — ${tr('copied')}`);
}
function copyAllHex(){navigator.clipboard.writeText(lastColors.map(c=>c.hex).join('\n')).catch(()=>{});showToast(tr('copied')+` (${lastColors.length})`);}
function copyCSS(){navigator.clipboard.writeText(`:root {\n`+lastColors.map((c,i)=>`  --color-${i+1}: ${c.hex}; /* ${c.name} · ${c.pct}% */`).join('\n')+'\n}').catch(()=>{});showToast('CSS '+tr('copied'));}
function copySCSS(){navigator.clipboard.writeText(lastColors.map((c,i)=>`$color-${i+1}: ${c.hex}; // ${c.name} · ${c.pct}%`).join('\n')).catch(()=>{});showToast('SCSS '+tr('copied'));}
function copyJSON(){navigator.clipboard.writeText(JSON.stringify(lastColors.map((c,i)=>({index:i+1,hex:c.hex,rgb:{r:c.r,g:c.g,b:c.b},hsl:c.hsl,name:c.name,coverage:c.pct})),null,2)).catch(()=>{});showToast('JSON '+tr('copied'));}

function downloadSVG(){
  const w=80,gap=10,cols=Math.min(8,lastColors.length),rows=Math.ceil(lastColors.length/cols);
  const tw=cols*(w+gap)-gap+40,th=rows*(w+gap+30)-gap+60;
  let svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${tw}" height="${th}"><rect width="100%" height="100%" fill="${isDark?'#0c0c0d':'#f7f4ef'}"/>`;
  svg+=`<text x="20" y="36" font-family="serif" font-size="16" font-weight="bold" fill="#d4a853" letter-spacing="4">FINDCOLOR PALETTE</text>`;
  lastColors.forEach((c,i)=>{const col=i%cols,row=Math.floor(i/cols),x=20+col*(w+gap),y=56+row*(w+gap+30);svg+=`<rect x="${x}" y="${y}" width="${w}" height="${w}" fill="${c.hex}" rx="4"/><text x="${x+w/2}" y="${y+w+14}" text-anchor="middle" font-family="monospace" font-size="9" fill="${isDark?'#6a6660':'#9a8e80'}">${c.hex}</text><text x="${x+w/2}" y="${y+w+24}" text-anchor="middle" font-family="monospace" font-size="8" fill="${isDark?'#4a4a4a':'#bab0a0'}">${c.pct}%</text>`;});
  svg+='</svg>';
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));
  a.download='findcolor-palette.svg'; a.click();
  showToast(tr('download_done'));
}

function updateCodeBlock(){
  document.getElementById('codeBlock').innerHTML=`:root {\n`+lastColors.map((c,i)=>`  <span class="kw">--color-${i+1}</span>: <span class="str">${c.hex}</span>; <span class="cm">/* ${c.name} | rgb(${c.r},${c.g},${c.b}) | ${c.pct}% */</span>`).join('\n')+'\n}';
}
function toggleCode(){const cb=document.getElementById('codeBlock');cb.style.display=cb.style.display==='block'?'none':'block';}

// ══════════════════════════════════════════════════════
// NAV SCROLL & REVEAL
// ══════════════════════════════════════════════════════
window.addEventListener('scroll',()=>{document.getElementById('nav').classList.toggle('scrolled',window.scrollY>60);});
const ro=new IntersectionObserver(entries=>{entries.forEach((e,i)=>{if(e.isIntersecting)setTimeout(()=>e.target.classList.add('visible'),i*80);});},{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const t2=document.querySelector(a.getAttribute('href'));if(t2){e.preventDefault();t2.scrollIntoView({behavior:'smooth'});}});});

// ══════════════════════════════════════════════════════
// HISTORY ENGINE (IndexedDB)
// ══════════════════════════════════════════════════════

const DB_NAME    = 'FindColorDB';
const DB_VERSION = 1;
const STORE_NAME = 'uploads';
const MAX_HISTORY = 30;

let historyDB = null;

function openDB() {
  return new Promise((resolve, reject) => {
    if (historyDB) { resolve(historyDB); return; }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
    req.onsuccess = e => { historyDB = e.target.result; resolve(historyDB); };
    req.onerror   = e => reject(e.target.error);
  });
}

async function saveToHistory(file, dataUrl, extractedColors) {
  try {
    const db = await openDB();
    // Create thumbnail (max 120px) to save space
    const thumb = await makeThumbnail(dataUrl, 120);
    const entry = {
      name:      file.name || 'Uploaded Image',
      size:      file.size || 0,
      type:      file.type || 'image/*',
      timestamp: Date.now(),
      thumbnail: thumb,
      dataUrl:   dataUrl,           // full image for reload
      colors:    (extractedColors || []).slice(0,8).map(c => c.hex),
    };
    const tx    = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    await new Promise((res, rej) => {
      const r = store.add(entry);
      r.onsuccess = res; r.onerror = rej;
    });
    // Trim to MAX_HISTORY
    await trimHistory(db);
    updateHistoryBadge();
  } catch(e) { console.warn('History save failed:', e); }
}

async function updateLatestHistoryColors(hexArray) {
  try {
    const db  = await openDB();
    const all = await getAllHistory(db);
    if (!all.length) return;
    all.sort((a,b) => b.timestamp - a.timestamp);
    const latest = all[0];
    latest.colors = hexArray;
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(latest);
  } catch(e) {}
}

function makeThumbnail(dataUrl, maxSize) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const scale = maxSize / Math.max(img.width, img.height);
      const w = Math.round(img.width  * Math.min(scale, 1));
      const h = Math.round(img.height * Math.min(scale, 1));
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      resolve(c.toDataURL('image/jpeg', 0.7));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

async function trimHistory(db) {
  try {
    const all = await getAllHistory(db);
    if (all.length <= MAX_HISTORY) return;
    // Sort oldest first, delete excess
    all.sort((a,b) => a.timestamp - b.timestamp);
    const toDelete = all.slice(0, all.length - MAX_HISTORY);
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    for (const item of toDelete) {
      store.delete(item.id);
    }
  } catch(e) {}
}

function getAllHistory(db) {
  return new Promise((resolve, reject) => {
    const tx    = (db || historyDB).transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req   = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror   = () => resolve([]);
  });
}

async function updateHistoryBadge() {
  try {
    const db   = await openDB();
    const all  = await getAllHistory(db);
    const badge = document.getElementById('histBadge');
    if (!badge) return;
    if (all.length > 0) {
      badge.textContent = all.length;
      badge.classList.add('show');
    } else {
      badge.classList.remove('show');
    }
  } catch(e){}
}

async function renderHistoryList() {
  try {
    const db   = await openDB();
    const all  = await getAllHistory(db);
    const list = document.getElementById('historyList');
    const meta = document.getElementById('historyMeta');
    if (!list) return;

    all.sort((a,b) => b.timestamp - a.timestamp); // newest first

    if (meta) meta.textContent = `${all.length} image${all.length !== 1 ? 's' : ''} stored in your browser`;

    if (!all.length) {
      list.innerHTML = `
        <div class="history-empty">
          <div class="history-empty-icon">🖼️</div>
          <div>No upload history yet.<br>Upload an image to get started.</div>
        </div>`;
      return;
    }

    list.innerHTML = all.map(item => {
      const date = new Date(item.timestamp);
      const dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
      const colorDots = (item.colors || []).map(hex =>
        `<span style="background:${hex}" title="${hex}"></span>`
      ).join('');
      return `
        <div class="hist-item" id="hitem-${item.id}">
          <div class="hist-thumb">
            <img src="${item.thumbnail || item.dataUrl}" alt="${item.name}" loading="lazy"/>
          </div>
          <div class="hist-info">
            <div class="hist-item-name">${item.name}</div>
            <div class="hist-item-date">${dateStr}</div>
            <div class="hist-item-colors">${colorDots}</div>
          </div>
          <div class="hist-item-actions">
            <button class="hist-load-btn" onclick="loadFromHistory(${item.id})">Load</button>
            <button class="hist-del-btn" onclick="deleteHistoryItem(${item.id})">✕</button>
          </div>
        </div>`;
    }).join('');

    // cursor hover
    list.querySelectorAll('.hist-item, .hist-load-btn, .hist-del-btn').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  } catch(e) {
    const list = document.getElementById('historyList');
    if (list) list.innerHTML = `<div class="history-empty"><div>Unable to load history.<br>Your browser may not support IndexedDB.</div></div>`;
  }
}

async function loadFromHistory(id) {
  try {
    const db   = await openDB();
    const tx   = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const item = await new Promise((res, rej) => {
      const r = store.get(id);
      r.onsuccess = () => res(r.result);
      r.onerror   = () => rej(r.error);
    });
    if (!item) return;

    // Load the dataUrl as an image
    const img = document.getElementById('previewImg');
    img.src = item.dataUrl;
    document.getElementById('uploadDefault').style.display = 'none';
    document.getElementById('uploadZone').style.cssText = 'min-height:0;cursor:default;';
    document.getElementById('previewZone').style.display = 'block';
    document.getElementById('results').style.display = 'none';
    document.getElementById('controlsBar').style.display = 'none';
    document.getElementById('harmony-section').style.display = 'none';

    img.onload = () => { currentImg = img; };

    closeHistoryPanel();
    // Scroll to upload
    document.getElementById('top').scrollIntoView({behavior:'smooth'});
    showToast(`Loaded: ${item.name}`);
  } catch(e) { showToast('Failed to load image'); }
}

async function deleteHistoryItem(id) {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(id);
    tx.oncomplete = () => {
      // Remove from DOM immediately
      const el = document.getElementById(`hitem-${id}`);
      if (el) el.remove();
      updateHistoryBadge();
      // Re-render if empty
      renderHistoryList();
    };
  } catch(e){}
}

async function clearHistory() {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).clear();
    tx.oncomplete = () => {
      renderHistoryList();
      updateHistoryBadge();
      showToast('History cleared');
    };
  } catch(e){}
}

function toggleHistoryPanel() {
  const panel = document.getElementById('historyPanel');
  const btn   = document.getElementById('histBtn');
  // Close font panel if open
  document.getElementById('fontPanel').classList.remove('open');
  document.getElementById('fontBtn').classList.remove('open');
  const isOpen = panel.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  if (isOpen) renderHistoryList();
}

function closeHistoryPanel() {
  document.getElementById('historyPanel').classList.remove('open');
  document.getElementById('histBtn').classList.remove('open');
}

// Close history panel on outside click
document.addEventListener('click', e => {
  const panel = document.getElementById('historyPanel');
  const btn   = document.getElementById('histBtn');
  if (panel && panel.classList.contains('open') &&
      !panel.contains(e.target) && !btn.contains(e.target)) {
    closeHistoryPanel();
  }
});

// ══════════════════════════════════════════════════════
// FONT PICKER ENGINE
// ══════════════════════════════════════════════════════

const FONTS = [
  // SANS-SERIF
  { name:'DM Sans',       family:"'DM Sans', sans-serif",         cat:'sans',    preview:'DM Sans — Clean & Modern',       tag:'sans'    },
  { name:'Inter',         family:"'Inter', sans-serif",           cat:'sans',    preview:'Inter — Minimal & Legible',      tag:'sans'    },
  { name:'Poppins',       family:"'Poppins', sans-serif",         cat:'sans',    preview:'Poppins — Geometric & Friendly', tag:'sans'    },
  { name:'Montserrat',    family:"'Montserrat', sans-serif",       cat:'sans',    preview:'Montserrat — Bold & Urban',      tag:'sans'    },
  { name:'Raleway',       family:"'Raleway', sans-serif",          cat:'sans',    preview:'Raleway — Elegant & Light',      tag:'sans'    },
  { name:'Nunito',        family:"'Nunito', sans-serif",           cat:'sans',    preview:'Nunito — Rounded & Soft',        tag:'sans'    },
  { name:'Lato',          family:"'Lato', sans-serif",             cat:'sans',    preview:'Lato — Balanced & Neutral',      tag:'sans'    },
  { name:'Roboto',        family:"'Roboto', sans-serif",           cat:'sans',    preview:'Roboto — Google Classic',        tag:'sans'    },
  { name:'Open Sans',     family:"'Open Sans', sans-serif",        cat:'sans',    preview:'Open Sans — Readable & Clear',  tag:'sans'    },
  { name:'Cabin',         family:"'Cabin', sans-serif",            cat:'sans',    preview:'Cabin — Humanist & Warm',        tag:'sans'    },
  { name:'Josefin Sans',  family:"'Josefin Sans', sans-serif",     cat:'sans',    preview:'Josefin — Art Deco Minimal',    tag:'sans'    },
  { name:'Source Sans 3', family:"'Source Sans 3', sans-serif",    cat:'sans',    preview:'Source Sans — Professional',    tag:'sans'    },
  { name:'Outfit',        family:"'Outfit', sans-serif",           cat:'sans',    preview:'Outfit — Contemporary & Clean', tag:'sans'    },
  { name:'Space Grotesk', family:"'Space Grotesk', sans-serif",    cat:'sans',    preview:'Space Grotesk — Tech & Bold',   tag:'sans'    },
  // SERIF
  { name:'Merriweather',  family:"'Merriweather', serif",          cat:'serif',   preview:'Merriweather — Classic & Rich', tag:'serif'   },
  // DISPLAY
  { name:'Bodoni Moda',   family:"'Bodoni Moda', serif",           cat:'display', preview:'Bodoni Moda — Luxury Editorial',tag:'display' },
  { name:'Playfair Display',family:"'Playfair Display', serif",    cat:'display', preview:'Playfair — Timeless Elegance',  tag:'display' },
  { name:'Cormorant Garamond',family:"'Cormorant Garamond', serif",cat:'display', preview:'Cormorant — Ultra Refined',     tag:'display' },
  { name:'Syne',          family:"'Syne', sans-serif",             cat:'display', preview:'Syne — Experimental & Bold',    tag:'display' },
  // MONO
  { name:'JetBrains Mono',family:"'JetBrains Mono', monospace",    cat:'mono',    preview:'JetBrains — Developer Clarity', tag:'mono'    },
  // ARABIC-FRIENDLY
  { name:'Tajawal',       family:"'Tajawal', sans-serif",          cat:'arabic',  preview:'تجوال — عربي وإنجليزي',          tag:'arabic'  },
];

let currentFont = FONTS[0]; // DM Sans default
let fontCatFilter = 'all';
let fontSearchQuery = '';

function buildFontList() {
  const list = document.getElementById('fpList');
  const query = fontSearchQuery.toLowerCase();
  const filtered = FONTS.filter(f => {
    const matchCat = fontCatFilter === 'all' || f.cat === fontCatFilter;
    const matchSearch = !query || f.name.toLowerCase().includes(query) || f.cat.includes(query);
    return matchCat && matchSearch;
  });

  if (!filtered.length) {
    list.innerHTML = `<div style="padding:28px;text-align:center;color:var(--muted);font-size:0.75rem;letter-spacing:1px;">No fonts found</div>`;
    return;
  }

  list.innerHTML = filtered.map(f => `
    <div class="fp-item ${f.name === currentFont.name ? 'active' : ''}"
         onclick="applyFont('${f.name}')"
         onmouseenter="previewFont('${f.name}')">
      <div class="fp-item-left">
        <div class="fp-preview" style="font-family:${f.family}">${f.preview}</div>
        <div class="fp-meta">
          <span class="fp-name">${f.name}</span>
          <span class="fp-tag ${f.tag}">${f.tag}</span>
        </div>
      </div>
      <div class="fp-check">✓</div>
    </div>
  `).join('');

  // re-attach cursor hover for new items
  list.querySelectorAll('.fp-item').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

function previewFont(name) {
  const f = FONTS.find(x => x.name === name);
  if (!f) return;
  const pv = document.getElementById('fpPreviewText');
  const pl = document.getElementById('fpPreviewLabel');
  pv.style.fontFamily = f.family;
  pv.textContent = f.preview;
  pl.textContent = f.name.toUpperCase();
}

function applyFont(name) {
  const f = FONTS.find(x => x.name === name);
  if (!f) return;
  currentFont = f;

  const isAr = document.body.classList.contains('ar');
  const fam  = isAr ? `'Tajawal', sans-serif` : f.family;

  // Inject / update a persistent override <style> in <head>
  let styleEl = document.getElementById('font-override-style');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'font-override-style';
    document.head.appendChild(styleEl);
  }

  // Strategy: set both CSS vars on :root so every var(--font-body)
  // and var(--font-display) reference picks up the new font.
  // Then use html:not(.no-override) * to catch anything hardcoded with !important.
  styleEl.textContent = `
    :root {
      --font-body:    ${fam} !important;
      --font-display: ${fam} !important;
    }
    /* Override every text-bearing element — exclude cursor divs and pseudo-elements */
    html body *:not(#cursor-dot):not(#cursor-ring):not(#cursor-trail) {
      font-family: ${fam} !important;
    }
    /* Mono carve-outs — technical data stays monospace */
    .cc-rgb, .cc-hsl, .cc-hex span, .h-swatch-hsl,
    .h-swatch-hex span, .fp-name, .fp-preview-label,
    .cc-pct-badge, .cc-rank, .h-swatch-angle, .seg-hex,
    .upload-formats, .hist-item-date, .code-block,
    .code-block *, .h-copy-btn {
      font-family: 'JetBrains Mono', monospace !important;
    }
    /* Keep cursor:none intact — font override must not touch cursor property */
    #cursor-dot, #cursor-ring, #cursor-trail,
    *, *::before, *::after { cursor: none !important; }
  `;

  // Sync preview bar
  const pv = document.getElementById('fpPreviewText');
  const pl = document.getElementById('fpPreviewLabel');
  if (pv) { pv.style.fontFamily = fam; pv.textContent = f.preview; }
  if (pl) { pl.textContent = f.name.toUpperCase() + ' — ACTIVE'; }

  buildFontList();
  showToast(`✦ Font: ${f.name}`);
  try { localStorage.setItem('fc_font', name); } catch(e) {}
}

function filterFonts(q) {
  fontSearchQuery = q;
  buildFontList();
}

function filterCat(btn) {
  document.querySelectorAll('.fp-cat').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  fontCatFilter = btn.dataset.cat;
  fontSearchQuery = '';
  document.getElementById('fpSearch').value = '';
  buildFontList();
}

function toggleFontPanel() {
  const panel = document.getElementById('fontPanel');
  const btn   = document.getElementById('fontBtn');
  const isOpen = panel.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  if (isOpen) {
    buildFontList();
    // Reset preview bar to current font
    const pv = document.getElementById('fpPreviewText');
    const pl = document.getElementById('fpPreviewLabel');
    pv.style.fontFamily = currentFont.family;
    pv.textContent = currentFont.preview;
    pl.textContent = currentFont.name.toUpperCase() + ' — ACTIVE';
  }
}

function closeFontPanel() {
  document.getElementById('fontPanel').classList.remove('open');
  document.getElementById('fontBtn').classList.remove('open');
  // Restore body font on mouseleave from panel
  const pv = document.getElementById('fpPreviewText');
  if (pv) {
    pv.style.fontFamily = currentFont.family;
    document.getElementById('fpPreviewLabel').textContent = currentFont.name.toUpperCase() + ' — ACTIVE';
  }
}

// Close panel on outside click
document.addEventListener('click', e => {
  const panel = document.getElementById('fontPanel');
  const btn   = document.getElementById('fontBtn');
  if (panel.classList.contains('open') && !panel.contains(e.target) && !btn.contains(e.target)) {
    closeFontPanel();
  }
});

// Restore current font on mouse leave from list item
document.addEventListener('mouseover', e => {
  if (!e.target.closest('.fp-item') && document.getElementById('fontPanel').classList.contains('open')) {
    const pv = document.getElementById('fpPreviewText');
    if (pv) pv.style.fontFamily = currentFont.family;
  }
});

// ══════════════════════════════════════════════════════
// COLOR HARMONY HEATMAP ENGINE
// ══════════════════════════════════════════════════════
let hmMode = 'harmony';
let hmAnimId = null;

function setHeatmapMode(btn) {
  document.querySelectorAll('.hm-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  hmMode = btn.dataset.mode;
}

async function runHeatmap() {
  if (!currentImg || !lastColors.length) return;
  const btn = document.getElementById('heatmapBtn');
  btn.disabled = true;
  btn.style.opacity = '0.6';

  const area  = document.getElementById('heatmapCanvasArea');
  const wrap  = document.getElementById('heatmapCanvasWrap');
  const loading = document.getElementById('heatmapLoading');
  const legend  = document.getElementById('heatmapLegend');
  const scoreRow = document.getElementById('heatmapScoreRow');

  area.style.display = 'flex'; area.style.flexDirection = 'column'; area.style.gap = '16px';
  loading.style.display = 'flex';
  wrap.style.display = 'none';
  legend.style.display = 'none';
  scoreRow.style.display = 'none';

  await new Promise(r => setTimeout(r, 60));

  try {
    await computeAndDrawHeatmap();
  } catch(e) {
    console.error('Heatmap error:', e);
  }

  loading.style.display = 'none';
  wrap.style.display = 'block';
  legend.style.display = 'flex';
  scoreRow.style.display = 'grid';
  btn.disabled = false;
  btn.style.opacity = '1';
}

async function computeAndDrawHeatmap() {
  const canvas = document.getElementById('heatmapCanvas');
  const ctx    = canvas.getContext('2d');

  // Draw original image to off-screen canvas
  const src  = document.createElement('canvas');
  const img  = currentImg;
  // Work at reduced resolution for performance
  const MAX  = 400;
  const scale = Math.min(1, MAX / Math.max(img.naturalWidth || img.width, img.naturalHeight || img.height));
  src.width  = Math.max(1, Math.round((img.naturalWidth  || img.width)  * scale));
  src.height = Math.max(1, Math.round((img.naturalHeight || img.height) * scale));
  const sctx = src.getContext('2d');
  sctx.drawImage(img, 0, 0, src.width, src.height);
  const imgData = sctx.getImageData(0, 0, src.width, src.height).data;

  const W = src.width, H = src.height;
  canvas.width  = W;
  canvas.height = H;
  canvas.style.width  = '100%';
  canvas.style.height = 'auto';

  // Build score map for each pixel based on selected mode
  const scoreMap = new Float32Array(W * H);
  const colors   = lastColors;

  // Precompute per-cluster hue harmony scores (hue-wheel distance between clusters)
  // Build harmony matrix: for each pair of clusters, score their hue distance
  const harmonyMatrix = buildHarmonyMatrix(colors);

  // ── per-pixel assignment to nearest cluster ──
  const assignment = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (y * W + x) * 4;
      const pr = imgData[idx], pg = imgData[idx+1], pb = imgData[idx+2];
      let best = 0, bestD = Infinity;
      for (let ci = 0; ci < colors.length; ci++) {
        const c = colors[ci];
        const d = (pr-c.r)**2 + (pg-c.g)**2 + (pb-c.b)**2;
        if (d < bestD) { bestD = d; best = ci; }
      }
      assignment[y * W + x] = best;
    }

    // yield every 40 rows to keep UI responsive
    if (y % 40 === 0) await new Promise(r => setTimeout(r, 0));
  }

  // ── compute score per pixel based on mode ──
  let globalMin = Infinity, globalMax = -Infinity;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const pi   = y * W + x;
      const ci   = assignment[pi];
      const idx  = pi * 4;
      const pr = imgData[idx], pg = imgData[idx+1], pb = imgData[idx+2];
      const c    = colors[ci];
      let score  = 0;

      if (hmMode === 'harmony') {
        // Average harmony score with all neighboring clusters
        // Look at a small neighborhood to find adjacent clusters
        let totalH = 0, count = 0;
        const R = 4;
        for (let dy = -R; dy <= R; dy += 2) {
          for (let dx = -R; dx <= R; dx += 2) {
            const nx2 = x + dx, ny2 = y + dy;
            if (nx2 < 0 || nx2 >= W || ny2 < 0 || ny2 >= H) continue;
            const ni = assignment[ny2 * W + nx2];
            if (ni !== ci) {
              totalH += harmonyMatrix[ci * colors.length + ni];
              count++;
            }
          }
        }
        score = count > 0 ? totalH / count : 0;

      } else if (hmMode === 'cluster') {
        // Distance from pixel's actual RGB to its cluster centroid
        score = Math.sqrt((pr-c.r)**2 + (pg-c.g)**2 + (pb-c.b)**2);

      } else if (hmMode === 'saturation') {
        // Saturation from HSL — shows how vivid / desaturated areas are
        const hsl = toHSL(pr, pg, pb);
        score = hsl.s; // 0-100

      } else if (hmMode === 'tension') {
        // Color tension: number of different clusters in local neighborhood
        const R2 = 6;
        const seen = new Set();
        seen.add(ci);
        for (let dy = -R2; dy <= R2; dy += 2) {
          for (let dx = -R2; dx <= R2; dx += 2) {
            const nx2 = x + dx, ny2 = y + dy;
            if (nx2 < 0 || nx2 >= W || ny2 < 0 || ny2 >= H) continue;
            seen.add(assignment[ny2 * W + nx2]);
          }
        }
        score = seen.size - 1; // 0 = uniform area, high = many colors meeting
      }

      scoreMap[pi] = score;
      if (score < globalMin) globalMin = score;
      if (score > globalMax) globalMax = score;
    }
  }

  // ── Normalize 0–1 and render with color ramp ──
  const range = globalMax - globalMin || 1;
  const out = ctx.createImageData(W, H);
  const od  = out.data;

  for (let i = 0; i < W * H; i++) {
    const t = (scoreMap[i] - globalMin) / range; // 0=cool/harmonic, 1=hot/discord
    const [r, g, b] = heatRamp(t);
    // Blend heatmap 70% + original image 30% for context
    const oi = i * 4;
    const origR = imgData[oi], origG = imgData[oi+1], origB = imgData[oi+2];
    od[oi]   = Math.round(r * 0.72 + origR * 0.28);
    od[oi+1] = Math.round(g * 0.72 + origG * 0.28);
    od[oi+2] = Math.round(b * 0.72 + origB * 0.28);
    od[oi+3] = 255;
  }

  // Animate draw: reveal in horizontal bands
  await animateHeatmapReveal(ctx, out, W, H);

  // ── Score metrics ──
  const avgScore = scoreMap.reduce((s, v) => s + v, 0) / scoreMap.length;
  const normAvg  = (avgScore - globalMin) / range;
  renderHeatmapScores(normAvg, colors, harmonyMatrix);
}

function buildHarmonyMatrix(colors) {
  // Returns a flat array [i * N + j] = discord score between color i and j
  // Higher = more discordant
  const N = colors.length;
  const mat = new Float32Array(N * N);
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (i === j) { mat[i * N + j] = 0; continue; }
      const hi = colors[i].hsl.h, hj = colors[j].hsl.h;
      const si = colors[i].hsl.s, sj = colors[j].hsl.s;
      const li = colors[i].hsl.l, lj = colors[j].hsl.l;

      // Hue distance (0-180 on wheel)
      let hDiff = Math.abs(hi - hj);
      if (hDiff > 180) hDiff = 360 - hDiff;

      // Harmonic hue angles: 0° (same), 30° (analogous), 60° (triadic-ish),
      // 120° (triadic), 150° (split), 180° (complementary) — all these are "harmonic"
      const harmonicAngles = [0, 30, 60, 120, 150, 180];
      const minHarmonicDist = Math.min(...harmonicAngles.map(a => Math.abs(hDiff - a)));

      // Saturation & lightness mismatch
      const sDiff = Math.abs(si - sj) / 100;
      const lDiff = Math.abs(li - lj) / 100;

      // Combined discord score: hue mismatch dominates, sat/light add nuance
      // minHarmonicDist 0 = perfectly harmonic, 30 = moderate discord
      const discord = (minHarmonicDist / 30) * 0.65 + sDiff * 0.2 + lDiff * 0.15;
      mat[i * N + j] = Math.min(1, discord);
    }
  }
  return mat;
}

function heatRamp(t) {
  // Spectral-like ramp: blue (harmonic) → cyan → yellow → red (discordant)
  // Matches the CSS legend gradient
  const stops = [
    [0.00, [49,  54, 149]],
    [0.12, [69, 117, 180]],
    [0.25, [116,173,209]],
    [0.38, [171,217,233]],
    [0.50, [224,243,248]],
    [0.55, [255,255,191]],
    [0.65, [254,224, 97]],
    [0.75, [253,174, 97]],
    [0.85, [244,109, 67]],
    [0.93, [215, 48, 39]],
    [1.00, [165,  0, 38]],
  ];
  for (let i = 0; i < stops.length - 1; i++) {
    const [t0, c0] = stops[i];
    const [t1, c1] = stops[i + 1];
    if (t >= t0 && t <= t1) {
      const f = (t - t0) / (t1 - t0);
      return [
        Math.round(c0[0] + (c1[0]-c0[0]) * f),
        Math.round(c0[1] + (c1[1]-c0[1]) * f),
        Math.round(c0[2] + (c1[2]-c0[2]) * f),
      ];
    }
  }
  return [165, 0, 38];
}

async function animateHeatmapReveal(ctx, imageData, W, H) {
  // Reveal heatmap from top in batches with a brief flash effect
  const BATCH = Math.max(4, Math.floor(H / 40));
  for (let y = 0; y < H; y += BATCH) {
    const partial = ctx.createImageData(W, Math.min(BATCH, H - y));
    const srcOff  = y * W * 4;
    partial.data.set(imageData.data.subarray(srcOff, srcOff + partial.data.length));
    ctx.putImageData(partial, 0, y);
    await new Promise(r => setTimeout(r, 8));
  }
}

function renderHeatmapScores(normAvg, colors, harmonyMatrix) {
  const scoreRow = document.getElementById('heatmapScoreRow');
  const badge    = document.getElementById('hmOverallBadge');
  const modeDesc = document.getElementById('hmModeDesc');

  // Overall harmony score 0-100 (inverted: high = harmonic)
  const harmonyScore = Math.round((1 - normAvg) * 100);
  let label, cls;
  if (harmonyScore >= 65)     { label = '✦ ' + tr('hm_harmonious');  cls = 'harmonious'; }
  else if (harmonyScore >= 40){ label = '◆ ' + tr('hm_moderate');    cls = 'moderate';   }
  else                        { label = '✕ ' + tr('hm_discordant');  cls = 'discordant'; }

  badge.textContent = label;
  badge.className   = 'hm-score-badge ' + cls;

  const modeDescs = {
    harmony:    tr('hm_mode_harmony'),
    cluster:    tr('hm_mode_cluster'),
    saturation: tr('hm_mode_sat'),
    tension:    tr('hm_mode_tension'),
  };
  modeDesc.textContent = modeDescs[hmMode] || '';

  // Compute avg pairwise harmony across all cluster pairs
  const N = colors.length;
  let pairSum = 0, pairs = 0;
  for (let i = 0; i < N; i++) for (let j = i+1; j < N; j++) {
    pairSum += harmonyMatrix[i * N + j];
    pairs++;
  }
  const avgDiscord = pairs > 0 ? pairSum / pairs : 0;

  // Find most & least harmonic clusters
  let maxHarmPair = ['—','—'], minHarmPair = ['—','—'];
  let minD = Infinity, maxD = -Infinity;
  for (let i = 0; i < N; i++) for (let j = i+1; j < N; j++) {
    const d = harmonyMatrix[i * N + j];
    if (d < minD) { minD = d; minHarmPair = [colors[i].hex, colors[j].hex]; }
    if (d > maxD) { maxD = d; maxHarmPair = [colors[i].hex, colors[j].hex]; }
  }

  const dot = (hex) => `<span style="display:inline-block;width:10px;height:10px;background:${hex};border-radius:50%;margin-right:4px;vertical-align:middle"></span>`;

  scoreRow.innerHTML = `
    <div class="hm-score-box">
      <div class="hm-score-val" style="color:${harmonyScore>=65?'#6bcb77':harmonyScore>=40?'#ffd93d':'#ff6b6b'}">${harmonyScore}</div>
      <div class="hm-score-lbl">Harmony Score</div>
      <div class="hm-score-sub">Out of 100 — higher is more harmonious</div>
    </div>
    <div class="hm-score-box">
      <div class="hm-score-val" style="color:var(--gold)">${Math.round((1-avgDiscord)*100)}</div>
      <div class="hm-score-lbl">Avg Pair Harmony</div>
      <div class="hm-score-sub">Mean harmony across all ${pairs} color pairs</div>
    </div>
    <div class="hm-score-box">
      <div class="hm-score-lbl" style="margin-bottom:6px">Most Harmonic Pair</div>
      <div style="display:flex;align-items:center;gap:4px;font-size:0.65rem;font-family:'JetBrains Mono',monospace">
        ${dot(minHarmPair[0])}${minHarmPair[0]}<span style="color:var(--muted)">↔</span>${dot(minHarmPair[1])}${minHarmPair[1]}
      </div>
      <div class="hm-score-sub" style="margin-top:6px">Discord: ${(minD*100).toFixed(0)}%</div>
    </div>
    <div class="hm-score-box">
      <div class="hm-score-lbl" style="margin-bottom:6px">Most Discordant Pair</div>
      <div style="display:flex;align-items:center;gap:4px;font-size:0.65rem;font-family:'JetBrains Mono',monospace">
        ${dot(maxHarmPair[0])}${maxHarmPair[0]}<span style="color:var(--muted)">↔</span>${dot(maxHarmPair[1])}${maxHarmPair[1]}
      </div>
      <div class="hm-score-sub" style="margin-top:6px">Discord: ${(maxD*100).toFixed(0)}%</div>
    </div>
  `;
}

// ══════════════════════════════════════════════════════
// COLOR MAP ENGINE
// ══════════════════════════════════════════════════════
let cmapAnimId = null;

function openColorMap(hex, tr, tg, tb, name, pct) {
  if (!currentImg) return;

  // Header info
  document.getElementById('cmapDot').style.background  = hex;
  document.getElementById('cmapHex').textContent        = hex;
  document.getElementById('cmapName').textContent       = '— ' + name;
  document.getElementById('cmapPct').textContent        = pct + '%';
  document.getElementById('cmapSwatchA').style.background = hex;
  document.getElementById('cmapStatus').textContent     = 'Rendering…';
  document.getElementById('cmapProgressBar').style.width = '0%';

  // Open modal
  const modal = document.getElementById('cmapModal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Wait one frame so modal is visible, then paint
  requestAnimationFrame(() => paintColorMap(tr, tg, tb, hex, pct));
}

function closeColorMap() {
  document.getElementById('cmapModal').classList.remove('open');
  document.body.style.overflow = '';
  if (cmapAnimId) { cancelAnimationFrame(cmapAnimId); cmapAnimId = null; }
}

function paintColorMap(tr, tg, tb, hex, pct) {
  if (cmapAnimId) cancelAnimationFrame(cmapAnimId);

  const wrap   = document.querySelector('.cmap-canvas-wrap');
  const canvas = document.getElementById('cmapCanvas');
  const ctx    = canvas.getContext('2d');
  const bar    = document.getElementById('cmapProgressBar');
  const status = document.getElementById('cmapStatus');

  // Source canvas — draw original image at full detail
  const src = document.createElement('canvas');
  const img = currentImg;
  // Use full resolution capped at 1200px for sharpness
  const maxDim = 1200;
  const scale  = Math.min(1, maxDim / Math.max(img.naturalWidth || img.width, img.naturalHeight || img.height));
  src.width  = Math.round((img.naturalWidth  || img.width)  * scale);
  src.height = Math.round((img.naturalHeight || img.height) * scale);
  const sctx = src.getContext('2d');
  sctx.drawImage(img, 0, 0, src.width, src.height);

  // Match canvas size to container aspect ratio
  const wrapW = wrap.clientWidth  || 800;
  const wrapH = wrap.clientHeight || 500;
  canvas.width  = src.width;
  canvas.height = src.height;
  canvas.style.width  = wrapW + 'px';
  canvas.style.height = wrapH + 'px';

  const pixels  = sctx.getImageData(0, 0, src.width, src.height);
  const data    = pixels.data;
  const total   = src.width * src.height;

  // Output ImageData — start with dimmed greyscale version of original
  const out    = ctx.createImageData(src.width, src.height);
  const outD   = out.data;

  // PHASE 1: instantly draw dimmed grey base
  for (let i = 0; i < data.length; i += 4) {
    const lum = 0.299 * data[i] + 0.587 * data[i+1] + 0.114 * data[i+2];
    const dim = lum * 0.28;  // very dark
    outD[i]   = dim;
    outD[i+1] = dim;
    outD[i+2] = dim;
    outD[i+3] = 255;
  }
  ctx.putImageData(out, 0, 0);

  // COLOR TOLERANCE — how close a pixel must be to target color
  const TOLERANCE = 38;

  // PHASE 2: animate revealing matching pixels row-by-row
  const ROW_BATCH = Math.max(1, Math.floor(src.height / 80)); // 80 frames
  let row = 0;
  let matchCount = 0;

  function revealStep() {
    const endRow = Math.min(row + ROW_BATCH, src.height);

    for (let y = row; y < endRow; y++) {
      for (let x = 0; x < src.width; x++) {
        const idx = (y * src.width + x) * 4;
        const pr = data[idx], pg = data[idx+1], pb = data[idx+2];

        // Euclidean distance in RGB space
        const dist = Math.sqrt(
          (pr - tr) * (pr - tr) +
          (pg - tg) * (pg - tg) +
          (pb - tb) * (pb - tb)
        );

        if (dist <= TOLERANCE) {
          // Show original pixel with a bright boost
          outD[idx]   = Math.min(255, pr * 1.08);
          outD[idx+1] = Math.min(255, pg * 1.08);
          outD[idx+2] = Math.min(255, pb * 1.08);
          outD[idx+3] = 255;
          matchCount++;
        }
      }
    }

    ctx.putImageData(out, 0, 0);
    row = endRow;

    const progress = row / src.height;
    bar.style.width = (progress * 100).toFixed(1) + '%';

    if (row < src.height) {
      cmapAnimId = requestAnimationFrame(revealStep);
    } else {
      // Done — draw glow outline around matched pixels
      drawMatchGlow(ctx, outD, src.width, src.height, tr, tg, tb, TOLERANCE, data);
      const covPct = ((matchCount / total) * 100).toFixed(1);
      status.textContent = `${matchCount.toLocaleString()} px matched · ${covPct}% of image`;
      bar.style.width = '100%';
      cmapAnimId = null;
    }
  }

  cmapAnimId = requestAnimationFrame(revealStep);
}

function drawMatchGlow(ctx, outD, w, h, tr, tg, tb, tol, srcData) {
  // Draw a subtle 1px colored border around matched regions
  const glowOut = ctx.createImageData(w, h);
  const gd = glowOut.data;

  // Copy current
  for (let i = 0; i < outD.length; i++) gd[i] = outD[i];

  // Edge detection: pixel that is matched but has a non-matched neighbor
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = (y * w + x) * 4;
      const pr = srcData[idx], pg = srcData[idx+1], pb = srcData[idx+2];
      const matched = Math.sqrt((pr-tr)**2 + (pg-tg)**2 + (pb-tb)**2) <= tol;
      if (!matched) continue;

      // Check 4 neighbors
      const neighbors = [
        (y-1)*w+x, (y+1)*w+x, y*w+(x-1), y*w+(x+1)
      ];
      let isEdge = false;
      for (const ni of neighbors) {
        const nidx = ni * 4;
        const nr = srcData[nidx], ng = srcData[nidx+1], nb = srcData[nidx+2];
        if (Math.sqrt((nr-tr)**2 + (ng-tg)**2 + (nb-tb)**2) > tol) {
          isEdge = true; break;
        }
      }
      if (isEdge) {
        gd[idx]   = Math.min(255, tr * 1.4 + 60);
        gd[idx+1] = Math.min(255, tg * 1.4 + 60);
        gd[idx+2] = Math.min(255, tb * 1.4 + 60);
        gd[idx+3] = 255;
      }
    }
  }
  ctx.putImageData(glowOut, 0, 0);
}

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeColorMap();
});

// ══════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════
// MOBILE MENU
// ══════════════════════════════════════════════════════
function toggleMobileMenu() {
  const menu    = document.getElementById('mobileMenu');
  const overlay = document.getElementById('mobileMenuOverlay');
  const btn     = document.getElementById('hamburgerBtn');
  const isOpen  = menu.classList.contains('open');
  if (isOpen) {
    closeMobileMenu();
  } else {
    menu.classList.add('open');
    overlay.classList.add('open');
    btn.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileMenu() {
  const menu    = document.getElementById('mobileMenu');
  const overlay = document.getElementById('mobileMenuOverlay');
  const btn     = document.getElementById('hamburgerBtn');
  menu.classList.remove('open');
  overlay.classList.remove('open');
  btn.classList.remove('open');
  document.body.style.overflow = '';
}

// Close mobile menu on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMobileMenu();
});

// Dynamic copyright year
document.getElementById('footYear').textContent = new Date().getFullYear();

setLang('en');
updateHistoryBadge();
loadWallet();
// Restore saved font
try {
  const savedFont = localStorage.getItem('fc_font');
  if (savedFont) applyFont(savedFont);
} catch(e){}